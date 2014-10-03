---
layout: guide
title: How to Share a Recipe
author: Alan Languirand
---

This guide is meant to show you the ins and outs of contributing a recipe to zettajs.org. 

# When you should write a recipe

Recipies should be written when there is a mix of software and (usually) hardware procedures that need to be followed in a specific order to teach a concept or achieve a result. An example is the [IoT Security System](/recipes/2014/09/18/IoT-Security-System.html) recipe. 

## Recipes vs. Guides

Recipes differ from [Guides](/guides) in both length and complexity. Recipes are generally for longer and more complex topics while guides are a great place to put tangential information that is generally shorter and often relates to a topic covered in multiple recipies. This article is written as a guide because it is more like a reference doc than a step-by-step procedure. 

{::comment}

For example, [IoT Security System](/recipes/2014/09/18/IoT-Security-System.html) recipe uses a BeagleBone Black for running zetta. That recipe links to the [Getting Started with BeagleBone Black](/guides/url.html) guide, rather than reiterating that setup process in the recipe. 

{:/comment}

# Guide Contents

1. [Recipes are written in Markdown](#recipes-are-written-in-markdown)
2. [Headings](#headings)
3. [Tips](#tips)
4. [Code](#code)
5. [Attributes](#attributes)
6. [Images](#images)
7. [Icons](#icons)
8. [Boilerplate](#boilerplate)
9. [Getting Help](#getting-help)
{:.steps}

# Recipes are written in Markdown
  
Zetta recipes are writeen in markdown, we use [kramdown](http://kramdown.gettalong.org/) as our markdown parser, and it is interpreted as [github flavored markdown](https://help.github.com/articles/github-flavored-markdown). 

## As Standard as possible

Wherever we can, we try to adhere to standard markdown and simply let our stylesheet do all the hard visualization work. If you use github, then it's likely that the only new markdown syntax you'll encounter in this guide is for [attributes](#attributes). 

# Headings

Level one headings `#` create horizontal breaks in your content, and make it easy to visually denote sections of your document. This blue bar is an example of level one heading: 

![Heading Example](/images/recipes/meta_recipe/h1_example.png){:.zoom}

> Did you notice the **link**{:.icon} (link) icon to the left of the heading? Clicking on a heading of **any** level changes the URL hash for easy *intra-*page linking, just like github. Use these links in your `#Recipe Steps` section

All other heading levels `##..######` behave just as you'd expect.

# Tips

Tips are rendered from `<blockquote>` elements. To make a tip, just start a line with a `>` (greater than) symbol...just like text-only email quoting. There is a tip above under the example header picture. 

```markdown
> This will render as a tip!
```

# Code

All `code` used in recipes is written just like on github, with matched pairs of a single ` (backtick) for inline code, and four spaces at the beignning of a line or ``` (3+ backticks) for code fences. Code fences with language definitions will be highlighted using [highlight.js](https://highlightjs.org/) and the **monokai_sublime** theme. Here's an example:

`````markdown
This is an example of using `inline code` in markdown. 

```markdown
#This text 
Will be highlighted like markdown.
> Using [highlight.js](https://highlightjs.org/)
```
`````

# Attributes

Kramdown supports [inline attribute lists](http://kramdown.gettalong.org/syntax.html#inline-attribute-lists), and we use them for adding classes to step lists and images.

To get your list of steps in your `# Recipe Steps` section to render larger like it does in the [IoT Security System](/recipes/2014/09/18/IoT-Security-System.html#recipe-steps) recipe add a class of `steps` to the list by following it with a `{:.steps}` attribute list like this: 

``` markdown
# Recipe Steps 
   
1. [Add the Piezo Buzzer](#add-the-piezo-buzzer)
   This element will get us going with the basics of Zetta. This step will have us dealing with `npm` and `drivers`.
...
5. [Next Steps](#next-steps)
{:.steps}

```

# Images

Images are scaled down by default. They can be viewed larger in a modal window by using an [inline attribute list](http://kramdown.gettalong.org/syntax.html#inline-attribute-lists) to attach the `zoom` class to the image element. 

```markdown
Regular image:
![Heading Example](/images/recipes/meta_recipe/h1_example.png)

Image with modal zoom: 
![Heading Example](/images/recipes/meta_recipe/h1_example.png){:.zoom}
```

> Add the `{:.zoom}` attribute to an image without any whitespace after the closing `)` parenthesis, or else the image may be wrapped in a `<p>` tag, and the `zoom` class will be applied to that `<p>` tag. 

# Icons

Zetta uses a [symbolset](https://symbolset.com/) font to render icons in the style of [SSPika](https://symbolset.com/icons/pika). A symbolset converts text into an icon by using font ligatures. For example, these icons: 

**like**{:.icon} **clockwise**{:.icon}

Are written semantically in markdown like this: 

```markdown
**like**{:.icon}
**clockwise**{:.icon}
```

> Icon text is made by giving a word's containing element a class of `icon`. Since we probably only want one icon at a time, we need to wrap that text in a `<strong>` tag using `**` (bold). This gives the `{:.icon}` attribute list something to be applied to. 

> View the [icon reference](http://styleguide.thenextweb.com/ss-pika/documentation.html) to see the full list of 504 icons available, and the text used to create them.  

# Boilerplate

Make a copy of the [recipe boilerplate](https://gist.githubusercontent.com/alanguir/92386e8b46101609e17d/raw/recipe.md) to get started quickly with writing your own zetta recipe. 

# Getting Help

Do you have questions about this guide? Feel free to reach out through any of these methods:

* alanguirand@apigee.com
* [https://groups.google.com/forum/#!forum/zetta-discuss]()
* [https://github.com/zettajs/zetta/issues]()
* [Reference Documentation: http://zettajs.github.io/]()