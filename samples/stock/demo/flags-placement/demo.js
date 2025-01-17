(async () => {

    // Load the dataset
    const data = await fetch(
        'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v10.3.3/samples/data/usdeur.json'
    ).then(response => response.json());

    const lastDate = data[data.length - 1][0],  // Get year of last data point
        days = 24 * 36e5; // Milliseconds in a day

    // Create the chart
    Highcharts.stockChart('container', {

        rangeSelector: {
            selected: 1
        },

        title: {
            text: 'USD to EUR exchange rate'
        },

        yAxis: [{
            title: {
                text: 'Exchange rate'
            },
            top: '15%',
            height: '85%'
        }, {
            height: '15%'
        }],

        plotOptions: {
            flags: {
                accessibility: {
                    exposeAsGroupOnly: true,
                    description: 'Flagged events.'
                }
            }
        },

        series: [{
            name: 'USD to EUR',
            data: data,
            id: 'dataseries',
            tooltip: {
                valueDecimals: 4
            }
        }, {
            type: 'flags',
            name: 'Flags on series',
            data: [{
                x: lastDate - 60 * days,
                title: 'On series'
            }, {
                x: lastDate - 30 * days,
                title: 'On series'
            }],
            onSeries: 'dataseries',
            shape: 'squarepin'
        }, {
            type: 'flags',
            name: 'Flags on axis',
            data: [{
                x: lastDate - 45 * days,
                title: 'On axis'
            }, {
                x: lastDate - 15 * days,
                title: 'On axis'
            }],
            shape: 'squarepin'
        }, {
            type: 'flags',
            name: 'Flags in pane',
            data: [{
                x: lastDate - 40 * days,
                title: 'In pane'
            }, {
                x: lastDate - 15 * days,
                title: 'In pane'
            }],
            yAxis: 1,
            shape: 'squarepin'
        }]
    });
})();