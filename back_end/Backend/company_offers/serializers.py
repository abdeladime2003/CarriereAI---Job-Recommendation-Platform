from rest_framework import serializers
from django.utils import timezone

class LanguageSerializer(serializers.Serializer):
    language = serializers.CharField(required=False, allow_blank=True)
    level = serializers.CharField(required=False, allow_blank=True)

class FiltersSerializer(serializers.Serializer):
    hideNoDegree = serializers.BooleanField(default=False)
    autoSort = serializers.BooleanField(default=False)

class JobOfferSerializer(serializers.Serializer):
    companyId = serializers.CharField(required=False, allow_blank=True)
    companyName = serializers.CharField(required=False, allow_blank=True)
    title = serializers.CharField(required=False, allow_blank=True)
    location = serializers.CharField(required=False, allow_blank=True)
    locationType = serializers.ChoiceField(
        choices=["office", "remote", "hybrid"],
        required=False,
        default="office"
    )
    contractType = serializers.CharField(required=False, allow_blank=True)
    salary = serializers.CharField(required=False, allow_blank=True)
    description = serializers.CharField(required=False, allow_blank=True)
    responsibilities = serializers.ListField(
        child=serializers.CharField(allow_blank=True),
        required=False,
        default=list
    )
    experience = serializers.CharField(required=False, allow_blank=True)
    skills = serializers.ListField(
        child=serializers.CharField(allow_blank=True),
        required=False,
        default=list
    )
    languages = LanguageSerializer(many=True, required=False, default=list)
    education = serializers.CharField(required=False, allow_blank=True)
    softSkills = serializers.ListField(
        child=serializers.CharField(allow_blank=True),
        required=False,
        default=list
    )
    filters = FiltersSerializer(required=False, default=dict)
    duration = serializers.CharField(required=False, default="30")
    boost = serializers.BooleanField(required=False, default=False)
    confidential = serializers.BooleanField(required=False, default=False)
    CreatedAt = serializers.DateTimeField(required=False, default=timezone.now)
    Limited_date = serializers.DateTimeField(required=False)
