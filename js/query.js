function printError(response)
{
  $('.plotbox').show();
  $('#spinner_id').hide();
  $('.plotbox').html("<h6>Could not GET repository information from GitHub API.<br>" + response + "</h6>");
}

function getRepoNames(results)
{
  var repoNames = [];
  for (var i = 0; i < results.length; i++)
  {
    var result = results[i];
    if (result.fork === false)
    {
      repoNames.push(result.name);
    }
  }

  return repoNames;
}



function repoLanguageBytes(userName, repoNames)
{
  var repoStats = {};

  var getRepo = function(repoName)
  {
    var d = {};
    $.ajax({
      dataType: "json",
      url: "https://api.github.com/repos/" + userName + "/" + repoName + "/languages",
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

  for (var i = 0; i < repoNames.length; i++)
  {
      repoStats[repoNames[i]] = getRepo(repoNames[i])
  }

  return repoStats;
}


function stats(userName, data)
{
  var repoNames = getRepoNames(data);
  var bytes = repoLanguageBytes(userName, repoNames);

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

  var userName = $('#searchfield').val();
  $.ajax({
    dataType: "json",
    url: "https://api.github.com/users/" + userName + "/repos?per_page=1000",
    success: function (result)
    {
      stats(userName, result);
    },
    error: function (xhr, status, error)
    {
      printError(JSON.parse(xhr.responseText).message);
    },
    async: false
  });
};
