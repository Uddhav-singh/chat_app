// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const CreateGroupModal = () => {
//   const [groupName, setGroupName] = useState("");
//   const [allUsers, setAllUsers] = useState([]);
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // Fetch all users to show in invite list
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await axios.get("http://localhost:5000/api/auth/users", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAllUsers(res.data);
//       } catch (err) {
//         console.error("Failed to fetch users", err);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const toggleUserSelection = (userId) => {
//     setSelectedUsers((prev) =>
//       prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
//     );
//   };

//   const handleCreateGroup = async () => {
//     if (!groupName.trim() || selectedUsers.length === 0) {
//       setMessage("Please enter group name and select members.");
//       return;
//     }

//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         "http://localhost:5000/api/group/create",
//         {
//           groupName,
//           userIds: selectedUsers,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMessage("Group created successfully!");
//       navigate("/chat");
//     } catch (error) {
//       console.error("Group creation failed", error);
//       setMessage("Error creating group.");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
//       <h2 className="text-2xl font-bold mb-4">Create New Group</h2>

//       <input
//         type="text"
//         placeholder="Group Name"
//         value={groupName}
//         onChange={(e) => setGroupName(e.target.value)}
//         className="w-full p-2 mb-4 border rounded"
//       />

//       <h3 className="font-semibold mb-2">Select Members to Invite:</h3>
//       <div className="h-40 overflow-y-scroll border p-2 mb-4 rounded">
//         {allUsers.map((user) => (
//           <div key={user.id} className="flex items-center gap-2 mb-1">
//             <input
//               type="checkbox"
//               checked={selectedUsers.includes(user.id)}
//               onChange={() => toggleUserSelection(user.id)}
//             />
//             <label>{user.name} ({user.email})</label>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={handleCreateGroup}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         Create Group
//       </button>

//       {message && <p className="mt-3 text-sm text-red-500">{message}</p>}
//     </div>
//   );
// };

// export default CreateGroupModal;
// // This component allows users to create a new group by entering a group name and selecting members from a list of all users.
// // It fetches the list of users from the backend and displays them with checkboxes for selection.

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateGroupModal = () => {
  const [groupName, setGroupName] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/group/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, []);

  const handleUserToggle = (userId) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedUserIds.length === 0) {
      alert("Please enter a group name and select at least one member.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/group/create",
        {
          groupName,
          userIds: selectedUserIds,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/chat");
    } catch (err) {
      console.error("Error creating group:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Create a New Group</h2>

      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-4"
      />

      <h3 className="font-semibold mb-2">Select Members to Invite:</h3>
      <div className="max-h-40 overflow-y-auto border border-gray-200 p-3 rounded">
        {users.map((user) => (
          <label key={user.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              value={user.id}
              checked={selectedUserIds.includes(user.id)}
              onChange={() => handleUserToggle(user.id)}
              className="mr-2"
            />
            {user.name} ({user.email})
          </label>
        ))}
      </div>

      <button
        onClick={handleCreateGroup}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Create Group
      </button>
    </div>
  );
};

export default CreateGroupModal;
// This component allows users to create a new group by entering a group name and selecting members from a list of all users.
// It fetches the list of users from the backend and displays them with checkboxes for selection.