/**
 * Created by Administrator on 2017/5/19 0019.
 */
/***********************首页**********************/
Views.indexView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'index',
        hasFootNav: true,
        footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
        $('#tel').css('display','none');
        $('#index').css('display','block');
        $('#asd').css('display','none');
    },

    didShow: function () {
        var url = WEB_URL + '/api/indexAdvert/app/list';//首页顶部banner
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: url,
            data: {},
            contentType: 'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            },
            success: function (data) {
                if (!data.success) {
                    alert(data.msg);
                } else {
                    var _length = data.data.list;
                    var str = ''
                    for (var i = 0; i < _length.length; i++) {
                        str += '<div class="swiper-slide index_head ui_btn" data-action="banner_link">'
                            + '<img src="' + _length[i].picture + '" alt="" style="height:232px;width:100%;">'
                            + '</div>'

                    }
                    $('#swiper_sort').html(str);
                    var swiper1 = new Swiper('.swiper1', {
                        loop: true,
                        autoplay: 3000,

                    });
                }
            }
        });

        var urlOne = WEB_URL + '/api/indexProductConf/app/list/one';//火爆商品
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
                    $('.index_fireStorm').remove();
                }else{
                    var _length = data.data.listGoods;
                    // console.log(data.data);
                    var str = ''
                    for(var i=0;i<_length.length;i++){
                        str +='<div class="swiper-slide ui_btn" data-action="commodityDetails" data-uuid="'+_length[i].id+'">'
                            +_length[i].veiw
                            +'</div>'
                    }
                    $('#swiper_hot').html(str);
                }
                var swiper2 = new Swiper('.swiper2', {
                    loop: false,
                    freeMode : true,
                    freeModeMomentumRatio :0.5,
                    slidesPerView:2,
                    spaceBetween:2,
                });
                $('#swiper_hot').find('img').addClass('advert');
            }
        });

        var urlTwo = WEB_URL + '/api/indexProductConf/app/list/two?pageNum=1&pageSize=2' //猜你喜欢
        $.ajax({
            type:'POST',
            dataType:'json',
            url:urlTwo,
            data:{},
            contentType:'application/json;charset=utf-8',
            error: function (XMLHttpRequest, textStatus, errorThrown) {},
            success:function(data){
                if(!data.success){
                    console.log(data.msg);
                }else{
                    var _length = data.data.listGoods;
                    console.log(data);
                    var str = '';
                    for(var i=0;i<_length.length;i++){
                        str +='<div class="guessYoulike_area  ui_btn" data-uuid="'+_length[i].id+'" data-action="commodityDetails">'
                            +'<div class="guessYoulike_area_img">'+_length[i].veiw+'</div>'
                            +'<div class="guessYoulike_area_txt">'
                            +'<span>'+_length[i].name+'</span>'
                            +'<span>'+_length[i].goodsDesc+'</span>'
                            +'<span>￥ </span>'
                            +'<span style="margin-right: 8px;">'+_length[i].price+'</span>'
                            +'<span>'+_length[i].price+'付款</span>'
                            +'<div class="dian"></div>'
                            +'</div>'
                            +'</div>'
                    }
                    $('#max_width').html(str);
                }
            }
        });

    },
    banner_link:function(){
        Views.storeDetailsView.show();
    },
    //跳转到消息
    information:function(){
        Views.informationView.show();
    },

    //搜索
    seach:function(){
        Views.rakeThroughView.show();
    },

    //公益
    raise:function(){
        Views.raiseListView.show();
        $('#tel').css('display','none');
        $('#index').css('display','none');
        $('#asd').css('display','block');
    },

    //扫码支付
    payment:function(){
        Views.sweepCodeHomeView.show();
    },

    //个人美妆
    classification:function(){
        Views.classificationView.show();
    },

    //充值
    recharge:function(){
        Views.voucherCenterView.show();
    },

    //商品详情
    commodityDetails:function(btn){
            dataSave('commodityUuid', $(btn).attr('data-uuid'));//商品ID
        Views.commodityDetailsView.show();
    },
})


