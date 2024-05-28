from netbox.settings import VERSION
if VERSION.startswith("3."):
    from extras.plugins import PluginMenuItem
else:
    from netbox.plugins import PluginMenuItem

menu_items = (
    PluginMenuItem(
        link='plugins:netbox_ipcalculator:ipcalculator',
        link_text='IP Calculator',
    ),
)
