from setuptools import find_packages, setup

# read the contents of your README file
from pathlib import Path

from netbox_ipcalculator.pluginvars import (
    __version__,
    __name__,
    __description__,
    __author__,
    __author_email__,
    __url__,
)

long_description = __description__
with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name=__name__,
    version=__version__,
    description=__description__,
    long_description=long_description,
    long_description_content_type="text/markdown",
    url=__url__,
    author=__author__,
    license='Apache 2.0',
    install_requires=[],
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
)
