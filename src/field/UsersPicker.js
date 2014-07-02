Ext.define('Domino.field.UsersPicker', {
    extend: 'Ext.field.Select', 
    xtype: 'usersfield',
    requires: [
     //   'Domino.picker.UsersSelect' 
    ],
     config: {
        /**
         * @cfg
         * @inheritdoc
         */
        xtype: 'usersfield',
        ui: 'select',
        clearIcon: false,
    }
    //<deprecated product=touch since=2.0>
}, function() {
    
});
