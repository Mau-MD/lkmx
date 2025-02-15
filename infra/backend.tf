resource "google_artifact_registry_repository" "lkmx_registry" {
  location      = "us"
  repository_id = "lkmx-registry"
  description   = "Docker repository for LKMX services"
  format        = "DOCKER"
}

resource "google_sql_database_instance" "lkmx_postgres" {
  name                = "lkmx-postgres"
  database_version    = "POSTGRES_15"
  region              = var.region
  deletion_protection = false

  settings {
    tier = "db-f1-micro"
    ip_configuration {
      ipv4_enabled = true
      authorized_networks {
        name  = "all"
        value = "0.0.0.0/0" # TODO: Change this in production
      }
    }
  }
}



resource "google_sql_user" "users" {
  name     = var.postgres_user
  instance = google_sql_database_instance.lkmx_postgres.name
  password = var.postgres_password
}

resource "google_cloud_run_v2_service" "lkmx_service" {
  name                = "lkmx-service"
  location            = var.region
  deletion_protection = false
  ingress             = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "us-docker.pkg.dev/cloudrun/container/hello" // Placeholder image. Actual image will be set in the deploy script
      resources {
        limits = {
          cpu    = "2"
          memory = "1024Mi"
        }
      }
      env {
        name  = "DATABASE_URL"
        value = "postgresql://${var.postgres_user}:${var.postgres_password}@${google_sql_database_instance.lkmx_postgres.public_ip_address}:5432/${var.postgres_database}"
      }
      env {
        name  = "SERVER_URL"
        value = "http://0.0.0.0:3000"
      }
    }
  }
}

output "postgres_public_ip" {
  value = google_sql_database_instance.lkmx_postgres.public_ip_address
}

output "lkmx_service_url" {
  value = google_cloud_run_v2_service.lkmx_service.urls[0]
}
