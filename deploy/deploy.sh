
PROJECT_ID="lkmx-451021"
REGION="us-central1"

POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DATABASE="postgres"

echo "Migrating remote database..."
DATABASE_DNS=$(cd infra && terraform output -raw postgres_public_ip)
DATABASE_URL="postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DATABASE_DNS}:5432/${POSTGRES_DATABASE}"

DATABASE_URL=$DATABASE_URL npx drizzle-kit migrate 

echo "Building docker image..."
gcloud auth configure-docker us-docker.pkg.dev

docker build --platform linux/amd64 -t us-docker.pkg.dev/${PROJECT_ID}/lkmx-registry/lkmx:latest .
docker push us-docker.pkg.dev/${PROJECT_ID}/lkmx-registry/lkmx:latest

echo "Deploying to Cloud Run..."
gcloud run deploy lkmx-service --image us-docker.pkg.dev/${PROJECT_ID}/lkmx-registry/lkmx:latest --region=$REGION --project=$PROJECT_ID --platform managed --allow-unauthenticated --port=3000 
