 # User Management System

## Deployed Demo 
> Note, in order to save costs, the project will be taken down after February 18th using `terraform destroy`. If needed, please email me to get the project back up.

[https://lkmx-service-574820729926.us-central1.run.app](https://lkmx-service-574820729926.us-central1.run.app)

## Local Build
 1. Clone the repository `git clone https://github.com/Mau-MD/lkmx`
 2. Rename the `.env.example` file to `.env` and set the environment variables
 3. Run `deploy/start.sh` to start the services

 ## Deploy to GCP
 1. Create a new project in GCP
 2. Go to https://console.developers.google.com/apis/api/artifactregistry.googleapis.com/overview?project=<project-id> and enable the Artifact Registry API
 3. Go to https://console.developers.google.com/apis/api/run.googleapis.com/overview?project=<project-id> and enable the Cloud Run API
 4. Replace the `project_id` and `region` in the `infra/variables.tf` file with your project id and region
 5. Change `$PROJECT_ID` and `$REGION` to your project id and region in the `deploy/deploy.sh` file
 6. Run `cd infra && terraform init && terraform apply` to deploy the infrastructure
 8. If you changed the default username, password, or database name, change them in the `infra/variables.tf` file and in the `deploy/deploy.sh` file
 9. Run `deploy/deploy.sh` to deploy the services

 ## Project Summary
 The project is a simple user management system that allows you to create, read, update and delete users. 


### Project Structure

#### Server
The project is entirely built with Next.js. Client code can be found inside the `src/client` folder. Server code can be found inside the `src/server` folder. API routes can be found inside the `src/app/api` folder.

In order to maintain a clean project structure, the server is divided between API, Service and Model. API handles the routing, and data validation. Service contains the business logic; however since the project is small, it just "redirects" to the Model. Model interacts directly with the database.

#### Database
The database is a Postgres database. It is managed using Drizzle ORM. The schema can be found inside the `src/server/db/schema.ts` file. Migrations are done using Drizzle Kit.

#### Client
The client is a simple page that allows you to manage users. It is built with Next.js and Tailwind CSS with Shadcn UI. The initial data fetch is done on the server side. The actions are handled on the client side.

#### Infrastructure
The infrastructure is built with Terraform. It creates an Artifact Registry repository, a Cloud Run service and a Postgres database. Deployment is done through a custom script which migrates the database, builds the docker image, pushes it to the Artifact Registry and deploys it to Cloud Run.


### Future Improvements
Due to the time constraints, the project is not fully optimized. Here are some of the improvements that can be made:
Server:
- Global error handling for the API with proper HTTP status codes and Custom Error class
- Unit tests with Jest
- Global rate limiting for the API
- Proper logging with winston and Sentry error tracking

Client:
- Global error handling in the client
- Sentry error tracking
- Add a loading state and optimistic updates for the client
- Integration with React Query

Infrastructure:
- Add a CI/CD pipeline with automatic deployment
- Add proper key management for the database
- Messy env variable configuration. Should be cleaned up and only have one source of truth 

### Time Spent
- 1.5 hours: Backend, Client, Database
- 45 minutes: Fixing weird Next.js Dockerfile issue where fetch was not working inside the contianer
- 45 minutes: Infrastructure
- 30 minutes: Annoying Cloud Run Client API issue :/

Total time: 3:30 hours


