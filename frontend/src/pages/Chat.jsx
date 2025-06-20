
// // frontend/pages/Chat.jsx
// import { useState, useEffect } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import GroupSidebar from "./GroupSidebar";


// const Chat = () => {
//   const [message, setMessage] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const { user } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }

//     const interval = setInterval(() => {
//       if (selectedGroup) fetchMessages();
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [user, selectedGroup]);

//   const fetchMessages = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get(
//         `http://localhost:5000/api/chat/messages/${selectedGroup.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessages(res.data);
//     } catch (error) {
//       console.error("Failed to load messages:", error);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!message.trim()) return;

//     try {
//       const token = localStorage.getItem("token");
//       await axios.post(
//         "http://localhost:5000/api/chat/send",
//         {
//           content: message,
//           groupId: selectedGroup.id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setMessage("");
//     } catch (error) {
//       console.error("Failed to send message:", error);
//     }
//   };

//   return (
//     <div className="flex">
//       <GroupSidebar
//         onGroupSelect={(group) => setSelectedGroup(group)}
//         selectedGroupId={selectedGroup?.id}
//       />

//       <div className="flex-1 p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold">
//             {selectedGroup ? `Group: ${selectedGroup.name}` : "Select a Group"}
//           </h2>
//           <button
//             onClick={() => navigate("/create-group")}
//             className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
//           >
//             + Create Group
//           </button>
//         </div>

//         <h2 className="text-xl font-semibold mb-4">
//           {selectedGroup ? `Group: ${selectedGroup.name}` : "Select a Group"}
//         </h2>

//         <div className="messages-container border p-3 h-80 overflow-y-scroll bg-gray-100 rounded mb-4">
//           {messages.map((msg, index) => (
//             <div key={index} className="mb-2">
//               <strong>{msg.user}</strong>: {msg.content}
//               <span className="text-sm text-gray-500 ml-2">
//                 ({new Date(msg.timestamp).toLocaleTimeString()})
//               </span>
//             </div>
//           ))}
//         </div>

//         {selectedGroup && (
//           {/* <div className="input-container flex gap-2">
//             <input
//               type="text"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="flex-1 border px-3 py-2 rounded-lg focus:outline-none"
//               placeholder="Type a message..."
//             />
//             <button
//               onClick={handleSendMessage}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
//             >
//               Send
//             </button>
//           </div> */}
//           < div className="input-container flex gap-2">
//         <input ... />
//         <button onClick={handleSendMessage} ...>Send</button>
//     </>


//   )
// }
//       </div >
//     </div >
//   );
// };

// export default Chat;

import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GroupSidebar from "./GroupSidebar";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Fetch messages every 1 second if a group is selected
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const interval = setInterval(() => {
      if (selectedGroup) fetchMessages();
    }, 1000);

    return () => clearInterval(interval);
  }, [user, selectedGroup]);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `http://localhost:5000/api/chat/messages/${selectedGroup.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(res.data);
    } catch (error) {
      console.error("Failed to load messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/chat/send",
        {
          content: message,
          groupId: selectedGroup.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(""); // clear input after sending
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with groups */}
      <GroupSidebar
        onGroupSelect={(group) => setSelectedGroup(group)}
        selectedGroupId={selectedGroup?.id}
      />

      {/* Chat panel */}
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {selectedGroup ? `Group: ${selectedGroup.name}` : "Select a Group"}
          </h2>
          <button
            onClick={() => navigate("/create-group")}
            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
            + Create Group
          </button>
        </div>

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

        {selectedGroup ? (
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
        ) : (
          <p className="text-gray-500">Please select a group to start chatting.</p>
        )}
      </div>
    </div>
  );
};

export default Chat;

