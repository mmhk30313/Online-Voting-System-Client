import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminLogin from "./components/Home/AdminLogin";
import Home from "./components/Home/Home";
import UserLogin from "./components/Home/UserLogin";
import useAuthCheck from "./hooks/useAuthCheck";
import Layout from './components/Layouts/Layout';
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import AdminPanel from "./components/Admin/AdminPanel";
import './App.css';
import UserPanel from "./components/User/UserPanel";

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
                <AdminPanel/>
              </PrivateRoute>
            } 
          />
          
          <Route path="/admin/:panel" 
            element={
              <PrivateRoute path="admin-login">
                <AdminPanel/>
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
                <UserPanel/>
              </PrivateRoute>
            } 
          />
          <Route path='/user-login' element={
              <PublicRoute path={'user'}>
                <UserLogin/>
              </PublicRoute>
            } 
          />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
