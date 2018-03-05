/**
 * Created by LiLiuzhu on 2016/4/25.
 */
$(function(){
    var data=[{"title":"小米2016春季新品发布会","src":"//hd.mi.com/f/zt/hd/misc/youku.html?vid=XMTQ4NjE5NTQyNA=="},
              {"title":"15秒了解小米5 有多快","src":"//hd.mi.com/f/zt/hd/misc/youku.html?vid=XMTUwMTEyMjk0MA=="},
              {"title":"《去探索》小米年度品牌视频","src":"//hd.mi.com/f/zt/hd/misc/youku.html?vid=XMTQ4MDYzNDE0OA=="},
              {"title":"小米5 给你一次关于优雅的想象","src":"//hd.mi.com/f/zt/hd/misc/youku.html?vid=XMTQ4MDU2MTkzMg=="}
    ];

    $(".modal .view .close").bind("click",function(){
       $(this).parents(".view.play").removeAttr("style").removeClass("play").find("iframe").attr("src","");
        setTimeout(function(){
            $(".modal")[0].style.display="none";
        },700);
    });
    for(var i=0;i<4;i++)
    {
        $($("#video ul li")[i]).find("a").bind("click",function(e){
            var index=$(this).parents("li").index();
            //console.log(index);
            $(".modal")[0].style.display="block";
            //console.log($(data)[index].title);
            var $view=$(".modal .view");
            $view.find("h3").html($(data)[index].title);
            $view.find("iframe").attr("src",$(data)[index].src);
            $view.addClass("play");
            var $play=$(".modal .view.play");
            var top=parseInt(getComputedStyle($play[0]).marginTop);
            console.log(top);
            for(;;){
                if(top<-298)
                {
                    top+=1;
                    $play[0].style.marginTop=top+"px";
                }
                else{
                    break;
                }
            }
            console.log(top);
        });
    }

});
