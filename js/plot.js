
function barplot(div_id, mapping)
{

    var tuples = [];
    var sum = 0;
    for (var key in mapping)
    {
        tuples.push([ key, mapping[key] ]);
        sum = sum + mapping[key];
    }
    tuples.sort(function(a, b) {
        a = a[1];
        b = b[1];
        return a > b ? -1 : (a < b ? 1 : 0);
    });

    var x = [];
    var y = [];
    for (var i = 0; i < tuples.length; i++)
    {
        x.push(tuples[i][0]);
        y.push(tuples[i][1] / sum);
    }

    if (x.length !== 0 && y.length !== 0)
    {
        var data  = {
            type: "bar",
            x: x,
            y:y
        };
        var layout = {
            title: 'Most used programming languages in percent',
        };
        $("#spinner_id").hide();
        /*global Plotly */
        Plotly.newPlot(div_id, [data], layout);
        $(".plotbox").css("display", "block");
    }
    else
    {
        $(".plotbox").show();
        $("#spinner_id").hide();
        $(".plotbox").html("<h6>Could not plot. Some error.</h6>");
    }
}