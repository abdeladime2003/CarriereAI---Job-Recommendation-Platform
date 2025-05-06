import os
import logging
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from Ocr_Model.main import main
from .utils.logger import logger
from .matching_service import match_cv_to_jobs  # Import du matching
from bson import ObjectId
import os
from rest_framework.permissions import IsAuthenticated 
from rest_framework_simplejwt.authentication import JWTAuthentication
from pymongo import MongoClient
logger.info("Logger initialisé pour le traitement des CVs.")

class CVUploadView(APIView):
    authentication_classes = [JWTAuthentication]  # ✅ Ensure JWT authentication is used
    permission_classes = [IsAuthenticated]  # ✅ Require authentication
    def post(self, request, *args, **kwargs):
        user = str(request.user)
        try:
            file = request.FILES.get('file')
            logger.info(f"Requête POST reçue pour le fichier {file.name}")
        except Exception as e:
            logger.error(f"Erreur lors de la récupération du fichier : {e}")
            return Response({"error": "Erreur lors de la récupération du fichier."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if not file:
            return Response({"error": "Aucun fichier fourni."}, status=status.HTTP_400_BAD_REQUEST)

        if not file.name.endswith('.pdf'):
            return Response({"error": "Seuls les fichiers PDF sont autorisés."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            file_path = os.path.join(settings.MEDIA_ROOT, 'cvs', file.name)
            os.makedirs(os.path.dirname(file_path), exist_ok=True)

            with open(file_path, 'wb') as f:
                for chunk in file.chunks():
                    f.write(chunk)

            logger.info(f"Fichier {file.name} sauvegardé avec succès.")

            try:
                print("tratement du fichier")
                cv_id = main(file_path , user)  # 🔥 Extraction OCr
                print(f"📌 [DEBUG] ID du CV après extraction : {cv_id}")
                
                client = MongoClient("mongodb://172.30.240.1:27017")
                db = client["job_recommendation"]
                cv = db["cvs"].find_one({"_id": ObjectId(cv_id)})

                print(f"📌 [DEBUG] Données du CV récupérées : {cv}")

                if not cv:
                    print("⚠️ Le CV n'existe pas en base après l'insertion.")
                    return Response({"error": "Le CV n'a pas été trouvé en base."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

                # 🔥 Lancer le matching
                recommendations = match_cv_to_jobs(cv_id)

                print(f"📌 [DEBUG] Recommandations générées : {len(recommendations)}")
                os.remove(file_path)  # Supprimer le fichier après traitement
                return Response({
                    "message": "Fichier traité avec succès.",
                    "recommendations": recommendations
                }, status=status.HTTP_200_OK)

            except Exception as e:
                print(f"⚠️ Erreur lors du traitement du fichier : {e}")
                return Response({"error": "Erreur lors du traitement du fichier."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        except Exception as e:
            print(f"⚠️ Erreur lors de l'upload du fichier : {e}")
            return Response({"error": "Erreur lors de l'upload du fichier."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

