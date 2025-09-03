import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    // chatApplication → we will access it from localStorage using the same name we used while storing it
    JSON.parse(localStorage.getItem("chatApplication")) || null  //chatApplication → data will come once from here, but we should not rely only on this.  We also need to fetch data from Signup and Login.
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);