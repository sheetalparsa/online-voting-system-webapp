import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import CandidateRegister from './components/CandidateRegister'
import CandidateDetails from "./components/CandidateDetails";
import VoterRegister from './components/VoterRegister';
import VoterDetails from "./components/VoterDetails";
import VoterVerify from './components/VoterVerify';
import ThankYou from './components/ThankYou';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';


function App() {
  return(
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<VoterVerify />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/candidate-register" element={<CandidateRegister />} />
        <Route path="/candidate/:candidateId" element={<CandidateDetails />} />
        <Route path="/voter-register" element={<VoterRegister />} />
        <Route path="/voter/:voterId" element={<VoterDetails />} />
        <Route path="/voter/:voterId/verify_voter" element={<VoterVerify />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
