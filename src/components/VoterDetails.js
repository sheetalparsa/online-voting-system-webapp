import { useEffect, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import axios from "axios";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router";
import ContentWrapper from "./ContentWrapper";

export default function VoterDetails() {
  const navigate = useNavigate();
  const { voterId } = useParams();
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [voter, setVoter] = useState(null);

  const handleVote = () => {
    if (!selectedCandidate) {
      alert("Please Select a candidate to vote");
    } else if (voter.status !== true) {
      navigate(`/thankyou`)
      alert(selectedCandidate);
    } else {
      alert("The Voter has already voted!!");
    }
  };

  const fetchData = async () => {
    try {
      const voter_res = await axios.get(`${baseUrl}/voters/${voterId}`);
      setVoter(voter_res.data);
      const candidates_res = await axios.get(`${baseUrl}/candidates`);
      setCandidates(candidates_res.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentWrapper>
      {voter != null && (
        <div>
          <h1>Voter Details</h1>
          <h2>Full Name: {voter.full_name}</h2>
          <h2>Email: {voter.email}</h2>
          <h2>Phone: {voter.phone}</h2>
          <h2>Voted: {voter.status ? "YES" : "NO"}</h2>
          <br />
        </div>
      )}
      {candidates.length > 0 && (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <RadioGroup value={selectedCandidate} onChange={setSelectedCandidate}>
            <RadioGroup.Label>Select a Candidate to Vote</RadioGroup.Label>
            {candidates.map((candidate) => {
              return (
                <RadioGroup.Option value={candidate._id}>
                  {({ checked }) => (
                    <span className={checked ? "bg-blue-200" : ""}>
                      {candidate.email}
                    </span>
                  )}
                </RadioGroup.Option>
              );
            })}
          </RadioGroup>
          <br />
          <button
            onClick={handleVote}
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Vote
          </button>
        </div>
      )}
    </ContentWrapper>
  );
}
