<h1 align="center"> github-user-statistics </h1>


[![Project Status](http://www.repostatus.org/badges/latest/concept.svg)](http://www.repostatus.org/#concept)
[![Build Status](https://travis-ci.org/dirmeier/github-user-statistics.svg?branch=master)](https://travis-ci.org/dirmeier/github-user-statistics)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/f124cbf9146a40e1bd893aeaac608ce8)](https://www.codacy.com/app/simon-dirmeier/plot-js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=dirmeier/plot.js&amp;utm_campaign=Badge_Grade)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)

Compute a GitHub user's most frequently used languages.

## Introduction

This repository uses the GitHub API to calculate the most frequently used languages for a user.
Specificially, the GitHub meta data can be accessed using standard HTTP requests (`GET`) to access a user's
repositories (not the forks). From this we calculate the percentage of used languages and vizualize it using `Plotly`.

Find it [here](https://dirmeier.github.io/github-user-statistics/index.html).

## Author

* Simon Dirmeier <a href="mailto:simon.dirmeier@gmx.de">simon.dirmeier@gmx.de</a>
