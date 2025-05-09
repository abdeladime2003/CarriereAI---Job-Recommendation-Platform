from rest_framework import serializers
from .models import Company
from django.contrib.auth.hashers import make_password
class CompanySignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = [
            'company_name',
            'industry',
            'email',
            'phone',
            'website',
            'address',
            'postal_code',
            'city',
            'employees_count',
            'contact_person',
            'password',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)
    def validate(self, data):
        if len(data['password']) < 8:
            raise serializers.ValidationError("Le mot de passe doit contenir au moins 8 caractères.")
        return data