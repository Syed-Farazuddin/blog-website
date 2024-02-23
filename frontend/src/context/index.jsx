import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [isEdit, setIsEdit] = useState(true);
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  return (
    <GlobalContext.Provider
      value={{
        isEdit,
        setIsEdit,
        formData,
        setFormData,
        blogList,
        setBlogList,
        loading,
        setLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
