import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { DateTime } from "luxon";

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
