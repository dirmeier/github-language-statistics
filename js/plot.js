
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