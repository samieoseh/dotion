import { createContext, useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "./components/ui/use-toast";
import jwtService from "./service/jwtService";
import { logoutUser, setUser } from "./store/userSlice";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    jwtService.on("onLogin", (user) => {
      success(user, "Login successful!");
      navigate("/home");
    });

    jwtService.on("onAutoLogin", async () => {
      const { user } = await jwtService.loginWithToken();
      success(user, "Logged in with JWT");
    });

    jwtService.on("onLogout", async () => {
      setIsAuthenticated(false);
      dispatch(logoutUser());
      pass("Logged out successfully!");
      navigate("/login");
    });

    jwtService.on("onAutoLogout", async () => {
      setIsAuthenticated(false);
      dispatch(logoutUser);
      pass("Logged out successfully!");
      navigate("/login");
    });

    jwtService.on("onNoAccessToken", () => {
      navigate("/login");
    });

    jwtService.init();

    return () => {
      jwtService.off("onLogin");
      jwtService.off("onAutoLogin");
    };
  }, [dispatch]);

  function success(user, message) {
    dispatch(setUser(user));
    setIsAuthenticated(true);
    if (message) {
      toast({
        title: message,
      });
    }
  }

  function pass(message) {
    toast({
      title: message,
    });
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}
export { AuthProvider, useAuth };
