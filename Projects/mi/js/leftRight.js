/**
 * Created by LiLiuzhu on 2016/4/24.
 */
$(function(){
    //$("#advertising .leftRight .startProduct  .control").
    $(".leftRight .hasControl  .control a").bind("click",function(){
        if($(this).hasClass("hovYel")){
            $(this).removeClass("hovYel").addClass("disabled");
            $(this).siblings("a").removeClass("disabled").addClass("hovYel");
            var ul=$(this).parent("div").parent("div").next(".leftRight-box").children("ul")[0];
            //console.log(ul)
            var left=parseInt(getComputedStyle(ul).left);
            //console.log(left);
            if(!left){
                ul.style.left=-1240+"px";
            }
            else{
                ul.style.left=0+"px";
            }
        }
    });

    var timer1=setInterval(function(){(
        function(){
            var $control=$(".leftRight .hasControl .control");
            var len=$control.length;
            for(var i=0;i<len;i++)
            {
                //console.log();
                $($control[i]).children(".hovYel").removeClass("hovYel").addClass("disabled").siblings("a").removeClass("disabled").addClass("hovYel");
                var ul=$(".leftRight .leftRight-box ul")[i];
                //console.log(ul)
                var left=parseInt(getComputedStyle(ul).left);
                //console.log(left);
                if(!left){
                    ul.style.left=-1240+"px";
                }
                else{
                    ul.style.left=0+"px";
                }
            }

        }
    )()
    },6000);
});
