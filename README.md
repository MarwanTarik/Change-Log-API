# Change Log API

## Technologies

* Postgres for the database
* Prisma ORM
* Node/Express for the application logic
* jsonwebtoken from npm for working with JWT

## Structure

`src/` all source code, which contains.

* `prisma` database schema
* `handlers` model handlers that recieves the requests and send respones as well as status codes
* `routes` the configuration for all routes
* `middleware` authentication middleware, error handlers, request validators
* `server.ts` main server configuration
* `prisma_utilities` ORM configuration
* `modules` some useful helper methods
* `config` environment configuration

## Installation

`npm install` to install required packages

`npm run start` will start the server and the database on the `ports` defined in environment variables

`npm build` will build the src code

`npm run dev` will run your project in development mode

## Migrations

`npx prisma migrate dev --name` will migrate your database schema
