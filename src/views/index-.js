module.exports=function (templateParams) {
  var _cssList=['vendor'];
  var webAssetsHelp=require('./webAssetsHelp.js')(templateParams,_cssList);
  var _html="{% extends './layout.html' %}"+
              "{% block title %}My Page{% endblock %}"+
              "{% block styles %}"+
              webAssetsHelp.styles+
              "{% endblock %}"+
              "{% block content %}{% include '../widget/index.html' %}{% endblock %}"+
              "{% block script %}"+
               '<script>' +
        '(function(){var flag=false;' +
        'var scriptsshow=[' + webAssetsHelp.scriptsshow + '];' +
        'for(let i=0; i<scriptsshow.length;  i++){' +
        'let a=scriptsshow[i];' +
        'if(localStorage.getItem(a)){' +
        '$("<scr"+"ipt>"+localStorage.getItem(a)+"</scr"+"ipt>").attr({type:"text/javascript",id:i}).appendTo($("head").remove("#"+i));' +'}' + //end of if
'else{$.getScript({url:a,success:function(data){localStorage.setItem(a,data)}});'
        '}' + //end fo else
        '}' + //end of for
        '})()' + //end of function
        '</script>' +
              "{% endblock %}";

              return _html;
}