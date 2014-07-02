 
Ext.define('Domino.picker.UsersPicker', {
    extend: 'Domino.picker.ListPicker',
    alias : 'widget.userspicker', 
    requires: ['Ext.data.Store','Ext.data.proxy.SessionStorage'], 


    config: {
        /**
         * @cfg
         * @inheritdoc
         */ 
         host:window.location.host,
         list:{
            data:[ 
                {shortName:"----",name:"",unid:""}
            ],
            itemTpl:"<div>{shortName} {name}</div>"
         },
         remoteStore:null
    }, 
    initialize: function() {
      
        var model =   Ext.define('Ext.data.Store.ImplicitModel-' + (Ext.id()), {
                    extend: 'Ext.data.Model',

                    config: {
                       idProperty: 'name',
                       fields: [
                            {
                                name: 'name',
                                type: 'string'
                            },
                            {
                                name: 'shortName',
                                sortDir: 'DESC',
                                type: 'string'
                            },
                            {
                                allowNull: false,
                                name: 'unid',
                                type: 'auto'
                            }
                        ]
                    }, 

                    destroy: function() {
                        this.callParent(arguments);

                        this.stores=[];
                    }

        });
        var localStore = this.cacheStore = Ext.create("Ext.data.Store",{
            autoLoad: true,  
            pageSize: 1000,
            model:model,
            remoteFilter: true, 
            proxy: {
                type: 'sessionstorage',
                id: 'com.hik.tools.names'
            }
        })
        var remoteStore = this.remoteStore = Ext.create("Ext.data.Store",{
          autoLoad:false,
          model:model,
          proxy:{
              type:"inotes",
              host:this.getHost(),
              reader:{
                  type:"inames",
                  rootProperty:"data"
              }
          }
        });
       // localStore.setModel(model);
        var list = this.getList();//store = list.getStore();
        list.setStore(localStore);
       // store.setModel(model);
       // console.log(store);
    },
    // applyHost: function(host) {
    //      var list = this.getList(),store = list.getStore();
    //      if(!store){
    //         store = Ext.create("Ext.data.Store")
    //     }
    //     var proxy = Ext.create("Domino.data.proxy.iNotes",{
    //         host:host,
    //         reader: {
    //             type: 'inames',
    //             rootProperty: 'data'
    //         }
    //     })
    //     store.setProxy(proxy);
    //     return host;
    //     //return Ext.factory(config, 'Ext.TitleBar', this.getToolbar());
    // },
    // updateHost: function(newHost) {
    //      if(!newHost)return ; 
    //      var list = this.getList(),store = list.getStore(),proxy=store.getProxy();
    //      proxy.set("host",newHost)   
    // }, 
    onSearchFieldKeyUp:function(field,e){
       if(e.event.keyCode==13){
            this.onSearchButtonTap()
       }
    },
    onSearchButtonTap:function(){ 
        var store = this.cacheStore;
        value = this.getSearchField().getValue();
       
        store.clearFilter();
        if (value.length <1) {
            return;
        }else{ 
          store.clearFilter();
          var reg = new RegExp("^"+value,"i"); 
          store.filterBy(function(item){
            var ret = reg.test(item.get("shortName"))||reg.test(item.get("name")); 
            return ret;
          }); 
        } 
        if(!store.isLoading( ))
            store.load({
                callback: function(records, operation, success) {
                    //console.log(records)
                    if(records.length<10)this.remoteSearch(value);
                },
                scope: this
        });

       
          // console.log(arguments) 
    },
    remoteSearch:function(value){
        var remoteStore = this.remoteStore, store = this.cacheStore;
        if(!remoteStore.isLoading( ))
        remoteStore.load({
              params:{
                names:value
              },
              callback:function(records){

                  for(var i in records){
                        var rc = records[i]; 
                        if(!store.getById(rc.getId())){
                           //   rc.setDirty( );
                            rc.phantom=true;

                            var re = store.add(rc); 
                        }
                    }
                  store.sync();
            }
        });
    }

}, function() {
     
    //</deprecated>
});

