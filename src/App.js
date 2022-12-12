import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('messages', (messages) => {
      setMessages(messages)
    })
  })
  return (
    <>
      <div className="w3-container w3-teal">
        <h1>BD Chat</h1>
      </div>
      <div>{isConnected ? 'Online' : 'Offline'}</div>
      {Boolean(messages.length) && <div>
        {messages
          .map(({
            id,
            time,
            user,
            text
          }) => <div key={id}>
              {time.slice(-10, -5)} - 
              {user} - 
              {text}
            </div>)
        }
      </div>}
    </>
  );
}

export default App;
