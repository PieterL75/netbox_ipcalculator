# IP Calculator

Adds an IP Calculator to the views of
- Aggregate
- Prefix
- Ip Address

![IP Calculator image](docs/images/IPCalculator.png)

## Installation
Update the /opt/netbox/local_requirements.txt with

> netbox-ipcalculator

Edit the /opt/netbox/netbox/netbox/ and add the plugin
> PLUGINS = ['netbox_ipcalculator']

run the ./upgrade.sh 
> /opt/netbox# ./upgrade.sh

restart nextbox
> sudo systemctl restart netbox
