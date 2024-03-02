terraform {
  cloud {
    organization = "karthikrajansvg"

    workspaces {
      project = "maaroos-inc"
      name = "maaroos-api"
    }
  }
}

provider "google" {
  project     = "inspired-memory-398714"
  region      = "asia-south1"
  credentials = file("GCP/cred.json")
}

resource "google_storage_bucket" "api_bucket" {
  name          = "maaroos-api"
  location      = "asia-south1"
  uniform_bucket_level_access = true
}

locals {
  function_files = fileset("${path.module}/build", "**/*")
  cloud_functions = { for file in local.function_files : 
                      trimsuffix(file, ".js.zip") => {
                        name    = trimsuffix(file, ".js.zip")
                        source  = "${path.module}/build/${file}"
                      }
                    }
}

resource "google_storage_bucket_object" "cf_maaroos_api" {
  for_each = fileset("build", "**/*")
  
  name   = "${each.value}"
  source = "build/${each.value}"
  bucket = google_storage_bucket.api_bucket.name
}

resource "google_cloudfunctions_function" "my_first_func" {
  for_each = local.cloud_functions
  
  name        = "${each.value.name}"
  runtime     = "nodejs16"
  entry_point = "handler"
  source_archive_bucket = google_storage_bucket.api_bucket.name
  source_archive_object = "${each.value.name}.js.zip"
  available_memory_mb = 256
  timeout             = 60
  trigger_http = true
}