/**
 * Created by Administrator on 2017/5/22 0022.
 */
/***********************手机充值**********************/
Views.voucherCenterView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'voucherCenter',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(document).ready(function(){
            $(".telephoneFare").click(function(){
                $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
                $(this).addClass("rSelected");
            });
        });
        addEventListener();
            $(".voucherCenter_telephoneArea .voucherCenter_Area").click(function () {
                if($(this).attr('class') == 'voucherCenter_Area first'){
                    console.log($(this))
                    $(this).children().removeClass('rSelected');
                }else{
                    $(".wantToRecharge_shady").show();
                    $(".wantToRecharge_payment").slideToggle();
                    $(".wantToRechargePay").show();
                }

            });
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
    goInchargeFlow:function(){
        Views.chargeFlowView.show();
    },

    goInRefuelingCard:function(){
        Views.refuelingCardView.show();
    },

    goInEntertainmentRecharge:function(){
        Views.entertainmentRechargeView.show();
    },

    goInBankCard:function(){
        Views.addBankCardView.show();
    },
})


/***********************流量充值**********************/
Views.chargeFlowView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'chargeFlow',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(document).ready(function(){
            $(".telephoneFare").click(function(){
                $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
                $(this).addClass("rSelected");
            });
        });
        addEventListener();
        $(".voucherCenter_telephoneArea .voucherCenter_Area").click(function () {
            $(".wantToRecharge_shady").show();
            $(".wantToRecharge_payment").slideToggle();
            $(".wantToRechargePay").show();
        });
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
})

/***********************加油卡**********************/
Views.refuelingCardView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'refuelingCard',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(document).ready(function(){
            $(".telephoneFare").click(function(){
                $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
                $(this).addClass("rSelected");
            });
        });
    },

    details:function(){
        Views.refuelingCardDetailsView.show();
    }
})

/***********************加油卡详情**********************/
Views.refuelingCardDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'refuelingCardDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(document).ready(function(){
            $(".telephoneFare").click(function(){
                $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
                $(this).addClass("rSelected");
            });
        });

        $(document).ready(function(){
            $(".details_amountAreaTxt").click(function(){
                if($(".details_amountAreaTxt").hasClass("conceal")){
                    $(".details_amountAreaTxt").removeClass("conceal")
                }else {
                    $(".details_amountAreaTxt ").addClass("conceal");
                    $(".details_amountAreaTxt:first").removeClass("conceal");
                    var txt = $('>span:nth-child(2)',this).html();
                    $(".details_amountAreaTxt:first span:nth-child(2)").html(txt);
                }

            });

        });
    },

    submitData:function(){
      var iText = $('.details_Fill .details_fillTxt input');
        for( var i=0; i<iText.length; i++){
            if( $(iText[i]).val().length == 0){
                alert("请输入相应的数据");
                return;
            }
        }

        var name = $('#name').val();
        var idCard = $('#idCard').val();
        var cardNumber =$('#cardNumber').val();
        var money = $('.details_amountArea .details_amountAreaTxt .rcd').html();
        alert(name +"," + idCard +"," + cardNumber);
    }



})

/***********************影视充值**********************/
Views.entertainmentRechargeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'entertainmentRecharge',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $('.hotPic div , .hotPicEntertainment').click(function(){
            Views.videoRechargeDetailsView.show()
        })
    },

    goInVideoRechargeDetails:function(){
        Views.videoRechargeDetailsView.show();
    },

})

/***********************影视充值详情**********************/
Views.videoRechargeDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'videoRechargeDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(document).ready(function(){
            $(".telephoneFare").click(function(){
                $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
                $(this).addClass("rSelected");
            });
        });
        addEventListener();
        $(".voucherCenter_telephoneArea .voucherCenter_Area").click(function () {
            if($(this).attr('class') == 'voucherCenter_Area first'){
                console.log($(this))
                $(this).children().removeClass('rSelected');
            }else{
                $(".wantToRecharge_shady").show();
                $(".wantToRecharge_payment").slideToggle();
                $(".wantToRechargePay").show();
            }

        });
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

    goInCode:function(){
        Views.activationCodeView.show()
    },

    usDel:function(btn){
        $('#del').val("");
    }

})

/***********************激活码充值**********************/
Views.activationCodeView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'activationCode',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(document).ready(function(){
            $(".telephoneFare").click(function(){
                $(this).parent().parent(".voucherCenter_telephoneArea").find(".telephoneFare").removeClass("rSelected");
                $(this).addClass("rSelected");
            });
        });
        addEventListener();
        $(".voucherCenter_telephoneArea .voucherCenter_Area").click(function () {
            $(".wantToRecharge_shady").show();
            $(".wantToRecharge_payment").slideToggle();
            $(".wantToRechargePay").show();
        });
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

})