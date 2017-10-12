
function print_error() {
    $(".plotbox").show();
    $("#spinner_id").hide();
    $(".plotbox").html("<h6>Could not GET repository information from GitHub API.<br>Some AJAX error.</h6>");
}

function parse_language(repo_stats)
{
    var language_bytes = {};
    for (var lang in repo_stats) {
        if (!(lang in language_bytes)) {
            language_bytes[lang] = 0;
        }
        language_bytes[lang] = language_bytes[lang] + repo_stats[lang];
    }

    return language_bytes;
}

function stats(user_name, results) {
    var repo_names = [];
    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        if (result.fork === false) {
            repo_names.push(result.name);
        }
    }

    var language_bytes = {};
    for (i = 0; i < repo_names.length; i++) {
        $.ajax({
            dataType: "json",
            url: "https://api.github.com/repos/" + user_name + "/" + repo_names[i] + "/languages",
            success: function (repo_stats) {
                language_bytes = parse_language(repo_stats);
            },
            error: function () {
                print_error();
            },
            async: false
        });
    }

    /*global barplot */
    barplot("plotbox_id", language_bytes);
}

function query() {
    $("#spinner_id").show();
    $(".plotbox").hide();

    var user_name = $('#searchfield').val();
    $.ajax({
        dataType: "json",
        url: "https://api.github.com/users/" + user_name + "/repos?per_page=1000",
        success: function (result) {
            stats(user_name, result);
        },
        error: function () {
            print_error();
        },
        async: false
    });
}
;
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