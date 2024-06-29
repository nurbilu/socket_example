import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css'; // Ensure this is imported to apply your styles

const socket = io.connect('/');

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('receiveMessage', data => {
      setMessages(messages => [...messages, data.message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { message });
    setMessage('');
  };

  return (
    <div className="App">
      <div className="message-window">
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' ? sendMessage() : null}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;


