var chart = jui.include("chart.builder");
var time = jui.include("util.time");

function getNumber() {
    return Math.round(Math.random() * 30  % 20);
}

var start = new Date(),
    end = time.add(start, time.hours, 5),
    data = [];

for(var i = 0; i < 30; i++) {
    data.push({
        time : time.add(start, time.minutes, i*10),
        sales : getNumber(),
        profit : getNumber() * 0.75,
        total : getNumber() * 1.5
    });
}

chart("#chart", {
    data : data,
    padding : {
        left : 70
    },
    series : {
        sales : { symbol : "rectangle" },
        profit : { symbol : "cross" },
        total : { symbol : "triangle" }
    },
    grid : {
        x : {
            type : "date",
            domain : [ start, end ],
            step : [ time.hours, 1 ],
            format : "hh:mm",
            key: "time",
            line : true
        },
        y : {
            type : "range",
            target : "total",
            step : 10,
            line : true
        }
    },
    brush : {
        type : "scatter",
        size : 7,
        target : [ "sales", "profit", "total" ]
    },
    widget : [{
        type : "title",
        text : "Scatter Sample"
    }, {
        type : "cross",
        format : function(d) {
            if(typeof(d) == "number") {
                return Math.round(d);
            } else {
                return time.format(d, "hh:mm");
            }
        }
    }, {
        type : "tooltip"
    }]
});