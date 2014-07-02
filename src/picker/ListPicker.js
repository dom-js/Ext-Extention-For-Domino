/**
 * @aside example pickers
 * A general picker class. {@link Ext.picker.Slot}s are used to organize multiple scrollable slots into a single picker. {@link #slots} is
 * the only necessary configuration.
 *
 * The {@link #slots} configuration with a few key values:
 *
 * - `name`: The name of the slot (will be the key when using {@link #getValues} in this {@link Ext.picker.Picker}).
 * - `title`: The title of this slot (if {@link #useTitles} is set to `true`).
 * - `data`/`store`: The data or store to use for this slot.
 *
 * Remember, {@link Ext.picker.Slot} class extends from {@link Ext.dataview.DataView}.
 *
 * ## Examples
 *
 *     @example miniphone preview
 *     var picker = Ext.create('Ext.Picker', {
 *         slots: [
 *             {
 *                 name : 'limit_speed',
 *                 title: 'Speed',
 *                 data : [
 *                     {text: '50 KB/s', value: 50},
 *                     {text: '100 KB/s', value: 100},
 *                     {text: '200 KB/s', value: 200},
 *                     {text: '300 KB/s', value: 300}
 *                 ]
 *             }
 *         ]
 *     });
 *     Ext.Viewport.add(picker);
 *     picker.show();
 *
 * You can also customize the top toolbar on the {@link Ext.picker.Picker} by changing the {@link #doneButton} and {@link #cancelButton} configurations:
 *
 *     @example miniphone preview
 *     var picker = Ext.create('Ext.Picker', {
 *         doneButton: 'I\'m done!',
 *         cancelButton: false,
 *         slots: [
 *             {
 *                 name : 'limit_speed',
 *                 title: 'Speed',
 *                 data : [
 *                     {text: '50 KB/s', value: 50},
 *                     {text: '100 KB/s', value: 100},
 *                     {text: '200 KB/s', value: 200},
 *                     {text: '300 KB/s', value: 300}
 *                 ]
 *             }
 *         ]
 *     });
 *     Ext.Viewport.add(picker);
 *     picker.show();
 *
 * Or by passing a custom {@link #toolbar} configuration:
 *
 *     @example miniphone preview
 *     var picker = Ext.create('Ext.Picker', {
 *         doneButton: false,
 *         cancelButton: false,
 *         toolbar: {
 *             ui: 'light',
 *             title: 'My Picker!'
 *         },
 *         slots: [
 *             {
 *                 name : 'limit_speed',
 *                 title: 'Speed',
 *                 data : [
 *                     {text: '50 KB/s', value: 50},
 *                     {text: '100 KB/s', value: 100},
 *                     {text: '200 KB/s', value: 200},
 *                     {text: '300 KB/s', value: 300}
 *                 ]
 *             }
 *         ]
 *     });
 *     Ext.Viewport.add(picker);
 *     picker.show();
 */
Ext.define('Domino.picker.ListPicker', {
    extend: 'Ext.Sheet',
    alias : 'widget.listpicker', 
    requires: ['Ext.dataview.List', 'Ext.TitleBar', 'Ext.data.Model'],

    isPicker: true,

    /**
     * @event pick
     * Fired when a slot has been picked
     * @param {Ext.Picker} this This Picker.
     * @param {Object} The values of this picker's slots, in `{name:'value'}` format.
     * @param {Ext.Picker.Slot} slot An instance of Ext.Picker.Slot that has been picked.
     */

    /**
     * @event change
     * Fired when the value of this picker has changed the Done button has been pressed.
     * @param {Ext.picker.Picker} this This Picker.
     * @param {Object} value The values of this picker's slots, in `{name:'value'}` format.
     */

    /**
     * @event cancel
     * Fired when the cancel button is tapped and the values are reverted back to
     * what they were.
     * @param {Ext.Picker} this This Picker.
     */

    config: {
        /**
         * @cfg
         * @inheritdoc
         */
        baseCls: Ext.baseCSSPrefix + 'listpicker',

        /**
         * @cfg {String/Mixed} doneButton
         * Can be either:
         *
         * - A {String} text to be used on the Done button.
         * - An {Object} as config for {@link Ext.Button}.
         * - `false` or `null` to hide it.
         * @accessor
         */
        doneButton: true,

        /**
         * @cfg {String/Mixed} cancelButton
         * Can be either:
         *
         * - A {String} text to be used on the Cancel button.
         * - An {Object} as config for {@link Ext.Button}.
         * - `false` or `null` to hide it.
         * @accessor
         */
        cancelButton: true,
        /**
         * @cfg {Boolean} useTitles
         * Generate a title header for each individual slot and use
         * the title configuration of the slot.
         * @accessor
         */
        useTitles: false,

        /**
         * @cfg {Array} slots
         * An array of slot configurations.
         *
         * - `name` {String} - Name of the slot
         * - `data` {Array} - An array of text/value pairs in the format `{text: 'myKey', value: 'myValue'}`
         * - `title` {String} - Title of the slot. This is used in conjunction with `useTitles: true`.
         *
         * @accessor
         */
       // slots: null,

        /**
         * @cfg {String/Number} value The value to initialize the picker with.
         * @accessor
         */
        value: null,

        /**
         * @cfg {Number} height
         * The height of the picker.
         * @accessor
         */
        height: "100%",

        /**
         * @cfg
         * @inheritdoc
         */
        layout: {
            type : 'hbox',
            align: 'stretch'
        },

        /**
         * @cfg
         * @hide
         */
        centered: false,

        /**
         * @cfg
         * @inheritdoc
         */
        left : 0,

        /**
         * @cfg
         * @inheritdoc
         */
        right: 0,

        /**
         * @cfg
         * @inheritdoc
         */
        bottom: 0,

        // @private
        defaultType: 'list',

        toolbarPosition: 'bottom',
        searchbarPosition: 'top',
        
        toolbar: {
            xtype: 'titlebar'
        },
        searchField:{
                        xtype: 'searchfield',
                        itemId: 'searchField',
                        label: ''
                    },

        searchButton: true,
        searchbar:{
            xtype: 'toolbar',
            layout: {
                    type: 'hbox',
                    pack: 'center'
                },
            items: [
                    
                ]
        },
        list:{
            xtype: "list",
            height:"100%",
            width:"100%",
            data:[
                {text:"第一条记录"},{text:"第二天记录"},{text:"第三条记录"}
            ]
        } 
    },/**
     * @private
     */
    applyToolbar: function(config) {
        if (config === true) {
            config = {};
        }

        Ext.applyIf(config, {
            docked: this.getToolbarPosition()
        });

        return Ext.factory(config, 'Ext.TitleBar', this.getToolbar());
    },

    /**
     * @private
     */
    updateToolbar: function(newToolbar, oldToolbar) {
        if (newToolbar) {
            this.add(newToolbar);
        }

        if (oldToolbar) {
            this.remove(oldToolbar);
        }
    }, 
    applyDoneButton: function(config) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                ui: 'action',
                align: 'right',
                text: '确定'
            });
        }

        return Ext.factory(config, 'Ext.Button', this.getDoneButton());
    },

    updateDoneButton: function(newDoneButton, oldDoneButton) {
        var toolbar = this.getToolbar();

        if (newDoneButton) {
            toolbar.add(newDoneButton);
            newDoneButton.on('tap', this.onDoneButtonTap, this);
        } else if (oldDoneButton) {
            toolbar.remove(oldDoneButton);
        }
    },
     /**
     * Updates the {@link #cancelButton} configuration. Will change it into a button when appropriate, or just update the text if needed.
     * @param {Object} config
     * @return {Object}
     */
    applyCancelButton: function(config) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'left',
                text: '取消'
            });
        }

        return Ext.factory(config, 'Ext.Button', this.getCancelButton());
    },

    updateCancelButton: function(newCancelButton, oldCancelButton) {
        var toolbar = this.getToolbar();

        if (newCancelButton) {
            toolbar.add(newCancelButton);
            newCancelButton.on('tap', this.onCancelButtonTap, this);
        } else if (oldCancelButton) {
            toolbar.remove(oldCancelButton);
        }
    },
    /**
     * @private
     */
    applySearchbar: function(config) {
        if (config === true) {
            config = {};
        }

        Ext.applyIf(config, {
            docked: this.getSearchbarPosition()
        });

        return Ext.factory(config, 'Ext.Toolbar', this.getSearchbar());
    },

    /**
     * @private
     */
    updateSearchbar: function(newToolbar, oldToolbar) {
        if (newToolbar) {
            this.add(newToolbar);
        }

        if (oldToolbar) {
            this.remove(oldToolbar);
        }
    }, 
      applySearchField: function(config) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                
            }

            Ext.applyIf(config, { 
            });
        }

        return Ext.factory(config, 'Ext.field.Search', this.getSearchField());
    },

    updateSearchField: function(newField, oldField) {
        var toolbar = this.getSearchbar();

        if (newField) {
            toolbar.add(newField);
            newField.on('keyup', this.onSearchFieldKeyUp, this);
            newField.on('clearicontap', this.onSearchFieldClear, this);
        } else if (oldField) {
            toolbar.remove(oldField);
        }
    }, applySearchButton: function(config) {
        if (config) {
            if (Ext.isBoolean(config)) {
                config = {};
            }

            if (typeof config == "string") {
                config = {
                    text: config
                };
            }

            Ext.applyIf(config, {
                align: 'left',
                text: '',
                iconCls:"search"
            });
        }

        return Ext.factory(config, 'Ext.Button', this.getSearchButton());
    },

    updateSearchButton: function(newSearchButton, oldSearchButton) {
        var toolbar = this.getSearchbar();

        if (newSearchButton) {
            toolbar.add(newSearchButton);
            newSearchButton.on('tap', this.onSearchButtonTap, this);
        } else if (oldSearchButton) {
            toolbar.remove(oldSearchButton);
        }
    },
    /**
     * @private
     */
    applyList: function(config) {
        if (config === true) {
            config = {
                height:"100%"
            };
        } 
        var list =  Ext.factory(config, 'Ext.dataview.List', this.getList())
        this.add( list);
        return list;
    },

    /**
     * @private
     */
    updateList: function(newList, oldList) {
        if (newList) {
            this.add(newList);
        }

        if (oldList) {
            this.remove(oldList);
        }
    },
    destroy: function() {
        this.callParent();
        //Ext.destroy(this.mask, this.bar);
    },
    onSearchFieldKeyUp:function(field){
        //console.log(arguments) 
    },
    onSearchButtonTap:function(){ 
          
    },
    onSearchFieldClear:function(){
    },
    onDoneButtonTap:function(){ 

        var list = this.getList();
        var selection = list.getSelection( );
        console.log()
        this.fireEvent("selected",selection)
    },
    onCancelButtonTap:function(){
       this.hide();
    }
}, function() {
    //<deprecated product=touch since=2.0>
    /**
     * @member Ext.picker.Picker
     * @cfg {String} activeCls
     * CSS class to be applied to individual list items when they have been chosen.
     * @removed 2.0.0
     */
    Ext.deprecateProperty(this, 'activeCls', null, "Domino.picker.ListPicker.activeCls has been removed");

    /**
     * @method getCard
     * @inheritdoc Ext.picker.Picker#getActiveItem
     * @deprecated 2.0.0 Please use {@link #getActiveItem} instead
     */
    Ext.deprecateClassMethod(this, 'getCard', 'getActiveItem');

    /**
     * @method setCard
     * @inheritdoc Ext.picker.Picker#setActiveItem
     * @deprecated 2.0.0 Please use {@link #setActiveItem} instead
     */
    Ext.deprecateClassMethod(this, 'setCard', 'setActiveItem');
    //</deprecated>
});

