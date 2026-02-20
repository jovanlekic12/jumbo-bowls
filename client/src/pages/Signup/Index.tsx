import { Link } from "react-router";

function SignUp() {
  return (
    <div className="flex font-poppins items-center justify-center h-screen">
      <div className="grid gap-8">
        <div
          id="back-div"
          className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-[26px] m-4"
        >
          <div className="border-[20px] border-transparent rounded-[20px] dark:bg-gray-900 bg-white shadow-lg xl:p-10 2xl:p-10 lg:p-10 md:p-10 sm:p-2 m-2">
            <h1 className="pt-8 pb-6 font-bold dark:text-gray-400 text-5xl text-center cursor-default">
              Sign Up
            </h1>
            <form action="#" method="post" className="space-y-4">
              <div>
                <label className="mb-2  dark:text-gray-400 text-lg">
                  Email
                </label>
                <input
                  id="email"
                  className="border p-3 dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 shadow-md placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label className="mb-2 dark:text-gray-400 text-lg">
                  Password
                </label>
                <input
                  id="password"
                  className="border p-3 shadow-md dark:bg-indigo-700 dark:text-gray-300  dark:border-gray-700 placeholder:text-base focus:scale-105 ease-in-out duration-300 border-gray-300 rounded-lg w-full"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="bg-gradient-to-r dark:text-gray-300 from-yellow-500 to-orange-500 shadow-lg mt-6 p-2 text-white rounded-lg w-full hover:scale-105 hover:from-orange-500 hover:to-yellow-500 transition duration-300 ease-in-out"
                type="submit"
              >
                SIGN UP
              </button>
            </form>
            <div className="flex flex-col mt-4 items-center justify-center text-sm">
              <h3 className="dark:text-gray-300">
                Already have an account?
                <Link
                  to="/"
                  className="group text-orange-500 transition-all duration-100 ease-in-out"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-orange-400 to-orange-400 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                    {" "}
                    Log In
                  </span>
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
