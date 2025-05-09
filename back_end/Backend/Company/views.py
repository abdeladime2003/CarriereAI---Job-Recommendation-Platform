from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CompanySignupSerializer
from .models import Company
from django.contrib.auth.hashers import check_password
class CompanySignupView(APIView):
    def post(self, request):
        serializer = CompanySignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Entreprise inscrite avec succès."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
#                 }, status=status.HTTP_200_OK
class CompanySigninView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            company = Company.objects.get(email=email)
            if check_password(password, company.password):
                return Response({"message": "Connexion réussie", "company_id": company.id})
            else:
                return Response({"error": "Mot de passe incorrect"}, status=status.HTTP_401_UNAUTHORIZED)
        except Company.DoesNotExist:
            return Response({"error": "Entreprise non trouvée"}, status=status.HTTP_404_NOT_FOUND)