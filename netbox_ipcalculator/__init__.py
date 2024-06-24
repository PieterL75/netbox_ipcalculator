from netbox.settings import VERSION # type: ignore
if VERSION.startswith("3."):
    from extras.plugins import PluginConfig # type: ignore
else:
    from netbox.plugins import PluginConfig # type: ignore

from .pluginvars import (
    __version__,
    __name__,
    __verbose_name__,
    __base_url__,
    __description__,
    __author__,
    __author_email__,
    __url__,
)
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
