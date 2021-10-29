from django.urls import path
from . import views

urlpatterns = [
    path('ipcalc/', views.IPCalculatorView.as_view(), name='ipcalculator'),
]