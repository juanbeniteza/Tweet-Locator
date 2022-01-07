# Tweet Locator

Simple application to locate tweets on a map based on the location they were sent.

## Prerequisites

- Twitter Developer account: if you don’t have one already, you can [apply for one](https://developer.twitter.com/en/apply-for-access.html).
- A Twitter developer app, which can be created in your Twitter developer account.
- A bearer token from your app in the [Twitter developer portal](https://developer.twitter.com/en/docs/developer-portal/overview)
- Set up a project to obtain access to v2 endpoints in the [Twitter developer portal](https://developer.twitter.com/en/docs/developer-portal/overview)l
- Access to the [filtered stream](http://developer.twitter.com/en/docs/twitter-api/tweets/filter-stream) endpoint. You will also need to activate it in the [Twitter developer portal](https://developer.twitter.com/en/docs/developer-portal/overview) dashboard within your Twitter Developer account.

After yoy have your bearer token you can create a `.env` file inside `srv` folder, in this file you will place your bearer token like this

```
TWITTER_TOKEN={YOUR_BEARER_TOKEN}
```

## Install

For installing you need to go to folder `client` and run

`yarn install`

And inside `srv` folder you need to run

`npm install`

_I might need to make this installation easier._

## Run

You need to run each application, for client just run

`yarn start`

For the server just run

`npm start`

## Demo

[![Watch the video](https://img.youtube.com/vi/A8AxH8lNzxo/maxresdefault.jpg)](https://youtu.be/A8AxH8lNzxo)
