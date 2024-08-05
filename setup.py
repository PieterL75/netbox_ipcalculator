from setuptools import find_packages, setup
import codecs
import os.path

# read the contents of your README file
from pathlib import Path

def read(rel_path):
    here = os.path.abspath(os.path.dirname(__file__))
    with codecs.open(os.path.join(here, rel_path), 'r') as fp:
        return fp.read()

pluginvars={}

for line in read('netbox_ipcalculator/pluginvars.py').splitlines():
    if line.startswith('__'):
        _delim = '"' if '"' in line else "'"
        _data=line.split(_delim)
        pluginvars[_data[0]]=_data[1]

long_description = getattr(pluginvars, '__description__', '')
with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name=getattr(pluginvars,'__name__',''),
    version=getattr(pluginvars,'__version__',''),
    description=getattr(pluginvars,'__description__',''),
    long_description=long_description,
    long_description_content_type="text/markdown",
    url=getattr(pluginvars,'__url__',''),
    author=getattr(pluginvars,'__author__',''),
    license='Apache 2.0',
    install_requires=[],
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
)
