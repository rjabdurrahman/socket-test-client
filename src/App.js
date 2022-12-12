import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });
  })
  return (
    <>
      <div className="w3-container w3-teal">
        <h1>BD Chat</h1>
      </div>
      <div>{isConnected ? 'Online' : 'Offline'}</div>
    </>
  );
}

export default App;
