import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google"
import store from "./store";
import { Provider } from "react-redux";
import axios from "axios";
import SigninPage from "./app/main/signin/SigninPage";

const LandingPage = lazy(() => import("./app/main/landing/LandingPage"))
const SignupPage = lazy(() => import("./app/main/signup/SignupPage"))


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_BASE_BACKEND;

export default function App() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider
        clientId={import.meta.env.VITE_GOOGLE_SECRET_CLIENT_ID}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  );
}
