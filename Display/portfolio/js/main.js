$(document).ready(function(){
//banner
    $("#owl-demo").owlCarousel({
        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        autoPlay : true,
        navText:["<i class='fa fa-angle-left fa-4x'></i>","<i class='fa fa-angle-right fa-4x'></i>"],
        navigationText: ["<i class='fa fa-angle-left fa-4x'></i>","<i class='fa fa-angle-right fa-4x'></i>"],
        singleItem:true
    });

    //weixin
    var weiXin = function(){
        var m = $('html').hasClass('touch'),
            $tip = $('.tip');
        if(!m){
            $('.fa-weixin').hover(function(){
                $tip.css({'height':'118px'});
            },function(){
                $tip.css({'height':'0'});
            });
        }else if(m){
            $(document).on('click',function(e){
                var h = $tip.height();
                var wx = e.target.id;
                if((h==0)&&(wx=='weixin')){
                    $tip.css({'height':'118px'});
                }else if(h==118){
                    $tip.css({'height':'0'});
                }
            })
        }
    };
    weiXin();
    //列表页
    var $wrapSort = $('#container-sort');
    var $container = $wrapSort.imagesLoaded(function () {
        $container.isotope({
            // options
            itemSelector: '.item',
            layoutMode: 'fitRows'
        });
    });
    /////动态计算
    $(window).resize(function () {
        var $wrapSortWidth = $wrapSort.width();
        var $item = $wrapSort.find('.item').outerWidth();
        var num = parseInt($wrapSortWidth/$item);

        $wrapSort.css('paddingLeft',($wrapSortWidth - $item*num)/2);
    });


    $('#filters').on( 'click', 'button', function() {
        var filterValue = $(this).attr('data-filter');
        //自己加的
        $(this).siblings(".btn-default").addClass("btn-info").removeClass("btn-default");
        $(this).addClass("btn-default").removeClass("btn-info");
        //自己加的
        $container.isotope({ filter: filterValue });
    });
    //详情页
    $('.fancybox').fancybox({
        prevEffect : 'none',
        nextEffect : 'none',
        afterLoad : function() {
            this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
        }
    });
    ///////////////////jobs//////////////////////
    $('.list-group a').click(function(e){
        e.preventDefault();
        var $this = $(this);
        var change = $this.find('>div').css('display');
        //alert(change);
        if(change=='none'){
            $this.find('i').removeClass('fa-plus').addClass('fa-minus');
        } else{
            $this.find('i').removeClass('fa-minus').addClass('fa-plus');
        }
    });
});
