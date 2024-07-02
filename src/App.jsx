import { BrowserRouter, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./app/main/auth/AuthPage";
import LandingPage from "./app/main/landing/LandingPage";
import HomePage from "./app/main/home/HomePage";
import { AuthProvider, useAuth } from "./AuthProvider";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_BACKEND;

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>; // or a spinner component
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_SECRET_CLIENT_ID}
      >
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route
                path="/:id"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
        <Toaster />
      </GoogleOAuthProvider>
    </Provider>
  );
}
