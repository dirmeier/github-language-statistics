function printError(response)
{
  $(".plotbox").show();
  $("#spinner_id").hide();
  $(".plotbox").html("<h6>Could not GET repository information from GitHub API.<br>" + response + "</h6>");
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
  for (var i = 0; i < repo_names.length; i++)
  {
    $.ajax({
      dataType: "json",
      url: "https://api.github.com/repos/" + user_name + "/" + repo_names[i] + "/languages",
      success: function (data)
      {
        repo_stats[repo_names[i]] = data;
      },
      error: function (xhr, status, error)
      {
        printError(JSON.parse(xhr.responseText).message);
      },
      async: false
    });
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

function query()
{
  $("#spinner_id").show();
  $(".plotbox").hide();

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
}
