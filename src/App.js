import { useFormik } from 'formik';
import { useState } from 'react';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_SOCKET_SOURCE);

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [messages, setMessages] = useState([]);
  socket.on('connect', () => {
    setIsConnected(true);
  });

  socket.on('disconnect', () => {
    setIsConnected(false);
  });

  socket.on('messages', (messages) => {
    setMessages(messages)
  })

  socket.on('message', (msg) => {
    console.log(msg)
    setMessages([...messages, msg])
  })

  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = useFormik({
    initialValues: {
      msg: ''
    },
    validate: values => {
      const errors = {};
      if (!values.msg) {
        errors.msg = 'Message is empty';
      }
      return errors;
    },
    onSubmit: values => {
      socket.emit('message', values.msg);
      values.msg = '';
    },
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
      <form onSubmit={handleSubmit}>
        <input
          className="w3-input"
          type="text"
          name="msg"
          onChange={handleChange}
          value={values.msg}
        />
        {errors.msg && <span className="w3-red">{errors.msg}</span>}<br />
        <button className="w3-button w3-teal" type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
