# Architecture Documentation

Document your design decisions and implementation approach here.

### Proposed Database Schema

For the table schema I have kept things to a single table. Refrencing the existing `Item` model structure it's clear that it can all be modeled one table.

**Item Table Schema**

For versioning we can make the sort key be on versionKey, this will let us only query current items instead of past versions when listing out items.

Example

```
{
    itemId    versionKey    subject       metadata.version
    abc       CURRENT       AP Biology    3
    abc       V0001         AP Biology    1
    abc       V0002         AP Biology    2
}
```

### Access Patterns

**Operation -> (Primary Key, Sort Key)**

1. Get Current item: (itemId, versionKey="CURRENT")

2. Create: PutItem (check that it doesnt exist already, if so return that item)

3. Update: PutItem (Update the fields and increment the metadata.version)

4. List by subject: Use a GSI `subjectIndex` and query on versionKey == "CURRENT" to avoid snapshots in the index

5. Create version snapshot: PutItem (itemId, versionKey), check that the version we're trying to save hasn't been snapshotted yet

6. Get audit trail: Query on itemId and all versions that are not CURRENT aka just "V..."

### How to handle version/audit

Based on the actual usecase it could be handled two ways:

1. We don't want to save every version (recommended)

When we make changes to an item we increment the version but only write a snapshot if the `createVersion` endpoint is called. This would be used if items are edited frequently and auto-saved during a draft mode.

The downside is you lose history for edits where we didnt save the snapshot.

1. Persist every update

We could also go the route where when we call `updateItem` we also write two rows, one the updated item with CURRENT and then the previous state of the item with its versionKey.

Downside for this approach is update always does two writes.


## Infrastructure choices and rationale

For the infrastructure I chose to go with a single table with each handler having it's own lambda and route wired to APIGW. The reason for this is at scale/in production we may see higher traffic on certain operations. Having them split instead of using the one lambda approach allows us to scale them independently as well as gives us better metrics/monitoring.

I chose to split the API and table into two different constructs as it's generally best practice in CDK to have small self-contained stacks/constructs. This allows for quicker deployments on singular stacks with the downside being dependencies between stacks. With well planned out infra you *usually* avoid that.

## Security approach

The current setup is fine for local testing but for production we would want to use something like Cognito authorizer with our APIGW. Other small security features:

- Zod validations on all writes
- Proper iam roles for read/writes

## Trade-offs & Future Improvements

- The listItems ddb method currently scans and uses filterExpression; for production we would want to implement the GSI only on CURRENT versions

- We could also implement locking on updateItem. Right now there is a small chance we overwrite if two calls happen for the same item at the same time. This could be fixed by making sure the version number matches what we originally read in, aka it hasnt been updated since.

- There currently is no auth layer meaning anyone can perform writes. Depending on the users of the service we would want to add role based permissions for each endpoint. Ex: Admin can update etc.