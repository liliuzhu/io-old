/**
 * Created by LiLiuzhu on 2016/4/23.
 */
$(function(){
    $(".productClass:lt(7)").bind("mouseover",function(e){
        var e=e|| window.event;
        var target= e.target||e.srcElement;
        //console.log(target);
        //console.log($(".toggle-box>.container")[0]);
       // $(".toggle-box>.container").html($(target).next("ul").html()).show(1000);
        var $html=$(target).next().html();
        //console.log($html);
        $(".toggle-box>.container ul").html($html);
        $(".toggle-box").slideDown(300);
    });
    $(".productClass:gt(6)").bind("mouseover",function(){
        $(".toggle-box").slideUp(300);
    });
    $("#advertising").bind("mouseover",function(){
        $(".toggle-box").slideUp(300);
    });
    $(".search-box").bind("mouseover",function(){
        $(".toggle-box").slideUp(300);
    });
    $("header").bind("mouseover",function(){
        $(".toggle-box").slideUp(300);
    });
    $($(".productClass:eq(0)").prev("li")).bind("mouseover",function(){
        $(".toggle-box").slideUp(300);
    });
});
