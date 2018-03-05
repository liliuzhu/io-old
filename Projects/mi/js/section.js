/**
 * Created by LiLiuzhu on 2016/4/23.
 */
$(function(){
    $("#section .flootHeader .matchList li a").bind("mouseover",function(){
        $(this).addClass("thisIs").parent("li").siblings("li").children("a").removeClass("thisIs");
        var $ul=$(this).parent("li").parent("ul").parent(".matchList").parent(".flootHeader").next(".detail").children(".moreClass").children("ul");
        var value=$(this).parent("li").val();
        //console.log($ul[value]);
        $($ul[value]).addClass("activeList").siblings("ul").removeClass("activeList");
        //console.log($(this)[0]);
    });
    /*小和尚*/
    /*页签*/
    $(".content>ul>li>.pageControl ol li").bind("click",function(){
        $(this).addClass("pageActive").siblings("li").removeClass("pageActive");
       var $ol= $(this).parents(".pageControl").prev(".contentBox").children("ol");
        $ol[0].style.left=parseInt($(this).children("span").html())*-296+"px";
        console.log();
    });
    /*左右移动*/
    $(".content>ul>li>.pageLeftRight a").bind("click",function(){
        var $ol= $(this).parent("div").siblings(".contentBox").children("ol");
        var $page=$(this).parent("div").siblings(".pageControl").find(".pageActive");
        var html=$page.children("span").html();
        console.log(html);
        if($(this).hasClass("toLeft")){
            if(html>0){
                $page.removeClass("pageActive").prev("li").addClass("pageActive");
                $ol[0].style.left=-(html-1)*296+"px";
                console.log(-(html-1)*296);
            }
        }
        else{
            if(html<3){
                $page.removeClass("pageActive").next("li").addClass("pageActive");
                $ol[0].style.left=-((html>>>0)+1)*296+"px";
            }
        }
    });
});