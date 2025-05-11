from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from pymongo import MongoClient
from .utils.mongo import get_mongo_connection
from .serializers import JobOfferSerializer

class PostJobOfferView(APIView):
    def post(self, request):
        serializer = JobOfferSerializer(data=request.data)
        if serializer.is_valid():
            collection = get_mongo_connection()
            result = collection.insert_one(serializer.validated_data)
            inserted_id = str(result.inserted_id)

            return Response({"message": "Offre enregistrée", "id": inserted_id}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class GetJobOffersView(APIView):
    def get(self, request):
        collection = get_mongo_connection()
        job_offers = list(collection.find({}))
        # Convert ObjectId to string for JSON serialization
        for offer in job_offers:
            offer["_id"] = str(offer["_id"])
        return Response(job_offers, status=status.HTTP_200_OK)
    