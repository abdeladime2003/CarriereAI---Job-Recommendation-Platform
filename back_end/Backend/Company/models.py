from django.db import models

class Company(models.Model):
    # Fields for company information
    company_name = models.CharField(max_length=255, unique=True)
    industry = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    phone = models.CharField(max_length=20)
    website = models.URLField(max_length=255)
    address = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=20)
    city = models.CharField(max_length=255)
    
    # Employee range choices
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
    password = models.CharField(max_length=255)
    
    # String representation of the compan
    def __str__(self):
        return self.company_name
