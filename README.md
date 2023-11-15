# IP Calculator

Adds an IP Calculator to the views of
- Aggregate
- Prefix
- Ip Address

![IP Calculator image](docs/images/IPCalculator.png)

## Installation
Update the /opt/netbox/local_requirements.txt with **(NB! dash)**

> netbox-ipcalculator  

Edit the /opt/netbox/netbox/netbox/configuration.py and add the plugin **(NB underscore)**
> PLUGINS = ['netbox_ipcalculator']

run the ./upgrade.sh 
> /opt/netbox# ./upgrade.sh

restart nextbox
> sudo systemctl restart netbox
