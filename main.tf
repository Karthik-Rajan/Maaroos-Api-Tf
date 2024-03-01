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