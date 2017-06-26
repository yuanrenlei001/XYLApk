/**
 * Created by Administrator on 2017/5/19 0019.
 */
/***********************搜索**********************/
Views.rakeThroughView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'rakeThrough',
        //hasFootNav: true,
        //footItemOrder: 0, // hasFootNav设置true才有效   表示现在远着的是底部第几个菜单 0开始
        //itemClass: 'item'
    },

    willShow: function (param, isBackPage) {
        this.show(param, isBackPage);
    },

    didShow: function () {
        $(document).ready(function(){
            $(".eye").click(function(){
                if($(this).hasClass("seSelected")) {
                    $(this).removeClass("seSelected");
                    $(this).parent().parent().find(".searchInput").hide();
                    $(this).parent().parent().find(".rankThrough_record").show();
                }else {
                    $(this).addClass("seSelected");
                    $(this).parent().parent().find(".searchInput").show();
                    $(this).parent().parent().find(".rankThrough_record").hide();
                }
            });
            $(".del").click(function(){
                $('#fixed_close').show();
            });
            $('#del').click(function(){
                $('#fixed_close').hide();
                $('.history').remove();
            });
            $('#cel').click(function(){
                $('#fixed_close').hide();
            });
            $('#more').click(function (e) {
                if($('#sDNew').css('display')=='none'){
                    $('#sDNew').show();
                }else{
                    $('#sDNew').hide();
                }
                $(document).click(function(){
                    $('#sDNew').hide();
                });
                e.stopPropagation();
            });
            var side ;
            $('.new .list').click(function(){
                $('#searchSel_demo').html($(this).text()+'<span style="float:right;margin-right: 20%;"><img src="images/index/icon_01.png" alt=""></span>');
                side = $(this).data('side');
            });
            $('#search').click(function(){
                if( side == 1){
                    //alert('商家');
                    Views.searchShopView.show();
                }else{
                    //alert('店铺');
                    Views.commodityListView.show();
                }
            });
        });
    },
    shopping_list:function(){
        Views.commodityDetailsView.show();
    }
});

/***********************搜索商家start**********************/
Views.searchShopView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'searchShop',
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
            $('#more').click(function(){
                var state =$('#sDNew').attr("data-state");
                if(state == "hide"){
                    $('#sDNew').show();
                    $('#sDNew').attr("data-state","show")
                }else{
                    $('#sDNew').hide();
                    $('#sDNew').attr("data-state","hide")
                }

            })

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
            $('.ssSort .right').click(function(){
                $('.screen').show();
                $('.ssMask').show();
            })

            //筛选关闭
            $('.screen .close').click(function(){
                $('.screen').hide();
                $('.ssMask').hide();
            })
            $('.ssMask').click(function(){
                $('.screen').hide();
                $('.ssMask').hide();
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
                //var aa = $('.screen .theme .selected').text()+",";
                console.log(screen);
            })
        })
    },
})
/***********************搜索商家end**********************/


/***********************搜索店铺start**********************/
Views.sCommodityListView = $.extend({}, Views.PanelView, {
    options: {
        tmpl: 'sCommodityList',
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
            $('#more').click(function(){
                var state =$('#sDNew').attr("data-state");
                if(state == "hide"){
                    $('#sDNew').show();
                    $('#sDNew').attr("data-state","show")
                }else{
                    $('#sDNew').hide();
                    $('#sDNew').attr("data-state","hide")
                }

            })

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
            $('.slSort .right').click(function(){
                $('.screen').show();
                $('.slMask').show();
            })

            //筛选关闭
            $('.screen .close').click(function(){
                $('.screen').hide();
                $('.slMask').hide();
            })
            $('.slMask').click(function(){
                $('.screen').hide();
                $('.slMask').hide();
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
                //var aa = $('.screen .theme .selected').text()+",";
                console.log(screen);
            })
        })
    },
})
/***********************搜索店铺end**********************/