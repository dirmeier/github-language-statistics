
function print_error() {
    $(".plotbox").show();
    $("#spinner_id").hide();
    $(".plotbox").html("<h6>Could not GET repository information from GitHub API.<br>Some AJAX error.</h6>");
}

function get_repo_names(results)
{
    var repo_names = [];
    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        if (result.fork === false) {
            repo_names.push(result.name);
        }
    }

    return repo_names;
}

function repo_language_bytes(user_name, repo_names)
{
    var repo_stats = {};
    for (i = 0; i < repo_names.length; i++) {
        $.ajax({
            dataType: "json",
            url: "https://api.github.com/repos/" + user_name + "/" + repo_names[i] + "/languages",
            success: function (data) {
                repo_stats[ repo_names[i] ] = data;
            },
            error: function () {
                print_error();
            },
            async: false
        });
    }

    return repo_stats;
}



function stats(user_name, data) {
    var repo_names = get_repo_names(data);
    var bytes = repo_language_bytes(user_name, repo_names);

    /*global barplot */
    barplot("plotbox_id", bytes);
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
    var repo_bytes = [];
    for (var repo_name in mapping)
    {
        var repo = mapping[repo_name];
        repo_bytes.unshift({
            x: [],
            y: [],
            name: repo_name,
            orientation: 'h',
            type: "bar"
        });
        for (var lang in repo)
        {
            repo_bytes[0].y.push(lang);
            repo_bytes[0].x.push(repo[lang]);
        }
        i = i + 1;
    }

    if (repo_bytes.length !== 0)
    {
        var layout = {
            title: 'Most used programming languages in bytes',
            barmode: 'stack',
            height: 1000
        };
        $("#spinner_id").hide();
        /*global Plotly */
        Plotly.newPlot(div_id, repo_bytes, layout);
        $(".plotbox").css("display", "block");
    }
    else
    {
        $(".plotbox").show();
        $("#spinner_id").hide();
        $(".plotbox").html("<h6>Could not plot. Some error.</h6>");
    }
}