import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router";
import { RadioGroup } from "@headlessui/react";
import ContentWrapper from "./ContentWrapper";
import classNames from "classnames";

export default function Votee() {
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
        <div>
          <RadioGroup value={selectedCandidate} onChange={setSelectedCandidate}>
            <RadioGroup.Label className="sr-only">Vote</RadioGroup.Label>
            <div className="space-y-4">
              {candidates.map((candidate) => (
                <RadioGroup.Option
                  key={candidate.name}
                  value={candidate}
                  className={({ checked, active }) =>
                    classNames(
                      checked ? 'border-transparent' : 'border-gray-300',
                      active ? 'border-indigo-600 ring-2 ring-indigo-600' : '',
                      'relative block cursor-pointer rounded-lg border bg-white px-6 py-4 shadow-sm focus:outline-none sm:flex sm:justify-between'
                    )
                  }
                >
                  {({ active, checked }) => (
                    <>
                      <span className="flex items-center">
                        <span className="flex flex-col text-sm">
                          <RadioGroup.Label as="span" className="font-medium text-gray-900">
                            {candidate.email}
                          </RadioGroup.Label>
                          <RadioGroup.Description as="span" className="text-gray-500">
                            <span className="block sm:inline">
                              {candidate.full_name}
                            </span>{' '}
                            <span className="hidden sm:mx-1 sm:inline" aria-hidden="true">
                              &middot;
                            </span>{' '}
                            <span className="block sm:inline">{candidate.position}</span>
                          </RadioGroup.Description>
                        </span>
                      </span>
                      <RadioGroup.Description
                        as="span"
                        className="mt-2 flex text-sm sm:ml-4 sm:mt-0 sm:flex-col sm:text-right"
                      >
                        <span className="font-medium text-gray-900">{candidate.election_symbol}</span>
                      </RadioGroup.Description>
                      <span
                        className={classNames(
                          active ? 'border' : 'border-2',
                          checked ? 'border-indigo-600' : 'border-transparent',
                          'pointer-events-none absolute -inset-px rounded-lg'
                        )}
                        aria-hidden="true"
                      />
                    </>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
          <div className="mt-10 sm:mx-auto flex justify-center sm:w-full">
            <button
              onClick={handleVote}
              type="button"
              className="inline-flex rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Vote
              </button>
          </div>
        </div>
      )}
    </ContentWrapper>
  )
}
