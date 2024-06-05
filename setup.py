from setuptools import find_packages, setup

# read the contents of your README file
from pathlib import Path
this_directory = Path(__file__).parent
long_description = (this_directory / "README.md").read_text()

setup(
    name='netbox_ipcalculator',
    version='1.4.2',
    description='Netbox IP Calculator',
    long_description=long_description,
    long_description_content_type='text/markdown',
    url='https://github.com/PieterL75/netbox_ipcalculator',
    author='Pieter Lambrecht',
    license='Apache 2.0',
    install_requires=[],
    packages=find_packages(),
    include_package_data=True,
    zip_safe=False,
)
