import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import Toast from 'react-bootstrap/Toast';
import { DateTime } from 'luxon';
import ObjectNames from './shared/interfaces/geo.interface';

interface Props {
  tweets: ObjectNames[];
}

function Map(props: Props): ReturnType<React.FC> {
  const { tweets } = props;

  console.log(tweets);

  return (
    <MapContainer center={[25, 0]} zoom={2.3} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {tweets.map((tweet) => (
        <Marker
          position={[
            tweet.geometry.coordinates[1],
            tweet.geometry.coordinates[0],
          ]}
        >
          <Popup className="popup-toast">
            <Toast>
              <Toast.Header closeButton={false}>
                <strong className="me-auto">{tweet.properties.username}</strong>
                <small>
                  {DateTime.fromISO(tweet.properties.created_at).toRelative()}
                </small>
              </Toast.Header>
              <Toast.Body>{tweet.properties.text}</Toast.Body>
            </Toast>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;
