import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import axios from "axios";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router";
import ContentWrapper from "./ContentWrapper";

export default function CandidateDetails() {
  const { candidateId } = useParams();
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);

  const handleCancel = () => {
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const candidate_res = await axios.get(`${baseUrl}/candidates/${candidateId}`);
      setCandidate(candidate_res.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentWrapper>
      {candidate != null && (
        <div>
          <h1>Candidate Details</h1>
          <h2>Full Name: {candidate.full_name}</h2>
          <h2>Email: {candidate.email}</h2>
          <h2>Phone: {candidate.phone}</h2>
          <h2>Position: {candidate.position}</h2>
          <h2>Election Symbol: {candidate.election_symbol}</h2>
          <h2>Vote Count: {candidate.vote_count}</h2>
        </div>
      )}
    </ContentWrapper>
  );
}
