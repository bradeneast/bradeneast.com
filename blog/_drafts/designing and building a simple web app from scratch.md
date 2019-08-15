# Building a simple web app from scratch (part 1 - Wireframe and Protoype)
## 2019/08/11
### design, business

Have you ever needed to pair the right icons with your sales copy? It's the weekend, so I decided to build a companion to my first web app, the [Design Starter Toolkit](https://designstarterapp.netlify.com). I don't expect this second app to have quite as many moving parts, but I hope it can save time and headaches for my designer and developer friends.

#### Why does icon choice matter?

If you've worked on a project involving sales copy, you've probably faced the challenge of picking an icon that helps communicate your message visually. Your icon pairings can make the difference between a lost customer and a quality lead.

Picking icons that are too abstract will open your meaning up to interpretation, making readers work harder to understand your point and leaving room for confusion.

Picking icons that are too complex or illustrative will distract customers from the copy. This can break up the flow of the story you're telling with your sales page, and hurt conversion when potential customers reach your call to action.

Shopify has a [great article](https://www.shopify.com/partners/blog/how-to-use-icons-to-enhance-your-ecommerce-website) on how picking the right icons can enhance sales.

On top of that, if you're anything like me, it's easier to write when you have a visual aide. From sales pages to social media posts, I've found I write more compelling copy when I have a visual already in place. We want our icons to harmonize with the copy we've labored over, not hinder it.

There are several free, high quality icon libraries out there, so we should have all the resources we need.

That said, let's get into wireframing, prototyping, and coding this tool so we can use it to level up our projects!

#### Wireframing

There's not much wireframing involved in a single-page application. However, having an idea of layout and organization before we jump into prototyping will save us time when we open up Visual Studio and write the HTML, CSS, and Javascript.

Side note: obviously, we'd expend more effort on a wireframe for a multi-page site.

![wireframe](/images/blog/pair-icons-wireframe.svg)

#### Prototyping

Next, let's use a screen design tool to prototype our user interactions. (I've recently started using [InVision Studio](https://www.invisionapp.com/studio) and I love it).  I really enjoy this part of the app design process, because I can very quickly get a taste of the overall feel and user experience of the app.

A few features I added during this step:
 - Words that match an icon in the library are highlighted to clarify why you're getting a particular set of results
 - Users can switch between icon results in real time (this might be tricky to implement - whoops)
 - Users can switch between layouts in real time

If there's a massive oversight, it's much easier to catch it and pivot at this stage than after the code is written.

![prototype](/images/blog/icon-app-interaction.gif)

#### Wrapping Up

In a future article, I'll walk through coding the UI from scratch, and writing the code to make it a truly functional and shareable web app.