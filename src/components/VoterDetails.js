import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router";
import ContentWrapper from "./ContentWrapper";

export default function VoterDetails() {
  const navigate = useNavigate();
  const { voterId } = useParams();
  const [voter, setVoter] = useState(null);

  const fetchData = async () => {
    try {
      const voter_res = await axios.get(`${baseUrl}/voters/${voterId}`);
      setVoter(voter_res.data);
    } catch (err) {
      alert(err);
    }
  };

  const handleLogOut = () => {
    navigate("/")
  }

  const handleVote = () => {
    navigate(`/voter/${voterId}/vote`)
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentWrapper>
      {voter != null && (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg m-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="px-4 py-6 sm:px-6">
              <h3 className="text-base font-semibold leading-7 text-gray-900">Voter Details</h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
            </div>
            <div className="mt-4 flex ml-4 mr-4 md:mt-0">
              <button
                onClick={handleLogOut}
                className="inline-flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Full name</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{voter.full_name}</dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Email</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{voter.email}</dd>
              </div><div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Phone</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{voter.phone}</dd>
              </div><div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Position</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{voter.status ? "YES" : "NO"}</dd>
              </div>
            </dl>
          </div>
        </div>
      )}

      <div className="mt-10 sm:mx-auto flex justify-center sm:w-full">
        <button
          onClick={handleVote}
          className="inline-flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Continue to vote > >
        </button>
      </div>
    </ContentWrapper>
  );
}
