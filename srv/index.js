const express = require("express");
const http = require("http");
const needle = require("needle");
const { Server } = require("socket.io");
const bodyParser = require("body-parser");
const turf = require("@turf/turf");
const util = require("util");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const TWITTER_TOKEN = process.env.TWITTER_TOKEN;

const streamURL =
  "https://api.twitter.com/2/tweets/search/stream?tweet.fields=created_at,geo&expansions=author_id,geo.place_id&place.fields=geo";

const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";

app.get("/rules", async (req, res) => {
  let response = await needle("get", rulesURL, {
    headers: {
      Authorization: `Bearer ${TWITTER_TOKEN}`,
    },
  });

  let rules = [];

  if (response.statusCode === 200) {
    if (response.body.data) {
      response.body.data.forEach((rule) => {
        rules.push(rule);
      });
    }

    res.send(rules);
  } else {
    res.send(response.body);
  }
});

app.post("/rules", async (req, res) => {
  const rule = req.body.rule;
  const data = {
    add: [{ value: rule }],
  };

  response = await needle("post", rulesURL, data, {
    headers: {
      Authorization: `Bearer ${TWITTER_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  res.send(response.body);
});

app.put("/rules", async (req, res) => {
  const ruleIds = req.body.ruleIds;

  const data = {
    delete: { ids: ruleIds },
  };

  response = await needle("post", rulesURL, data, {
    headers: {
      Authorization: `Bearer ${TWITTER_TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  res.send(response.body);
});

function createFeature(tweet) {
  console.log("create Featue");
  console.log(util.inspect(tweet, false, null, true));
  let feature;

  let userId = tweet.data.author_id;
  let placeId = tweet.data.geo.place_id;

  let username = tweet.includes?.users?.find(
    (user) => user.id === userId
  )?.username;

  let bbox = tweet.includes?.places?.find((place) => place.id === placeId)?.geo
    ?.bbox;

  if (bbox) {
    feature = turf.centroid(turf.bboxPolygon(bbox));

    feature.properties = {
      id: tweet.data.id,
      username: `@${username}`,
      text: tweet.data.text,
      created_at: tweet.data.created_at,
      url: `https://twitter.com/${username}/status/${tweet.data.id}`,
    };
  } else {
    console.log("no bbox");
  }

  console.log(util.inspect(feature, false, null, true));

  return feature;
}

function isEmptyObject(obj) {
  for (var property in obj) {
    if (obj.hasOwnProperty(property)) {
      return false;
    }
  }

  return true;
}

const streamTweets = (socket, token) => {
  try {
    const stream = needle.get(streamURL, {
      headers: {
        Authorization: `Bearer ${TWITTER_TOKEN}`,
      },
    });

    stream
      .on("data", (data) => {
        try {
          const json = JSON.parse(data);
          if (json.connection_issue) {
            reconnect(stream, socket, token);
          } else {
            if (Object.keys(json.data.geo).length !== 0) {
              console.log("inside");
              socket.emit("newTweet", createFeature(json));
            } else {
              socket.emit("authError", json);
            }
          }
        } catch (e) {
          console.error(e);
        }
      })
      .on("error", (error) => {
        // Connection timed out
        console.error(error);
        reconnect(stream, socket);
      });
  } catch (e) {
    console.error(e);
  }
};

const reconnect = async (stream, socket) => {
  timeout++;
  stream.abort();
  await sleep(2 ** timeout * 1000);
  streamTweets(socket);
};

io.on("connection", async (socket) => {
  try {
    console.log("connected");
    io.emit("connected", "Connected");
    const stream = streamTweets(io);
  } catch (e) {
    console.error(e);
  }
});

server.listen(3001, () => {
  console.log("listening on *:3001");
});
