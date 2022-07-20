import './App.css';
import LogInPage from './components/login/LogInPage'
import SignUpPage from './components/login/SignUpPage';
import Dashboard from './components/user-page/Dashboard'
import Home from './components/home/Home';
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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
