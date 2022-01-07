import Map from "./Map";
import MyNav from "./Navbar";
import Info from "./Info";
import { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import "boxicons";

const ENDPOINT = "http://127.0.0.1:3001";

function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("connected", (data) => {
      console.log(data);
    });

    socket.on("newTweet", (data) => {
      setTweets((tweets) => {
        if (tweets.length > 50) {
          tweets.pop();
        }
        return [data, ...tweets];
      });
    });

    return () => socket.disconnect();
  }, []);

  return (
    <>
      <MyNav />
      <div className="main-container">
        <Info tweets={tweets} />
        <Map tweets={tweets} />
      </div>
    </>
  );
}

export default App;
