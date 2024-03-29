import { useNavigate } from "react-router";

export default function ThankYou() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/")
  }
  return (
    <>
       <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Thanks for voting</h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <button
              onClick={handleLogOut}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
