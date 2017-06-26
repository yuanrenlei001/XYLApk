/**
 * Created by Administrator on 2017/5/19 0019.
 */

/***********************我的start**********************/
Views.indexMineView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'indexMine',
        hasFootNav: true,
        footItemOrder: 1, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {



        addEventListener();

        // 用户头像 余额
        var url  = WEB_URL + "/api/core/selectLoginUser";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    if (data.codeEnum == 'OVERTIME') {
                        Views.signInView.show();
                    }else{
                        alert(data.msg);
                    }

                }else{
                        var _self = data.data;
                        // console.log(_self);
                        var headImg             = _self.headImg; //用户头像
                        var nickName            = _self.nickName; //用户昵称
                        var availableIncome     = _self.availableIncome; //用户余额
                        var integral            = _self.integral; //用户金豆
                        dataSave('crade',_self.crade);

                        $('#pic').html(headImg == null?'<img src="images/mine/head.png" >':'<img src="'+headImg+'" style="height:55px;">');
                        $('.name').html(nickName);
                        $('.balance .oNumber').html('￥'+(availableIncome == null?0:availableIncome));
                        $('.Imazamox .oNumber').html('￥'+(integral == null?0:integral));
                    }
                }
        });
        // 用户收藏
        var urlone  = WEB_URL + "/api/coreCollection/selectNo";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlone,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    if (data.codeEnum == 'OVERTIME') {
                        Views.signInView.show();
                    }else{
                        alert(data.msg);
                    }
                }else{
                    var _self = data.data;
                    var goods       = _self.goods; //收藏的商品数量
                    var store       = _self.store; //收藏的店铺数量
                    $('#chanp').html(goods == null?0:goods);
                    $('#dianp').html(store == null?0:store);

                }
            }
        });
        // 用户订单
        var urltwo  = WEB_URL + "/api/userOrderNo/selectList";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urltwo,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    if (data.codeEnum == 'OVERTIME') {
                        Views.signInView.show();
                    }else{
                        alert(data.msg);
                    }
                }else{
                    var _self = data.data;
                    if(_self == null){
                        $('.waitPay').html('');
                        $('.waitDelivery').html('');
                        $('.waitReceipt').html('');
                        $('.waitEvaluate').html('');
                        $('.service').html('');
                    }else{
                        var payNumber       = _self.payNumber; //代付款
                        var shipNumber       = _self.shipNumber; //待发货
                        var recvNumber       = _self.recvNumber; //待收货
                        var evalNumber       = _self.evalNumber; //待评价
                        var refundNumber       = _self.refundNumber; //退货
                        $('.waitPay').html(payNumber == 0?'':'<div class="number">'+payNumber+'</div>');
                        $('.waitDelivery').html(shipNumber == 0?'':'<div class="number">'+shipNumber+'</div>');
                        $('.waitReceipt').html(recvNumber == 0?'':'<div class="number">'+recvNumber+'</div>');
                        $('.waitEvaluate').html(evalNumber == 0?'':'<div class="number">'+evalNumber+'</div>');
                        $('.service').html(refundNumber == 0?'':'<div class="number">'+refundNumber+'</div>');
                    }
                }
            }
        });


        $('#fenxiang').click(function(){
            $('.masks').show();
            $('html').css({'overflow':'hidden','height':'100%'});
            $('body').css({'overflow':'hidden','height':'100%'});
            $('.mallShare').show();
        });
        $('.mallShare_btn').click(function(e){
            $('#shareShow').animate({
                bottom:0
            });
            $(document).click(function(){
                $('#shareShow').animate({
                    bottom:'-296px'
                });
            });
            e.stopPropagation();
        });
    },
    goInSetUp:function(){
        Views.setUpView.show();
    },

    goInPersonal:function(){
        Views.personalCenterView.show();
    },

    goInSuperior:function(){
        Views.mySuperiorView.show();
    },

    goInWallet:function(){
        Views.myWalletView.show();
    },

    goInImazamox:function(){
        Views.myImazamoxView.show();
    },

    goInShoppingCart:function(){
        Views.shoppingCartView.show();
    },

    goInOrder:function(){
        Views.myOrderView.show();
    },

    goInRefund:function(){
        Views.salePageView.show();
    },

    goInPersonalStore:function(){
        Views.personalStoreView.show();
    },

    goInDistribution:function(){
        Views.storeDistributionView.show();
    },

    recharge:function(){
        Views.voucherCenterView.show();
    },
    recharges:function(){
        Views.dpsfView.show();
    },

    goInService:function(){
        Views.customerServiceView.show();
    },

    goInMyBill:function(){
        Views.myBillView.show();
    },

    mine_index:function(){
        Views.indexView.show();
    },

    goInMy:function(){
        Views.myDonationView.show();
    },
    // 查看物流
    ckwl:function(){
        Views.viewLogisticsView.show();
    },

    // 我的收藏
    coll:function(){
        Views.myCollectionView.show();
    }

})
/***********************我的end**********************/


/***********************设置start**********************/
Views.setUpView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'setUp',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);

    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
        // var data = {};
        ajaxTool("post",null,url,
            function error(XMLHttpRequest, textStatus, errorThrown,fnErr){
                alert("error:请求失败");
            },
            function success(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    $('#mobile').html(data.data.mobile);
                }
            },true,true
        );
    },
    login_out:function(){
        dataSave('isNotLogin', "true");
        dataSave('user_id', '');
        dataSave('user_name', '');
        dataSave('user_password', '');
        dataSave('user_token', '');

        var urlOne = WEB_URL + '/api/core/logout';//退出
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlOne,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                }
            }
        });

        Views.indexView.show();
    },
    goInAccountSecurity:function(){
        Views.accountSecurityView.show();
    },

    goInPaymentSet:function(){
        Views.paymentSettingsView.show();
    },

    goInPasswordSet:function(){
        Views.passwordResetView.show();
    },

    goInNews:function(){
        Views.messageNotificationView.show();
    },

    goInPrivacy:function(){
        Views.privacyView.show();
    },

    goInGeneral:function(){
        Views.generalView.show();
    },

    goInAbout:function(){
        Views.aboutTView.show();
    }

})
/***********************设置end**********************/

/***********************支付设置start**********************/
Views.paymentSettingsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'paymentSettings',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $(document).ready(function(){
            $('.defray').click(function(){
                $('.defray').removeClass('change');
                $(this).addClass('change');
                $('.defray').find('div').removeClass('warp_Lt').addClass('warp_Rg');
                $(this).find('div').removeClass('warp_Rg').addClass('warp_Lt');
                var data ={payPriorityConf:$('#defray').val($(this).data('side'))} ;

                var urltwo  = WEB_URL + "/api/coreUser/payPriorityConf";
                $.ajax({
                    type:'POST',
                    dataType:'json',
                    url:urltwo,
                    data:JSON.stringify(data),
                    contentType:'application/json;charset=utf-8',
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest, textStatus, errorThrown);
                    },
                    success:function(data){
                        if(!data.success) {
                            alert(data.msg);
                        }else{
                            console.log(data);
                        }
                    }
                });

            });
        });
    },

})
/***********************支付设置end**********************/

/***********************密码重置start**********************/
Views.passwordResetView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'passwordReset',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInSignSet:function(){
        Views.resetLoginView.show();
    },

    goInPaySet:function(){
        Views.resetPayView.show();
    }

})
/***********************密码重置end**********************/

/***********************重置支付密码start**********************/
Views.resetPayView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'resetPay',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    $("#mobile").html(data.data.mobile.substring(0, 3) + "****" + data.data.mobile.substring(7, 11));
                    $('#inputs').val(data.data.mobile);
                }
            }
        });
    },

    goInNo:function(){
        Views.verificationCodeTaView.show();
    },
    forgetPasswword:function(){
        var url =WEB_URL + '/api/coreUser/sendMsmOrEmail/5';
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify({type:5}),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    console.log(data);
                }else{
                    var _self = data.data;
                    console.log(_self);
                }
            }
        });
    },
    goInYes:function(){
        Views.rememberTaView.show();
    }

})
/***********************重置支付密码end**********************/

/***********************重置支付密码(记得)start**********************/
Views.rememberTaView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'rememberTa',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $(".import_area").focus();

            var txts = remember_import.getElementsByTagName("input");
            for(var i = 0; i<txts.length;i++){
                var t = txts[i];
                t.index = i;
                t.setAttribute("readonly", true);
                t.onkeyup=function(){
                    if(this.value=this.value.replace(/\D/g,'')) {
                        var next = this.index + 1;
                        if(next > txts.length - 1) return;
                        txts[next].removeAttribute("readonly");
                        txts[next].focus();
                    }else{
                        $(this).focus();
                    }
                }
            }
            txts[0].removeAttribute("readonly");
    },

    goInNewPassword:function(){
        Views.fillinNewPasswordTaView.show();
    }

})
/***********************重置支付密码end**********************/

/***********************忘记密码(不记得)start**********************/
Views.verificationCodeTaView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'verificationCodeTa',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    $("#mobile").html(data.data.mobile.substring(0, 3) + "****" + data.data.mobile.substring(7, 11));
                    $('#inputs').val(data.data.mobile);
                }
            }
        });
    },
    setTime:function (btn) {
        var self=this;
        if (this.countdown == 0) {
            $(btn).html("重新获取");
            btn.style.color = "#007cc3";

            clearTimeout(function(){
                this.setTime(btn);
            });
            this.countdown = 60;

        } else {
            $(btn).attr("disabled",true);
            $(btn).css("color","#999999");
            $(btn).html( this.countdown);
            this.countdown--;

            setTimeout(function(){
                self.setTime(btn);
            },1000);
        }
    },
    subBtns:function(){
        var url  = WEB_URL + "/api/coreUser/verifyVecode";
        var data = {type:1,vecode:$('#new_yans').val()};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);

                    var url  = WEB_URL + "/api/coreUser/resetPayPassword";
                    var data = {type:1,vecode:$('#new_yans').val(),newPassword:'111111'};
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:url,
                        data:JSON.stringify(data),
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest, textStatus, errorThrown);
                        },
                        success:function(data){
                            if(!data.success) {
                                alert(data.msg);
                            }else{
                                var _self = data.data;
                                console.log(_self);
                            }
                        }
                    });

                }
            }
        });
    }
})
/***********************忘记密码**********************/

/***********************忘记密码(下一步)start**********************/
Views.fillinNewPasswordTaView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'fillinNewPasswordTa',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

})
/***********************忘记密码(下一步)end**********************/

/***********************重置登录密码start**********************/
Views.resetLoginView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'resetLogin',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        alert(454);
    },

})
/***********************重置登录密码end**********************/

/***********************重置登录密码start**********************/
Views.resetLoginView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'resetLogin',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInNo:function(){
        Views.verificationCodeTTView.show();
    },

    goInYes:function(){
        Views.rememberView.show();
    },


})
/***********************重置登录密码end**********************/

/***********************重置登录密码(记得)start**********************/
Views.rememberView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'remember',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInNext:function(){
        alert(454);
    },

})
/***********************重置登录密码(记得)end**********************/

/***********************重置登录密码(记得 下一步)start**********************/
Views.rememberView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'remember',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInNext:function(){
        Views.fillinNewPasswordView.show();
    },

})
/***********************重置登录密码(记得 下一步)end**********************/

/***********************重置登录密码(不记得验证)start**********************/
Views.verificationCodeTTView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'verificationCodeTT',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        this.countdown = 60;
        var self = this;
        $(".codeImport_area").focus();
        $(".codeImport_area:first").addClass("changeCode");
        $(".codeImport_area").css("caretColor","#007cc3");
        var txts = passwordCode_import.getElementsByTagName("input");
        for(var i = 0; i<txts.length;i++){
            var t = txts[i];
            t.index = i;
            t.setAttribute("readonly", true);

            t.onkeyup=function(){
                if(this.value=this.value.replace(/\D/g,'')) {
                    var next = this.index + 1;
                    if(next > txts.length - 1) return;
                    txts[next].removeAttribute("readonly");
                    txts[next].focus();
                    $(this).removeClass("changeCode");
                }else{
                    $(this).focus();
                }
            }
        }
        txts[0].removeAttribute("readonly");
        $(".codeImport_area").click(function(){
            $(this).focus();
            $(this).parent().parent(".passwordCode_import").find(".codeImport_area").removeClass("changeCode");
            $(this).css("caretColor","#007cc3");
            $(this).addClass("changeCode");
        });
        $(".codeImport_area:text").focus(function(){
            this.select();
        });
        $(".codeImport_area").focus(function(){
            $(this).addClass("changeCode");
        });

    },
    setTime:function (btn) {
        var self=this;
        if (this.countdown == 0) {
            $(btn).html("重新获取");
            btn.style.color = "#007cc3";

            clearTimeout(function(){
                this.setTime(btn);
            });
            this.countdown = 60;

        } else {
            $(btn).attr("disabled",true);
            $(btn).css("color","#999999");
            $(btn).html( this.countdown);
            this.countdown--;

            setTimeout(function(){
                self.setTime(btn);
            },1000);
        }
    },

})
/***********************重置登录密码(不记得验证)end**********************/

/***********************填写新密码start**********************/
Views.fillinNewPasswordView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'fillinNewPassword',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

})
/***********************填写新密码startend**********************/

/***********************账户安全start**********************/
Views.accountSecurityView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'accountSecurity',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
        // var data = {};
        ajaxTool("post",null,url,
            function error(XMLHttpRequest, textStatus, errorThrown,fnErr){
                alert("error:请求失败");
            },
            function success(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    if(data.data.mobile == null ){
                        $('#mobile').html('您未绑定手机号');
                    }else{
                        $("#mobile").html(data.data.mobile.substring(0, 3) + "****" + data.data.mobile.substring(7, 11));
                    }
                    if(data.data.email == null ){
                        $('#email').html('您未绑定邮箱');
                    }else{
                        $('#email').html(data.data.email);
                    }

                }
            },true,true
        );
    },

    goInAddressManagement:function(){
        Views.addressManagementView.show();
    },

    goInAuthentication:function(){
        Views.authenticationView.show();
    },

    goInEmail:function(){
        Views.mailboxView.show();
    },

    goInPhone:function(){
        Views.mobileNumberView.show();
    }

})
/***********************账户安全end**********************/

/***********************手机管理start**********************/
Views.mobileNumberView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'mobileNumber',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
        var data = {};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    if(data.data.mobile == null ){
                        $('#mobile').html('您未绑定手机号');
                    }else{
                        $("#mobile").html(data.data.mobile.substring(0, 3) + "****" + data.data.mobile.substring(7, 11));
                        $('#inputs').val(data.data.mobile);
                    }
                }
            }
        });
    },

    goInUp:function(){
        Views.changeAddressView.show();
    },

    replacePhone:function(){

        Views.phoneBridgingView.show();
    }
})
/***********************手机管理end**********************/

/***********************更换手机start**********************/
Views.phoneBridgingView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'phoneBridging',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInUp:function(){
        Views.changeAddressView.show();
    },

    area:function(){
        Views.areaView.show();
    },

    next:function(){
        // 更换手机验证码
        var mobileEmail = $('#inputs').val();
        addCookie('mobile',mobileEmail);
        var isPhoneNo = IsMobile(mobileEmail);
        if(!isPhoneNo) {
            alert('请输入正确的手机号！');
            return;
        }
        var urlOne = WEB_URL + "/api/coreUser/sendMsmOrEmail/3";
        var data   = {mobileEmail:mobileEmail};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlOne,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    Views.verificationCodeTView.show();
                }
            }
        });
    }

})
/***********************更换手机end**********************/

/***********************选着地区start**********************/
Views.areaView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'area',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInUp:function(){
        Views.changeAddressView.show();
    }
})
/***********************选着地区end**********************/

/***********************更换手机号验证start**********************/
Views.verificationCodeTView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'verificationCodeT',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var mobile = getCookie('mobile');
        $('#mobiles').html("+86    "+mobile);

    },

    subBtn:function(){
        var newME  = getCookie('mobile');
        var vecode = $('#new_yans').val();
        var url = WEB_URL + "/api/coreUser/inTie";
        var data   = {newME:newME,vecode:vecode};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                    $("html,body").animate({scrollTop:0}, 500);
                    history.back();
                }else{
                    alert('更改成功！！');
                    Views.indexMineView.show();
                }
            }
        });
    }
});
/***********************更换手机号验证end**********************/

/***********************收货地址管理start**********************/
Views.addressManagementView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'addressManagement',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var url     = WEB_URL + '/api/userShippingAddress/selectList';
        var data    ={pageNum:1,size:20};

        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    var str     = '';
                    var _length = _self.list;
                    for (var i = 0;i<_length.length;i++){
                        str +='<div class="management_area breadth bB ui_btn" data-action="goInUp" data-addressId="'+_length[i].id+'">'
                                +'<div class="area warp_Lt">'
                                +'<span>'+_length[i].realName+'</span>'
                                +'<span>'+_length[i].provinceName+_length[i].cityName+_length[i].countyName+_length[i].address+'</span>'
                                +'</div>'
                                +'<div class="quite warp_Rg"></div>'
                                +'</div>'
                    }
                    $('#area_aside').html(str);
                }
            }
        });



    },

    goInUp:function(btn){
        dataSave('addressId',$(btn).attr('data-addressId'));
        Views.changeAddressView.show();
    },

    goInAdd:function(){
        Views.addedAddressView.show();
    }
})
/***********************收货地址管理end**********************/

/***********************新增收货地址start**********************/
Views.addedAddressView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'addedAddress',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var area2 = new LArea();
        area2.init({
            'trigger': '#demo2',
            'valueTo': '#value2',
            'keys': {
                id: 'value',
                name: 'text'
            },
            'type': 2,
            'data': [provs_data, citys_data, dists_data]
        });

        $('#fixeds span').on('click',function(){


            var url             = WEB_URL + '/api/userShippingAddress/add';//添加用户收货地址
            var realName        =$('#shr').val();//收货人
            var contact         =$('#mobile').val();//手机号
            var zipCode         =$('#email').val();//邮编号
            var province        =dataGet('provinceCode');//省id
            var provinceName    =dataGet('provinceText');//省名称
            var city            =dataGet('cityCode');//省id
            var cityName        =dataGet('cityText');//省名称
            var county          =dataGet('countyCode');//省id
            var countyName      =dataGet('countyText');//省名称
            var address         =$('#address').val();//邮箱
            var type            =$(this).data('type');//是否默认  1默认  2不默认
            var status          =1;//状态 启用
            var data            ={realName:realName,contact:contact,zipCode:zipCode,province:province,provinceName:provinceName,city:city,cityName:cityName,county:county,countyName:countyName,address:address,type:type,status:status};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data:JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest, textStatus, errorThrown);
                },
                success:function(data){
                    if(!data.success) {
                        alert(data.msg);
                    }else{
                        var _self = data.data;
                        console.log(_self);
                        alert('恭喜您，添加地址成功！');
                        Views.addressManagementView.show();
                    }
                }
            });
        });

    },

    goInUp:function(){

    },
    cancels:function(){
        var a =$('#shr').val();//收货人
        var b =$('#mobile').val();//手机号
        var c =$('#demo2').val();//地区
        var d =$('#address').val();//详细地址
        var e =$('#email').val();//邮箱
        if(a ==='' || b ==='' || c ==='' || d ==='' || e ===''){
            alert('信息不能为空！');
            return;
        }else{
            $('#fixeds').show();
        }



    }


})
/***********************新增收货地址end**********************/

/***********************修改收货地址start**********************/
Views.changeAddressView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'changeAddress',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var area2 = new LArea();
        area2.init({
            'trigger': '#demo2',
            'valueTo': '#value2',
            'keys': {
                id: 'value',
                name: 'text'
            },
            'type': 2,
            'data': [provs_data, citys_data, dists_data]
        });


        var url         = WEB_URL + '/api/userShippingAddress/selectOne';//根据id查找用户收货地址
        var id          =dataGet('addressId');//用户id
        var data        ={id:id};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);

                    $('#shr').val(_self.realName);
                    $('#mobile').val(_self.contact);
                    $('#demo2').val(_self.provinceName+','+_self.countyName+','+_self.cityName);
                    $('#address').val(_self.address);
                    $('#email').val(_self.zipCode);

                }
            }
        });

    },

    goInUp:function(){

    },

    delAddress:function(){
        var url = WEB_URL +'/api/userShippingAddress/deleteById';
        var id          =dataGet('addressId');//用户id
        var data        ={id:id};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    alert('删除成功！');
                    Views.addressManagementView.show();
                }
            }
        });
    },



    baocuns:function(){
        var url             = WEB_URL + '/api/userShippingAddress/update';//修改用户收货地址
        var id              =dataGet('addressId');//用户id
        var realName        =$('#shr').val();//收货人
        var contact         =$('#mobile').val();//手机号
        var zipCode         =$('#email').val();//邮编号
        var province        =dataGet('provinceCode');//省id
        var provinceName    =dataGet('provinceText');//省名称
        var city            =dataGet('cityCode');//省id
        var cityName        =dataGet('cityText');//省名称
        var county          =dataGet('countyCode');//省id
        var countyName      =dataGet('countyText');//省名称
        var address         =$('#address').val();//详细地址
        var type            =1;//是否默认  1默认  2不默认
        var status          =1;//状态 启用
        var data            ={id:id,realName:realName,contact:contact,zipCode:zipCode,province:province,provinceName:provinceName,city:city,cityName:cityName,county:county,countyName:countyName,address:address,type:type,status:status};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    alert('恭喜您，修改地址成功！');
                    Views.addressManagementView.show();
                }
            }
        });
    }

})
/***********************修改收货地址end**********************/

/***********************身份验证start**********************/
Views.authenticationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'authentication',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInUp:function(){

    }
})
/***********************身份验证end**********************/

/***********************邮箱start**********************/
Views.mailboxView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'mailbox',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
        var data = {};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    console.log(data);
                    if(data.data.email == null ){
                        $('#email').html('您未绑定邮箱');
                    }else{
                        $('#email').html(data.data.email);
                    }
                }
            }
        });
    },

    goInReplace:function(){
        Views.mailBridgingView.show();
    }

})
/***********************邮箱end**********************/


/***********************更换邮箱下一步start**********************/
Views.mailBridgingView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'mailBridging',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

    goInReplace:function(){
        //mailBridging
    },

    goInCodes:function(){
        var Email = $('#emails').val();
        regs=/^\w+@[a-zA-Z0-9]+(\.[a-z]{2,3}){1,2}$/;
        if(!regs.test(Email)){
            alert('请输入正确的邮箱!');
        }else {
            addCookie('emails',Email);
            var urlOne = WEB_URL + "/api/coreUser/sendMsmOrEmail/3";
            var data   = {mobileEmail:Email};
            $.ajax({
                type:'POST',
                dataType:'json',
                url:urlOne,
                data:JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success) {
                        alert(data.msg);
                    }else{
                        Views.verificationCodeView.show();
                    }
                }
            });
        }
        // Views.verificationCodeView.show();
    }
})
/***********************更换邮箱下一步end**********************/

/***********************更换邮箱下下一步start**********************/
Views.verificationCodeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'verificationCode',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $('#email').html(getCookie('emails'));
    },
    subBtne:function(){
        var newME  = getCookie('emails');
        var vecode = $('#new_yanss').val();
        var url = WEB_URL + "/api/coreUser/inTie";
        var data   = {newME:newME,vecode:vecode};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                    $("html,body").animate({scrollTop:0}, 500);
                    history.back();
                }else{
                    alert('更改成功！！');
                    Views.indexMineView.show();
                }
            }
        });
    },
    setTime:function (btn) {
    },

})
/***********************更换邮箱下下一步end**********************/

/***********************新消息提示start**********************/
Views.messageNotificationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'messageNotification',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $(document).ready(function(){
            $(".set_circle").click(function(){
                if($(this).hasClass("warp_Rg")) {
                    $(this).removeClass("warp_Rg");
                    $(this).addClass("warp_Lt");
                    $(this).parent(".defray").addClass("change");
                }else {
                    $(this).addClass("warp_Rg");
                    $(this).removeClass("warp_Lt");
                    $(this).parent(".defray").removeClass("change");
                }

            });

        });
    },

})
/***********************新消息提示end**********************/

/***********************隐私start**********************/
Views.privacyView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'privacy',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $(document).ready(function(){
            $(".set_circle").click(function(){
                if($(this).hasClass("warp_Rg")) {
                    $(this).removeClass("warp_Rg");
                    $(this).addClass("warp_Lt");
                    $(this).parent(".defray").addClass("change");
                }else {
                    $(this).addClass("warp_Rg");
                    $(this).removeClass("warp_Lt");
                    $(this).parent(".defray").removeClass("change");
                }

            });

        });
    },

})
/***********************隐私end**********************/

/***********************通用start**********************/
Views.generalView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'general',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

    },

    goInMultilingual:function(){
        Views.multilingualView.show();
    }


})
/***********************通用end**********************/

/***********************多种语言start**********************/
Views.multilingualView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'multilingual',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

    },

})
/***********************多种语言end**********************/

/***********************关于start**********************/
Views.aboutTView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'aboutT',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

    },

    goInFeedback:function(){
        Views.feedbackTView.show();
    }

})
/***********************关于end**********************/

/***********************意见反馈start**********************/
Views.feedbackTView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'feedbackT',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);

    },

    didShow: function () {
        addEventListener();

    },

    fSubmit:function(){
        var text = $('.text textarea').val();

        //if(text.length <= 0){
        //    alert("请输入反馈意见");
        //    return;
        //}


        //var files = $('input[name="pic"]').prop('files');//获取到文件列表
        //
        //if(files.length == 0){
        //    alert('请选择文件');
        //    return;
        //}else{
        //    var reader = new FileReader();//新建一个FileReader
        //    reader.readAsText(files[0], "utf-8");//读取文件
        //    reader.onload = function(evt){ //读取完文件之后会回来这里
        //        var fileString = evt.target.result;
        //        //form.vm.value = fileString; //设置隐藏input的内容
        //    }
        //}
        //


        //
        //alert(text);
    }

})
/***********************意见反馈end**********************/

/***********************个人中心start**********************/
Views.personalCenterView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'personalCenter',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);

    },

    didShow: function () {
        addEventListener();
        // 用户头像 昵称
        var url = WEB_URL + "/api/core/selectLoginUser";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self    = data.data;
                    var headImg  = _self.headImg;   //头像
                    var nickName = _self.nickName;  //用户名
                    var userName   = _self.userName;    //注册名称
                    var crade    = _self.crade;     //身份
                    $('#user_img').html(headImg == null?'<img src="images/mine/head.png" >':'<img src="'+headImg+'">');
                    $('#user_xinxi .name').html(nickName);
                    $('#user_xinxi .type').html(crade == 1 ? '普通会员' : (crade == 2 ? '创客' : (crade == 3 ? '合作商' : a)));
                    $('#user_xinxi .pcNnumber').html(userName);
                }
            }
        });
    },

    goInMyBankCard:function(){
        Views.myBankCardView.show();
    },
    backPage:function(){
        Views.indexMineView.show();
    },

    goInMyFriends:function(){
        Views.myCircleOfFriendsView.show();
    },

    goInShare:function(){
        Views.myShareCommodityView.show();
    },

    goInCollection:function(){
        Views.myCollectionView.show();
    },

    personalData:function () {
        Views.personalDataView.show();
    }

})
/***********************个人中心end**********************/

/***********************个人资料start**********************/
Views.personalDataView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'personalData',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $(function(){
            initFileInput('fileuri','yulanimg');
        });
        var json_url = '';
        function initFileInput(fileuri,yulanimg) {
            $(":input[type='file']").attachsvr({
                script: WEB_URL + "/api/attachment/upload",
                uploadkey:"file",
                filetype:[".jpg",".png",".jpeg",".bmp"],

                onComplete:function(json){
                    alert(json.data.data[0].uri);
                    json_url = json.data.data[0].uri;
                    dataSave('json_url',json_url)
                },
                onProgress:function(xhr){
                    //console.log(xhr);
                    //console.log("progress,在这里可以添加loading 效果",parseInt(xhr.loaded/xhr.total*100)+"%")
                    $('#continuefile').text(parseInt(xhr.loaded/xhr.total*100)+"%");
                },
                onCheck:function(file){
                    console.log(file);
                    return true;
                },
                onError:function(e){console.log("error",e)},
                ctxdata:{
                    "参数1":"参数1的值",
                    "参数2":"参数2",
                }

            });
        }
        var url = WEB_URL + "/api/core/selectLoginUser";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self    = data.data;
                    console.log(_self);
                    var headImg         = _self.headImg;   //头像
                    var nickName        = _self.nickName;  //用户名
                    var gender          = _self.gender;    //性别
                    var address         = _self.address;    //地址
                    var constellation   = _self.constellation;    //星座
                    var height          = _self.height;    //身高
                    var weight          = _self.weight;    //体重
                    $('#preview').attr('src',headImg == null?'images/mine/head.png':headImg);
                    $('#name').val(nickName);
                    $('#sex').val(gender == 1?'男':'女');
                    $('#demo1').html(address);
                    $('#constellation').val(constellation);
                    $('#height').val(height);
                    $('#weight').val(weight);
                }
            }
        });
        $('.img-head-input').on('change',function(avalue) {
            var docObj=document.getElementById("doc");

            var imgObjPreview=document.getElementById("preview");
            if(docObj.files &&docObj.files[0])
            {
//火狐下，直接设img属性
                imgObjPreview.style.display = 'block';
                imgObjPreview.style.width = '100%';
                imgObjPreview.style.height = '37px';
//imgObjPreview.src = docObj.files[0].getAsDataURL();

//火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
                imgObjPreview.src = window.URL.createObjectURL(docObj.files[0]);
            }
            else
            {
//IE下，使用滤镜
                docObj.select();
                var imgSrc = document.selection.createRange().text;
                var localImagId = document.getElementById("localImag");
//必须设置初始大小
                localImagId.style.width = "150px";
                localImagId.style.height = "180px";
//图片异常的捕捉，防止用户修改后缀来伪造图片
                try{
                    localImagId.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                }
                catch(e)
                {
                    alert("您上传的图片格式不正确，请重新选择!");
                    return false;
                }
                imgObjPreview.style.display = 'none';
                document.selection.empty();
            }
            var files = document.getElementById("doc").files;
            var data  = {file:files[0]};
            console.log(files[0]);
            var url = WEB_URL + "/api/attachment/upload";
            return true;
        });
        //////////////////////**********
        var area1 = new LArea();
        area1.init({
            'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
            'valueTo': '#value1', //选择完毕后id属性输出到该位置
            'keys': {
                id: 'id',
                name: 'name'
            }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
            'type': 1, //数据源类型
            'data': LAreaData //数据源
        });
        area1.value=[1,13,3];//控制初始位置，注意：该方法并不会影响到input的value
        var area2 = new LArea();
        area2.init({
            'trigger': '#demo2',
            'valueTo': '#value2',
            'keys': {
                id: 'value',
                name: 'text'
            },
            'type': 2,
            'data': [provs_data, citys_data, dists_data]
        });
    },
    pd_preservations:function(){
        var headImg       = WEB_URL + dataGet('json_url');
        var nickName      = $('#name').val();
        var gender        = $('#sex').val()=='男'?1:2;
        var address       = $('#demo1').val();
        var constellation = $('#constellation').val();
        var height        = $('#height').val();
        var weight        = $('#weight').val();
        var url           = WEB_URL + '/api/coreUser/update';
        var data          = {headImg:headImg,nickName:nickName,gender:gender,address:address,constellation:constellation,height:height,weight:weight};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    alert('修改成功！');
                    Views.personalCenterView.show();
                }
            }
        });

    }

})
/***********************个人资料end**********************/



/***********************我的银行卡start**********************/
Views.myBankCardView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myBankCard',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

    },

    goInAddCard:function(){
        Views.addBankCardView.show();
    }

})
/***********************我的银行卡end**********************/

/***********************添加银行卡start**********************/
Views.addBankCardView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'addBankCard',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        $('#BankCardNumber').keyup(function(){
            if( $(this).val().length >0){
                $('#addClear').show();
            }
        })

        $('#addClear').click(function(){
            $('#BankCardNumber').val("");
            $(this).hide();
        });

    },



    goInAddNext:function(){
        Views.fillBankCardInformationView.show();
    }

})
/***********************添加银行卡end**********************/

/***********************填写银行卡信息start**********************/
Views.fillBankCardInformationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'fillBankCardInformation',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

    },

    goInAddNext:function(){

    }

})
/***********************填写银行卡信息end**********************/

/***********************我的朋友圈start**********************/
Views.myCircleOfFriendsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myCircleOfFriends',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $(function(){
            $(document).on('touchstart','.cType div',function(){
                var type = $(this).index();
                if(type=='0'){
                    $('.cType div').removeClass('sc');
                    $(this).addClass('sc');
                    $('.numberList').hide();
                    $('#type0').show();
                }else{
                    $('.cType div').removeClass('sc');
                    $(this).addClass('sc');
                    $('.numberList').hide();
                    $('#type1').show();
                }
            });
            for(var i=0;i<$('#type0 .cGrade div').length;i++){
                $('#type0 .cGrade div')[i].onclick = function(){
                    $('#type0 .gradeType').removeClass('sc');
                    $(this).addClass('sc');
                    var side = $(this).data('side');
                    $('#type0 .list_sort').hide();
                    $('#side'+side).show();
                }
            }
            for(var j=0;j<$('#type1 .cGrade div').length;j++){
                $('#type1 .cGrade div')[j].onclick = function(){
                    $('#type1 .gradeType').removeClass('sc');
                    $(this).addClass('sc');
                    var sides = $(this).data('sides');
                    $('#type1 .list_sort').hide();
                    $('#sides'+sides).show();
                }
            }
        });

        // 获取昵称
        var url  = WEB_URL + "/api/core/selectLoginUser";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    $('.cHead .pic img').attr('src',_self.headImg);//头像
                    $('.cHead .name').html(_self.nickName);//昵称
                    $('.smData .fL').html('平台身份:'+(_self.crade === 1?'普通会员':(_self.crade === 2?'创客':(_self.crade === 3 ?'创客商':_self.crade))));//昵称
                }
            }
        });

        // 进入默认创客（一级）
        var url = WEB_URL + '/api/coreUser/findUserRetailO?pageNum=1&pageSize=10&type=3';
    },

})
/***********************我的朋友圈end**********************/

/***********************我的商品分享start**********************/
Views.myShareCommodityView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myShareCommodity',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();


    },

})
/***********************我的商品分享end**********************/

/***********************我的收藏start**********************/
Views.myCollectionView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myCollection',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        this.aa();

    },
    //编辑
    edit: function (btn) {
        $('.list').css('left', '0');
        if ($(btn).hasClass('eYes')) {
            $('#bottom_fixed').show();
            $(btn).text("完成");
            $('.list').css("margin-left", "10%");
            $(btn).removeClass('eYes');
            $('.editWhole').show();
            $('.positionBottom').show();

            $('.CollectionType').hide();
            $('.position').css("height", '44px');
            $('.but').show();

        } else {
            $('#bottom_fixed').hide();
            $(btn).text("编辑");
            $('.list').css("margin-left", "0%");
            $(btn).addClass('eYes');
            $('.editWhole').hide();
            $('.positionBottom').hide();
            $('.paragraph').removeClass('btn');

            $('.but').hide();

            $('.CollectionType').show();
            $('.position').css("height", '78px');

            $('.paragraph').children('.but ').css('background-image', 'url(images/storeDetails/noChoice.png)');
            $('.list .select .but').css('background-image', 'url(images/storeDetails/noChoice.png)');
        }
    },

    //全选
    select: function (btn) {
        if ($(btn).hasClass('wYes')) {
            $(btn).parent('.paragraph').siblings('.list').find('.but').css('background-image', 'url(images/storeDetails/choice.png)');
            $(btn).css('background-image', 'url(images/storeDetails/choice.png)');
            $(btn).removeClass('wYes');
            $(btn).parent('.paragraph').siblings('.list').children('.select').find('div').removeClass('wYes');
        } else {
            $(btn).parent('.paragraph').siblings('.list').find('.but').css('background-image', 'url(images/storeDetails/noChoice.png)');
            $(btn).css('background-image', 'url(images/storeDetails/noChoice.png)');
            $(btn).addClass('wYes');
        }
    },

    //单个
    single: function (btn) {
        if ($(btn).hasClass('wYes')) {
            $(btn).css('background-image', 'url(images/storeDetails/choice.png)');
            $(btn).removeClass('wYes');
        } else {
            $(btn).css('background-image', 'url(images/storeDetails/noChoice.png)');
            $(btn).addClass('wYes');
            $(btn).parent().parent().siblings('.paragraph').children('.but').css('background-image', 'url(images/storeDetails/noChoice.png)');
        }
    },

    //更多
    more: function (btn) {
        $('.moreModules').show();
        $('.bgMask').show();
    },

    //取消
    cancel: function () {
        $('.moreModules').hide();
        $('.bgMask').hide();
    },

    /////////////////////切换事件/////////////////////////////
    type_commodity: function () {
        $('.type_tab').hide();
        $('#side1').show();
        $('.CollectionType .commodity').css({'color': 'red'});
        $('.CollectionType .business').css({'color': '#333'});
    },

    type_business: function () {
        $('.type_tab').hide();
        $('#side2').show();
        $('.CollectionType .commodity').css({'color': '#333'});
        $('.CollectionType .business').css({'color': 'red'});
    },

/////////////////////滑动事件/////////////////////////////
    aa: function () {

        var container = document.querySelectorAll('.list');
        for (var i = 0; i < container.length; i++) {

            var x, y, X, Y, swipeX, swipeY;

            container[i].addEventListener('touchstart', function (event) {
                x = event.changedTouches[0].pageX;
                y = event.changedTouches[0].pageY;
                swipeX = true;
                swipeY = true;
            });

            container[i].addEventListener('touchmove', function (event) {

                X = event.changedTouches[0].pageX;
                Y = event.changedTouches[0].pageY;

                // 左右滑动
                if (swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0) {

                    // 阻止事件冒泡
                    event.stopPropagation();
                    $('.list').css('left', '0');
                    if (X - x > 10) {
                        event.preventDefault();
                        this.style.left = '0px';
                    }
                    if (x - X > 10) {
                        event.preventDefault();
                        this.style.left = '-15%';
                    }
                    swipeY = false;
                }

                // 上下滑动
                if (swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
                    swipeX = false;
                }

            });

        }
//阻止删除事件过多代替冒泡
        function fixed() {
            $('#top_fixed').hide();
            $('.list').css({'margin-left': '0'});
        }

        ////
        $(document).on('touchstart', '.singleDelete', function () {
            $(this).parent().remove();
        });

//	$(document).on('touchstart','.shareCommodity .list',function(){
//	    location.href = 'http://www.baidu.com'
//	});
    }
})
/***********************我的收藏end**********************/

/***********************我的上级start**********************/
Views.mySuperiorView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'mySuperior',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var url = WEB_URL + '/api/coreUser/selectUserSuperior';
        ajaxTool("post",null,url,
            function error(XMLHttpRequest, textStatus, errorThrown,fnErr){
                alert("error:请求失败");
            },
            function success(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    console.log(data);
                    var _self    = data.data;
                    var headImg  = _self.headImg;   //头像
                    var nickName = _self.nickName;  //昵称
                    var userName = _self.userName;  //用户名
                    var realName = _self.realName;  //真实姓名
                    var mobile   = _self.mobile;    //手机号
                    var crade    = _self.crade;     //身份
                    $('.pic').html(headImg==null?'<img src="images/mine/head.png" style="border-radius: 50%;">' :'<img src='+headImg+' style="border-radius: 50%;">');
                    $('.name span').html(nickName);
                    $('.name p').html(userName);
                    $('.name .right').html(realName==null?'您未进行实名认证' :realName);
                    $('.mobile .right').html(mobile==null?' ' :mobile);
                    $('.level .right').html(crade == 1?'普通会员':(crade == 2 ?'创客':(crade == 3?'合作商':crade)));
                }
            },true
        );
    },

})
/***********************我的上级end**********************/

/***********************我的账单start**********************/
Views.myBillView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myBill',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();


    },

    goInBillingDetails:function(){
        Views.billingDetailsAView.show();
    }

})
/***********************我的账单end**********************/



/***********************我的账单详情start**********************/
Views.billingDetailsAView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'billingDetailsA',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();


    },

})
/***********************我的账单详情end**********************/

/***********************我的钱包start**********************/
Views.myWalletView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myWallet',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        var url  = WEB_URL + "/api/core/selectLoginUser";
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                    var availableIncome     = _self.availableIncome; //用户余额
                    var frozenIncome        = _self.frozenIncome; //用户冻结余额
                    var totalIncome         = _self.totalIncome; //用户总收益
                    $('.mmNumber').html('$'+(totalIncome==null?0:totalIncome));
                    $('#ky').html('$'+(availableIncome==null?0:availableIncome));
                    $('#dj').html('$'+(frozenIncome==null?0:frozenIncome));
                }
            }
        });


    },

    goInWithdraw:function(){
        Views.withdrawView.show();
    },

    goInWantToRecharge:function(){
        Views.wantToRechargeView.show();
    },
    zd:function(){
        Views.detailedView.show();
    }

})
/***********************我的钱包end**********************/

/***********************明细start**********************/
Views.detailedView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'detailed',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var url         = WEB_URL + '/api/walletDetails/selectByUserId';
        var pageNum     = 1;
        var size        = 20;
        var walletType  = 0;
        var data = {pageNum:pageNum,size:size,walletType:walletType};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data:JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest, textStatus, errorThrown);
            },
            success:function(data){
                if(!data.success) {
                    alert(data.msg);
                }else{
                    var _self = data.data;
                    console.log(_self);
                }
            }
        });
    },

    dEdit:function(){
    if($('.detailedScreen').css('top')=='-66px'){
        $('.bgMask').show();
        $('.detailedScreen').stop().animate({
            top:'40px'
        });
        $('.detailedScreen').show();
    }else{
        $('.bgMask').hide();
        $('.detailedScreen').hide();
        $('.detailedScreen').stop().animate({
            top:'-66px'
        },10);
    }
}

})
/***********************明细end**********************/


/***********************提现start**********************/
Views.withdrawView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'withdraw',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        $('#money').keyup(function() {
                var money = $(this).val();
                var available = $('#available').html();
                if (money > available) {
                    $('#wPrompt').show();
                }else {
                    $('#wPrompt').hide();
                }
            })

        $('#wWhole').click(function(){
            var available = $('#available').html();
            $('#money').val(available);
        })
    },

    goInSelectBankCard:function(){
        Views.selectBankCardView.show();
    }

})
/***********************提现end**********************/

/***********************银行卡选择start**********************/
Views.selectBankCardView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'selectBankCard',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        $(".selectBankCard").click(function () {
            $(this).parent(".setAside").find(".selectBankCard").removeClass("addSelectBank");
            $(this).addClass("addSelectBank");

        })
    },

    goInAddCard:function(){
        Views.addBankCardView.show();
    }

})
/***********************银行卡选择end**********************/

/***********************我要充值start**********************/
Views.wantToRechargeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'wantToRecharge',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
        // $(".withdraw_btn").click(function () {
        //     $(".wantToRecharge_shady").show();
        //     $(".wantToRecharge_payment").slideToggle();
        //     $(".wantToRechargePay").show();
        // });
        // $('.wantToRecharge_shady').click(function (){
        //     $(this).hide();
        //     $(".wantToRecharge_payment").slideUp();
        //     $(".wantToRechargeChange").slideUp();
        // });
        // $(".wantToRechargeChangeArea").click(function () {
        //     $(".wantToRechargePay").hide();
        //     $(".wantToRechargeChange").show();
        //     $(".wantToRechargeHeader span").html("付款方式");
        // });
        //
        // $(".wantToRechargeChangeArea").click(function () {
        //     $(this).parent(".wantToRechargeChange").find(".wantToRechargeChangeArea").removeClass("selected");
        //     $(this).addClass("selected");
        // });
        //$(".withdraw_btn").click(function () {
        //
        //});
        $('.wantToRecharge_shady').click(function (){
            $(this).hide();
            $(".wantToRecharge_payment").slideUp();
            $(".wantToRechargeChange").slideUp();
        });
        $(".wantToRechargeChangeArea").eq(0).click(function () {
            $(".wantToRechargePay").hide();
            $(".wantToRechargeChange").show();
            $(".wantToRechargeHeader span").html("付款方式");
        });
        $(".wantToRechargeChangeArea").click(function () {
            $(this).parent(".wantToRechargeChange").find(".wantToRechargeChangeArea").removeClass("selecteds");
            $(this).addClass("selecteds");
        });

        $('.wantToRechargePay .bB').click(function(){
            $('#backs').hide();
            $('#backss').show();
        });
        $('#backs').click(function(){
            $('.wantToRecharge_shady').hide();
            $(".wantToRecharge_payment").slideUp();
            $(".wantToRechargeChange").slideUp();
        });
        $('#backss').click(function(){
            $('#backs').show();
            $('#backss').hide();
            $('.wantToRechargePay').show();
            $('.wantToRechargeChange').hide();
        });
    },

    wrConfirm:function(){
        var wtrRecharge = $('#wtrRecharge').val();
        if(wtrRecharge.length <= 0){
            alert("请输入充值金额");
        }else{
            $(".wantToRecharge_shady").show();
            $(".wantToRecharge_payment").slideToggle();
            $(".wantToRechargePay").show();
        }
    }


})
/***********************我要充值end**********************/

/***********************我的金豆start**********************/
Views.myImazamoxView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myImazamox',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var cradeLeave = dataGet('crade');//判断身份

        cradeLeave ==1?$('#shopRoleDist').show():$('#shopRoleDist').hide();
        $('#shopRoleDist div').click(function(){
            var pLeave = $(this).data('id');//购买平台身份
            var url         = WEB_URL + '/api/orderMall/addRole';
            var storeId     = 1; //店铺id
            var orderType   = dataGet('crade')==1?7:9; //订单类型3业务充值 4余额充值 6店铺身份购买 7平台身份购买 8补货 9金豆充值
            var consignee   ='方加强'; //地址信息   当为3购买平台身份时不必填  当为1或2时地址信息必填
            var mobile      ='18357250335';
            var zipCode     ='311112';
            var province    ='0';
            var provinceName='浙江省';
            var city        ='100';
            var cityName    ='杭州市';
            var county      ='1000';
            var countyName  ='拱墅区';
            var address     ='天堂e谷三幢411室';
            var buyerMess   ='';
            var shopRoleDist={roleLevel:pLeave};
            var data        ={storeId:storeId,orderType:orderType,consignee:consignee,mobile:mobile,zipCode:zipCode,province:province,provinceName:provinceName,city:city,cityName:cityName,county:county,countyName:countyName,address:address,buyerMess:buyerMess,shopRoleDist:shopRoleDist};
            console.log(data);
            $.ajax({
                type:'POST',
                dataType:'json',
                url:url,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{
                        console.log(data);
                        dataSave('payIdsss',data.data.id);
                        // $('#shopRoleDist').hide();
                        $('.miMask').show();
                        $('.rechargeMode').stop().animate({
                            bottom:0
                        });
                    }
                }
            });
        });

    },

    //我的金豆
    zhuanzheng:function (){
        $('.miMask , .donation').show();
    },
    cancel:function (){
        $('.miMask , .donation').hide();
    },
    cancel_no:function (){
        $('.rechargeMode').stop().animate({
            bottom:'-195px'
        });
        $('.miMask').hide();
    },
    handsel:function (){

        var miRecharge = $('#miRecharge').val();
        if(miRecharge.length <= 0){
            alert("请输入充值金额");
        }else{
            $('.miMask').show();
            $('.rechargeMode').stop().animate({
                bottom:0
            });
        }
    },
    // 兑换记录
    lookup:function(){
        Views.exchangeRecordView.show();
    },
    exchange:function(){
        Views.exchangeView.show();
    },
    yuE:function(){
        var url         = WEB_URL + '/api/orderMall/payment';
        var payId       ='';
        var payType     =3;
        var orderMalls  =[{id:dataGet('payIdsss')}];
        var data        ={payId:payId,payType:payType,orderMalls:orderMalls};

        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    dataSave('PayIdss',data.data.payId);

                    ////////////////////////////////////////////

                    var urlTwos = WEB_URL + '/api/coreMoney/balancePay' ;//支付
                    var tradeNo = dataGet('PayIdss');
                    var payPassword = '123456';
                    var data = {tradeNo:tradeNo,payPassword:payPassword};
                    console.log(data);
                    $.ajax({
                        type:'POST',
                        dataType:'json',
                        url:urlTwos,
                        data: JSON.stringify(data),
                        contentType:'application/json;charset=utf-8',
                        error: function (XMLHttpRequest, textStatus, errorThrown) {},
                        success:function(data){
                            if(!data.success){
                                console.log(data.msg);
                            }else{
                                console.log(data);
                                alert('您已支付成功！');
                                $('.rechargeMode').stop().animate({
                                    bottom:'-195px'
                                });
                                $('.miMask').hide();
                                Views.indexMineView.show();
                            }
                        }
                    });
                }
            }
        });

    }

})
/***********************我的金豆end**********************/

/***********************兑换金豆start**********************/
Views.exchangeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'exchange',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

})
/***********************兑换金豆end**********************/

/***********************购物车start**********************/
Views.shoppingCartView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'shoppingCart',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        $(document).ready(function(){
            $(".choose").click(function(){
                if($(this).hasClass("selecteds")) {
                    $(this).removeClass("selecteds");
                    var wholeNumber = $('.shoppingCart_wareArea .shoppingCart_wareStore .selecteds').length;
                    $('#wholeNumber').html(wholeNumber);
                }else {
                    $(this).addClass("selecteds");
                    var wholeNumber = $('.shoppingCart_wareArea .shoppingCart_wareStore .selecteds').length;
                    $('#wholeNumber').html(wholeNumber);
                }
            });


//        编辑模块
            $(".edit").click(function(){
                if($(this).html()=="编辑") {
                    $(this).parent().parent(".shoppingCart_wareArea").find(".shoppingCart_wareTxt").hide();
                    $(this).html("完成");
                    $(this).parent().parent(".shoppingCart_wareArea").find(".shoppingCart_wareEditArea").show();
                }else {
                    $(".shoppingCart_wareEditArea").hide();
                    $(this).html("编辑");
                    $(".shoppingCart_wareTxt").show();
                }
            });

            $('.wholeEdit').click(function(){
                if($(this).is('.ok')){
                    $('.shoppingCart_wareTxt').show();
                    $('.shoppingCart_wareEditArea').hide();
                    $(this).html("编辑");
                    $(this).removeClass('ok');
                    $(".edit").show();
                }else{
                    $('.shoppingCart_wareTxt').hide();
                    $('.shoppingCart_wareEditArea').show();
                    $(this).html("完成");
                    $(this).addClass('ok');
                    $(".edit").hide();
                }

            })


            $('.shoppingCart_wareEditArea .shoppingCart_wareContent .shoppingCart_digitalAddition .number').html($('.productNumber').html());

            //加减区
            $(".minus").click(function(){
                var num = $(this).parent().find(".number").html(); //获取数量值
                var reveal = parseFloat(num) - 1; //数量减一
                if (reveal == 0) {
                    reveal = 1;
                }
                $(this).parent().find(".number").html(reveal); //显示数量
                $(this).parent().parent().parent('.shoppingCart_wareEditArea').siblings('.shoppingCart_wareTxt').find('.productNumber').html(reveal);
            });
            //加减区
            $(".plus").click(function(){
                var num = $(this).parent().find(".number").html(); //获取数量值
                var reveal = parseFloat(num) + 1; //数量加一
                $(this).parent().find(".number").html(reveal); //显示数量
                $(this).parent().parent().parent('.shoppingCart_wareEditArea').siblings('.shoppingCart_wareTxt').find('.productNumber').html(reveal);
            });

//        属性加减区
            $(".min").click(function(){
                var num = $(this).parent().find(".num").html(); //获取数量值
                console.log(num);
                var reveal = parseFloat(num) - 1; //数量减一
                if (reveal == 0) {
                    reveal = 1;
                }
                $(this).parent().find(".num").html(reveal); //显示数量
            });
            //加减区
            $(".mix").click(function(){
                var num = $(this).parent().find(".num").html(); //获取数量值
                var reveal = parseFloat(num) + 1; //数量加一
                $(this).parent().find(".num").html(reveal); //显示数量
            });

            $(".lib").click(function(){
                $(".shoppingCart_properties").show();
                $(".shoppingCart_black").show();
                $(".shoppingCart_check").show()
            });

            $(".area").click(function(){
                $(this).parent().parent(".shoppingCart_qualityArea").find(".area").removeClass("pitchOn");
                $(this).addClass("pitchOn");
            });
            $(".shoppingCart_check").click(function(){
                $(".shoppingCart_properties").hide();
                $(".shoppingCart_black").hide();
                $(".shoppingCart_check").hide()
            });
            $(".shoppingCart_black").click(function(){
                $(".shoppingCart_properties").hide();
                $(".shoppingCart_black").hide();
                $(".shoppingCart_check").hide()
            });
            $(".checkAll").click(function(){
                if ($(this).hasClass("selecteds")) {
                    $('.mine_warp .shoppingCart_wareArea .shoppingCart_wareStore .choose').removeClass("selecteds");
                    $(this).removeClass("selecteds");
                    var wholeNumber = $('.shoppingCart_wareArea .shoppingCart_wareStore .selecteds').length;
                    $('#wholeNumber').html(wholeNumber);
                } else {
                    $(".checkAll").addClass("selecteds");
                    $(".shoppingCart_wareStore .choose").addClass("selecteds");
                    var wholeNumber = $('.shoppingCart_wareArea .shoppingCart_wareStore .selecteds').length;
                    $('#wholeNumber').html(wholeNumber);
                }
            });
            $(".shoppingCart_wareDel").click(function(){
                $(this).parent().parent().parent().parent(".shoppingCart_wareArea").hide();
            });

        });
        count();
        function count(){
            var index = $('.shoppingCart_wareArea').length;
            var headTxt = $('.mine_top span:nth-child(2)').text();
            var headName=headTxt + "("+index+")";
            $('.mine_top  span:nth-child(2)').text(headName);
        }
    },

})
/***********************购物车end**********************/

/***********************我的定单start**********************/
Views.myOrderView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'myOrder',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(document).ready(function(){
            $(".settlementBtn").click(function(){
                $(this).parent(".myOrder_settlementArea").find(".settlementBtn").removeClass("changeBtn");
                $(this).addClass("changeBtn")
            });

            $(".choose").click(function(){
                if($(this).hasClass("selected")) {
                    $(this).removeClass("selected");
                }else {
                    $(this).addClass("selected");
                }
            });
            $("#myOrder").click(function(){
                $(".myOrder").show();
                $(".pendingPayment ").hide();
                $(".toBeShippedDetails ").hide();
                $(".pendingReceipt ").hide();
                $(".toBeEvaluated").hide();
            });
            $("#pendingPayment").click(function(){
                $(".myOrder").hide();
                $(".pendingPayment ").show();
                $(".toBeShippedDetails ").hide();
                $(".pendingReceipt ").hide();
                $(".toBeEvaluated").hide();
            });
            $("#toBeShippedDetails").click(function(){
                $(".pendingPayment ").hide();
                $(".myOrder").hide();
                $(".toBeShippedDetails ").show();
                $(".pendingReceipt ").hide();
                $(".toBeEvaluated").hide();
            });
            $("#pendingReceipt").click(function(){
                $(".pendingPayment ").hide();
                $(".myOrder").hide();
                $(".toBeShippedDetails ").hide();
                $(".pendingReceipt ").show();
                $(".toBeEvaluated").hide();
            });
            $("#toBeEvaluated").click(function(){
                $(".pendingPayment ").hide();
                $(".myOrder").hide();
                $(".toBeShippedDetails ").hide();
                $(".pendingReceipt ").hide();
                $(".toBeEvaluated").show();
            });

            $(".myOrderOdd").click(function(){
                $(".odd").remove();
                $(this).parent(".myOrder_selectArea").find(".myOrderOdd").removeClass("selectArea");
                $(this).append("<div class='odd'></div>");
                $(this).addClass("selectArea");
            });

        });
    },

    //代付款
    goInPayDetails:function(){
        Views.pendingPaymentDetailsView.show();
    },

    //代发货
    goInToBeShippedDetails:function(){
        Views.toBeShippedDetailsView.show();
    },

    //代收货
    goInPendingReceiptDetails:function(){
        Views.pendingReceiptDetailsView.show();
    },

    //代评价
    goInEvaluated:function(){
        Views.detailsToBeEvaluatedView.show();
    },

    //评价
    goInEvaluation:function(){
        Views.evaluationView.show();
    },

    //查看物流
    goInViewLogistics:function(){
        Views.viewLogisticsView.show();
    }

})
/***********************我的订单end**********************/

/***********************代付款详情start**********************/
Views.pendingPaymentDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'pendingPaymentDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

})
/***********************代付款详情end**********************/

/***********************代发货详情start**********************/
Views.toBeShippedDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'toBeShippedDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

})
/***********************代发货详情end**********************/

/***********************代收货详情start**********************/
Views.pendingReceiptDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'pendingReceiptDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

})
/***********************代收货详情end**********************/


/***********************查看物流start**********************/
Views.viewLogisticsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'viewLogistics',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();
    },

})
/***********************查看物流end**********************/

/***********************代评价start**********************/
Views.detailsToBeEvaluatedView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'detailsToBeEvaluated',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        $(document).click(function(){
            $(".footBtn").click(function(){
                $(this).parent(".orderDetails_foot").find(".footBtn").removeClass("selectfoot");
                $(this).addClass("selectfoot")
            })
        })

    },

})
/***********************代评价end**********************/

/***********************发表评价start**********************/
Views.evaluationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'evaluation',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(".love").click(function(){
                    if($(this).hasClass("selectedLove")){
                        $(this).removeClass("selectedLove");
                        $(this).nextAll(".love").removeClass("selectedLove");
                    }else{
                        $(this).prevAll(".love").addClass("selectedLove");
                        $(this).addClass("selectedLove");
                    }
                });
        $(".uploadMap:nth-child(1)").click(function(){
                    var num=$(".discuss_uploadMap .uploadMap").length;
                    if(num > 5){
                        alert("你已超过上传图片数量的额度了！请删除几张");
                    }else if(num = 5) {
                        alert("你已达到上传图片数量的额度了！");
                    }
                });

    },
    nice:function (btn) {
        if($(btn).hasClass(".niceHot")){
            $(btn).removeClass("niceHot");
            $(btn).addClass("nice");
        }else{
            $(btn).removeClass("nice");
            $(btn).addClass("niceHot");
        }
    },

})
/***********************发表评价end**********************/


/***********************退款/售后start**********************/
Views.salePageView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'salePage',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        $(document).ready(function(){
            $(".settlementBtn").click(function(){
                $(this).parent(".myOrder_settlementArea").find(".settlementBtn").removeClass("changeBtn");
                $(this).addClass("changeBtn")
            });
        });

    },

})
/***********************退款/售后end**********************/

/***********************我的店铺start**********************/
Views.personalStoreView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'personalStore',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    }

})
/***********************我的店铺nd**********************/

/***********************店铺分销start**********************/
Views.storeDistributionView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'storeDistribution',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        $('.commissionPrompt').click(function(){
            $(this).parent().siblings('.sdList').children('.commission').hide();
            $(this).parent().siblings('.sdList').children('.commissionPrompt').show();
            $(this).hide();
            $(this).siblings('.commission').show();

        })


        $('.commission').click(function(){
            $(this).parent().siblings('.sdList').children('.commissionPrompt').show();
            $(this).hide();
            $(this).siblings('.commissionPrompt').show();
        })

    },

    goInStoreDetails:function(){
        Views.storeDetailsView.show();
    }

})
/***********************店铺分销nd**********************/

/***********************店铺身份start**********************/
Views.dpsfView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'dpsf',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $('.msList input').click(function(){
            $('#msHead_name').html($(this).parent().siblings('.left').html());
        });
    },


})
/***********************店铺身份nd**********************/

/***********************店铺详情start**********************/
Views.storeDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'storeDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        var swiper3 = new Swiper('.swiper3', {
            loop: true,
            autoplay: 3000,

        });
        $(function(){

            //导航条的显示隐藏
            $('#more').click(function(e){
            	var state =$('#sDNew').attr("data-state");
            	if(state == "hide"){
            		$('#sDNew').show();
            		$('#sDNew').attr("data-state","show");
            	}else{
            		$('#sDNew').hide();
            		$('#sDNew').attr("data-state","hide");
            	}
                $(document).click(function(){
                    $('#sDNew').hide();
                    $('#sDNew').attr("data-state","hide");
                });
                e.stopPropagation();
            });

            //导航条的显示隐藏
            window.onclick = function(e){

                e = e|| window.event;
                var el = e.srcElement;
                var className =  el.className;
                var id = el.id;

                if(className == "moreClose" || className == "list"){
                    $('#sDNew').show();
                    //$('#sDNew').attr("data-state","hide")
                }

                //分享
                if(id == "newShare"){
                    $('#bgMask').show();
                    $('#sDNew').hide();
                    $('#shareShowT').show();
                    $('#shareShowT').stop().animate({
                        bottom:0
                    });
                }
                if(id == "bgMask" || id == "bgCancel"){
                    $('#bgMask').hide();
                    $('#shareShow').hide();
                    $('#shareShowT').stop().animate({
                        bottom:'-405px'
                    });
                }
                //$('#sDNew').attr("data-state","show")
            }

            //店招
            window.onscroll = function () {
                var t = document.documentElement.scrollTop || document.body.scrollTop;
                if (t > 10) {
                    $('#shopSigns').stop().slideUp('500');
                    $('#shopHead').css("position","fixed");
                    $('#shopHead').css("top","0");
                    $('#shopHead').css("z-index","99");
                    $('#shopHead').css("height","44px");
                    $('#shopHead').css("background","rgb(191, 190, 190)");
                    // $('#shopHead').css("opacity",".9");

                    $('#windowBottom').stop().slideUp();
                }else{
                    $("#shopHead").removeAttr("style");
                    $('#shopSigns').stop().slideDown();
                    $('#windowBottom').stop().slideDown();
                }
            };
        });

        var url  = WEB_URL + '/api/store/selectOne';
        var data = {id:dataGet('storeId')}; //店铺ID

        $.ajax({
            type:'POST',
            dataType:'json',
            url:url,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    console.log(data);
                    var _thisData       = data.data;
                    var _thisName       = _thisData.store.name;//店铺名称
                    var _thisLogo       = _thisData.store.logo;//店铺Logo
                    var _thisIdentity   = _thisData.identity;//当前登录身份
                    var _thisIdCode     = _thisData.idCode;//店铺身份
                    dataSave('idCode', _thisIdCode);//存储当前身份 1 / 0
                    $('.sdbLogo').css('background-image','url('+_thisLogo+')');
                    $('.shopName .name').html(_thisName);
                    $('.shopName .identity').html('我的店铺身份：'+_thisIdentity);

                    if(_thisIdCode == 0){
                        var str ='';
                        var shopRole = _thisData.shopRole;
                        if(shopRole.length!==0){
                            for (var i=shopRole.length-1;i>=0;i--){
                                str += '<div class="becomeLeft ui_btn" data-action="becomeSort">' +shopRole[i].name+'</div>'
                            }
                            $('.become').html(str)
                        }else{
                            $('.become').html('该店铺目前还没有合伙人!')
                        }
                    }else{
                        var str = '';
                        var shopRole = _thisData.shopRole;
                        if(shopRole.length!==0){
                            $('.become').html('');
                        }else{
                            $('.become').html('该店铺目前还没有合伙人!')
                        }
                    };
                    $('.become div').each(function(){
                        if($(this).index()%2 !== 0){
                            $(this).css({borderRight:'inherit',width:'50%'});
                        }
                    });
                }
            }
        });


        // 店铺商品列表
        var urlTwo  = WEB_URL + '/api/goods/selectListOfSeller';
        var datas = {pageNum: 1, size: 10, saleStatus: 1, storeId: dataGet('storeId')};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwo,
            data: JSON.stringify(datas),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    var _length = data.data.list;
                    var str ='';
                    for (var i=0;i<_length.length;i++){
                        str += '<div class="product ui_btn" data-action="productSort" data-uuid="'+_length[i].id+'">'
                                +'<div class="pic">'+_length[i].veiw+'</div>'
                                +'<div class="content">'
                                +'<div class="contentTitle">'+_length[i].name+'</div>'
                                +'<div class="contentIntroduce">'+_length[i].goodsDesc+'</div>'
                                +'<div class="contentPrice"><span>￥</span>'+_length[i].price+'</div>'
                                +'</div>'
                                +'</div>'
                    }
                    $('.productArea').html(str);
                }
            }
        })

    },

    goInIntroduction:function(){
        Views.shopIntroductionView.show();
    },

    link_lc:function(){
        Views.commodityDetailsView.show();
    },
    link_zd:function(){
        Views.commodityDetailsView.show();
    },
    partake:function(){
        Views.partakeView.show();
    },
    sweepTheFace:function(){
        Views.sweepTheFaceView.show();
    },
    com_index:function(){
        Views.indexView.show();
    },
    // 客服
    com_customer:function(){
        Views.customerServiceView.show();
    },
    // 我的
    com_mine:function(){
        Views.indexMineView.show();
    },
    // 店铺简介
    com_dianpu:function(){
        Views.shopIntroductionView.show();
    },
    // 购买身份或补货
    becomeSort:function(){
        Views.becomeDetailsView.show();
    }



})
/***********************店铺详情nd**********************/

/***********************店铺介绍start**********************/
Views.shopIntroductionView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'shopIntroduction',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

})
/***********************店铺介绍nd**********************/

/***********************客服start**********************/
Views.customerServiceView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'customerService',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

})
/***********************客服nd**********************/

/***********************当面扫码**********************/
Views.sweepTheFaceView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'sweepTheFace',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },
    partake_off:function(){
        Views.storeDetailsView.show();
    }
})
/***********************当面扫码end**********************/

/***********************分享长图**********************/
Views.partakeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'partake',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },
    partake_off:function(){
        Views.storeDetailsView.show();
    }
})
/***********************end**********************/

/***********************兑换记录**********************/
Views.exchangeRecordView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'exchangeRecord',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

    },

    goInExchange:function(){
        Views.exchangeView.show();
    },

    //我的金豆
    zhuanzheng:function (){
        $('.miMask , .donation').show();
    },
    cancel:function (){
        $('.miMask , .donation').hide();
    },
    cancel_no:function (){
        $('.miMask , .donation').hide();
        $('.miMask').hide();
    },

})
/***********************end**********************/