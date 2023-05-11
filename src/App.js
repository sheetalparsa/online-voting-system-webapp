import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login';
import CandidateRegister from './components/CandidateRegister'
import VoterRegister from './components/VoterRegister';
import CastVote from "./components/CastVote";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CastVote />} />
        <Route path="/candidate-register" element={<CandidateRegister />} />
        <Route path="/voter-register" element={<VoterRegister />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
