# fitzulu-middleware



Fidzulu is a main project consisting of a class A backend service, which is divided into three services: BikeService, FoodService, and ToyService. Each of these services is implemented as a separate Node.js project, allowing them to be run concurrently on different ports.

## Running the Services

To run the services, we use the `concurrently` package to start them concurrently on different ports. Below are the available npm scripts in the main `package.json`.


- `start`: Start the services without auto-reloading.
- `devStart`: Start the services with auto-reloading using `nodemon`.
- `test`: Run unit tests for all three services concurrently.

You can run these scripts using the following commands:

```bash


# Start the services
npm start

# Start the services with auto-reloading
nodemon index.js

# Run unit tests for all services
npm test
```


## Unit Testing and End-to-End Testing
Jasmine is used for unit testing and end-to-end testing. Unit tests are written for each service to test the application logic. End-to-end tests are written for each service to test the API endpoints. The tests are run concurrently using the `concurrently` package.

## Service Specifics
Each service within the project has its own package.json file and dependencies. To manage and deploy each service separately, navigate to the specific service's directory and run the necessary npm scripts.

## Service Deployment
Each Service is deployed on AWS EC2 instance. The EC2 instance is a virtual server in Amazon's Elastic Compute Cloud (EC2) for running applications on the AWS infrastructure. Each service runs in a docker container on the EC2 instance. Docker is a tool designed to make it easier to create, deploy, and run applications by using containers. Containers allow a developer to package up an application with all of the parts it needs, such as libraries and other dependencies, and ship it all out as one package. The services are deployed using the following steps:
