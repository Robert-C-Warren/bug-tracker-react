import './App.css';
import LogInPage from './components/login/LogInPage'
import SignUpPage from './components/login/SignUpPage';
import Organization from './components/organizations/Organization';
import OrganDash from './components/organizations/OrganDashboard';
import AdminUser from './components/organizations/AdminUser'
import Home from './components/home/Home';
import SignUpOPage from './components/login/SignUpOPage';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LogInPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/organizationsignup" element={<SignUpOPage />} />
        <Route path="/userview" element={<AdminUser />} />
        <Route path='/dashboard' element={<Organization />}/>
        <Route path="/organization" element={<OrganDash />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
