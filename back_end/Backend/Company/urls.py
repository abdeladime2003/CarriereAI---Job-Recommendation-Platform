from django.urls import path
from .views import CompanySignupView , CompanySigninView
urlpatterns = [
    path('Signup/' , CompanySignupView.as_view(), name='Signup'),
    path('Signin/' , CompanySigninView.as_view(), name='Signin')
]
