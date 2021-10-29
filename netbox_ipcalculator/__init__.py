from extras.plugins import PluginConfig

class IPCalcultorConfig(PluginConfig):
    name = 'netbox_ipcalculator'
    verbose_name = 'IP Calculator'
    description = 'Sentia Netbox IP Calculator'
    version = '1.0'
    author = 'Pieter Lambrecht'
    author_email = 'pieter.lambrecht@sentia.com'
    base_url = 'sentia'
    required_settings = []
    default_settings = {
        'loud': False
    }
    caching_config = {
        '*': None
    }

config = IPCalcultorConfig
