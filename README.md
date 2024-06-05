# IP Calculator

Adds an IP Calculator to the views of
- Aggregate
- Prefix
- IP Address

![IP Calculator image](docs/images/IPCalculator.v1.4.png)

Adds the ability to visualize and share the subnetting of a prefix into smaller subnets

![IP Calculator Subnet divider image](docs/images/IPCalculator.subnetdivider.png)


## Installation

| IPCalculater Version | NetBox version | Remarks |
| --- | --- | --- |
| v0.0-1.3 | Netbox <=3.7 | |
| v1.4.x | Netbox >=3.7 | compatible with v3 and v4 |

Update the /opt/netbox/local_requirements.txt with **(referenced with a dash)**

> netbox-ipcalculator

Edit the /opt/netbox/netbox/netbox/configuration.py and add the plugin **(referenced with an underscore)**
> PLUGINS = ['netbox_ipcalculator']

Install the plugin 
> /opt/netbox/venv/bin/python3 -m pip install netbox-ipcalculator

or run the ./upgrade.sh script (takes longer, but assures it will work after upgrades)
> cd /opt/netbox
> ./upgrade.sh



restart nextbox
> sudo systemctl restart netbox


---
<sub><sub>Thanks to DavidC for the idea and the javascript code of the Prefix join/split https://github.com/davidc/subnets </sub></sub>