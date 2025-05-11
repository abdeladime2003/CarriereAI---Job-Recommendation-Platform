from django.urls import path
from .views import PostJobOfferView , GetJobOffersView
urlpatterns = [
    path('add-job-offer-company/', PostJobOfferView.as_view(), name='add-job-offer-by-company'),
    path('get-job-offers_company/', GetJobOffersView.as_view(), name='get-job-offers-by-company')
]
