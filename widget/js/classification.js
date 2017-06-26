/**
 * Created by Administrator on 2017/5/22 0022.
 */
/***********************个人美妆start**********************/
Views.classificationView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'classification',
        hasFootNav: true,
        footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        $('.dropDown').click(function(){
            $('.ciMask').css("display","block");
            $('.dropDownBox').css("display","block");
            $('html').css({'overflow':'hidden','height':'100%'});
            $('body').css({'overflow':'hidden','height':'100%'});
        })

        $('.ciMask').click(function(){
            $('.ciMask').css("display","none");
            $('.dropDownBox').css("display","none");
            $('html').css({'overflow':'auto'});
            $('body').css({'overflow':'auto'});
        })

        $('.whole .right').click(function(){
            $('.ciMask').css("display","none");
            $('.dropDownBox').css("display","none");
            $('html').css({'overflow':'auto'});
            $('body').css({'overflow':'auto'});
        })

        $('.more').click(function (e) {
            if($('#sDNew').css('display')=='none'){
                $('#sDNew').show();
            }else{
                $('#sDNew').hide();
            }
            $(document).click(function(){
                $('#sDNew').hide();
            })
            e.stopPropagation();
        });




    },

    goInCommodityList:function(){
        Views.commodityListView.show();
    },
})
/***********************个人美妆end**********************/

/***********************商品详情start**********************/
Views.commodityDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'commodityDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        addEventListener();

        var urlTwo = WEB_URL + '/api/goods/selectOne' ;//根据id 获取商品
        var commodityUuid = parseInt(dataGet('commodityUuid'));
        var data   = {id:commodityUuid};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwo,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    var _thisData           = data.data;
                    var bannerImg           = _thisData.carouselPicture==null?'':_thisData.carouselPicture.split(','); //商品详情轮播图
                    var commodityName       = _thisData.name;//商品名称
                    var commodityPrice      = _thisData.price;//商品单价
                    var commodityGoodsTags  =_thisData.goodsTags;//正品保障
                    var commodityGoodsSpecs =_thisData.goodsSpecs;//产品颜色等参数
                    var storeId             =_thisData.storeId;//店铺ID
                    dataSave('storeId', storeId);
                    //商品详情轮播图赋值
                    var strBanner = '';
                    for(var i=0;i<bannerImg.length;i++){
                        strBanner +='<div class="swiper-slide ui_btn">'
                            +'<img src="'+bannerImg[i]+'" alt="" style="min-height: 300px;">'
                            +'</div>'
                    }
                    $('#bannerImg').html(strBanner);
                    var swiper1 = new Swiper('.swiper1', {
                        loop: true,
                        autoplay: 3000,

                    });

                    //商品名称赋值
                    $('.productName .name').html(commodityName);

                    //商品名称赋值
                    $('.price').html('<span>￥</span>'+commodityPrice);

                    //正品保障赋值
                    var strGoodsTags = '';
                    for (var j=0;j<commodityGoodsTags.length-2;j++){
                        strGoodsTags += '<div class="cdItem fL">'
                                        +'<div class="flag fL"></div>'
                                        +'<div class="cdTitle fL">'+commodityGoodsTags[i].name+'</div>'
                                        +'</div>'
                    }
                    $('.discount').html(strGoodsTags);
                    // 正品保障弹框赋值
                    var strGoodsTagsFixed = '';
                    for (var j=0;j<commodityGoodsTags.length;j++){
                        strGoodsTagsFixed += '<div class="shoppingCart_properties_list"><span><img src="images/commodityDetails/choice.png" alt=""></span>'+commodityGoodsTags[j].name+'</div>'
                    }
                    $('#shoppingCart_properties_list').html(strGoodsTagsFixed);

                    // 颜色尺码等赋值
                    var strGoodsSpecs = '';
                    var keyArray=new Array();
                    for (var k=0;k<commodityGoodsSpecs.length;k++){
                         var _name =eval('(' + commodityGoodsSpecs[k].specData + ')');
                        // console.log(commodityGoodsSpecs[k].id);
                        for(var p in _name){
                            keyArray.push(_name[p].key);
                        }
                    }
                    keyArray =removeDuplicatedItem(keyArray);
                    for(var o in keyArray){
                        strGoodsSpecs += '<div class="shoppingCart_qualityArea">'
                                        +'<div class="shoppingCart_qualityTop">'+keyArray[o]+'</div>';
                        for (var k=0;k<commodityGoodsSpecs.length;k++){
                            var _name =eval('(' + commodityGoodsSpecs[k].specData + ')');
                            for(var p in _name){
                                if(keyArray[o]==_name[p].key){
                                    strGoodsSpecs += '<div class="shoppingCart_qualityBtn">'
                                                    +'<div class="area" data-uuid="'+commodityGoodsSpecs[k].id+'">' +_name[p].value +'</div>'
                                                    +'</div>';
                                }
                            }
                        }
                        strGoodsSpecs +='</div>';



                    }
                    $('.shoppingCart_quality').html(strGoodsSpecs);
                    $('.shoppingCart_quality .shoppingCart_qualityArea').eq(1).find('.shoppingCart_qualityBtn').eq(1).css('display','none')
                }
            }
        });



        //头部
        window.onscroll = function () {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t > 3) {
                $('.headTwo').stop().fadeIn(500);
                $('.headOne').stop().fadeOut(100);
            }else{
                $('.headOne').stop().fadeIn(500);
                $('.headTwo').stop().fadeOut(100);

            }
        };
        addEventListener();
        function addcoll(){
            if($('#collection').hasClass('collection')){
                $('#collection').removeClass('collection').addClass('collections');
            }else{
                $('#collection').removeClass('collections').addClass('collection');
            }
        }

        $('.more').click(function (e) {
            if($('#sDNew').css('display')=='none'){
                $('#sDNew').show();
            }else{
                $('#sDNew').hide();
            }
            $(document).click(function(){
                $('#sDNew').hide();
            })
            e.stopPropagation();
        });
        $(".discount").click(function(){
            $("#mine_warp_01 .shoppingCart_properties").show();
            $("#mine_warp_01 .shoppingCart_black").show();
            $("#mine_warp_01 .shoppingCart_check").show()
        });
        $("#attribute_01").click(function(){
            $("#mine_warp_02 .shoppingCart_properties").show();
            $("#mine_warp_02 .shoppingCart_black").show();
            $("#mine_warp_02 .shoppingCart_check").show()
        });
        $("#attribute_02").click(function(){
            $("#mine_warp_03 .shoppingCart_properties").show();
            $("#mine_warp_03 .shoppingCart_black").show();
            $("#mine_warp_03 .shoppingCart_check").show()
        });
        $(document).on('click','.area',function(){
            if($(this).is('.unchecked')){
                return;
            }
            $(this).parent().parent(".shoppingCart_qualityArea").find(".area").removeClass("pitchOn");
            $(this).addClass("pitchOn");
            dataSave('areaUuid', $(this).attr('data-uuid'));
            dataSave('areaHtml', $(this).text());
        });

        $('#collection').click(function(){
            if($(this).hasClass('coll')){
                $(this).css({backgroundImage:'url(images/commodityDetails/collection.png)',color:'#e60012'});
                $(this).removeClass('coll');
            }else{
                $(this).addClass('coll');
                $(this).css({backgroundImage:'url(images/commodityDetails/collection_hide.png)',color:'#ccc'});
            }
        });
        $('#type1').on('click',function(){$("html,body").animate({scrollTop: $(".headFigure").offset().top}, 500);});
        $('#type2').on('click',function(){$("html,body").animate({scrollTop: $("#evaluate").offset().top}, 500);});
        $('#type3').on('click',function(){$("html,body").animate({scrollTop: $("#evaluateTitle").offset().top}, 500);});
        $(function(){
            var s=1;
            $('.min').on('click',function(){
                s--;
                if(s<=1){s=1};
                $('.num').html(s);
                dataSave('areaNum', s);
            });
            $('.mix').on('click',function(){
                s++;
                var cdStock = $('#cdStock').html();
                if( s> cdStock){
                    alert("已经是最大库存");
                    return;
                }
                $('.num').html(s);
                dataSave('areaNum', s);
            });
        });

        $(document).on('click','.shoppingCart_black',function(){
            $('.shoppingCart_black').hide();
            $('.shoppingCart_properties').hide();
            $('.shoppingCart_check').hide();
        });
    },
    // 各链接跳转
    // 首页
    com_index:function(){
        Views.indexView.show();
    },
    shoppingCart_check:function(){
        $(".shoppingCart_properties").hide();
        $(".shoppingCart_black").hide();
        $(".shoppingCart_check").hide()
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
    // 分享
    com_fenxiang:function(){
        $('#bgMask').show();
        $('#sDNew').hide();
        $('#shareShowT').show();
        $('#shareShowT').animate({
            bottom:0
        });
    },

    bgCancel:function(){
        $('#bgMask').hide();
        $('#shareShow').hide();
        $('#shareShowT').animate({
            bottom:'-405px'
        });
    },
    // 店铺详情
    shop_room:function(){
        Views.storeDetailsView.show();
    },
    // 跳购物车
    go_shoppingcar:function(){
        Views.shoppingCartView.show();
    },
    shppping:function(){
        // var isLoginFlag = isLogin();
        // if(!isLoginFlag) {
        //     return;
        // }
        Views.successOrderView.show();
    }
    // 收藏
});
/***********************商品详情end**********************/


/***********************购买店铺详情start**********************/
Views.becomeDetailsView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'becomeDetails',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {

        addEventListener();

        var url     = WEB_URL + '/api/shopRole/selectOne';
        var data    ={storeId:dataGet('storeId'),introType:dataGet('idCode')};

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
                    var _thisBanner     = _thisData.pictureUrl;//店铺详情轮播图
                    var _thisShopRoles  = _thisData.shopRoles;//店铺身份分类
                    //店铺详情轮播图赋值
                    var strBanner = '';
                    // for(var i=0;i<_thisBanner.length;i++){
                    //     strBanner +='<div class="swiper-slide ui_btn">'
                    //         +'<img src="'+_thisBanner[i]+'" alt="" style="min-height: 300px;">'
                    //         +'</div>'
                    // }
                    $('#bannerImg').html(strBanner);
                    var swiper1 = new Swiper('.swiper4', {
                        loop: true,
                        autoplay: 3000,

                    });

                    //店铺分类赋值
                    var strShop = '';
                    for (var i=_thisShopRoles.length-1;i>=0;i--){
                        strShop += '<span data-icon="'+_thisShopRoles[i].icon
                                    +'" data-id="'+_thisShopRoles[i].id
                                    +'" data-price="'+_thisShopRoles[i].price+'">'+_thisShopRoles[i].name+'</span>'
                    }
                    $('#shopSort').html(strShop);
                }
            }
        });


        //头部
        window.onscroll = function () {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if (t > 3) {
                $('.headTwo').stop().fadeIn(500);
                $('.headOne').stop().fadeOut(100);
            }else{
                $('.headOne').stop().fadeIn(500);
                $('.headTwo').stop().fadeOut(100);

            }
        };
        addEventListener();
        function addcoll(){
            if($('#collection').hasClass('collection')){
                $('#collection').removeClass('collection').addClass('collections');
            }else{
                $('#collection').removeClass('collections').addClass('collection');
            }
        }

        $('.more').click(function (e) {
            if($('#sDNew').css('display')=='none'){
                $('#sDNew').show();
            }else{
                $('#sDNew').hide();
            }
            $(document).click(function(){
                $('#sDNew').hide();
            })
            e.stopPropagation();
        });

        $('.shoppingCart_black').click(function(){
            $(".shoppingCart_properties").hide();
            $(".shoppingCart_black").hide();
            $(".shoppingCart_check").hide()
        });

        $(document).on('click','#shopSort span',function(){
            $('#shopSort span').removeClass('actives');
            $(this).addClass('actives');
            $('.header').html('<img src="'+$(this).data('icon')+'" alt="">');
            $('.arrange').html('￥'+$(this).data('price'));
            dataSave('roleId',$(this).data('id'));
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
        $('#sdasda .wantToRechargeChangeArea').click(function(){
            $('#sdasda').hide();
            $('.wantToRechargePay').show();
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
    // 各链接跳转
    // 首页
    com_index:function(){
        Views.indexView.show();
    },
    shoppingCart_checks:function(){
        // $('#shopSort span').each(function(){
        //     if($(this).hasClass('actives')){
        //
        //     }else{
        //         alert('您为选择身份类型无法下单');
        //         return;
        //     }
        // });
        $(".shoppingCart_properties").hide();
        $(".shoppingCart_check").hide();
        $('#yqm').show();
    },

    yqmQd:function(){
        $(".shoppingCart_properties").hide();
        $(".shoppingCart_check").hide();
        $(".shoppingCart_black").hide();
        $('#yqm').hide();
        var url         = WEB_URL + '/api/orderMall/addRole';
        var storeId     = dataGet('storeId'); //店铺id
        var orderType   = dataGet('idCode')==0?6:8; //订单类型3业务充值 4余额充值 6店铺身份购买 7平台身份购买 8补货 9金豆充值
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
        var buyerMess   =$('#textarea').val();
        var shopRoleDist={roleId:dataGet('roleId'),invitedNum:$('#txqyqm').val()};
        var data        ={storeId:storeId,orderType:orderType,consignee:consignee,mobile:mobile,zipCode:zipCode,province:province,provinceName:provinceName,city:city,cityName:cityName,county:county,countyName:countyName,address:address,buyerMess:buyerMess,shopRoleDist:shopRoleDist};

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
                    dataSave('payIdsss',data.data.id)
                }
            }
        });
        $(".wantToRecharge_shady").show();
        $(".wantToRecharge_payment").slideToggle();
        $(".wantToRechargePay").show();
    },
    yqmQx:function(){
        $(".shoppingCart_properties").hide();
        $(".shoppingCart_check").hide();
        $(".shoppingCart_black").hide();
        $('#yqm').hide();
    },

    payFors:function(){
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
                    dataSave('PayIdss',data.data.payId)
                }
            }
        });

        $('#payFixed').show();
    },
    paySuccesssss:function(){
        var urlTwos = WEB_URL + '/api/coreMoney/balancePay' ;//支付
        var tradeNo = dataGet('PayIdss');
        var payPassword = $('#passwords').val();
        console.log(payPassword);
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
                    $('.wantToRecharge_shady').hide();
                    $('.wantToRecharge_payment').hide();
                }
            }
        });
        $('#payFixed').hide();
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
    // 分享
    com_fenxiang:function(){
        $('#bgMask').show();
        $('#sDNew').hide();
        $('#shareShowT').show();
        $('#shareShowT').animate({
            bottom:0
        });
    },

    bgCancel:function(){
        $('#bgMask').hide();
        $('#shareShow').hide();
        $('#shareShowT').animate({
            bottom:'-405px'
        });
    },
    // 收藏
    discount:function(){
        var isLoginFlag = isLogin();
        if(!isLoginFlag) {
            return;
        }
        $("#mine_warp_02 .shoppingCart_properties").show();
        $("#mine_warp_02 .shoppingCart_black").show();
        $("#mine_warp_02 .shoppingCart_check").show()
    }
});
/***********************购买店铺详情end**********************/

/***********************确认订单start**********************/
Views.successOrderView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'successOrder',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        var urlTwo = WEB_URL + '/api/orderMall/selectOfConfirm' ;//app确认订单页面所需数据查询
        var areaUuid = dataGet('areaUuid');//id
        var areaNum = dataGet('areaNum');//数量
        var areaHtml = dataGet('areaHtml');//参数
        var arr = [{'specId':areaUuid,'quantity':areaNum}];
        var data   = {orderType:5,orderGoods:arr};
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwo,
            data: JSON.stringify(data),
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    var _thisData = data.data;
                    var projectSort = _thisData.stores[0].goodsList[0];
                    $('.print').html(projectSort.veiw);
                    $('.warp_lC').html(projectSort.name);
                    $('#monrys').html('<span>￥</span>'+projectSort.price);
                    $('#colors').html('<span>颜色分类：</span>'+areaHtml);
                    $('#numss').html('<span>X</span>'+areaNum);
                    $('#shijiMoney').html(projectSort.price*areaNum);
                    $('#sumMoney').html(projectSort.price*areaNum);
                    $('#storeId').val(_thisData.fareTemplates[0].storeId);
                    $('#productId').val(_thisData.stores[0].goodsList[0].id);
                    console.log(_thisData);
                }
            }
        });

        $('.selectfoot').click(function(){
            var urlThree = WEB_URL + '/api/orderMall/add' ;//生成订单
            var storeId  = parseInt($('#storeId').val()); //店铺ID
            var expressValue  = 0;//运费
            var isGold  = 0;//是否使用金豆抵扣现金  0是，1否
            var discount  = 0;//是否使用金豆抵扣现金  0是，1否
            var consignee = $('#logisticsAreaName').text(); //姓名
            var mobile = '18329192010'; //电话
            var zipCode = "311112";//邮编
            var province = "10";//省id
            var provinceName = "浙江省";//省名称
            var city = "100";//市id
            var cityName = "杭州市";//市名称
            var county = "1000";//区id
            var countyName = "拱墅区";//区名称
            var address = "天堂e谷三幢411室";//详细地址信息
            var arrs = [{'productId':parseInt($('#productId').val()),'specId':parseInt(areaUuid),'quantity':parseInt(areaNum),'mode':0}];
            var data = [{storeId:storeId,expressValue:expressValue,isGold:isGold,discount:discount,consignee:consignee,mobile:mobile,zipCode:zipCode,province:province,provinceName:provinceName,city:city,cityName:cityName,county:county,countyName:countyName,address:address,orderGoods:arrs}];
            $.ajax({
                type:'POST',
                dataType:'json',
                url:urlThree,
                data: JSON.stringify(data),
                contentType:'application/json;charset=utf-8',
                error: function (XMLHttpRequest, textStatus, errorThrown) {},
                success:function(data){
                    if(!data.success){
                        console.log(data.msg);
                    }else{

                        dataSave('PayId', data.data[0].id);//支付商品id
                        console.log(data.data);
                    }
                }
            });
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
        $('#sdasda .wantToRechargeChangeArea').click(function(){
            $('#sdasda').hide();
            $('.wantToRechargePay').show();
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


    payFor:function(){
        var urlTwos = WEB_URL + '/api/orderMall/payment' ;//发起支付
        var payId  ='';
        var payType = 3;
        var id = dataGet('PayId');//id
        var orderMalls = [{id:id}];
        var data = {payId:payId,payType:payType,orderMalls:orderMalls};
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
                    console.log(data.data);
                    dataSave('payIds', data.data.payId);//支付商品id
                }
            }
        });



        $('#payFixed').show();

    },

    paySuccess:function(){

        var urlTwos = WEB_URL + '/api/coreMoney/balancePay' ;//支付
        var tradeNo = dataGet('payIds');
        var payPassword = $('#passwords').val();
        console.log(payPassword);
        var data = {tradeNo:tradeNo,payPassword:payPassword};
        console.log(data)
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
                    $('.wantToRecharge_shady').hide();
                    $('.wantToRecharge_payment').hide();
                    Views.myOrderView.show();
                }
            }
        });
        $('#payFixed').hide();
    }

})
/***********************确认订单end**********************/
/***********************商品列表start**********************/
Views.commodityListView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'commodityList',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        addEventListener();

        $(function() {
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
                })
                e.stopPropagation();
            });

            //选择
            $('.screen .theme .listName').click(function(){
                if($(this).hasClass('listName')){
                    $(this).removeClass('listName');
                    $(this).addClass('selected');
                    $(this).append("<div class='delete'></div>");
                }else{
                    $(this).children('.delete').remove();
                    $(this).removeClass('selected');
                    $(this).addClass('listName');
                }

            })

            //筛选打开
            $('.sort .right').click(function(){
                $('.screen').show();
                $('.mask').show();
            })

            //筛选关闭
            $('.screen .close').click(function(){
                $('.screen').hide();
                $('.mask').hide();
            })
            $('.mask').click(function(){
                $('.screen').hide();
                $('.mask').hide();
            })

            //价格范围选择
            $('.theme .most').click(function(){
                var range = $(this).children('.range').html();
                var rangeArray = range.split("-");
                $('.theme .choice .minimum ').val(rangeArray[0]);
                $('.theme .choice .highest ').val(rangeArray[1]);
            })

            //重置
            $('.reset').click(function(){
                $('.screen .theme .selected').children('.delete').remove();
                $('.screen .theme .selected').removeClass('selected').addClass('listName');
            })

            //完成
            $('.complete').click(function(){
                var screen =[];
                var len =  $('.screen .theme .selected').length;
                for(var i=0; i<len; i++){
                    screen[i] = $('.screen .theme .selected').eq(i).text();
                }
            });
            // 排序
            $('.sort .right').click(function(){
                // $('#showsss').append('<i><img src="images/storeDetails/icon_02.png" alt=""></i>').addClass('showsss').css('color','#666');
                $('#showsss img').attr('src','images/storeDetails/icon_02.png');
                $('#showsss').addClass('showsss').css('color','#666');
                $('#fixed').hide();
                });
            $('.left .type').click(function(){
                if($(this).attr('id')=='showsss'){
                    $('.left .type').removeClass('actives').find('i').remove();
                    $(this).addClass('actives');
                }else{
                    $('.left .type').removeClass('actives').find('i').remove();
                    $(this).addClass('actives');
                    $('#showsss').append('<i><img src="images/storeDetails/icon_02.png" alt=""></i>').addClass('showsss').css('color','#666');
                    $('#fixed').hide();
                }
            });
            $('#showsss').click(function(e){
                if($(this).hasClass('showsss')){
                    $(this).append('<i><img src="images/storeDetails/icon_01.png" alt=""></i>').removeClass('showsss').css('color','#f00');
                    $('#fixed').show();
                }else{
                    $(this).append('<i><img src="images/storeDetails/icon_02.png" alt=""></i>').addClass('showsss').css('color','#666');
                    $('#fixed').hide();
                }
                $(document).click(function(){
                    $('#showsss img').attr('src','images/storeDetails/icon_02.png');
                    $('#showsss').addClass('showsss').css('color','#666');
                    $('#fixed').hide();
                });
                e.stopPropagation();
            });
            $('#fixed .fixed_sort').click(function(){
                $('#fixed_list .fixed_sort').removeClass('fixed_list_active').find('i').remove();
                $(this).addClass('fixed_list_active').append('<i><img src="images/storeDetails/icon_03.png" alt=""></i>');
                $('#fixed').hide();
                $('#showsss img').attr('src','images/storeDetails/icon_02.png');
                $('#showsss').addClass('showsss').css('color','#666');
                $('#fixed').hide();
            });
        })
    },

    //商品详情
    commodityDetails:function(){
        Views.commodityDetailsView.show();
    },
})
/***********************商品列表end**********************/