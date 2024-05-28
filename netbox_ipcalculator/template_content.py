from netbox.settings import VERSION
if VERSION.startswith("3."):
    from extras.plugins import PluginTemplateExtension
else:
    from netbox.plugins import PluginTemplateExtension
import json

class IPCalcAggregate(PluginTemplateExtension):
    model = 'ipam.aggregate'

    def right_page(self):
        output=self.render('netbox_ipcalculator/core/ipcalc.html', extra_context={
            'prefix': self.context["object"]
        })        
        return output

class IPCalcPrefix(PluginTemplateExtension):
    model = 'ipam.prefix'

    def right_page(self):
        output=self.render('netbox_ipcalculator/core/ipcalc.html', extra_context={
            'prefix': self.context["object"]
        })        
        return output

class IPCalcIPAddress(PluginTemplateExtension):
    model = 'ipam.ipaddress'

    def right_page(self):
        output=self.render('netbox_ipcalculator/core/ipcalc.html', extra_context={
            'prefix': self.context["object"]
        })        
        return output

template_extensions = [IPCalcAggregate,IPCalcPrefix,IPCalcIPAddress]
