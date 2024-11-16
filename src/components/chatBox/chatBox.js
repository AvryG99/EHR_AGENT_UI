// src/ChatGPTInterface.js
import React, { useState } from 'react';
import '../../assets/Chat.css';
import avatar from '../../assets/AI.png';

function ChatGPTInterface({ onLogout }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { id: 1, name: 'Chat 1' },
    { id: 2, name: 'Chat 2' },
    { id: 3, name: 'Chat 3' }
  ]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [...messages, { sender: 'user', text: input }];
      setMessages(newMessages);
      setInput('');

      // Giả lập phản hồi từ ChatGPT sau khi người dùng gửi tin nhắn
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: "This is a response from ChatGPT." }
        ]);
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleLogout = () => {
    alert('Logged out');
    // Thêm logic đăng xuất nếu có
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <h5 className="sidebar-title">Chat History</h5>
        <ul className="chat-history">
          {chatHistory.map((chat) => (
            <li key={chat.id} className="chat-history-item">
              {chat.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Chat Area */}
      <div className="chat-container">
        {/* Header with Avatar and Logout Button */}
        <div className="chat-header">
          <div className="user-info">
            <img
              src={avatar}
              alt="User Avatar"
              className="user-avatar"
            />
            <span className="user-name">User Name</span>
          </div>
          <button className="logout-button" onClick={onLogout}>
            Log Out
          </button> {/* Gọi onLogout khi nhấn nút */}
        </div>

        {/* Messages Area */}
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
            >
              {message.text}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSend} className="send-button">Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatGPTInterface;
