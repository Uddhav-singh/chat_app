// const Chat = () => {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <h2 className="text-3xl font-bold">Welcome to Chat Page</h2>
//       </div>
//     );
//   };
  
//   export default Chat;
  
import { useState } from "react";

const Chat = () => {
  const [message, setMessage] = useState(""); // Store the message input
  const [messages, setMessages] = useState([]); // Store the chat messages

  // Handle message input change
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle sending message
  const handleSend = () => {
    if (message.trim() === "") return; // Prevent empty messages

    // Add the new message to chat
    setMessages([...messages, { text: message, sender: "You" }]);
    
    // Clear input field after sending
    setMessage("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Chat Header */}
      <header className="bg-green-600 text-white p-4 text-center text-xl font-bold">
        Chat Room
      </header>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}: </strong>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="p-4 bg-white flex items-center border-t">
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSend}
          className="ml-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
