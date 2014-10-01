---
layout: recipe
title: How to Author a Zetta Recipe
author: Alan Languirand
---

This recipe is meant to show you the ins and outs of contributing a recipe to zettajs.org. 

# When you should write a recipe

Recipies should we written when there is a mix of software and (usuall) hardware procedures that need to be followed in a specific order to teach a concept or achieve a result. An example is [IoT Security System](/recipes/2014/09/18/IoT-Security-System.html) recipe. 

## Recipes vs. Guides

Recipes differ from [Guides](/guides) both in length and complexity. Recipes are generally for longer more complex topics while guides are a great place to put tangential information that is generally shorter and often relates to a topic covered in multiple recipies. 

For example, [IoT Security System](/recipes/2014/09/18/IoT-Security-System.html) recipe uses a BeagleBone Black for running zetta. That recipe links to the [Getting Started with BeagleBone Black](/guides/url.html) guide, rather than reiterating that setup process in the recipe. 


# Recipes are written in Markdown
  
Zetta recipes are writeen in markdown, and we use [kramdown](http://kramdown.gettalong.org/) as our markdown parser. We parse our markdown as [GFM](https://help.github.com/articles/github-flavored-markdown). 

## As Standard as possible

Wherever we can, we try to adhere to standard markdown and simply let our stylesheet do all the hard visualization work of our recipies. Here are a few notable features you get just by typing standard markdown syntax

* boilerplate
* Steps
  * Tour
* Submitting your recipe