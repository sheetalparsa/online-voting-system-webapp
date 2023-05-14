import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ContentWrapper from "./ContentWrapper";
import axios from "axios";
import { baseUrl } from "../config";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/candidates`);
      setCandidates(res.data);
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogOut = () => {
    navigate("/")
  }

  return (
    <>
      <ContentWrapper>
        <div className="flex flex-row-reverse items-center gap-x-4 sm:gap-x-6">
          <button
            onClick={handleLogOut}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Logout
          </button>
        </div>
        {/** candidate votes per candidate and show winner */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Admin Dashboard
          </h2>
        </div>
        <div className="flex flex-col justify-center align-items-center p-10">
          <div className="flex justify-center align-items-center">
            <BarChart
              width={730}
              height={250}
              data={candidates}
              maxBarSize={50}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="full_name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="vote_count" fill="#8884d8" name="Vote Count" />
              {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
            </BarChart>
          </div>
          <div class="block w-full overflow-x-auto mt-10">
            <table class="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Name
                  </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Email
                  </th>
                  <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Votes
                  </th>
                </tr>
              </thead>
              <tbody>
                {candidates.length > 0 &&
                  candidates.map((candidate) => {
                    return (
                      <tr>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {candidate.full_name}
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {candidate.email}
                        </td>
                        <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                          {candidate.vote_count}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </ContentWrapper>
    </>
  );
}
