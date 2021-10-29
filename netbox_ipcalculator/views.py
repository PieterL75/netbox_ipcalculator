from django.shortcuts import render
from django.views.generic import View

class IPCalculatorView(View):

    def get(self, request):
        return render(request, 'netbox_ipcalculator/ipcalcbase.html', {
        })