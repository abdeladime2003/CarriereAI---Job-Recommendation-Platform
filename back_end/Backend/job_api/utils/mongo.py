from pymongo import MongoClient, errors

def get_mongo_connection():
    try:
        client = MongoClient('mongodb://172.30.240.1:27017', serverSelectionTimeoutMS=5000)
        db = client["job_recommendation"]
        job_offers_collection = db["job_offers"]
    except errors.ServerSelectionTimeoutError:
        print("Le serveur MongoDB est injoignable.")
    except Exception as e:
        print(f"Une erreur est survenue : {e}")
    return job_offers_collection
