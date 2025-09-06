import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Check from "./pages/Check";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const ForgotPassword = lazy(() => import("./pages/Forgotpassword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ResetPassword = lazy(() => import("./pages/ReserPassword"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const AuthProvider = lazy(() => import("./pages/AuthProvider"));

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected Routes */}
        <Route element={<AuthProvider/>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/check" element={<Check />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;






