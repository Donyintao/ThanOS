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

// 每天发布
var DeployTodayContent = echarts.init(document.getElementById('deploy-today-content'));
var DeployToDayCount = echarts.init(document.getElementById('deploy-today-count'));

// 每月发布
var DeployMonthContent = echarts.init(document.getElementById('deploy-month-content'));
var DeployMonthCount = echarts.init(document.getElementById('deploy-month-count'));

$(function () {
  $.ajax({
    type: 'post',
    url: GetUrlRelativePath() + '/release',
    dataType: 'json',
    success: function (result) {
      var data = result.success_countday;
      var dateList = data.map(function (item) {
        return item[0];
      });
      var valueList = data.map(function (item) {
        return item[1];
      });
      
      // 当天发布统计
      option = {
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 1,
          min: 0,
          max: 400
        }],
        
        title: [{
          left: 'center',
          text: '今天代码发布统计'
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          data: dateList,
          axisLine: {
            lineStyle: {
              color: '#666',
              width: 4,//轴线的宽度
            }
          },
        }],
        yAxis: [{
          splitLine: {show: false},
          axisLine: {
            lineStyle: {
              color: '#666',
              width: 4,//轴线的宽度
            }
          },
        }],
        series: [{
          name: '发布次数',
          type: 'line',
          showSymbol: false,
          symbolSize: 4, //拐点大小
          itemStyle: {
            normal: {
              color: "#666", // 折线点的颜色
              lineStyle: {
                color: "#800000", //
                borderColor: "#800000"
              }
            },
            emphasis: {
              color: '#800000',
              borderColor: "#800000"//hover拐点颜色定义
            }
          },
          data: valueList
        }]
      };
      DeployTodayContent.setOption(option);
      
      // 当天发布排行统计
      option = {
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
              {
                  name:'发布占比',
                  type:'pie',
                  radius: ['65%', '85%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          show: true,
                          textStyle: {
                              fontSize: '16',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data: result.ranking_countday
              }
          ]
      };
      DeployToDayCount.setOption(option);
      
      var data = result.success_countday;
      var dateList = data.map(function (item) {
        return item[0];
      });
      var valueList = data.map(function (item) {
        return item[1];
      });
      
      var data = result.success_countmonth;
      var dateList = data.map(function (item) {
        return item[0];
      });
      var valueList = data.map(function (item) {
        return item[1];
      });
      
      // 当月发布统计
      option = {
        visualMap: [{
          show: false,
          type: 'continuous',
          seriesIndex: 1,
          min: 0,
          max: 400
        }],
        
        title: [{
          left: 'center',
          text: '本月代码发布统计'
        }],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: [{
          data: dateList,
          axisLine: {
            lineStyle: {
              color: '#666',
              width: 4,//轴线的宽度
            }
          },
        }],
        yAxis: [{
          splitLine: {show: false},
          axisLine: {
            lineStyle: {
              color: '#666',
              width: 4, //轴线的宽度
            }
          },
        }],
        series: [{
          name: '发布次数',
          type: 'line',
          showSymbol: false,
          symbolSize: 4, //拐点大小
          itemStyle: {
            normal: {
              color: "#666", // 折线点的颜色
              lineStyle: {
                color: "#800000", //
                borderColor: "#800000"
              }
            },
            emphasis: {
              color: '#800000',
              borderColor: "#800000"//hover拐点颜色定义
            }
          },
          data: valueList
        }]
      };
      DeployMonthContent.setOption(option);
      
      // 当天发布排行统计
      option = {
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          series: [
              {
                  name:'发布占比',
                  type:'pie',
                  radius: ['65%', '85%'],
                  avoidLabelOverlap: false,
                  label: {
                      normal: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          show: true,
                          textStyle: {
                              fontSize: '16',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false
                      }
                  },
                  data: result.ranking_countmonth
              }
          ]
      };
      DeployMonthCount.setOption(option);
    },
  });
});