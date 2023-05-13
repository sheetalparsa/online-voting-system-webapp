import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";
import { useNavigate, useParams } from "react-router";


export default function VoterVerify() {
  const navigate = useNavigate();
  const { voterId } = useParams();
  const [session_id, setSessionId] = useState(0);

  const generate_otp = async () => {
    try{
      const res = await axios.post(`${baseUrl}/voter/${voterId}/generate_otp`);
      const session_id = res.data.Details;
      setSessionId(session_id)
      } catch(error) {
      alert(error);
    }
  }

  useEffect(() => {
    generate_otp();
  }, []);

  const verifyOtp = async (e) => {
    e.preventDefault();
    let element = e.target
    const otp = element[0].value + element[1].value + element[2].value + element[3].value + element[4].value + element[5].value;
    try {
      const res = await axios.get(`${baseUrl}/voter/${voterId}/verify_otp`,  {params: {otp: otp, session_id: session_id}});
      if(res.status === 200) {
        navigate(`/voter/${voterId}/`);
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Voter Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your mobile number</p>
              </div>
            </div>

            <div>
              <form onSubmit={verifyOtp}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-md">
                    <div className="w-16 h-16 ">
                      <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" useref={'input'} maxLength="1" type="text" name="" id="" />
                    </div>
                    <div className="w-16 h-16 ">
                      <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" useref={'input'} maxLength="1" type="text" name="" id="" />
                    </div>
                    <div className="w-16 h-16 ">
                      <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"  useref={'input'} maxLength="1" type="text" name="" id="" />
                    </div>
                    <div className="w-16 h-16 ">
                      <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" maxLength="1" type="text" name="" id="" />
                    </div>
                    <div className="w-16 h-16 ">
                      <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" maxLength="1" type="text" name="" id="" />
                    </div>
                    <div className="w-16 h-16 ">
                      <input className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" maxLength="1" type="text" name="" id="" />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        type="submit"
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                        Verify Account
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>
                      <button
                        onClick={generate_otp}
                        className="flex flex-row items-center text-blue-600">
                          Resend
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
