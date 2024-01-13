import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: "",
};

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    console.log(state.user);
  }, [state.user]);

  const logIn = async (email, password) => {
    setState({ ...state, loading: true });
    try {
      const response = await axios.post(
        "http://localhost:8800/api/auth/login",
        { email, password }
      );
      setState({
        user: response.data.details,
        loading: false,
        error: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("user");
    setState({
      ...state,
      user: null,
    });
  };

  const values = { state, logIn, logOut };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
