/**
 * Created by liliuzhu on 2017/4/28.
 */
(function(window, document, undefined) {
    var include = function() {};
    include.prototype = {
        //倒序循环
        forEach: function(array, callback) {
            var size = array.length;
            for(var i = size - 1; i >= 0; i--){
                callback.apply(array[i], [i]);
            }
        },
        getFilePath: function() {
            var curWwwPath=window.document.location.href;
            var pathName=window.document.location.pathname;
            var localhostPaht=curWwwPath.substring(0,curWwwPath.indexOf(pathName));
            var projectName=pathName.substring(0,pathName.substr(1).lastIndexOf('/')+1);
            return localhostPaht+projectName;
        },
        //获取文件内容
        getFileContent: function(url) {
            //var ie = navigator.userAgent.indexOf('MSIE') > 0;
            //var o = ie ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
            //o.open('post', url, false);
            //o.send(null);
            //return o.responseText;
            return $.ajax({
                type: "get",
                data:"",
                dataType:"text",
                url: url,
                async: false
            }).responseText;
        },
        parseNode: function(content) {
            var objE = document.createElement("div");
            objE.innerHTML = content;
            return objE.childNodes;
        },
        executeScript: function(content) {
            var mac = /<script[\s]+[^>]+=[\s]*[^>]+><\/script>/gi;
            var r = [];
            while(r = mac.exec(content)) {
                if(this.parseNode(r[0])[0].src){
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = this.parseNode(r[0])[0].src;
                    document.getElementsByTagName("head")[0].appendChild(script);
                }else{
                    eval(r[0].slice(r[0].indexOf(">")+1,r[0].lastIndexOf("<")));
                }
            }
        },
        getHtml: function(content) {
            var href=window.location.href,
            ht=content.replace(/<script[\s]+[^>]+=[\s]*[^>]+><\/script>/gi, "").replace("page_"+href.slice(href.lastIndexOf("/")+1,href.lastIndexOf(".html")),"active ");
            if(href.indexOf("index.html")!=-1||href.indexOf(".html")==-1){
                //return ht.replace(/\.\.\//gi, "#*#").replace(/\.\//gi, "./Display/").replace(/#\*#/gi, "./");
                return ht.replace(/\.\//gi, "./Display/").replace(/\.\.\/Display/gi, ".");
            }else{
                return ht;
            }
        },
        getPrevCount: function(src) {
            var mac = /\.\.\//g;
            var count = 0;
            while(mac.exec(src)) {
                count++;
            }
            return count;
        },
        getRequestUrl: function(filePath, src) {
            if(/http:\/\//g.test(src)){ return src; }
            var prevCount = this.getPrevCount(src);
            while(prevCount--) {
                filePath = filePath.substring(0,filePath.substr(1).lastIndexOf('/')+1);
            }
            return filePath + "/"+src.replace(/\.\.\//g, "");
        },
        replaceIncludeElements: function() {
            var $this = this;
            var filePath = $this.getFilePath();
            var includeTals = document.getElementsByTagName("include");
            this.forEach(includeTals, function() {
                //拿到路径
                var src = this.getAttribute("src");
                //拿到文件内容
                var content = $this.getFileContent($this.getRequestUrl(filePath, src));
                //将文本转换成节点
                var parent = this.parentNode;
                var includeNodes = $this.parseNode($this.getHtml(content));
                for(var i = 0; i < includeNodes.length; i++) {
                    parent.insertBefore(includeNodes[i], this);
                }
                //执行文本中的额javascript
                parent.removeChild(this);
                $this.executeScript(content);
            })
        }
    };
    $(function(){
        new include().replaceIncludeElements();
    });
})(window, document) ;