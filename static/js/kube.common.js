// 获取URL路径
function getQueryPath() {
  var url = location.pathname; // 	获取当前URL的路径部分
   if (url.indexOf("/") != -1) {
     var str = url.substr(1);
     var arry = str.split("/");
   }
   return arry
}

// 获取URL参数
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
     var pair = vars[i].split("=");
     if(pair[0] == variable){return pair[1];}
  }
  return(false);
}

export {
  getQueryPath,
  getQueryVariable
}