# github-language-statistics


[![Project Status](http://www.repostatus.org/badges/latest/inactive.svg)](http://www.repostatus.org/#inactive)
[![Build Status](https://travis-ci.org/dirmeier/github-language-statistics.svg?branch=master)](https://travis-ci.org/dirmeier/github-language-statistics)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/9d7da34f83814e9d80091949ce7de06b)](https://www.codacy.com/app/simon-dirmeier/github-language-statistics?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dirmeier/github-language-statistics&amp;utm_campaign=Badge_Grade)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)

Compute a GitHub user's most frequently used languages.

## Introduction

This repository uses the GitHub API to calculate the most frequently used languages for a user.
Specifically, the GitHub meta data can be accessed using standard HTTP requests (`GET`) to access a user's
repositories (not the forks). From this we calculate the `bytes` of used languages and visualize it using `Plotly`.

I was interested what languages I use the most, but couldn't find any quick solutions,
so I decided to implement an simple web-frontend for this. The front-end can be used by everyone, but be aware that the GitHub
limits the number of requests per IP and hour.

Below, you see my most used languages (13. 10. 2017).

<div align="center" style="text-align: center">
		<img src="https://rawgit.com/dirmeier/github-user-statistics/master/_fig/github_statistics.png" align="center" width="800px"/>
</div>

Find the webpage [here](https://dirmeier.github.io/github-language-statistics/index.html).

## Author

* Simon Dirmeier <a href="mailto:simon.dirmeier@gmx.de">simon.dirmeier@gmx.de</a>
