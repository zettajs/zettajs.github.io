---
layout: project
title: How to Share a Project
author: Alan Languirand
description: >
  People create interesting projects with Zetta. Get started by re-creating the projects of others. Or share the Internet of Things projects you have created with the Zetta community.
---

# Contents

1. [What is a Project?](#what-is-a-project)
1. [How to Create Project Instructions](#how-to-create-a-project)
1. [How to Share a Project](#how-to-share-a-project)
1. [Style Guide](#style-guide)
1. [Markdown Guide](#markdown-guide)
1. [Projects versus Guides](#projects-versus-guides)
1. [Getting Help](#getting-help)
{:.steps}

# What is a Project?

A project instructs a person through a Zetta project step-by-step. The [IoT Security System](/projects/2014/09/18/IoT-Security-System.html) is an exemplary project. Please use it as a model for creating your own projects.

# Style Guide

While you're cooking - about to burn tonight's dinner - you don't want to follow a project that provides you with long-winded explanations for each step. You want the facts. You want them clear. And you want to easily scan the steps so you can find your place and continue cooking. As you write a Zetta project, imagine that you're writing it for a cook who doesn't want to burn tonight's dinner:

* Write clear, concise instructions using the tone of a command:
  * Preheat oven to 350 degrees F (175 degrees C).
  * Stir the butter and sugar until smooth.
  * Connect the red wire from Breadboard H18 to BeableBone P9 32.
* Use as few words as possible.
  * But no fewer.
* Show all relevant commands in the terminal.
* Show all relevant source code.
* Show all relevant screenshots.
* Illustrate with Fritzing diagrams.
* Illustrate with photos.

# Markdown Guide

Zetta projects are writeen in markdown, we use [kramdown](http://kramdown.gettalong.org/) as our markdown parser, and it is interpreted as [github flavored markdown](https://help.github.com/articles/github-flavored-markdown).

## Project Template

Make a copy of the [project boilerplate](https://gist.githubusercontent.com/alanguir/92386e8b46101609e17d/raw/project.md) to get started quickly with writing your own zetta project.


## As Standard as possible

Wherever we can, we try to adhere to standard markdown and simply let our stylesheet do all the hard visualization work. If you use github, then it's likely that the only new markdown syntax you'll encounter in this guide is for [attributes](#attributes).

## Headings

Level one headings `#` create horizontal breaks in your content, and make it easy to visually denote sections of your document. This blue bar is an example of level one heading:

![Heading Example](/images/projects/meta_project/h1_example.png){:.zoom}

> Did you notice the **link**{:.icon} (link) icon to the left of the heading? Clicking on a heading of **any** level changes the URL hash for easy *intra-*page linking, just like github. Use these links in your `#Project Steps` section

All other heading levels `##..######` behave just as you'd expect.

## Tips

Tips are rendered from `<blockquote>` elements. To make a tip, just start a line with a `>` (greater than) symbol...just like text-only email quoting. There is a tip above under the example header picture.

```markdown
> This will render as a tip!
```

In general, having more than one consecutive tip means that the information the tip is modifying should be modified. Try to write your project so that there is no more than one tip per paragraph or piece of preceeding information.

## Code

All `code` used in projects is written just like on github, with matched pairs of a single ` (backtick) for inline code, and four spaces at the beignning of a line or ``` (3+ backticks) for code fences. Code fences with language definitions will be highlighted using [highlight.js](https://highlightjs.org/) and the **monokai_sublime** theme. Here's an example:

`````markdown
This is an example of using `inline code` in markdown.

```markdown
#This text
Will be highlighted like markdown.
> Using [highlight.js](https://highlightjs.org/)
```
`````

We've also extended highlight.js to show line numbers for any code that is more than 2 lines long. To *remove* line numbers you need to add `-noln` to the language definition. We've found that this doesn't always render properly and you need drop code fences and just surround your code with html, like this:

```markdown
<pre><code class="bash-noln">
  zetta-hello-world
    ├── node_modules
    ├── package.json
    └── server.js
</code></pre>
```

## Attributes

Kramdown supports [inline attribute lists](http://kramdown.gettalong.org/syntax.html#inline-attribute-lists), and we use them for adding classes to step lists and images.

To get your list of steps in your `# Project Steps` section to render larger like it does in the [IoT Security System](/projects/2014/09/18/IoT-Security-System.html#project-steps) project add a class of `steps` to the list by following it with a `{:.steps}` attribute list like this:

``` markdown
# Project Steps

1. [Add the Piezo Buzzer](#add-the-piezo-buzzer)
   This element will get us going with the basics of Zetta. This step will have us dealing with `npm` and `drivers`.
...
5. [Next Steps](#next-steps)
{:.steps}

```

## Images

Project images are served from a subdirectory matching `your_project_name` under the `/images/projects` directory:

```bash
/images/projects/{your_project_name}/{your_image}.png
```

Images are scaled down by default. They can be viewed larger in a modal window by using an [inline attribute list](http://kramdown.gettalong.org/syntax.html#inline-attribute-lists) to attach the `zoom` class to the image element.

```markdown
Regular image:
![Heading Example](/images/projects/meta_project/h1_example.png)

Image with modal zoom:
![Heading Example](/images/projects/meta_project/h1_example.png){:.zoom}
```

> Add the `{:.zoom}` attribute to an image without any whitespace after the closing `)` parenthesis, or else the image may be wrapped in a `<p>` tag, and the `zoom` class will be applied to that `<p>` tag.

## Icons

Zetta uses a [symbolset](https://symbolset.com/) font to render icons in the style of [SSPika](https://symbolset.com/icons/pika). A symbolset converts text into an icon by using font ligatures. For example, these icons:

**like**{:.icon} **clockwise**{:.icon}

Are written semantically in markdown like this:

```markdown
**like**{:.icon}
**clockwise**{:.icon}
```

> Icon text is made by giving a word's containing element a class of `icon`. Since we probably only want one icon at a time, we need to wrap that text in a `<strong>` tag using `**` (bold). This gives the `{:.icon}` attribute list something to be applied to.

> View the [icon reference](http://styleguide.thenextweb.com/ss-pika/documentation.html) to see the full list of 504 icons available, and the text used to create them.  

# Projects versus Guides

Projects differ from [Guides](/guides) in both length and complexity. Projects are generally for longer and more complex topics while guides are a great place to put tangential information that is generally shorter and often relates to a topic covered in multiple recipies. This article is written as a guide because it is more like a reference doc than a step-by-step procedure.

{::comment}

For example, [IoT Security System](/projects/2014/09/18/IoT-Security-System.html) project uses a BeagleBone Black for running zetta. That project links to the [Getting Started with BeagleBone Black](/guides/url.html) guide, rather than reiterating that setup process in the project.

{:/comment}

# Getting Help

Do you have questions about this guide? Feel free to reach out through any of these methods:

* alanguirand@apigee.com
* [https://groups.google.com/forum/#!forum/zetta-discuss]()
* [https://github.com/zettajs/zetta/issues]()
* [Reference Documentation: http://zettajs.github.io/]()
