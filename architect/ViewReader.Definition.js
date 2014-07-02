{
   
    "className": "Domino.data.reader.ViewReader",
    "classAlias": "reader.readerview",
    "inherits": "Ext.data.reader.Json",
    "autoName": "Notes View Reader",
    "helpText": "Domino Notes ReaderViewEntries",
    "noSetup": true,
    
    "toolbox": {
        "name": "View Reader",
        "category": "Data Readers",
        "groups": ["Data"]
    },

    "configs": [{
        "name":"rootProperty",
        "type":"string",
        "initialValue":"data"
    }] 
}