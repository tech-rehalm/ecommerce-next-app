import { register } from "@/action/user";
import { getSession } from "@/lib/getSession";
import Link from "next/link";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");

  return (
    <div className="w-full min-h-screen  flex flex-col items-center justify-center">
      <div className="flex flex-col w-[400px] shadow-inner shadow-blue-600 rounded-xl px-10 py-4">
      <h2 className="font-extrabold text-3xl w-full bg-gradient-to-r from-blue-600 via-fuchsia-600 to-fuchsia-600 bg-clip-text text-transparent">
        Welcome to Envy Car Sales
      </h2>
      <p className="text-blue-600 text-sm max-w-sm mt-2 ">
        Please provide your details
      </p>

      <form className="my-8 font-bold" action={register}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <div className="flex flex-col">
            <label className="w-full text-blue-600" htmlFor="firstname" >
              First Name
            </label>
            <input
            className="w-full outline-blue-600 bg-purple-100 my-1 p-2 rounded-xl font-bold text-blue-600"
              id="firstname"
              placeholder="Tyler"
              type="text"
              name="firstname"
            />
          </div>
          <div className="flex flex-col">
            <label className="w-full text-blue-600" htmlFor="lastname" >
              Last Name
            </label>
            <input
            className="w-full outline-blue-600 bg-purple-100 my-1 p-2 rounded-xl font-bold text-blue-600"
              id="lastname"
              placeholder="Durden"
              type="text"
              name="lastname"
            />
          </div>
        </div>

        <label className="w-full text-blue-600" htmlFor="email">Email Address</label>
        <input
          id="email"
          placeholder="projectmayhem@fc.com"
          type="email"
          name="email"
          className="w-full outline-blue-600 bg-purple-100 my-1 p-2 rounded-xl font-bold text-blue-600"

        />

        <label className="w-full text-blue-600" htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="***********"
          type="password"
          name="password"
          className="w-full outline-blue-600 bg-purple-100 my-1 p-2 rounded-xl font-bold text-blue-600"

        />

        <button className="font-extrabold text-xl my-1 w-full bg-gradient-to-r text-white from-blue-600 via-fuchsia-600 to-fuchsia-600 h-[50px] rounded-xl border-none">
          Sign up &rarr;
        </button>

        <p className="text-blue-600 text-sm max-w-sm mt-2 ">
          Already have an account? <Link href="/login" className="text-purple-600">Login</Link>
        </p>
      </form>
      </div>
    </div>
  );
};
export default Register;

