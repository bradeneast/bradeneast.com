# Designing, prototyping, and coding and simple web app from scratch
## 2019/08/11
### design, business

Have you ever needed to pair the right icons with your sales copy? It's the weekend, so I decided to build a companion to my first web app, the [Design Starter Toolkit](https://designstarterapp.netlify.com). I don't expect this second app to have quite as many moving parts, but I hope it can save time and headaches for my designer and developer friends.

#### Why does icon choice matter?

If you've worked on a project involving sales copy, you've probably faced the challenge of picking an icon that helps communicate your message visually. Your icon pairings can make the difference between a lost customer and a quality lead.

Picking icons that are too abstract will open your meaning up to interpretation, making readers work harder to understand your point and leaving room for confusion.

Picking icons that are too complex or illustrative will distract customers from the copy. This can break up the flow of the story you're telling with your sales page, and hurt conversion when potential customers reach your call to action.

Shopify has a [great article](https://www.shopify.com/partners/blog/how-to-use-icons-to-enhance-your-ecommerce-website) on how picking the right icons can enhance sales.

On top of that, if you're anything like me, it's easier to write when you have a visual aide. From sales pages to social media posts, I've found I write more compelling copy when I have a visual already in place. We want our icons to harmonize with the copy we've labored over, not hinder it.

That said, let's get into wireframing, prototyping, and coding this tool so we can use it to level up our projects!

#### Wireframing

There's not much to do here, since the the tool will be a single-page app.  However, we do want to make sure we have an idea of layout, page elements, and organization before we jump into prototyping.

My idea is to have a few different layout options that will dynamically populate based on whatever users are currently typing.  I might want to have a single section where you can switch the layout via dropdown or something.  We'll see what feels better when we get to it.

Side note: obviously, we'd want to expend more effort on the wireframe for anything over one page.

![wireframe](/images/blog/pair-icons-wireframe.svg)

#### Prototyping

Next, let's use a screen design tool to prototype our user interactions. (I've recently started using [InVision Studio](https://www.invisionapp.com/studio) and I love it).  I really enjoy this part of the app design process, because I can very quickly get a taste of the overall feel and user experience of the app.

A few features I added during this step:
 - Words that match an icon in the library are highlighted to clarify why you're getting a particular set of results
 - Users can switch between icon results in real time (this might be tricky to implement - whoops)
 - 

If there's a massive oversight, it's much easier to catch it and pivot at this stage than after the code is written.

![prototype](/images/blog/icon-app-interaction.gif)

#### Writing the code

If you're not a developer, this section might offer some insight into the development process and how to give your dev friends everything they need to execute your vision.


#### Wrapping up

Github repository

suggestions for improvements? We're all still learning and I welcome constructive feedback.