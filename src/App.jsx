import socketIOClient from 'socket.io-client';
import { SERVER } from './utils/config';
import { useState } from 'react';

function App() {
  const [socket, setSocket] = useState(socketIOClient(SERVER));
  const [song, setSong] = useState();

  const handleChange = e => {
    setSong(e.target.files[0]);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const reader = new FileReader();
    reader.onload = () => {
      const fileData = reader.result;
      socket.emit('audio-chunk', fileData);
    };
    reader.readAsArrayBuffer(song);
  };

  return (
    <div>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        <input type="file" name="song" />
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default App;
