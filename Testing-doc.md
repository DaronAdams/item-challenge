### Create

Valid Create

```bash
curl -s -X POST http://localhost:3000/api/items \
  -H 'Content-Type: application/json' \
  -d '{
    "subject": "AP Biology",
    "itemType": "multiple-choice",
    "difficulty": 3,
    "content": {
      "question": "What is DNA?",
      "options": ["A","B","C","D"],
      "correctAnswer": "A",
      "explanation": "DNA is..."
    },
    "metadata": {
      "author": "daron",
      "status": "draft",
      "tags": ["biology"]
    },
    "securityLevel": "standard"
  }'
```

Invalid Create

```bash
curl -s -X POST http://localhost:3000/api/items \
  -H 'Content-Type: application/json' \
  -d '{
    "subject": "AP Biology",
    "itemType": "multiple-choice",
    "difficulty": 3,
    "content": {
      "question": "What is DNA?",
      "explanation": "DNA is..."
    },
    "metadata": {
      "author": "daron",
      "status": "draft",
      "tags": ["biology"]
    },
    "securityLevel": "standard"
  }'
```

### Get

```bash
curl -s http://localhost:3000/api/items/<REPLACE>
```