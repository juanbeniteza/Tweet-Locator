export default interface ObjectNames {
  type: string;
  properties: {
    username: string;
    text: string;
    url: string;
    created_at: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

export default interface TweetProperties {
  tweets: ObjectNames[];
}
