# Audiophile Backend

### Description:
This application is designed to provide a REST API that allows clients to interact with the ```Postgres database``` through HTTP requests.

This app contains two entities each connected with their own endpoints and database tables.

### Development endpoints

|Entity|Endpoint|Methods|
|------|--------|-------|
|Category|http://localhost:3000/api/v1/catgories|Post, Get|
|Category|http://localhost:3000/api/v1/catgories/:id|Patch, Delete|
|Products|http://localhost:3000/api/v1/products|Post, Get|
|Products|http://localhost:3000/api/v1/products/:id|Patch, Delete|
|Products|http://localhost:3000/api/v1/products/category/:category|Get|
|Products|http://localhost:3000/api/v1/products/slug/:slug|Get|

> Please remember to replace ```localhost:3000``` with your domain in production.

### Requeriments

- Node v16+
- NestJS CLI
- Docker

### Instructions

1. Clone the repository.
2. Rename ```.env.template``` file to ```.env```
3. Define the values for each variable in the ```.env``` file
4. In your terminal go to the local repository folder.
5. Execute ```docker compose up -d```
6. Execute ```npm install```
7. Execute ```npm run start:dev```
8. Done