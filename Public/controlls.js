var allItems = [
    {
        url:[10, 15, 22, 12],
        keyword:['a', 'b', 'c', 'd'],
        createdAt:"03/1/2018"
    },
    {
        url:[15, 19, 23, 12],
        keyword:['a', 'b', 'c', 'd'],
        createdAt:"03/28/2018"
    },
    {
        url:[10, 19, 2, 12],
        keyword:['a', 'b', 'c', 'd'],
        createdAt:"04/21/2018"
    },
    {
        url:[10, 15, 22],
        keyword:['a', 'b', 'c', 'd'],
        createdAt:"05/22/2018"
    }
];
var dateObject = {
    startDate:new Date('03/19/2018').getTime(),
    endDate:new Date('04/25/2018').getTime()
};

var currentWeek = {
    startDate:new Date('03/19/2018').getTime(),
    endDate:new Date('04/25/2018').getTime()
};
$('input[name="daterange"]').daterangepicker();
$('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
    dateObject = {
        startDate:new Date(picker.startDate.format('MM/DD/YYYY')).getTime(),
        endDate:new Date(picker.endDate.format('MM/DD/YYYY')).getTime()
    };
    $('.item').each(function() {
        chartRendering($(this).find('canvas').attr('id'), $(this).data('type'), dateObject);
    });
});
//var dataArr = <%= chart.dataArr1 %>;
var options = {
    legend: {
        display: false
    },
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true
            }
        }]
    }
};

// $('.column-count').each(function(){
//     var totalLength = $(this).find('.form-group').length;
//     $(this).find('form').css('width', 300*(Math.ceil(totalLength/5)));
// });

var styleOptions = {
    label: 'Total leads',
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
    ],
    borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
    ],
    borderWidth: 1
};

function chartDataOptions(datalabels, dataArr) {
    return {
        //labels: <%- chart.lable1 %>,
        labels:datalabels,
        datasets: [{
            data: dataArr,
            styleOptions
        }]
    }
}

function chartRendering(id, type, dateObject) {
    var result = allItems.filter(function(el){
        var time = new Date(el.createdAt).getTime();
        return (dateObject.startDate <= time && time <= dateObject.endDate);
    });
    var labels = [];
    var dataArr = [];
    result.map(function(el) {
        labels = labels.concat(el.keyword);
        dataArr = dataArr.concat(el.url);
    });
    var ctx = document.getElementById(id).getContext('2d');
    var chartType;
    if(type === 'area') {
        chartType = 'line';
    } else {
        chartType = type;
    }
    var myChart = new Chart(ctx, {
        type: chartType,
        data: chartDataOptions(labels, dataArr),
        options: options
    });
}

function splitDate(dateVal) {
    var selectedDate = dateVal.split('-');
    var dateObject = {
        startDate:new Date(selectedDate[0].trim()).getTime(),
        endDate:new Date(selectedDate[1].trim()).getTime()
    };
    return dateObject;
}
chartRendering('previewChart', $('#chooseChart').val(), currentWeek);
$('#chooseChart').on('change', function(e){
    chartRendering('previewChart', e.target.value, currentWeek);
});
var grid;
$('#appendData').on('click', function() {
    var itemLength = $('.item').length;
    if (itemLength === 0) {
        itemLength = $('.item').length + 1;
    } else {
        itemLength = parseInt($('.grid .item').last().attr('data-id')) + 1;
    }
    var chartElm = '<canvas id="myChart' + itemLength + '" width="400" height="300"></canvas>';
    var htmlContent = '<div class="col-4 item" data-id="' + itemLength + '" data-type="' + $('#chooseChart').val() + '" id="item' + itemLength + '"><span class="hiddenDateField">' + $('#datarange').val() + '</span><div class="chartArea"><div class="chartHeader row"><div class="col-8"><h6>' + $('#name').val() + '</h6></div><div class="col-4 text-right"><button class="editWidget" data-toggle="modal" data-target="#updateWidgetModal"><i class="fa fa-pencil" aria-hidden="true"></i></button><button class="deleteWidget"><i class="fa fa-trash-o" aria-hidden="true"></i></button></div></div>' + chartElm + '</div></div>';
    $(htmlContent).appendTo($('.grid'));
    grid = new Muuri('.grid', {
        dragEnabled: true,
    });
    
    chartRendering('myChart' + itemLength, $('#chooseChart').val(), dateObject);
    $('.range-hidden').removeClass('range-hidden')
    $('#name').val("");
});

// Delete chart
$(document).on('click', '.deleteWidget', function() {
    if($('.item').length === 1) {
        grid.remove(0, {removeElements: true});
        grid.destroy();
        $('.grid').html('');
    } else {
        grid.remove($(this).parents('.item').index(), {removeElements: true});
        grid.refreshItems();
    }
});

// Edit chart
var editWidgetItem;
$(document).on('click', '.editWidget', function() {
    $('#updateName').val($(this).parents('.item').find('h6').text());
    editWidgetItem = $(this).parents('.item').data('id');
    chartRendering('updatePreviewChart', $('#updateChart').val(), dateObject);
});
$('#updateChart').on('change', function(e){
    chartRendering('updatePreviewChart', e.target.value, dateObject);
});
$('#updateWidget').on('click', function() {
    $('#item' + editWidgetItem + ' h6').text($('#updateName').val());
    chartRendering('myChart' + editWidgetItem, $('#updateChart').val(), dateObject);
});