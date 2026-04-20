$(function () {
    combinedChart();
    combinedChart2();
    combinedChart3();
    combinedChart4();
    generateFailureChart()
    echarts_1();
    echarts_2();
    echarts_3();
    echarts_4();
    echarts_5();
    echarts_6();
    echarts_7();
    echarts_8();



function combinedChart() {
    const voltageThreshold = 4.2;
    const temperatureThreshold = 100;
    const myChart = echarts.init(document.getElementById('combinedChart'));

    let timeStamps = [];
    let voltage1 = [];
    let voltage2 = [];
    let temperature1 = [];
    let temperature2 = [];
    let updateInterval = null;
    let dataCount = 0; // 跟踪已生成的数据点数量

    function getFormattedTime(offset = 0) {
        const now = new Date(Date.now() + offset * 60000);
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        return offset === 0 ? '现在' : `${hour}:${minute}`;
    }

    function generateRandomValue(min, max) {
        return (min + Math.random() * (max - min)).toFixed(2);
    }

    function addDataPoint() {
        if (dataCount < 30) {
            // 初始填充数据
            timeStamps.push(getFormattedTime(dataCount));
            voltage1.push(generateRandomValue(3, 3.8));
            voltage2.push(generateRandomValue(3, 4.0));
            temperature1.push(generateRandomValue(20, 40));
            temperature2.push(generateRandomValue(20, 40));
            dataCount++;
        } else {
            // 数据已满，开始滚动
            timeStamps.shift();
            timeStamps.push(getFormattedTime(29)); // 总是添加未来时间

            voltage1.shift();
            voltage1.push(generateRandomValue(3, 3.8));
            voltage2.shift();
            voltage2.push(generateRandomValue(3, 4.0));
            temperature1.shift();
            temperature1.push(generateRandomValue(20, 40));
            temperature2.shift();
            temperature2.push(generateRandomValue(20, 40));
        }

        myChart.setOption({
            xAxis: {
                data: timeStamps
            },
            series: [
                { data: voltage1 },
                { data: voltage2 },
                { data: temperature1 },
                { data: temperature2 }
            ]
        });

        const showWarning = shouldShowWarning(voltage1, voltage2, temperature1, temperature2);
        const warningBox = document.querySelector('.warning');
        if (warningBox) {
            warningBox.style.display = showWarning ? 'flex' : 'none';
        }
    }

    function shouldShowWarning(voltage1, voltage2, temp1, temp2) {
        const anyExceeds = (arr, threshold) => arr.some(v => parseFloat(v) > threshold);
        return (
            anyExceeds(voltage1, voltageThreshold) ||
            anyExceeds(voltage2, voltageThreshold) ||
            anyExceeds(temp1, temperatureThreshold) ||
            anyExceeds(temp2, temperatureThreshold)
        );
    }

    // 初始化空图表
    const option = {
        backgroundColor: '#0F1C3C',
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'line', lineStyle: { color: '#fff', width: 1, type: 'dashed' } },
            formatter: function (params) {
                let result = `时间: ${params[0].name}<br/>`;
                params.forEach(item => {
                    result += `${item.marker} ${item.seriesName}: ${item.value}<br/>`;
                });
                return result;
            }
        },
        legend: {
            data: ['电压1（V）', '电压2（V）', '温度1（℃）', '温度2（℃）'],
            textStyle: { color: '#fff' },
            bottom: '10px'
        },
        grid: { left: '5%', right: '10%', top: '10%', bottom: '15%', containLabel: true },
        xAxis: {
            type: 'category',
            data: [],
            axisLine: {
                show: true,
                lineStyle: {
                    width: 2,
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: '#ff9a9e' },
                        { offset: 1, color: '#fad0c4' }
                    ])
                }
            },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            },
            splitLine: { show: false }
        },
        yAxis: [
            {
                name: '电压（V）',
                nameTextStyle: { color: '#fff', fontSize: 14 },
                min: 0,
                max: 5,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            { offset: 0, color: '#a1c4fd' },
                            { offset: 1, color: '#c2e9fb' }
                        ])
                    }
                },
                axisLabel: { color: '#fff', fontSize: 12 },
                splitLine: { show: true, lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.1)' } }
            },
            {
                name: '温度（℃）',
                nameTextStyle: { color: '#fff', fontSize: 14 },
                min: 0,
                max: 120,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            { offset: 0, color: '#ffdde1' },
                            { offset: 1, color: '#ee9ca7' }
                        ])
                    }
                },
                axisLabel: { color: '#fff', fontSize: 12 },
                splitLine: { show: false }
            }
        ],
        series: [
            {
                name: '电压1（V）',
                type: 'line',
                yAxisIndex: 0,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 4, color: '#00cefc', shadowBlur: 10, shadowColor: 'rgba(0, 206, 252, 0.8)' },
                areaStyle: { color: 'rgba(0, 206, 252, 0.3)' },
                data: []
            },
            {
                name: '电压2（V）',
                type: 'line',
                yAxisIndex: 0,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 4, color: '#FFA500', shadowBlur: 10, shadowColor: 'rgba(255, 165, 0, 0.8)' },
                areaStyle: { color: 'rgba(255, 165, 0, 0.3)' },
                data: []
            },
            {
                name: '温度1（℃）',
                type: 'line',
                yAxisIndex: 1,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 4, color: '#ff6b6b', shadowBlur: 10, shadowColor: 'rgba(255, 107, 107, 0.8)' },
                areaStyle: { color: 'rgba(255, 107, 107, 0.3)' },
                data: [],
                markArea: {
                    itemStyle: { color: 'rgba(255, 0, 0, 0.2)' },
                    data: [[{ yAxis: 100 }, { yAxis: 120 }]],
                    label: {
                        show: true,
                        position: 'inside',
                        formatter: '{a|⚠ 温度预警}',
                        rich: {
                            a: {
                                fontSize: 14,
                                color: '#fff',
                                fontWeight: 'bold',
                                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                                padding: [6, 10],
                                borderRadius: 5
                            }
                        }
                    }
                }
            },
            {
                name: '温度2（℃）',
                type: 'line',
                yAxisIndex: 1,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 4, color: '#00ff99', shadowBlur: 10, shadowColor: 'rgba(0, 255, 153, 0.8)' },
                areaStyle: { color: 'rgba(0, 255, 153, 0.3)' },
                data: []
            }
        ],
        visualMap: [{
            show: false,
            dimension: 1,
            seriesIndex: [2, 3],
            pieces: [
                { min: 0, max: 100, color: '#ff6b6b' },
                { min: 100, max: 120, color: '#ff0000' }
            ]
        }],
        animation: true,
        animationDuration: 2000,
        animationEasing: 'cubicInOut'
    };

    myChart.setOption(option);

    window.startCombinedChart = function () {
        if (!updateInterval) {
            // 先添加一个数据点
            addDataPoint();
            // 然后开始定时添加数据
            updateInterval = setInterval(addDataPoint, 1000);
        }
    };
}


function combinedChart2() {
    var myChart = echarts.init(document.getElementById('combinedChart2'));

    // 阈值设置
    const voltageFeatureThreshold = 0.6;
    const SDO_scoreThreshold = 0.7;
    const ICCThreshold = 1.2;

    function generateRandomValue(min, max) {
        return (min + Math.random() * (max - min)).toFixed(4);
    }

    function getFormattedTime(offset = 0) {
        const now = new Date(Date.now() + offset * 60000);
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        return offset === 0 ? '现在' : `${hour}:${minute}`;
    }

    // 初始化空数据
    let timeStamps = [];
    let voltageFeature1 = [];
    let voltageFeature2 = [];
    let SDO_score = [];
    let ICC = [];
    let updateInterval = null;
    let dataCount = 0; // 跟踪已生成的数据点数量

    function addDataPoint() {
        if (dataCount < 30) {
            // 初始填充数据
            timeStamps.push(getFormattedTime(dataCount));
            voltageFeature1.push(generateRandomValue(0.28, 0.35));
            voltageFeature2.push(generateRandomValue(0.28, 0.35));
            SDO_score.push(generateRandomValue(-0.05, 0.05));
            ICC.push(generateRandomValue(0.97, 0.99));
            dataCount++;
        } else {
            // 数据已满，开始滚动
            timeStamps.shift();
            timeStamps.push(getFormattedTime(29)); // 总是添加未来时间

            voltageFeature1.shift();
            voltageFeature1.push(generateRandomValue(0.28, 0.35));
            voltageFeature2.shift();
            voltageFeature2.push(generateRandomValue(0.28, 0.35));
            SDO_score.shift();
            SDO_score.push(generateRandomValue(-0.05, 0.05));
            ICC.shift();
            ICC.push(generateRandomValue(0.97, 0.99));
        }

        myChart.setOption({
            xAxis: {
                data: timeStamps
            },
            series: [
                { data: voltageFeature1 },
                { data: voltageFeature2 },
                { data: SDO_score },
                { data: ICC }
            ]
        });

        const showWarning = shouldShowWarning(voltageFeature1, voltageFeature2, SDO_score, ICC);
        const warningBox = document.querySelector('.warning2');
        if (warningBox) {
            warningBox.style.display = showWarning ? 'flex' : 'none';
        }
    }

    function shouldShowWarning(voltageFeature1, voltageFeature2, SDO_score, ICC) {
        const anyExceeds = (arr, threshold) => arr.some(v => parseFloat(v) > threshold);
        return (
            anyExceeds(voltageFeature1, voltageFeatureThreshold) ||
            anyExceeds(voltageFeature2, voltageFeatureThreshold) ||
            anyExceeds(SDO_score, SDO_scoreThreshold) ||
            anyExceeds(ICC, ICCThreshold)
        );
    }

    // 初始化空图表
    const option = {
        backgroundColor: '#0F1C3C',
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'line', lineStyle: { color: '#fff', width: 1, type: 'dashed' } },
            formatter: function (params) {
                let result = `时间: ${params[0].name}<br/>`;
                params.forEach(item => {
                    result += `${item.marker} ${item.seriesName}: ${item.value}<br/>`;
                });
                return result;
            }
        },
        legend: {
            data: ['电压特征1', '电压特征2', 'SDO_score', 'ICC'],
            textStyle: { color: '#fff' },
            bottom: '10px'
        },
        grid: { left: '8%', right: '10%', top: '10%', bottom: '15%', containLabel: true },
        xAxis: {
            type: 'category',
            data: [],
            axisLine: {
                show: true,
                lineStyle: {
                    width: 2,
                    color: new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                        { offset: 0, color: '#00C9FF' },
                        { offset: 1, color: '#92FE9D' }
                    ])
                }
            },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            },
            splitLine: { show: false }
        },
        yAxis: [
            {
                name: 'Voltage / SDO Score',
                nameTextStyle: { color: '#fff', fontSize: 14 },
                min: -0.2,
                max: 0.5,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            { offset: 0, color: '#6a11cb' },
                            { offset: 1, color: '#2575fc' }
                        ])
                    }
                },
                axisLabel: { color: '#fff', fontSize: 12 },
                splitLine: { show: true, lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.2)' } }
            },
            {
                name: 'ICC',
                nameTextStyle: { color: '#fff', fontSize: 14 },
                min: 0.3,
                max: 1.00,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            { offset: 0, color: '#ff7e5f' },
                            { offset: 1, color: '#feb47b' }
                        ])
                    }
                },
                axisLabel: { color: '#fff', fontSize: 12 },
                splitLine: { show: false }
            }
        ],
        series: [
            {
                name: '电压特征1',
                type: 'line',
                yAxisIndex: 0,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 3, color: '#00D2FF', shadowBlur: 10, shadowColor: 'rgba(0, 210, 255, 0.8)' },
                areaStyle: { color: 'rgba(0, 210, 255, 0.3)' },
                data: []
            },
            {
                name: '电压特征2',
                type: 'line',
                yAxisIndex: 0,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 3, color: '#ff6a00', shadowBlur: 10, shadowColor: 'rgba(255, 106, 0, 0.8)' },
                areaStyle: { color: 'rgba(255, 106, 0, 0.3)' },
                data: []
            },
            {
                name: 'SDO_score',
                type: 'line',
                yAxisIndex: 0,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 3, color: '#ff5f7e', shadowBlur: 10, shadowColor: 'rgba(255, 95, 126, 0.8)' },
                areaStyle: { color: 'rgba(255, 95, 126, 0.3)' },
                data: []
            },
            {
                name: 'ICC',
                type: 'line',
                yAxisIndex: 1,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 3, color: '#3ee8ac', shadowBlur: 10, shadowColor: 'rgba(62, 232, 172, 0.8)' },
                areaStyle: { color: 'rgba(62, 232, 172, 0.3)' },
                data: []
            }
        ],
        animation: true,
        animationDuration: 2000,
        animationEasing: 'cubicInOut'
    };

    myChart.setOption(option);

    window.startCombinedChart2 = function () {
        if (!updateInterval) {
            // 先添加一个数据点
            addDataPoint();
            // 然后开始定时添加数据
            updateInterval = setInterval(addDataPoint, 1000);
        }
    };
}


function combinedChart3() {
    var myChart = echarts.init(document.getElementById('combinedChart3'));

    // 阈值设置
    const voltageRateThreshold = 1;
    const temperatureRateThreshold = 60;

    function generateRandomValue(min, max) {
        return (min + Math.random() * (max - min)).toFixed(4);
    }

    function getFormattedTime(offset = 0) {
        const now = new Date(Date.now() + offset * 60000);
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        return offset === 0 ? '现在' : `${hour}:${minute}`;
    }

    // 初始化空数据
    let timeStamps = [];
    let voltageRate1 = [];
    let voltageRate2 = [];
    let temperatureRate1 = [];
    let temperatureRate2 = [];
    let updateInterval = null;
    let dataCount = 0; // 跟踪已生成的数据点数量

    function addDataPoint() {
        if (dataCount < 30) {
            // 初始填充数据
            timeStamps.push(getFormattedTime(dataCount));
            voltageRate1.push(generateRandomValue(-0.8, 0.8));
            voltageRate2.push(generateRandomValue(-0.8, 0.8));
            temperatureRate1.push(generateRandomValue(-30, 30));
            temperatureRate2.push(generateRandomValue(-30, 30));
            dataCount++;
        } else {
            // 数据已满，开始滚动
            timeStamps.shift();
            timeStamps.push(getFormattedTime(29)); // 总是添加未来时间

            voltageRate1.shift();
            voltageRate1.push(generateRandomValue(-0.8, 0.8));
            voltageRate2.shift();
            voltageRate2.push(generateRandomValue(-0.8, 0.8));
            temperatureRate1.shift();
            temperatureRate1.push(generateRandomValue(-30, 30));
            temperatureRate2.shift();
            temperatureRate2.push(generateRandomValue(-30, 30));
        }

        myChart.setOption({
            xAxis: {
                data: timeStamps
            },
            series: [
                { data: voltageRate1 },
                { data: voltageRate2 },
                { data: temperatureRate1 },
                { data: temperatureRate2 }
            ]
        });

        const showWarning = shouldShowWarning(voltageRate1, voltageRate2, temperatureRate1, temperatureRate2);
        const warningBox = document.querySelector('.warning3');
        if (warningBox) {
            warningBox.style.display = showWarning ? 'flex' : 'none';
        }
    }

    function shouldShowWarning(voltageRate1, voltageRate2, temperatureRate1, temperatureRate2) {
        const anyExceeds = (arr, threshold) => arr.some(v => Math.abs(parseFloat(v)) > threshold);
        return (
            anyExceeds(voltageRate1, voltageRateThreshold) ||
            anyExceeds(voltageRate2, voltageRateThreshold) ||
            anyExceeds(temperatureRate1, temperatureRateThreshold) ||
            anyExceeds(temperatureRate2, temperatureRateThreshold)
        );
    }

    // 初始化空图表
    const option = {
        backgroundColor: '#0F1C3C',
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'line', lineStyle: { color: '#fff', width: 1, type: 'dashed' } },
            formatter: function (params) {
                let result = `时间: ${params[0].name}<br/>`;
                params.forEach(item => {
                    result += `${item.marker} ${item.seriesName}: ${item.value}<br/>`;
                });
                return result;
            }
        },
        legend: {
            data: ['电压变化速率1', '电压变化速率2', '温度变化速率1', '温度变化速率2'],
            textStyle: { color: '#fff' },
            bottom: '10px'
        },
        grid: { left: '8%', right: '10%', top: '10%', bottom: '15%', containLabel: true },
        xAxis: {
            type: 'category',
            data: [],
            axisLine: {
                show: true,
                lineStyle: {
                    width: 2,
                    color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                        { offset: 0, color: '#00C9FF' },
                        { offset: 1, color: '#004F91' }
                    ])
                }
            },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            },
            splitLine: { show: false }
        },
        yAxis: [
            {
                name: '电压变化速率',
                nameTextStyle: { color: '#fff', fontSize: 14 },
                min: -1.5,
                max: 1.5,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            { offset: 0, color: '#6a11cb' },
                            { offset: 1, color: '#2575fc' }
                        ])
                    }
                },
                axisLabel: { color: '#fff', fontSize: 12 },
                splitLine: { show: true, lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.2)' } }
            },
            {
                name: '温度变化速率',
                nameTextStyle: { color: '#fff', fontSize: 14 },
                min: -80,
                max: 80,
                axisLine: {
                    show: true,
                    lineStyle: {
                        width: 2,
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            { offset: 0, color: '#ff7e5f' },
                            { offset: 1, color: '#feb47b' }
                        ])
                    }
                },
                axisLabel: { color: '#fff', fontSize: 12 },
                splitLine: { show: false }
            }
        ],
        series: [
            {
                name: '电压变化速率1',
                type: 'line',
                yAxisIndex: 0,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 3, color: '#00D2FF', shadowBlur: 10, shadowColor: 'rgba(0, 210, 255, 0.8)' },
                areaStyle: { color: 'rgba(0, 210, 255, 0.3)' },
                data: []
            },
            {
                name: '电压变化速率2',
                type: 'line',
                yAxisIndex: 0,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 3, color: '#ff6a00', shadowBlur: 10, shadowColor: 'rgba(255, 106, 0, 0.8)' },
                areaStyle: { color: 'rgba(255, 106, 0, 0.3)' },
                data: []
            },
            {
                name: '温度变化速率1',
                type: 'line',
                yAxisIndex: 1,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 3, color: '#ff5f7e', shadowBlur: 10, shadowColor: 'rgba(255, 95, 126, 0.8)' },
                areaStyle: { color: 'rgba(255, 95, 126, 0.3)' },
                data: []
            },
            {
                name: '温度变化速率2',
                type: 'line',
                yAxisIndex: 1,
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 3, color: '#3ee8ac', shadowBlur: 10, shadowColor: 'rgba(62, 232, 172, 0.8)' },
                areaStyle: { color: 'rgba(62, 232, 172, 0.3)' },
                data: []
            }
        ],
        animation: true,
        animationDuration: 2000,
        animationEasing: 'cubicInOut'
    };

    myChart.setOption(option);

    window.startCombinedChart3 = function () {
        if (!updateInterval) {
            // 先添加一个数据点
            addDataPoint();
            // 然后开始定时添加数据
            updateInterval = setInterval(addDataPoint, 1000);
        }
    };
}


function combinedChart4() {
    const myChart = echarts.init(document.getElementById('combinedChart4'));
    const resistanceThreshold = 100;

    let timeStamps = [];
    let resistance1 = [];
    let resistance2 = [];
    let updateInterval = null;
    let dataCount = 0; // 跟踪已生成的数据点数量

    function getFormattedTime(offset = 0) {
        const now = new Date(Date.now() + offset * 60000);
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        return offset === 0 ? '现在' : `${hour}:${minute}`;
    }

    function generateRandomValue(min, max) {
        return (min + Math.random() * (max - min)).toFixed(4);
    }

    function addDataPoint() {
        if (dataCount < 30) {
            // 初始填充数据
            timeStamps.push(getFormattedTime(dataCount));
            resistance1.push(generateRandomValue(180, 200));
            resistance2.push(generateRandomValue(180, 200));
            dataCount++;
        } else {
            // 数据已满，开始滚动
            timeStamps.shift();
            timeStamps.push(getFormattedTime(29)); // 总是添加未来时间

            resistance1.shift();
            resistance1.push(generateRandomValue(180, 200));
            resistance2.shift();
            resistance2.push(generateRandomValue(180, 200));
        }

        myChart.setOption({
            xAxis: {
                data: timeStamps
            },
            series: [
                { data: resistance1 },
                { data: resistance2 }
            ]
        });

        const showWarning = shouldShowWarning(resistance1, resistance2);
        const warningBox = document.querySelector('.warning4');
        if (warningBox) {
            warningBox.style.display = showWarning ? 'flex' : 'none';
        }
    }

    function shouldShowWarning(resistance1, resistance2) {
        const anyExceeds = (arr, threshold) => arr.some(v => parseFloat(v) < threshold);
        return (
            anyExceeds(resistance1, resistanceThreshold) ||
            anyExceeds(resistance2, resistanceThreshold)
        );
    }

    // 初始化空图表
    const option = {
        backgroundColor: '#0F1C3C',
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'line', lineStyle: { color: '#fff', width: 1, type: 'dashed' } },
            formatter: function (params) {
                let result = `时间: ${params[0].name}<br/>`;
                params.forEach(item => {
                    result += `${item.marker} ${item.seriesName}: ${item.value}<br/>`;
                });
                return result;
            }
        },
        legend: {
            data: ['电阻1', '电阻2', '预警线'],
            textStyle: { color: '#fff' },
            bottom: '10px'
        },
        grid: { left: '8%', right: '10%', top: '20%', bottom: '15%', containLabel: true },
        xAxis: {
            type: 'category',
            data: [],
            position: 'bottom',
            boundaryGap: false,
            axisLine: {
                show: true,
                lineStyle: {
                    width: 2,
                    color: new echarts.graphic.LinearGradient(0, 1, 1, 0, [
                        { offset: 0, color: '#00C9FF' },
                        { offset: 1, color: '#004F91' }
                    ])
                }
            },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            },
            splitLine: { show: false }
        },
        yAxis: {
            name: '电阻 (Ω)',
            nameTextStyle: { color: '#fff', fontSize: 14 },
            min: 50,
            max: 300,
            axisLine: {
                show: true,
                lineStyle: {
                    width: 2,
                    color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                        { offset: 0, color: '#6a11cb' },
                        { offset: 1, color: '#2575fc' }
                    ])
                }
            },
            axisLabel: { color: '#fff', fontSize: 12 },
            splitLine: { show: true, lineStyle: { type: 'dashed', color: 'rgba(255,255,255,0.2)' } }
        },
        series: [
            {
                name: '电阻1',
                type: 'line',
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 3, color: '#8A2BE2', shadowBlur: 10, shadowColor: 'rgba(138, 43, 226, 0.8)' },
                areaStyle: { color: 'rgba(138, 43, 226, 0.3)' },
                data: []
            },
            {
                name: '电阻2',
                type: 'line',
                smooth: 0.35,
                symbol: 'none',
                lineStyle: { width: 3, color: '#FF6347', shadowBlur: 10, shadowColor: 'rgba(255, 99, 71, 0.8)' },
                areaStyle: { color: 'rgba(255, 99, 71, 0.3)' },
                data: []
            },
            {
                name: '充电预警线',
                type: 'line',
                smooth: true,
                symbol: 'none',
                lineStyle: {
                    width: 2,
                    type: 'solid',
                    color: '#FF0000',
                    shadowBlur: 10,
                },
                data: new Array(30).fill(100)
            }
        ],
        animation: true,
        animationDuration: 2000,
        animationEasing: 'cubicInOut'
    };

    myChart.setOption(option);

    window.startCombinedChart4 = function () {
        if (!updateInterval) {
            // 先添加一个数据点
            addDataPoint();
            // 然后开始定时添加数据
            updateInterval = setInterval(addDataPoint, 1000);
        }
    };
}


function generateFailureChart() {
    // 先销毁旧图表实例
    const chartDom = document.getElementById('generateFailureChart');
    if (chartDom) {
        const existingChart = echarts.getInstanceByDom(chartDom);
        if (existingChart) {
            existingChart.dispose();
        }
    }

    // 创建新图表实例
    var myChart = echarts.init(document.getElementById('generateFailureChart'));

    // 从本地存储加载告警数据
    const alarmData = loadDataFromLocalStorage();

    // 统计每种故障类型的数量
    const countMap = {};
    alarmData.forEach(item => {
        if (countMap[item.type]) {
            countMap[item.type]++;
        } else {
            countMap[item.type] = 1;
        }
    });

    // 转换为 ECharts 需要的格式
    const failureData = Object.keys(countMap).map(type => ({
        name: type,
        value: countMap[type]
    }));

    // 定义颜色梯度数组（可按需要扩展）
    const gradientColors = [
        ['#FF6B6B', '#FFA07A'],
        ['#FFD700', '#FFA500'],
        ['#20B2AA', '#3CB371'],
        ['#6495ED', '#4682B4'],
        ['#C71585', '#DA70D6'],
        ['#FF8C00', '#FF6347'],
        ['#7B68EE', '#BA55D3'],
        ['#008B8B', '#00CED1']
    ];

    const colorList = failureData.map((_, i) => ({
        type: 'linear',
        x: 0, y: 0, x2: 1, y2: 1,
        colorStops: [
            { offset: 0, color: gradientColors[i % gradientColors.length][0] },
            { offset: 1, color: gradientColors[i % gradientColors.length][1] }
        ]
    }));

    const option = {
        backgroundColor: '#0F1C3C',
        title: {
            text: '电池故障频次',
            left: 'center',
            textStyle: {
                color: '#ffffff',
                fontSize: 20,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} 次 ({d}%)'
        },
        series: [
            {
                name: '故障类型',
                type: 'pie',
                radius: ['30%', '65%'],
                roseType: 'radius',
                itemStyle: {
                    borderRadius: 10,
                    borderWidth: 3,
                    borderColor: '#0F1C3C',
                    shadowBlur: 15,
                    shadowColor: 'rgba(255, 255, 255, 0.4)'
                },
                label: {
                    show: true,
                    color: '#ffffff',
                    fontSize: 14,
                    fontWeight: 'bold',
                    formatter: '{b}\n{c} 次 ({d}%)'
                },
                labelLine: {
                    length: 15,
                    length2: 20,
                    lineStyle: {
                        color: '#ffffff',
                        width: 2
                    }
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 25,
                        shadowColor: 'rgba(255, 255, 255, 0.7)'
                    }
                },
                data: failureData,
                color: colorList
            }
        ]
    };

    myChart.setOption(option);

    // 响应式调整
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}




    function echarts_1() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart1'));

    // 生成随机阻值数据
    function generateRandomResistanceData() {
        let data = [];
        let baseResistance = 50; // 基础阻值
        for (let i = 0; i < 8; i++) {
            let resistance = baseResistance + Math.random() * 20; // 随机生成阻值
            data.push(resistance.toFixed(1)); // 保留一位小数
        }
        return data;
    }

    let resistanceData = generateRandomResistanceData();

    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '0%',
            top: '15px',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            axisLine: { show: false },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            }
        },
        yAxis: {
            name: "阻值（Ω）",
            nameTextStyle: {
                color: '#fff',
                fontSize: 14
            },
            axisLine: { show: false },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            },
            splitLine: { show: false },
            interval: 10,
            max: 80
        },
        series: [{
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
                width: 2,
                color: '#00cefc' // 蓝色调
            },
            itemStyle: {
                color: '#367bec',
                borderColor: '#00cefc',
                borderWidth: 2
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 206, 252, 0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(54, 123, 236, 0)'
                }])
            },
            data: resistanceData
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}
function echarts_2() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart2'));

    // 生成随机温度数据
    function generateRandomTemperatureData() {
        let data = [];
        let baseTemp = 20; // 基础温度
        for (let i = 0; i < 8; i++) {
            let temp = baseTemp + Math.random() * 10; // 随机生成温度
            data.push(temp.toFixed(1)); // 保留一位小数
        }
        return data;
    }

    let temperatureData = generateRandomTemperatureData();

    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '0%',
            top: '15px',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            axisLine: { show: false },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            }
        },
        yAxis: {
            name: "温度（℃）",
            nameTextStyle: {
                color: '#fff',
                fontSize: 14
            },
            axisLine: { show: false },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            },
            splitLine: { show: false },
            interval: 10,
            max: 50
        },
        series: [{
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
                width: 2,
                color: '#ff6b6b', // 红色调
                type: 'dashed' // 虚线
            },
            itemStyle: {
                color: '#ff4757',
                borderColor: '#ff6b6b',
                borderWidth: 2
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(255, 107, 107, 0.3)'
                }, {
                    offset: 1,
                    color: 'rgba(255, 71, 87, 0)'
                }])
            },
            data: temperatureData
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}
function echarts_3() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart3'));

    // 生成随机电压数据
    function generateRandomVoltageData() {
        let data = [];
        let baseVoltage = 300; // 基础电压
        for (let i = 0; i < 8; i++) {
            let voltage = baseVoltage + Math.random() * 50; // 随机生成电压
            data.push(voltage.toFixed(1)); // 保留一位小数
        }
        return data;
    }

    let voltageData = generateRandomVoltageData();

    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return `时间: ${params[0].name}<br/>电压: ${params[0].value} V`;
            }
        },
        grid: {
            left: '0%',
            top: '15px',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            axisLine: { show: false },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            }
        },
        yAxis: {
            name: "电压（V）",
            nameTextStyle: {
                color: '#fff',
                fontSize: 14
            },
            axisLine: { show: false },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            },
            splitLine: { show: false },
            interval: 50,
            max: 400
        },
        series: [{
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
                width: 3,
                color: '#9f44d3' // 紫色调
            },
            itemStyle: {
                color: '#9f44d3',
                borderColor: '#ffffff',
                borderWidth: 2
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(159, 68, 211, 0.5)' // 渐变起始颜色
                }, {
                    offset: 1,
                    color: 'rgba(159, 68, 211, 0)' // 渐变结束颜色
                }])
            },
            data: voltageData
        }],
        visualMap: {
            show: false,
            type: 'piecewise',
            pieces: [
                { min: 300, max: 350, color: '#9f44d3' }, // 紫色
                { min: 350, max: 400, color: '#ff6b6b' }  // 红色
            ],
            outOfRange: {
                color: '#9f44d3' // 默认颜色
            }
        },
        animation: true, // 启用动画
        animationDuration: 2000, // 动画时长
        animationEasing: 'cubicInOut' // 动画缓动效果
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}
function echarts_4() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('echart4'));

    // 生成随机电流数据
    function generateRandomCurrentData() {
        let data = [];
        let baseCurrent = 10; // 基础电流
        for (let i = 0; i < 8; i++) {
            let current = baseCurrent + Math.random() * 5; // 随机生成电流
            data.push(current.toFixed(1)); // 保留一位小数
        }
        return data;
    }

    let currentData = generateRandomCurrentData();

    let option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                return `时间: ${params[0].name}<br/>电流: ${params[0].value} A`;
            }
        },
        grid: {
            left: '0%',
            top: '15px',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
            axisLine: { show: false },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            }
        },
        yAxis: {
            name: "电流（A）",
            nameTextStyle: {
                color: '#fff',
                fontSize: 14
            },
            axisLine: { show: false },
            axisLabel: {
                color: '#fff',
                fontSize: 12
            },
            splitLine: { show: false },
            interval: 5,
            max: 20
        },
        series: [{
            type: 'line',
            smooth: true,
            symbol: 'circle',
            symbolSize: 10,
            lineStyle: {
                width: 3,
                color: '#00cefc' // 蓝色调
            },
            itemStyle: {
                color: '#367bec',
                borderColor: '#00cefc',
                borderWidth: 2
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 206, 252, 0.5)' // 渐变起始颜色
                }, {
                    offset: 1,
                    color: 'rgba(54, 123, 236, 0)' // 渐变结束颜色
                }])
            },
            data: currentData
        }],
        visualMap: {
            show: false,
            type: 'piecewise',
            pieces: [
                { min: 10, max: 15, color: '#00cefc' }, // 蓝色
                { min: 15, max: 20, color: '#ff6b6b' }  // 红色
            ],
            outOfRange: {
                color: '#00cefc' // 默认颜色
            }
        },
        animation: true, // 启用动画
        animationDuration: 2000, // 动画时长
        animationEasing: 'cubicInOut' // 动画缓动效果
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}
function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));
	option = {
    title: {
        text: '12%',
        x: 'center',
        y: 'center',
        textStyle: {
            fontWeight: 'normal',
            color: '#0580f2',
          fontSize: '24'
        }
    },
    color: ['rgba(176, 212, 251, .1)'], 
    series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: true,
        radius: ['75%', '85%'],
        itemStyle: {
            normal: {
                label: {show: false},
                labelLine: {show: false},
            }
        },

        hoverAnimation: false, 
        data: [{
            value: 12,
            name: '01',
            itemStyle: {
                normal: {
                    color: { // 完成的圆环的颜色
                        colorStops: [{
                            offset: 0,
                            color: '#00cefc' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#367bec' // 100% 处的颜色
                        }]
                    },
                    label: {show: false},
                    labelLine: {show: false}
                } 
            }
        }, {
            name: '02',
            value: 88
        }]

    }]

}
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_6() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart6'));
	option = {
    title: {
        text: '80%',
        x: 'center',
        y: 'center',
        textStyle: {
            fontWeight: 'normal',
            color: '#0580f2',
            fontSize: '24'
        }
    },
    color: ['rgba(176, 212, 251, .1)'], 
    series: [{
        name: 'Line 1',
        type: 'pie',
        clockWise: true,
         radius: ['75%', '85%'],
        itemStyle: {
            normal: {
                label: {show: false},
                labelLine: {show: false},
            }
        },

        hoverAnimation: false, 
        data: [{
            value: 80,
            name: '01',
            itemStyle: {
                normal: {
                    color: { // 完成的圆环的颜色
                        colorStops: [{
                            offset: 0,
                            color: '#00cefc' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#367bec' // 100% 处的颜色
                        }]
                    },
                    label: {show: false},
                    labelLine: {show: false}
                } 
            }
        }, {
            name: '02',
            value: 20
        }]

    }]

}
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_7() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart7'));
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
	 grid: {
        left: '0%',
		top:'15px',
        right: '0%',
        bottom: '0%',
       containLabel: true
    },
    xAxis: {
        data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        axisLine: {show:false,},
        axisLabel: {
            color: '#fff',
            fontSize: 12
        }
    },
    yAxis: {
        name: "（人）",
        nameTextStyle: {
            color: '#fff',
            fontSize: 14
        },
        axisLine: { show:false, },
        axisLabel: {
            color: '#fff',
            fontSize: 12
        },
        splitLine: {show:false, },
        interval:100,
        max:500

    },
    series: [{
        type: 'bar',
        barWidth: '30%',

        itemStyle:{

            normal:{
				 barBorderRadius: 50,
                color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#01fdcc'
                }, {
                    offset: 0.8,
                    color: '#11a1d8'
                }], false)
            }
        },
        data: [25, 325, 164, 245, 475, 201, 121]
    }]
};
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_8() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart8'));


option = {
    color: ['#ec704a', '#2e4453', '#249cf9', '#fdb629', '#4b5cc4', '#f47983', '#8d4bbb', '#6635EF', '#FFAFDA'],
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        right:0,
        y:'center',
        itemWidth: 12,
        itemHeight: 12,
        align: 'left',
        textStyle: {
            fontSize:12,
            color: '#fff'
        },
        data:  ['test1','test2','test3','test4','test5'],
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '50%'],
            radius: ['20%', '50%'],
            label: {
                normal: {
                    formatter: '{c|{d}%}',
					
                    rich: {
                      
                        c: {
                            fontSize: 12,
                            color: '#fff',
  
                        }
                    }
                }
            },
            labelLine: {
                normal: {
                    show: true,
                    length:2,
                    length2:5,
                    lineStyle: {
					
                        width:1
                    }
                }
            },
             roseType : 'area',
		

            data: [{
                    value:10,
                    name: 'test1'
                },
                {
                    value: 20,
                    name: 'test2'
                },
                {
                    value: 5,
                    name: 'test3'
                },
                {
                    value:15,
                    name: 'test4'
                },
				   {
                    value:15,
                    name: 'test5'
                }
            ]
        }
    ]
};

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

})



		
		
		


		









