# Architecture Documentation

Document your design decisions and implementation approach here.

## Dynamo Db Design

This sections covers the access patterns and approaches taken for the table schema

### Access Patterns

**Operation -> (Primary Key, Sort Key)**

Get -- (itemId, versionKey="CURRENT")
Create -- PutItem (check that it doesnt exist already, if so return that item)
Update -- PutItem
List by subject 
Create version
Get audit trail
