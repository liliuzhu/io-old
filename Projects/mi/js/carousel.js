/**
 * Created by Administrator on 2016/4/21.
 */
/*淡入淡出*/
$(function(){
   var  $carousel=$("#carousel");
    var isStart=true;
    var $lis=$("#carousel .one2").children("li");
    var len=$lis.length;
    $carousel.bind("mouseover",function(){
        isStart=false;
    });
    $carousel.bind("mouseout",function(){
        isStart=true;
    });
    $(".index a").bind("click",function(e){
        var e=e|| window.event;
        var target= e.target||e.srcElement;
        $("#carousel .index .navbar").removeClass("navbar");
        $(target).addClass("navbar");
        var thisIs=$(target).attr("title");
        $("#carousel .one2").children("li.active").removeClass("active");
        $("#carousel .one2 li[value="+thisIs+"]").addClass("active");
    });
    function nextAd(){
        var $active=$("#carousel .one2").children("li.active");
        var $navbar=$("#carousel .index .navbar");
        var $value=$active.attr("value");
        $active .removeClass("active");
        $navbar.removeClass("navbar");
        var $nextNavbar=$("#carousel .index a[title="+$value+"]");
        //console.log($nextNavbar[0]);
        if($value<len-1){
            $active.next("li").addClass("active");
            $nextNavbar.parent("li").next("li").children("a").addClass("navbar");
        }
        else{
            $lis.eq(0).addClass("active");
            $(".index a").eq(0).addClass("navbar");
        }
    }
    function prevAd(){
        var $active=$("#carousel .one2").children("li.active");
        var $navbar=$("#carousel .index .navbar");
        var $value=$active.attr("value");
        $active .removeClass("active");
        $navbar.removeClass("navbar");
        var $nextNavbar=$("#carousel .index a[title="+$value+"]");
        //console.log($nextNavbar[0]);
        if($value>0){
            $active.prev("li").addClass("active");
            $nextNavbar.parent("li").prev("li").children("a").addClass("navbar");
        }
        else{
            $lis.eq(4).addClass("active");
            $(".index a").eq(4).addClass("navbar");
        }
    }
    $("a.ad-next").bind("click",(function(){
        nextAd();
    }));
    $("a.ad-prev").bind("click",(function(){
        prevAd();
    }));
    var timer=setInterval(function(){
        if(isStart){
            nextAd();
        }
    },4000);
})