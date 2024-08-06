from setuptools import find_packages, setup
import json
from pathlib import Path
here = Path(__file__).parent.resolve()

pluginvars={}

with open(f"{here}/netbox_ipcalculator/pluginvars.json", "r") as pluginvarsfile:
    pluginvars = json.load(pluginvarsfile)
    for pluginvar in pluginvars:
        locals()[f"{pluginvar}"]=pluginvars[pluginvar]

long_description = ''
with open(f"{here}/README.md", "r") as fh:
    long_description = fh.read()

setup(
    name = __name__,
    version = __version__,
    description = __description__,
    long_description = long_description,
    long_description_content_type = "text/markdown",
    url = __url__,
    author = __author__,
    license='Apache 2.0',
    install_requires=[],
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
)
