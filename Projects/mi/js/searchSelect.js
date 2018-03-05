/**
 * Created by LiLiuzhu on 2016/4/26.
 */
$(function(){
   $(".search-box .inputKey").bind("focus",function(){
       $(".search-box .select")[0].style.display="block";
       $(".search-box .hotSearch")[0].style.display="none";
       var $inputs=$(".search-box input");
       var len=$inputs.length;
       for(var i=0;i<len;i++)
       {
           $inputs[i].style.borderColor="#ff6700";
       }
   });
    $(".search-box .inputKey").bind("blur",function(){
        $(".search-box .select").removeAttr("style");
        $(".search-box .hotSearch").removeAttr("style");
        $(".search-box input").removeAttr("style");

    })
});