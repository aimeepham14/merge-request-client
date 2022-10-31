# __Merge Request__

Looking for friends? A soulmate? Look no further than [Merge Request](https://mergerequest.netlify.app/), an online connection app. We all know software engineers are focused and introverted so we made an app that make it easy to connect with others to help bring them out of their comfort zone. A dating app for developers to develop meaningful relationships.

## Team Members:
- Aimee Pham
- Stephen Yorn
- Tyler Chan

## Technology Stack:
 - Cloudinary (API to upload and retrieve images)
 - Axios (NPM package to retrieve data from API)
 - Bcrypt (NPM to hash passwords)
 - Jwt-decode (Decode Json Web Token)
 - JavaScript 
 - CSS
 - MongoDB (Backend Server)
 - Mongoose (Backend Server NPM)
 - React (Front-End Framework)
 - Node
 - Rowdy (Server configuration library)
 - Express (Display backend data through simple html)
 - Tailwind (CSS framework)

## General Approach

As aspiring software engineers we wanted to create a MERN stack social media application that incorporates Cloudinary. After brainstorming potential project ideas we decided to create a software engineering dating app as our contribution to the world of developers. 

We utilized Miro as our main source to communicate, Google documents to brainstorm ideas, and Zoom to assist each other. Outside of class, we used Discord to communicate any issues or new ideas. Miro was vital to our overall success. The online whiteboard application allowed us to create a virtual blueprint of our project. Through Miro we were able to create wireframes, post bugs, communicate potential ideas, check daily tasks, and record completed tasks.

As a team, we complimented each other's strengths and weaknesses. Tyler worked diligently to set up the server to make sure the routes would communicate effectively with the client. Aimee contributed as the CSS and front end specialist. Stephen contributed to both the front and backend of the project. 

## Server Installation Instructions
https://github.com/tylerchan33/merge-request-server

To set up Merge Request server, first fork and clone this repository.

* Navigate to the cloned repository in your terminal and run this code: ```npm -install``` or ```npm i```
* Make sure to create a .gitignore file and store the node modules. Run this code: ```node_modules >> .gitignore```
* Create a .env file by running this code in your terminal: ``` touch .env ```
* Make sure to add ``` .env ``` into your ``` .gitignore ```
* In your new .env file create two variables: ```JWT_SECRET=`<This can be anything>` ``` and ```PORT=8000```
* In order to upload profile pictures, you will have to set up a Cloudinary account. https://cloudinary.com/home-102622
* Once you have created an account, make sure to set additional variables in your .env file: ``` REACT_APP_CLOUDNAME=<your cloudinary cloudname> ```
* Awesome, your server is set! Make sure to run ``` nodemon ``` in your cloned server respository and make sure the client is also running!


## Client Installation Instruction
https://github.com/aimeepham14/merge-request-client

To set up Merge Request client, first fork and clone this repository.

* Navigate to the cloned repository in your terminal and run this code: ```npm -install``` or ```npm i```
* Make sure to create a .gitignore file and store the node modules. Run this code: ```node_modules >> .gitignore```
* Create a .env.local file by running this code in your terminal: ``` touch .env.local ```
* Make sure to add ``` .env.local ``` into your ``` .gitignore ```
* In your new .env.local file add this code to connect the server ``` REACT_APP_SERVER_URL=http://localhost:8000 ```
* Additionally, make sure to set up a mapbox account. https://www.mapbox.com/
* Once you have created an account set an additional variable in your .env file: ``` REACT_APP_MAP_API_KEY=<your mapbox api key> ```
* Awesome, your client is set! Make sure to run ``` npm run start ``` in your cloned client repository and make sure the server is also running!



 ## User Stories:

 * As a user I would like to let others know what I'm looking for on this app.
 * As a user, I would like to be able to set preferences on who I would like to match with on the app.
 * As a user, I would like to be able to swipe right on someone I am interested in connecting with.
 * As a user, I would like to see a list of everyone that I have swiped right on and they have mutually also swiped right on me as well.
 * As a user, I would like to message someone that has swiped right on me.
 * As a user, I would like to delete someone that has matched with me.

 ## ERD

![image](https://i.imgur.com/V4roALQ.png)

## Restful Routing Chart

![image](https://i.imgur.com/9i7HbaM.png)

## Wireframes

Homepage:

![image](https://i.imgur.com/SVmUGtn.png)

Sign Up:

![image](https://i.imgur.com/xPGZQeI.png)

Browse Feed:

![image](https://i.imgur.com/2IJz0Ia.png)

Chat:

![image](https://i.imgur.com/m1zOHYw.png)

Merge Match:

![image](https://i.imgur.com/cxpfi1f.png)


## Plan Breakdown

* Monday
    - Finalize a project idea
    - Create Repo for Client/Server
    - Finish Read.Me/Pitch
    - Finish Wireframes
    - Research Cloudinary

* Tuesday
    - Stub out components
    - Stub out server calls

* Wednesday
    - Complete backend
    - Stub out components
        - Sign Up
        - Login
        - Feed
        - Homepage
        - Messages
        - About us

* Thursday
    - Client:
        - Auth Modal
        - Chat Display
        - Match Display
        - Create a dashboard
        - Homepage
        - Getting users by gender preference

* Friday
    - Display chat history
    - Adding new messages
    - Figure out Cloudinary
    - Deleting a match

* Saturday 
    - Cloudinary continued
    - CSS Tailwind

* Sunday
    - CSS Tailwind
    - Deploy Application

## MVP

* Users can create a account
* Users has a bio
* Users have a feed of potential matches with their preferences
* Users can "like" on a profile to potentially add to their match list
* Users can message their matches
* Users can update and delete their account
* Users can upload a photo of themselves
* Users can delete a match


## Stretch Goals

* Amazing CSS
* Have users "match" with each other
* Filter users by distance
* Report Users
* Allow users to send pictures to each other
* Allow users to upload multiple photos

## Major Hurdles

One of our major hurdles was actually the main function of our application. Allowing users to swipe and having that action chain into adding users into their liked or rejected database tables while checking for matches was a hard system to figure out. Additional hurdles we faced was filtering out available users by preference or distance.
