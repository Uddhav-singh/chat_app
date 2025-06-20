// /frontend/context/SelectedGroupContext.js
import { createContext, useContext, useState } from "react";

const SelectedGroupContext = createContext();

export const SelectedGroupProvider = ({ children }) => {
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  return (
    <SelectedGroupContext.Provider value={{ selectedGroupId, setSelectedGroupId }}>
      {children}
    </SelectedGroupContext.Provider>
  );
};

export const useSelectedGroup = () => useContext(SelectedGroupContext);
