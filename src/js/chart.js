var updateChartInterval;
var elapsedDays = 0;
var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Hospitalizados',
            backgroundColor: COLORS.circles.intensive_care.fill,
            borderColor: COLORS.circles.intensive_care.stroke,
            data: [],
            fill: 'false',//'origin'
        }, {
            label: 'Infectados',
            backgroundColor: COLORS.circles.infected.fill,
            borderColor: COLORS.circles.infected.stroke,
            data: [],
            fill: 'false',//'-1'
        }, {
            label: 'Saudáveis',
            //fill: 'end',
            backgroundColor: COLORS.circles.healthy.fill,
            borderColor: COLORS.circles.healthy.stroke,
            data: [],
            fill: 'false',//'-1'
        }, {
            label: 'Curados',
            //fill: 'end',
           backgroundColor: COLORS.circles.immune.fill,
            borderColor: COLORS.circles.immune.stroke,
            data: [],
            fill: 'false',//'-1'
        }, {
            label: 'Mortos',
            //fill: 'end',
            backgroundColor: COLORS.circles.dead.fill,
            borderColor: COLORS.circles.dead.stroke,
            data: [],
            fill: 'false',//'-1'
        }]
    },
    options: {
        responsive: true,
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Dias'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Número de pessoas'
                },
                ticks: {
                    suggestedMax: initialPopulation,
                },
                //stacked: true
            }]
        },
        annotation: {
          annotations: []
        }
    }
};

window.onload = function () {
    statistics.reset()
    var ctx = document.getElementById('chart').getContext('2d');
    lineGraph = new Chart(ctx, config);
};

function resetChart() {
    config.data.labels = [];
    config.data.datasets[0].data = [];
    config.data.datasets[1].data = [];
    config.data.datasets[2].data = [];
    config.data.datasets[3].data = [];
    config.data.datasets[4].data = [];
    elapsedDays = 0;
    if (updateChartInterval) {
        clearInterval(updateChartInterval);
    }
    updateChart();
}

function pushData(total_healthy, total_infected, total_in_intensive_care, total_cured, total_dead) {
    config.data.labels.push(elapsedDays++);
    config.data.datasets[0].data.push(total_in_intensive_care);
    config.data.datasets[1].data.push(total_infected - total_in_intensive_care);
    config.data.datasets[2].data.push(total_healthy);
    config.data.datasets[3].data.push(total_cured);
    config.data.datasets[4].data.push(total_dead);
    lineGraph.update();
}

function updateChart() {
    pushData(statistics.currentHealthy, statistics.currentInfected, statistics.currentInIntensiveCare, statistics.currentCured, statistics.currentDead);

    if (statistics.currentInfected === 0) {
        clearInterval(updateChartInterval);
    }
}