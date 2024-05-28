from netbox.settings import VERSION
if VERSION.startswith("3."):
    from extras.plugins import PluginConfig
else:
    from netbox.plugins import PluginConfig

class IPCalcultorConfig(PluginConfig):
    name = 'netbox_ipcalculator'
    verbose_name = 'IP Calculator'
    description = 'Netbox IP Calculator'
    version = '1.4.1'
    author = 'Pieter Lambrecht'
    author_email = 'pieter.lambrecht@gmail.com'
    base_url = 'pieterl75_ipcalc'
    min_version = '3.0'
    required_settings = []
    default_settings = {
        'loud': False
    }
    caching_config = {
        '*': None
    }

config = IPCalcultorConfig
