<!-- omit in toc -->
# Overly Engineered Notes

![GitHub CI](https://github.com/AaronCQL/overly-engineered-notes/workflows/Server%20CI%20Tests/badge.svg)
![Codecov](https://img.shields.io/codecov/c/github/AaronCQL/overly-engineered-notes)
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

- [Server](#server)
  - [Tech stack](#tech-stack)
  - [Installation](#installation)
  - [Development environment](#development-environment)
    - [Start developing](#start-developing)
    - [Access local endpoints](#access-local-endpoints)
    - [Lint and run tests](#lint-and-run-tests)
  - [Production environment](#production-environment)
    - [Connect to MongoDB Atlas production server](#connect-to-mongodb-atlas-production-server)
    - [Manually deploy via Google Cloud Build](#manually-deploy-via-google-cloud-build)
  - [Continuous Integration & Continuous Deployment](#continuous-integration--continuous-deployment)
  - [API reference](#api-reference)
    - [Create a note](#create-a-note)
    - [Get all notes](#get-all-notes)
    - [Update a note](#update-a-note)
    - [Delete a note](#delete-a-note)

## Server

### Tech stack

- **Google Cloud Build**: CD workflow to build the docker images
- **Google Cloud Run**: where the serverless container is deployed
- **Google Container Registry**: where the docker images are stored
- **Google Secret Manager**: where secrets are stored (MongoDB Atlas credentials in this case)
- **MongoDB**: choice of database
- **GitHub Actions**: CI workflow to generate and upload code coverage
- **Codecov**: where the code coverage is uploaded to

### Installation

Install a local copy of [MongoDB](https://www.mongodb.com/) if you want to develop locally.

Then, to install the server dependencies, run:

```sh
# change to server/ directory first
cd server/
# install all dependencies
yarn
```

### Development environment

#### Start developing

Make sure you have [MongoDB](https://www.mongodb.com/) installed and running properly on your machine first!

```sh
# change to server/ directory first
cd server/
# start a local server with hot reload at port 8000
yarn dev
```

While developing locally, the local MongoDB server is used:

- URL: `mongodb://localhost:27017`
- Database name: `overly-engineered-notes-DEV`

If there are any errors while connecting to your local MongoDB server, ensure that it is actually running first, or use a GUI like [MongoDB Compass](https://www.mongodb.com/products/compass) to verify that you are able to connect to the above URL.

#### Access local endpoints

1. Verify that the server has started and is listening on `http://localhost:8000`
2. Using Postman (or `curl`), make a `GET` call to `http://localhost:8000/api/notes` to verify that the endpoint is working
3. Refer to the [API reference](#api-reference) for the other endpoints

#### Lint and run tests

```sh
# change to server/ directory first
cd server/
# lint and run all tests
yarn ci
```

While running tests (`yarn ci`), an in-memory version of MongoDB is used (see [`@shelf/jest-mongodb`](https://github.com/shelfio/jest-mongodb)). All reads and writes are performed using an ephemeral database which will not persist beyond the tests.

### Production environment

> **Warning**: this section requires admin credentials/privileges for this GCP project and MongoDB Atlas. The commands shown here **will not work** if you have just cloned this repository (since no credentials are stored here).

#### Connect to MongoDB Atlas production server

To start a local server which connects to the production MongoDB Atlas server, first create a `server/.env` file with the following environment variables:

```sh
# replace the <..> appropriately
ATLAS_USER=<your_username_here>
ATLAS_PASSWORD=<your_password_here>
```

Then, start the server:

```sh
# change to server/ directory first
cd server/
# start server (without hot reload) and connect to production MongoDB Atlas
# this is the command used when deployed to Cloud Run
yarn start
```

#### Manually deploy via Google Cloud Build

To start a manual deployment to production, also ensure that the `server/.env` file contains the required environment variables like above. Then, ensure you are at the root of the project and run:

```sh
# run in root of project (ie. BEFORE the server/ dir)
gcloud builds submit --config server/cloudbuild.yaml
```

### Continuous Integration & Continuous Deployment

GitHub Actions is responsible for the Continuous Integration (CI). Refer to the workflow at `.github/workflows/server-ci.yml`. Any changes in the `master` branch will trigger this workflow to run. The generated code coverage report is also automatically uploaded to [Codecov](https://codecov.io/).

Google Cloud Build is responsible for the Continuous Deployment (CD). Only changes in the `master` branch *and* within the `server/` directory will trigger this workflow to run. Refer to the build configuration at `server/cloudbuild.yaml`. The current workflow will:

1. Pull the last image in Container Registry to use as cache
2. Generate the `.env` file from Secret Manager needed for MongoDB Atlas credentials
3. Build the new docker image as configured in `server/Dockerfile`
4. Push the new image to Container Registry
5. Deploy the new image to Cloud Run as a serverless container

### API reference

The following base URLs are assumed:

- **Deployed endpoint**: https://overly-engineered-notes-server-reeh2u5ugq-as.a.run.app
- **Local endpoint**: http://localhost:8000

#### Create a note

- Method: `POST`
- URL: `/api/notes`
- Body data (example):
  ```js
  {
    "text": "hello" // string; required!
  }
  ```

**Success response**:

- Condition: if everything is OK and `text` field is not missing nor an empty string
- Code: `201 CREATED`
- Content (example):
  ```js
  {
    "_id": "5f570273a83adf5417b48026",
    "text": "hello",
    "createdAt": "2020-09-08T04:02:59.081Z",
    "updatedAt": "2020-09-08T04:02:59.081Z"
  }
  ```

**Error response**:

- Condition: if `text` field is missing or the empty string
- Code: `400 BAD REQUEST`
- Content: description of error

#### Get all notes

- Method: `GET`
- URL: `/api/notes`

**Success response**:

- Condition: if everything is OK
- Code: `200 CREATED OK`
- Content (example):
  ```js
  [
    // ...
    {
      "_id": "5f570273a83adf5417b48026",
      "text": "hello",
      "createdAt": "2020-09-08T04:02:59.081Z",
      "updatedAt": "2020-09-08T04:02:59.081Z"
    },
    // ...
  ]
  ```

#### Update a note

- Method: `PUT`
- URL: `/api/notes/:id`
- URL parameters
  - `id`: the `ObjectId` of the MongoDB document
- Body data (example):
  ```js
  {
    "text": "updated" // string; required!
  }
  ```

**Success response**:

- Condition: if everything is OK and note is updated successfully
- Code: `204 NO CONTENT`

**Error response**:

- Condition: if `text` field is missing or the empty string
- Code: `400 BAD REQUEST`
- Content: description of error

OR

- Condition: if the document is not found in database
- Code: `404 NOT FOUND`
- Content: `"Note not found"`

#### Delete a note

- Method: `DELETE`
- URL: `/api/notes/:id`
- URL parameters
  - `id`: the `ObjectId` of the MongoDB document

**Success response**:

- Condition: if everything is OK and note is deleted successfully
- Code: `204 NO CONTENT`

**Error response**:

- Condition: if the document is not found in database
- Code: `404 NOT FOUND`
- Content: `"Note not found"`
