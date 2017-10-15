function printError(response)
{
  $('.plotbox').show();
  $('#spinner_id').hide();
  $('.plotbox').html("<h6>Could not GET repository information from GitHub API.<br>" + response + "</h6>");
}

function getRepoNames(results)
{
  var repo_names = [];
  for (var i = 0; i < results.length; i++)
  {
    var result = results[i];
    if (result.fork === false)
    {
      repo_names.push(result.name);
    }
  }

  return repo_names;
}



function repoLanguageBytes(user_name, repo_names)
{
  var repo_stats = {};

  var get_repo = function(repo_name)
  {
    var d = {};
    $.ajax({
      dataType: "json",
      url: "https://api.github.com/repos/" + user_name + "/" + repo_name + "/languages",
      success: function (data)
      {
        d = data;
      },
      error: function (xhr, status, error)
      {
        printError(JSON.parse(xhr.responseText).message);
      },
      async: false
    });

    return d;
  };

  for (var i = 0; i < repo_names.length; i++)
  {
      repo_stats[repo_names[i]] = get_repo(repo_names[i])
  }

  return repo_stats;
}


function stats(user_name, data)
{
  var repo_names = getRepoNames(data);
  var bytes = repoLanguageBytes(user_name, repo_names);

  if (bytes)
  {
    /*global barplot */
    barplot("plotbox_id", bytes);
  }
}

var query = function()
{
  $('#spinner_id').show();
  $('.plotbox').hide();

  var user_name = $('#searchfield').val();
  $.ajax({
    dataType: "json",
    url: "https://api.github.com/users/" + user_name + "/repos?per_page=1000",
    success: function (result)
    {
      stats(user_name, result);
    },
    error: function (xhr, status, error)
    {
      printError(JSON.parse(xhr.responseText).message);
    },
    async: false
  });
};
;function barplot (div_id, mapping)
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
  }

  if (repo_bytes.length !== 0)
  {
    var layout = {
      title: 'Most used programming languages in bytes',
      barmode: 'stack',
      height: 1000
    };
    $('#spinner_id').hide();
    /*global Plotly */
    Plotly.newPlot(div_id, repo_bytes, layout);
    $('.plotbox').css('display', 'block');
  }
  else
  {
    $('.plotbox').show();
    $('#spinner_id').hide();
    $('.plotbox').html('<h6>Could not plot, got an error.<br> Does this user exist?</h6>');
  }
}