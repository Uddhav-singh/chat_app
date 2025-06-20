// /frontend/components/GroupSidebar.jsx
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelectedGroup } from '../context/SelectedGroupContext';
import { useAuth } from '../context/AuthContext';

const GroupSidebar = () => {
  const { selectedGroupId, setSelectedGroupId } = useSelectedGroup();
  const [groups, setGroups] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/group/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log('Groups:', res.data);
        setGroups(res.data);
      } catch (err) {
        console.error("Error fetching groups:", err);
      }
    };
    fetchGroups();
  }, []);

  return (
    <div className="w-64 border-r p-4 bg-gray-100 h-screen overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Your Groups</h2>
      <ul className="space-y-2">
        {groups.map((group) => (
          <li
            key={group.id}
            onClick={() => setSelectedGroupId(group.id)}
            className={`cursor-pointer p-2 rounded ${
              selectedGroupId === group.id ? "bg-blue-500 text-white" : "hover:bg-gray-200"
            }`}
          >
            {group.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroupSidebar;
// This component fetches the user's groups and displays them in a sidebar.
// It allows the user to select a group, which updates the selectedGroupId in the context.  