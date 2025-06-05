import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { user } = useAuth(); // Access/get user from AuthContext
  const navigate = useNavigate();


   // Load messages from localStorage on first render
  useEffect(() => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate("/login");
      return;
    }

    const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(savedMessages);

    //fetchMessages(); //initially fetch messages

    const interval = setInterval(() => {
      fetchMessages(savedMessages); // Fetch messages every 5 seconds
    }, 1000); // Adjust the interval as needed here implementing 1 second interval for demo purposes

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [user, navigate]);

    // Load existing messages from localStorage
    // const savedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    // setMessages(savedMessages);


    //   const handleStorage = (e) => {
    //     if (e.key === "messages") {
    //       const updatedMessages = JSON.parse(e.newValue);
    //       setMessages(updatedMessages);
    //     }
    //   };

    //   window.addEventListener("storage", handleStorage);
    //   return () => window.removeEventListener("storage", handleStorage);
    // }, [user, navigate]);

    // Fetch messages from the backend on load
    const fetchMessages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/chat/getMessages", {
        params: { after: lastTimestamp },
      });
        // setMessages(res.data);
        if (res.data && res.data.length > 0) {
        const newMessages = [...localMessages, ...res.data].slice(-10); // keep last 10
        setMessages(newMessages);
        localStorage.setItem("messages", JSON.stringify(newMessages));
        }
      } catch (error) {
        console.error("Failed to load new messages:", error);
      }
    };

  //   fetchMessages();
  // }, [user, navigate]);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

     try {
      const res = await axios.post("http://localhost:5000/api/chat/send", {
        user: user?.email || "Guest",
        content: message,
      });

      const newMessage = res.data.data;

      // Append to UI & localStorage
      const updatedMessages = [...messages, newMessage].slice(-10); // last 10 messages
      setMessages(updatedMessages);
      localStorage.setItem("messages", JSON.stringify(updatedMessages));
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }

    // const newMessage = {
    //   user: user?.email || "Guest", // Show email from token
    //   content: message,
    //   timestamp: new Date().toISOString(),
    // };

    // 1. Update local UI
    // const updatedMessages = [...messages, newMessage];
    // localStorage.setItem("messages", JSON.stringify(updatedMessages));
    // setMessages(updatedMessages);
    // setMessage("");


    //2. Send message to backend
    // try {
    //   await axios.post('http://localhost:5000/api/chat/send', {
    //     user: newMessage.user,
    //     content: newMessage.content,
    //   })

    //   console.log("Message sent to server:", newMessage);
    // } catch (error) {
    //   console.error("Failed to send message to server:", error);
    // }

  };

  return (
    <div className="chat-container p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Welcome, {user?.email}!</h2>

      <div className="messages-container border p-3 h-80 overflow-y-scroll bg-gray-100 rounded mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.user}</strong>: {msg.content}
            <span className="text-sm text-gray-500 ml-2">
              ({new Date(msg.timestamp).toLocaleTimeString()})
            </span>
          </div>
        ))}
      </div>

      <div className="input-container flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border px-3 py-2 rounded-lg focus:outline-none"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;



