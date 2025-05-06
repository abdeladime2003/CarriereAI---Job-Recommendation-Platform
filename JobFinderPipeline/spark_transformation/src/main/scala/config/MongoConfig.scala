package config

object MongoConfig {
  val mongoUri: String = "mongodb://172.30.240.1:27017"
  val databaseName: String = "job_recommendation"
  val sourceCollection: String = "job_offers"
  val processedCollection: String = "processed_jobs"
}
