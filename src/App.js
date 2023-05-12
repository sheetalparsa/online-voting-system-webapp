import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import CandidateRegister from './components/CandidateRegister'
import CandidateDetails from "./components/CandidateDetails";
import VoterRegister from './components/VoterRegister';
import VoterDetails from "./components/VoterDetails";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/candidate-register" element={<CandidateRegister />} />
        <Route path="/candidate/:candidateId" element={<CandidateDetails />} />
        <Route path="/voter-register" element={<VoterRegister />} />
        <Route path="/voter/:voterId" element={<VoterDetails />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
