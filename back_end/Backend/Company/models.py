from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager , Group, Permission
from django.db import models

class CompanyManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("L'adresse email est obligatoire")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)

class Company(AbstractBaseUser, PermissionsMixin):
    groups = models.ManyToManyField(
        Group,
        related_name='company_groups',
        blank=True,
        help_text='The groups this company belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='company_permissions',
        blank=True,
        help_text='Specific permissions for this company.',
        verbose_name='user permissions',
    )
    company_name = models.CharField(max_length=255, unique=True)
    industry = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=20)
    website = models.URLField(max_length=255)
    address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)
    city = models.CharField(max_length=255)
    EMPLOYEE_RANGES = [
        ("1-10 employés", "1-10 employés"),
        ("11-50 employés", "11-50 employés"),
        ("51-200 employés", "51-200 employés"),
        ("201-500 employés", "201-500 employés"),
        ("501-1000 employés", "501-1000 employés"),
        ("1000+ employés", "1000+ employés"),
    ]
    employees_count = models.CharField(max_length=30, choices=EMPLOYEE_RANGES)

    contact_person = models.CharField(max_length=255)
    
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['company_name']
    objects = CompanyManager()
    def __str__(self):
        return self.company_name
