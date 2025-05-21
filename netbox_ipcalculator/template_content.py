from netbox.settings import VERSION
nb_version_split = VERSION.split(".")
nb_version = (int(nb_version_split[0])*100 + int(nb_version_split[1]))*100 + int(nb_version_split[2])

if nb_version < 40000:
    from extras.plugins import PluginTemplateExtension
else:
    from netbox.plugins import PluginTemplateExtension

import json

if nb_version >= 40300:
    class IPCalc(PluginTemplateExtension):
        models = ['ipam.aggregate', 'ipam.prefix', 'ipam.ipaddress']

        def right_page(self):
            output=self.render('netbox_ipcalculator/core/ipcalc.html', extra_context={
                'prefix': self.context["object"]
            })        
            return output

    template_extensions = [IPCalc]

else:
    # For NetBox < 4.3
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
