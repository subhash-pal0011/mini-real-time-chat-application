//ISKE THRUGH HUM APNA DATA SARA GLOBELLY KR DIYE HII HUM KAHU BHI EXSES KR PAYENGE .

// ISME DATA AYEGA KAHAA SE >> SIGNUP SE 


import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(
    //chatApplication ISKA NAME JB HUM LOCAL STORAGE MEA JIS NAME SE STORE KR RHE THE USI NAME SE EXSEE KRENGE.
    JSON.parse(localStorage.getItem("chatApplication")) || null  // chatApplication EK BAR DATA ESE A JAYEGA  BUT HUME ISKE BHAROSE NHI BHETHNA HII HUME SIGNUP and LOGIN SE BHI DATA LE LENA HII.
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);

// hume kahi bhi import krna rhega useUser





