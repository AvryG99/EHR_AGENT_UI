// import React, { useEffect, useState } from "react";
// import "../../assets/Chat.css";
// import avatar from "../../assets/AI.png";

// function ChatGPTInterface({ onLogout }) {
//   const [username, setUsername] = useState("");
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hello! How can I assist you today?" }
//   ]);
//   const [input, setInput] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);

//   // Gọi API lấy thông tin người dùng
//   useEffect(() => {
//     const fetchUserInfo = async () => {
//         try {
//             const token = localStorage.getItem("token");
//             const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/user-info`, {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setUsername(data.username); // Cập nhật username từ API
//             } else {
//                 console.error(data.message);
//             }
//         } catch (error) {
//             console.error("Error fetching user info:", error);
//         }
//     };

//     fetchUserInfo();
// }, []);


//   const handleSend = () => {
//     if (input.trim()) {
//       setMessages((prevMessages) => [...prevMessages, { sender: "user", text: input }]);
//       setInput("");

//       setTimeout(() => {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           { sender: "bot", text: "This is a response from ChatGPT." }
//         ]);
//       }, 1000);
//     }
//   };

//   return (
//     <div className="app-container">
//       <div className="sidebar">
//         <h5 className="sidebar-title">Chat History</h5>
//         <ul className="chat-history">
//           {chatHistory.map((chat) => (
//             <li key={chat.id} className="chat-history-item">
//               {chat.name}
//             </li>
//           ))}
//         </ul>
//       </div>
//       <div className="chat-container">
//         <div className="chat-header">
//           <div className="user-info">
//             <img src={avatar} alt="User Avatar" className="user-avatar" />
//             <span className="user-name">{username}</span>
//           </div>
//           <button className="logout-button" onClick={onLogout}>
//             Log Out
//           </button>
//         </div>
//         <div className="chat-messages">
//           {messages.map((message, index) => (
//             <div
//               key={index}
//               className={`message ${
//                 message.sender === "user" ? "user-message" : "bot-message"
//               }`}
//             >
//               {message.text}
//             </div>
//           ))}
//         </div>
//         <div className="chat-input-container">
//           <input
//             type="text"
//             className="chat-input"
//             placeholder="Type a message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button onClick={handleSend} className="send-button">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatGPTInterface;

import React, { useEffect, useState } from "react";
import "../../assets/Chat.css";
import avatar from "../../assets/AI.png";

function ChatGPTInterface({ onLogout }) {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you today?" },
  ]);
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // Fetch user info from your backend (API on port 5000)
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/user-info`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          setUsername(data.username); // Update username from API
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSend = async () => {
    if (input.trim()) {
      // Add the user's message to the chat
      setMessages((prevMessages) => [...prevMessages, { sender: "user", text: input }]);

      try {
        // Send user input to the Flask API
        const response = await fetch("http://localhost:7000/process_question", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: input }), // Send the input as 'question'
        });

        const data = await response.json();

        if (response.ok) {
          // Add the bot's response to the chat
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: data.answer },
          ]);
        } else {
          // Handle errors returned by the Flask API
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "bot", text: `Error: ${data.error || "Unable to process question."}` },
          ]);
        }
      } catch (error) {
        console.error("Error sending question to API:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "Error: Unable to communicate with the server." },
        ]);
      }

      // Clear the input field
      setInput("");
    }
  };

  return (
    <div className="app-container">
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
      <div className="chat-container">
        <div className="chat-header">
          <div className="user-info">
            <img src={avatar} alt="User Avatar" className="user-avatar" />
            <span className="user-name">{username}</span>
          </div>
          <button className="logout-button" onClick={onLogout}>
            Log Out
          </button>
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${
                message.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            className="chat-input"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleSend} className="send-button">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatGPTInterface;
