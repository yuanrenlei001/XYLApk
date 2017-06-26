/***********************消息start**********************/
Views.informationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'information',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    viewMessage:function(){
        Views.logisticsMessageView.show();
    }
})
/***********************消息end**********************/

/***********************物流消息start**********************/
Views.logisticsMessageView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'logisticsMessage',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);

    },

    didShow: function () {

    },

    goInMessage:function () {
        Views.viewLogisticsView.show();
    }
})
/***********************物流消息end**********************/