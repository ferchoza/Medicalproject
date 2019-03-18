function ChartHelper(container,title,data) {
    this.container = container;
    this.title = title;
    this.labels = data.labels;
    this.series = data.series;
    this.measurementPlaces = data.measurementPlaces ;
    this.paddingChart ;
    this.Units = data.unidades;
    this.colorSpan = color => '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:15px;height:9px;background-color:' + color + '"></span>';
    this.colorbar =['#d70206',
    '#f05b4f',
    '#f4c63d',
    '#d17905',
    '#453d3f',
    '#59922b',
    '#0544d3',
    '#6b0392',
    '#f05b4f',
    '#dda458']
}

ChartHelper.prototype = {
    Init: function (charobject) {
        Chartist.Line(`#${this.container}`, {
            labels: this.labels,
            series: this.series
        }, {
            fullWidth: true,
            chartPadding: {
                right: 0,
                left:25
            },
            axisY: {
                onlyInteger: true
            }, plugins: [
                Chartist.plugins.legend({
                  
                }),
                Chartist.plugins.ctAxisTitle({
                    axisX: {
                      axisTitle: 'Time (mins)',
                      axisClass: 'ct-axis-title',
                      offset: {
                        x: 0,
                        y: 50
                      },
                      textAnchor: 'middle'
                    },
                    axisY: {
                      axisTitle: this.Units,
                      axisClass: 'ct-axis-title',
                      offset: {
                        x: 0,
                        y: 0
                      },
                      textAnchor: 'middle',
                      flipTitle: false
                    }
                  })

            ]
        }).on("draw", function(data) {
            if (data.type === "point") {//construye el tooltip 
                var lugar = charobject.measurementPlaces[data.index];
                var title = "";
                title += "Lugar de toma : " + lugar;
                for (var i = 0; i < charobject.series.length; i++)
                   title += "<br>"+charobject.colorSpan(charobject.colorbar[i])+": " + charobject.series[i].data[data.index] +" "+charobject.Units;
                data.element._node.setAttribute("title", title);
                data.element._node.setAttribute("data-chart-tooltip", charobject.container);
            }
        }).on("created", function() {
            // Initiate Tooltip
            $(`#${charobject.container}`).tooltip({
            selector: `[data-chart-tooltip=${charobject.container}]`,
            container: "body",
            html: true
        });
        })
        
    }

    
       

    
}
