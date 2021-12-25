# Server

## Setup

### Rebuild Model from Database

```bash
node_modules/.bin/sequelize-auto -h localhost -d jamwithme -u [database_user] -x [database_password] -p 5432  --dialect postgres -o ./models
```
