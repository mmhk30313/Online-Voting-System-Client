import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuthCheck from "./hooks/useAuthCheck";
// auth hook
import Layout from './components/Layouts/Layout';

// route guard
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";

// pages
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/Admin/AdminLogin";
import UserLogin from "./pages/User/UserLogin";
import User from "./pages/User/User";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home";
import './App.css';

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication....</div>
  ) : (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" 
            element={
              <Home/>
            } 
          />
          <Route path="/home" 
            element={
                <Home/>
            } 
          />
          <Route path="/admin" 
            element={
              <PrivateRoute path="admin-login">
                <Admin/>
              </PrivateRoute>
            } 
          />
          
          <Route path="/admin/:panel" 
            element={
              <PrivateRoute path="admin-login">
                <Admin/>
              </PrivateRoute>
            } 
          />

          <Route path="/admin-login" element={
              <PublicRoute path={'admin'}>
                <AdminLogin/>
              </PublicRoute>
            } 
          />

          <Route path="/user" element={
              <PrivateRoute path={"user-login"}>
                <User/>
              </PrivateRoute>
            } 
          />
          <Route path='/user-login' element={
              <PublicRoute path={'user'}>
                <UserLogin/>
              </PublicRoute>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
