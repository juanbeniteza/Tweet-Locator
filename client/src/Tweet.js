import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { DateTime } from "luxon";

/**
 * @param {object} props
 * @param {object[]} props.tweets
 * @param {string} props.tweets[].type
 * @param {object} props.tweets[].properties
 * @param {string} props.tweets[].properties.username
 * @param {string} props.tweets[].properties.text
 * @param {string} props.tweets[].properties.created_at
 * @param {object} props.tweets[].geometry
 * @param {string} props.tweets[].geometry.type
 * @param {[number, number]} props.tweets[].geometry.coordinates
 */
function Tweet(props) {
  const { tweets } = props;

  return (
    <div className="tweet">
      <div className="tweet-group">
        {tweets.map((tweet) => (
          <Card>
            <Card.Header as="h5">
              {tweet.properties.username}
              {" - "}
              <small>
                {DateTime.fromISO(tweet.properties.created_at).toRelative()}
              </small>
            </Card.Header>
            <Card.Body>
              <Card.Text>{tweet.properties.text}</Card.Text>

              <Button
                variant="primary"
                href={tweet.properties.url}
                target="__blank"
              >
                View Tweet
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Tweet;
