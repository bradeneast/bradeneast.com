# Building a simple web app from scratch (part 1 - Wireframe and Protoype)
## 2019/08/24
### design

Have you ever needed to pair the right visual with a message? It's the weekend, so I decided to build a companion to my first web app, the [Design Starter Toolkit](https://designstarterapp.netlify.com). I don't expect this second app to have quite as many moving parts, but I hope it can save time and headaches for my friends who write better with a visual aid.

If you're anything like me, it's easier to write when you have a visual aid. From sales pages to social media posts, it's much easier to write compelling copy when I have a visual already in place. We want our visuals to harmonize with the text in a way that reinforces our message and doesn't hinder it.

There are several free, high quality icon libraries out there, so we should have all the resources we need.

That said, let's get into wireframing, prototyping, and coding this tool so we can use it to level up our projects!

#### Wireframing

There's not much wireframing involved in a single-page web application. However, having an idea of layout and organization before we jump into prototyping will save us time when we open up Visual Studio Code and write our HTML, CSS, and Javascript. Obviously, we'd expend more effort on a wireframe for a multi-page site.

![wireframe](/images/blog/pair-icons-wireframe.svg)

#### Prototyping

Next, let's use a screen design tool to prototype our user interactions. (I've recently started using [InVision Studio](https://www.invisionapp.com/studio) and I love it).  I really enjoy this part of the UI/UX design process, because I can very quickly get a taste of the site's overall flow and feel.

A few features I added during this step:
 - Words that match an icon in the library are highlighted to clarify why you're getting a particular set of results
 - Users can switch between icon results in real time (this might be tricky to implement - whoops)
 - Users can switch between layouts in real time

If there's a massive oversight, it's much easier to catch it and pivot at this stage than after the code is written.

![prototype](/images/blog/icon-app-interaction.gif)

#### Wrapping Up

In a future article, I'll walk through writing the code to make our prototype functional and beautiful.