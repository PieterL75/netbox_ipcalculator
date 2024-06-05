from netbox.settings import VERSION # type: ignore
if VERSION.startswith("3."):
    from extras.plugins import PluginConfig # type: ignore
else:
    from netbox.plugins import PluginConfig # type: ignore

class IPCalcultorConfig(PluginConfig):
    name = 'netbox_ipcalculator'
    verbose_name = 'IP Calculator'
    description = 'Netbox IP Calculator'
    version = '1.4.3'
    author = 'Pieter Lambrecht'
    author_email = 'pieter.lambrecht@gmail.com'
    base_url = 'netbox_ipcalculator'
    min_version = '3.0'
    required_settings = []
    default_settings = {
        'loud': False
    }
    caching_config = {
        '*': None
    }

config = IPCalcultorConfig
