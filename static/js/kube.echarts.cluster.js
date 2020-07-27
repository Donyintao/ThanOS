function GetUrlRelativePath() {
  var url = document.location.toString();
  var arrUrl = url.split("//");
  var start = arrUrl[1].indexOf("/");
  var relUrl = arrUrl[1].substring(start); //stop省略，截取从start开始到结尾的所有字符
  if(relUrl.indexOf("?") != -1){
    relUrl = relUrl.split("?")[0];
　}
  return relUrl;
}

// 集群CPU信息
var ChartsCPU_Total = echarts.init(document.getElementById('cpu_seconds'));
// 集群内存信息
var ChartsMemory_Available = echarts.init(document.getElementById('memory_available'));

$(function () {
  $.ajax({
    type: "post",
    url: GetUrlRelativePath(),
    dataType: 'json',
    success: function (result) {
      
      if (result.cpu_seconds_total > 90 ) {
        var FillArry = '#8B0000';
        var ColorArry = ['#8B0000', '#C0C0C0']
      } else if (result.cpu_seconds_total > 70 ){
        var FillArry = '#FFA500';
        var ColorArry = ['#FFA500', '#C0C0C0']
      } else {
        var FillArry = '#3CB371';
        var ColorArry = ['#3CB371', '#C0C0C0']
      }
      
      // 集群CPU使用率
      option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        graphic: [{ //环形图中间添加文字
          type: 'text', //通过不同top值可以设置上下显示
          left: 'center',
          top: '40%',
          style: {
            text: result.cpu_seconds_total+'%'+'\n'+'CPU使用率',
            textAlign: 'center',
            fill: FillArry, //文字的颜色
            fontSize: 14,
            fontWeight: 'bolder',
            fontFamily: "Microsoft YaHei"
          },
        }],
        series: [
          {
            name:'CPU使用率',
            type:'pie',
            hoverAnimation: false,  // 关闭放大效果
            radius: ['70%', '85%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            data:[
              {value: result.cpu_seconds_total, name: '已使用'},
              {value: 100 - result.cpu_seconds_total, name: '未使用'},
            ],
          }
        ],
        color: ColorArry
      };
      ChartsCPU_Total.setOption(option);
      
      if (result.memory_available > 90 ) {
        var FillArry = '#8B0000';
        var ColorArry = ['#8B0000', '#C0C0C0']
      } else if (result.memory_available > 70 ){
        var FillArry = '#FFA500';
        var ColorArry = ['#FFA500', '#C0C0C0']
      } else {
        var FillArry = '#3CB371';
        var ColorArry = ['#3CB371', '#C0C0C0']
      }
      // 集群内存使用率
      option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        graphic: [{ //环形图中间添加文字
          type: 'text', //通过不同top值可以设置上下显示
          left: 'center',
          top: '40%',
          style: {
            text: result.memory_available+'%'+'\n'+'内存使用率',
            textAlign: 'center',
            fill: FillArry, //文字的颜色
            fontSize: 14,
            fontWeight: 'bolder',
            fontFamily: "Microsoft YaHei"
          },
        }],
        series: [
          {
            name:'内存使用率',
            type:'pie',
            hoverAnimation: false,  // 关闭放大效果
            radius: ['70%', '85%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            data:[
              {value: result.memory_available, name: '已使用'},
              {value: 100 - result.memory_available, name: '未使用'},
            ],
          }
        ],
        color: ColorArry
      };
      ChartsMemory_Available.setOption(option);
    },
  });
});