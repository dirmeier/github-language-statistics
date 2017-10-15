function barplot(divId, mapping)
{
  var repoBytes = [];
  for (var repoName in mapping)
  {
    var repo = mapping[repoName];
    repoBytes.unshift({
      x: [],
      y: [],
      name: repoName,
      orientation: 'h',
      type: "bar"
    });
    for (var lang in repo)
    {
      repoBytes[0].y.push(lang);
      repoBytes[0].x.push(repo[lang]);
    }
  }

  if (repoBytes.length !== 0)
  {
    var layout = {
      title: 'Most used programming languages in bytes',
      barmode: 'stack',
      height: 1000
    };
    $('#spinner_id').hide();
    /*global Plotly */
    Plotly.newPlot(divId, repoBytes, layout);
    $('.plotbox').css('display', 'block');
  }
  else
  {
    $('.plotbox').show();
    $('#spinner_id').hide();
    $('.plotbox').html('<h6>Could not plot, got an error.<br> Does this user exist?</h6>');
  }
}
