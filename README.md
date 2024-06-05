# IP Calculator

Adds an IP Calculator to the views of
- Aggregate
- Prefix
- Ip Address

![IP Calculator image](docs/images/IPCalculator.png)

Adds the ability to visualize the subnetting of a prefix into smaller subnets

![IP Calculator Subnet divider image](docs/images/IPCalculator.subnetdivider.png)


## Installation

| v0.0-1.3 ! Netbox <=3.7 |
| v1.4.x | Netbox >=3.7 | compatible with v3 and v4

Update the /opt/netbox/local_requirements.txt with **(referenced with a dash)**

> netbox-ipcalculator

Edit the /opt/netbox/netbox/netbox/configuration.py and add the plugin **(referenced with an underscore)**
> PLUGINS = ['netbox_ipcalculator']

run the ./upgrade.sh 
> /opt/netbox# ./upgrade.sh

restart nextbox
> sudo systemctl restart netbox

