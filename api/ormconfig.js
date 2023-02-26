const AdminUser = require('nestjs-admin').AdminUserEntity
module.exports = {
  "name": "default",
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "root",
  "password": "root",
  "database": "mydb",
  "synchronize": true,
  "logging": false,
  "entities": ["../**/*.entity.{ts,js}", AdminUser],
  "subscribers": ["src/subscriber/*.js"],
  "migrations": ["src/migration/*.js"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
