variable "project_id" {
  type        = string
  description = "The ID of the Google Cloud Project"
  default     = "lkmx-451021"
}

// Region
variable "region" {
  type        = string
  description = "The region to deploy the resources to"
  default     = "us-central1"
}

// Postgres User
variable "postgres_user" {
  type        = string
  description = "The user for the Postgres database"
  default     = "postgres"
}

// Postgres Password
variable "postgres_password" {
  type        = string
  description = "The password for the Postgres database"
  default     = "postgres"
}

// Postgres Database
variable "postgres_database" {
  type        = string
  description = "The database for the Postgres database"
  default     = "postgres"
}


