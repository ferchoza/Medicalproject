﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your Javascript code.
$(document).ready(function () {
    $('.sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
		$('#sidebar-container').toggleClass('expanded');
    });
	$('[data-toggle="tooltip"]').tooltip(); 
    $('body').scrollspy({ target: '#section-picker', offset: 50 });
    
    setChart();
});

function setChart()
{
	dataValues ={
		series: [
			{ "name": "Money A", "data": [60000, 40000, 80000, 70000] },
			{ "name": "Money B", "data": [40000, 30000, 70000, 65000] },
			{ "name": "Money C", "data": [8000, 3000, 10000, 6000] },
			{ "name": "Money D", "data": [15000, 80000, 60000, 40000] },
			{ "name": "Money E", "data": [80000, 60000, 40000, 20000] }
		 ],
		unidades:'mm/Hg',
		measurementPlaces : ['muñeca','Brazo','muñeca','Brazo','muñeca','Brazo'],
		labels: [getDateFormated(new Date(143134652600)), getDateFormated(new Date(143134652600)), getDateFormated(new Date(143134652600)), getDateFormated(new Date(143134652600)), getDateFormated(new Date(143134652600))],
	}
	chartObject = new ChartHelper("chart1","Grafica Uno",dataValues)
	chartObject.Init(chartObject);

	chartObject = new ChartHelper("chart2","Grafica Dos",dataValues)
	chartObject.Init(chartObject);

}


function getDateFormated(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return yyyy + '-' + mm + '-' + dd;
}

function ShowMyError(control, msg) {
    $(control).tooltip({ title: msg, placement: "top", trigger: 'manual', template: '<div class= "tooltip errorTooltip " role="tooltip"> <div class="tooltipContainer" > <i class="iconCon fa fa-times"></i> </div> <div class="tooltip-inner"></div></div>' }).tooltip('show');
}


function ShowMyInfo(control, msg) {
    $(control).tooltip({ title: msg, placement: "top", trigger: 'manual', template: '<div class= "tooltip infoTooltip " role="tooltip"> <div class="tooltipContainer" > <i class="iconCon fa fa-info"></i> </div> <div class="tooltip-inner"></div></div>' }).tooltip('show');
}

