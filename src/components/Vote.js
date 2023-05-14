import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router";
import { RadioGroup } from "@headlessui/react";
import ContentWrapper from "./ContentWrapper";

export default function Vote() {
  const navigate = useNavigate();
  const { voterId } = useParams();
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [voter, setVoter] = useState(null);

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

  const handleVote = async () => {
    try {
      if (!selectedCandidate) {
        throw new Error("Please Select a candidate to vote");
      } else if (voter.status !== true) {
        await axios.post(`${baseUrl}/voters/vote`, {
          v_id: voter._id,
          c_id: selectedCandidate,
        });
        navigate(`/thankyou`);
      } else {
        throw new Error("The Voter has already voted!!");
      }
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentWrapper>
      {candidates.length > 0 && (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <RadioGroup value={selectedCandidate} onChange={setSelectedCandidate}>
            <RadioGroup.Label className="text-2xl font-bold">Select a Candidate to Vote</RadioGroup.Label>
            <table class="table-auto">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Full name</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => {
                  return (
                    <RadioGroup.Option value={candidate._id}>
                        {({ checked }) => (
                          <tr className={`${checked ? "bg-blue-200" : ""}  sm:grid sm:grid-cols-2  gap-x-8 `}>
                            <td className="">
                              {candidate.email}
                            </td>
                            <td>
                              {candidate.full_name}
                            </td>
                          </tr>
                        )}
                    </RadioGroup.Option>
                  );
                })}
              </tbody>
            </table>
          </RadioGroup>
          <br />
          <button
            onClick={handleVote}
            type="button"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Vote
          </button>
        </div>
      )}
    </ContentWrapper>
  )
}
