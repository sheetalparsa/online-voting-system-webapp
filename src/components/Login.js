import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { baseUrl } from "../config";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setUser({
      ...user,
      [evt.target.name]: value,
    });
  };

  const voter_signin = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password)
    {
      alert("please enter both email and password")
      return;
    }

    try {
      const res = await axios.get(`${baseUrl}/voters`);
      const foundVoter = res.data.find((voter) => {
        return voter.email === user.email && voter.password === user.password;
      });
      if (foundVoter) {
        navigate(`/voter/${foundVoter._id}`);
      }
      else
      {
        alert("Unable to find the voter");
      }
    } catch (err) {
      alert(err);
    }
  };

  const voter_register = (e) => {
    e.preventDefault();
    navigate("/voter-register");
  };

  const candidate_signin = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password)
    {
      alert("please enter both email and password")
      return;
    }

    try {
      const res = await axios.get(`${baseUrl}/candidates`);
      const foundCandidate = res.data.find((candidate) => {
        return candidate.email === user.email && candidate.password === user.password;
      });
      if (foundCandidate) {
        navigate(`/candidate/${foundCandidate._id}`);
      }
      else
      {
        alert("Unable to find the candidate");
      }
    } catch (err) {
      alert(err);
    }
  };

  const candidate_register = (e) => {
    e.preventDefault();
    navigate("/candidate-register");
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                onClick={voter_signin}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in as voter
              </button>
              <button
                onClick={candidate_signin}
                type="submit"
                className="mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in as candidate
              </button>
              <button
                onClick={candidate_register}
                type="submit"
                className="mt-2 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register as Candidate
              </button>
              <button
                onClick={voter_register}
                type="submit"
                className="mt-2 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register as Voter
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
