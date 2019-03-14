# nightingale      ![travis](https://travis-ci.org/techforbetter/nightingale.svg?branch=master)
An app that aims to help students reflect on their emotions and work out what's affecting them at school

https://botnightingale.herokuapp.com/ 

# An App related to Tech for Better
[Tech for Better](https://www.foundersandcoders.com/techforbetter/) is a pro-bono programme for nonprofits to design, test and build new digital service ideas using developers in London and Gaza.

## About the client
Nightingale is the result of two co-founders, Aaron and George, aiming towards the creation of an innovative analytical software tool for the early identification of mental health and wellbeing concerns in schools. 
Nightingale was not created just from professional insight but also from personal experience of mental health. It is this personal experience that drives this company to ensure that it builds a software that creates a lasting and meaningful impact on all those that use it.

## About the MVP
This current version of the app is a Minimum Viable Product (MVP) focussing on the most relevant features and needs. Working in agile software development it is important to constantly test products with users. MVPs can be taken out as proof-of-concepts challenging own pre-assumptions and to eventually improve digitalised ideas and needs.

#### Note:
The (MVP) was designed and built over the course of 4 weeks (1 design sprint, user testing and 2 build sprints). 

## What the app does
Working with Aaron and George withing several definition workshops narrowed down the scope and created the idea of producing a chat-bot that students could use in order to become aware of the relation between school and mental health. 
The result is a mobile-first web-app that allows students to create an account and start chatting to the nightingale bot. Based on an extensive conversation flow model designed by the product owners, the bot regularly asks the user about his/ her individual experiences at school. The bot stores key information such as favourite/ least favourite subjects and the days on which a user is having those subjects. On those ‘weekly events’ the bot checks in with the student asking about experiences on that day related to the subject (e.g. Hey Nadia, how was Maths today?’. But the bot also initiates conversations about further factors related to mental health of individuals at school such as connections with other classmates and teachers. Moreover the bot gives a student room to self-reflect about their day at school by allowing them to freely write about experiences/ feelings related to respective school days. Students can chat to the bot on a daily basis and the conversations are being stored on that day. One special feature of the app is that a student is asked to rate the day at school (mood rankings between ‘amazing’ and ‘terrible’). Those moods are being stored and an average mood per day is calculated and shown to the student. A user can always log onto the app and access all past conversations and related moods. Moreover daily ratings are being used to create breakdowns of average moods per day and a summary of a student’s feeling over the last 30 days using the bot. Moreover the app includes a section of recommended sources of advice and a key-word analysis on the student's text input as a means of security. The keyword check operates in the background creating immediate email-alerts to notify the product owners.

A summary of the initial agreed scope can be found here: https://github.com/techforbetter/nightingale/issues/5

As stated above what has been built to date is a MVP that will enable the product owner to do further user testing. 

![nightingale-individjpg](https://user-images.githubusercontent.com/23721486/53017517-7535d100-3450-11e9-8081-38a1fe80589a.jpg)

## The app’s potential social impact
The vision is to encourage students to reflect on the link between their school experiences and mood. Demonstrating connections between experiences at school and mental wellbeing are giving the user the ability to evaluate trends.  This is designed to help them become more mindful and gain better insight into what affects their wellbeing. 

Another important stakeholder are schools. Gathering data about a student’s honest perspective on school such as subjects, teachers, classmates, curriculum etc. is a very difficult task. Creating data collections based on a student’s perspective are important tools to improve present day schooling systems. In future developments collaborations between Nightingale and schools are planned using technological approaches such as apps.

## The Team
[Ramy](https://github.com/ramyalshurafa) | [Asala](https://github.com/AsalaKM) | [Simon](https://github.com/dupreesi) | [Joe](https://github.com/thejoefriel)

![nightingale](https://user-images.githubusercontent.com/23721486/53017735-fb521780-3450-11e9-8bae-ded91c50ddd3.jpeg)

## Tech Stack
Some of the tech stack we've used: 

| Core | Testing | Other |
| - | -------- | -------- |
|Node|jest|babel
|Express|supertest|passport
|React|eslint|axios
|MongoDB|react-testing-library|serve-favicon|
|HTML|nodemon|env2|
|CSS|concurrently|Dialogflow|
|Styled-Components||bcryptjs|
|D3||nodemailer|
|axios||pusher|

Our chat-bot is based on the MERN-stack (MongoDB, Express, React). We are connecting to Google's ai interface for chat-bots called Dialogflow. We are then using Pusher-js to enable real time chat behaviour between user and the bot. The database is hosted via Mlab.

## Summary
The project was super interesting and an amazing challenge for our (partly) remotely working team. We are very happy with the result and would love to do further sprints to embed more features and to help spreading nightingale's vision. The communication between the developers and the product owners went great and the final product exceeded expectations as most of the bonus features could be implemented. The product handover went smoothly and the product owners were really pleased with the MVP. 

## Getting Started
### Note: If you consider running the app locally you would need to get access to nightingale's dialogflow account in order to gain access to the full range of conversation intent flows and webhooks so that the app works properly. Best would be to contact the owners via https://www.wearenightingale.co.uk/.

How to get a copy of the project up and running on your local machine.

*Please ensure you have this software **installed and running** on your local machine **before** you attempt to run this webapp.*
> **Node** (via nvm recomended)
> see: https://github.com/creationix/nvm

> **MongoDB**
> see: https://docs.mongodb.com/manual/installation/

### Setup

#### 1. Clone the repo:
```
$ git clone https://github.com/techforbetter/nightingale.git
```
#### 2. Install Dependencies 
```
$ cd nightingale
$ npm i
```

#### 3. Install Dependencies in the `client` folder
```
$ npm run client:init
```

#### 4. Get Mongo running on your local computer
Connect to mongo in a separate terminal tab/window.
```
$ mongod
```

#### 5. Add some more Environment Variables
Create a `.env` file in the root.

Add these👇 lines to the file, to make your local databases work, inserting your own username and password.
```
MONGO_URI = mongodb://localhost:27017/nightingale
MONGOURI_TEST = mongodb://localhost:27017/nightingale_test
```
Add a 'Secret' for password encryption.
```
SECRET = "[SOMETHING SECRET]"
```
#### 7. Add even more .env Variables (dialogflow and pusher)
You will need to create an Google account, register for dialogflow (https://dialogflow.com/) and grab the credentials needed for the code to work 
```
    const config = {
      credentials: {
        type: process.env.type,
        project_id: process.env.project_id,
        private_key_id: process.env.private_key_id,
        private_key,
        client_email: process.env.client_email,
        client_id: process.env.client_id,
        auth_uri: process.env.auth_uri,
        token_uri: process.env.token_uri,
        auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.client_x509_cert_url,
      },
    };
```
The same goes for pusher js (via www.pusher.com)
```
  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    encrypted: true,
  });
```

#### 6. Build the Database
Use this script that runs dummy_data_build.js to set up your survey questions and put in some inital dummy data
```
$ npm run build:data
```

#### 7. Run the Tests
To make sure everything is working as it should.

```
$ npm test
```
