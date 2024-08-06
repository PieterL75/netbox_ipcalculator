from netbox.settings import VERSION # type: ignore
if VERSION.startswith("3."):
    from extras.plugins import PluginConfig # type: ignore
else:
    from netbox.plugins import PluginConfig # type: ignore

import json
from pathlib import Path
here = Path(__file__).parent.resolve()
with open(f"{here}/pluginvars.json", "r") as pluginvarsfile:
    pluginvars = json.load(pluginvarsfile)
    for pluginvar in pluginvars:
        locals()[f"{pluginvar}"]=pluginvars[pluginvar]

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
