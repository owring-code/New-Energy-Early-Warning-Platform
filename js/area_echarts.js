
function echarts_map() {
var myChart = echarts.init(document.getElementById('car'));
// var uploadedDataURL = "js_login/440300.json";
var name = '';
$.get(uploadedDataURL, function(geoJson) {
    echarts.registerMap(name, geoJson);//注册 地图
    myChart.setOption(option = {


        series: [{

            type: 'map',

            mapType: name,

            label: {

                normal: {

                show:true,
textStyle: {

                        color: '#fff'

                    }
                },

                emphasis: {

                    show:true,

                    textStyle: {

                        color: '#fff'

                    }

                }

            },

              itemStyle: {
            normal: {
                areaColor: '#4c60ff',
                borderColor: '#002097'
            },
            emphasis: {
                areaColor: '#293fff'
            }
        },

            animation: false,

            data: []

        }]

    });

});



    }





 $(window).load(function(){
echarts_map()
 })
// })


