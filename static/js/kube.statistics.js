var ChartsMonth = echarts.init(document.getElementById('ChartsMonth'));
var ChartsDay = echarts.init(document.getElementById('ChartsDay'));
var ChartsCount = echarts.init(document.getElementById('ChartsCount'));
var ChartsDayCount = echarts.init(document.getElementById('ChartsDayCount'));

$(function () {
    $.ajax({
        type: 'post',
        url: '/',
        dataType: 'json',
        success: function (result) {
            var datetime_countday = result.datetime_countday;
            var failure_countday = result.failure_countday;
            var success_countday = result.success_countday;
            var ranking_countmonth = result.ranking_countmonth;
            //
            var datetime_counthour = result.datetime_counthour;
            var failure_counthour = result.failure_counthour;
            var success_counthour = result.success_counthour;
            var ranking_countday = result.ranking_countday;
            console.log(ranking_countday);
            option = {
                title : {
                    text: '今天代码发布统计',
                    subtext: '代码发布'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['失败','成功']
                },
                toolbox: {
                    show : true,
                    feature : {
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : datetime_counthour
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'失败',
                        type:'bar',
                        data:failure_counthour,
                    },
                    {
                        name:'成功',
                        type:'bar',
                        data:success_counthour,
                    }
                ]
            };
            ChartsDay.setOption(option);
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
                        data:ranking_countday
                    }
                ]
            };
            ChartsDayCount.setOption(option);
            // 本月发布次数统计
            option = {
                title : {
                    text: '本月代码发布统计',
                    subtext: '代码发布'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['失败','成功']
                },
                toolbox: {
                    show : true,
                    feature : {
                        dataView : {show: true, readOnly: false},
                        magicType : {show: true, type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : datetime_countday
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'失败',
                        type:'bar',
                        data:failure_countday,
                    },
                    {
                        name:'成功',
                        type:'bar',
                        data:success_countday,
                    }
                ]
            };
            ChartsMonth.setOption(option);
            // 本月发布排行统计
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
                        data:ranking_countmonth
                    }
                ]
            };
            ChartsCount.setOption(option);
        }
    })
});


