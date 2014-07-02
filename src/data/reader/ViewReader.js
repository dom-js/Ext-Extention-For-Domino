/**
 * ViewJson Reader 是一个读取domino视图（readviewentries）的对象，用于解析Domino视图返回信息，格式化为Store对象可立即对结构
 * The JSON Reader is used by a Proxy to read a server response that is sent back in JSON format. This usually happens
 * as a result of loading a Store - for example we might create something like this:
 *
 *     Ext.define('User', {
 *         extend: 'Ext.data.Model',
 *         config: {
 *             fields: ['id', 'name', 'email']
 *         }
 *     });
 *
 *     var store = Ext.create('Ext.data.Store', {
 *         model: 'User',
 *         proxy: {
 *             type: 'ajax',
 *             url : 'users.json',
 *             reader: {
 *                 type: 'json'
 *             }
 *         }
 *     });
 *
 * The example above creates a 'User' model. Models are explained in the {@link Ext.data.Model Model} docs if you're not
 * already familiar with them.
 *
 * We created the simplest type of JSON Reader possible by simply telling our {@link Ext.data.Store Store}'s {@link
 * Ext.data.proxy.Proxy Proxy} that we want a JSON Reader. The Store automatically passes the configured model to the
 * Store, so it is as if we passed this instead:
 *
 *     reader: {
 *         type : 'json',
 *         model: 'User'
 *     }
 */
Ext.define('Domino.data.reader.ViewJson', {
    extend: 'Ext.data.reader.Json', 
    alias : 'reader.readerview',   

    // @inheritdoc
    config:{
        rootProperty:"data"
    },
    getResponseData: function(response) {       
          return this.transferData(this.callParent(arguments));       
    },
    transferData:function(obj){
      
        if(!obj.viewentry){
            return {
                total:0,
                data:[]
            }
        }
        var getVal = function(obj){
            var typelist={
                "textlist":"text",
                "text":"text",
                "datetimelist":"datetime",
                "datetime":"datetime",
                "numberlist":"number",
                "number":"number"
            }
            for(var k in typelist){
                if(!obj[k]) continue;
                if(k==typelist[k]){
                    v = obj[k]["0"];
                }else{
                     v =[];
                    for(var _t in obj[k][typelist[k]]){
                        v.push(obj[k][typelist[k]][_t]["0"])
                    }
                }
                break;
            }
            return v;
        }
       
       var data=[], total = obj["@toplevelentries"] ;
        for(var i in obj.viewentry) { 
                 var _item = obj.viewentry[i];
                                
                                var item = {
                                    unid:_item["@unid"],
                                    siblings:_item["@siblings"],
                                    noteid:_item["@noteid"],
                                    position:_item["@position"]
                                };
                                var _data = [];
                                for(var n in _item.entrydata){
                                    var _obj = _item.entrydata[n];
                                    var _n = _obj["@name"];
                           
                                    var v = getVal(_obj);
                                    
                                    _data.push(v);
                                    item[_n] = v;
                                }
                                data.push(item);  
                 
            }   
         return {
                total:total,
                data:data
            } ;
    }
});
