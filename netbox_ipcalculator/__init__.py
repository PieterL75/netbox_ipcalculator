from netbox.settings import VERSION # type: ignore
if VERSION.startswith("3."):
    from extras.plugins import PluginConfig # type: ignore
else:
    from netbox.plugins import PluginConfig # type: ignore

__name__ = 'netbox_ipcalculator'
__verbose_name__ = 'IP Calculator'
__version__ = '1.4.5'
__base_url__ = 'netbox_ipcalculator'
__description__ = 'Netbox IP Calculator and Subnet Splitter'
__author__ = 'Pieter Lambrecht'
__author_email__ = 'pieter.lambrecht@gmail.com'
__url__ = 'https://github.com/PieterL75/netbox_ipcalculator'

class IPCalcultorConfig(PluginConfig):
    name = __name__
    verbose_name = __verbose_name__
    version = __version__
    description = __description__
    author = __author__
    author_email = __author_email__
    base_url = __base_url__
    min_version = '3.0'
    required_settings = []
    default_settings = {
        'loud': False
    }
    caching_config = {
        '*': None
    }

config = IPCalcultorConfig
