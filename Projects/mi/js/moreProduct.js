/**
 * Created by LiLiuzhu on 2016/4/23.
 */
$(function(){
    $("#nav .lists .option>.list-unstyled>li").bind("mouseover",function(){
        $(this).addClass("hoverList");
        $(this).siblings("li").removeClass("hoverList");
    });
    $("#nav .lists .option").bind("mouseout",function(){
        $(".hoverList").removeClass("hoverList");
    });
});
