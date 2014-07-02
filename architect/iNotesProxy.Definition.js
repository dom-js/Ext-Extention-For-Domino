{
   
    "className": "Domino.data.proxy.iNotes",
    "classAlias": "proxy.inotes",
    "inherits": "Ext.data.proxy.JsonP",
    "autoName": "iNotes Proxy",
    "helpText": "Domino iNotes Proxy",
    "noSetup": true,
    
    "toolbox": {
            "name": "iNotes Proxy",
            "category": "Data Proxies",
            "groups": ["Data"]
        }, 
    "configs": [{
            "name":"host",
            "type":"string"
        },
        {
            "name":"db",
            "type":"string"
        },
        {
            "name":"view",
            "type":"string"
        },
        {
            "name":"form",
            "type":"string",
            "initialValue":"s_JSONPViewList" 
        }
    ] 
}