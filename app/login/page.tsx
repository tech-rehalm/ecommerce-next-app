import { login } from "@/action/user";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { signIn } from "@/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/getSession";

const Login = async () => {
  const session = await getSession();
  const user = session?.user;
  if (user) redirect("/");
  

  return (
    <div className="w-full min-h-screen text-blue-600 font-bold  flex flex-col items-center justify-center mt-[80px]">
       <div className="flex flex-col w-[400px] shadow-inner shadow-purple-600 rounded-xl px-10 py-4">
      <form className="my-8 font bold" action={login}>
        <label className="w-full text-blue-600" htmlFor="email">Email Address</label>
        <input
          id="email"
           className="w-full outline-blue-600 bg-purple-100 my-1 p-2 rounded-xl font-bold text-blue-600"
          placeholder="projectmayhem@fc.com"
          type="email"
          name="email"
        />

        <label className="w-full text-blue-600" htmlFor="email">Password</label>
        <input
         className="w-full outline-blue-600 bg-purple-100 my-1 p-2 rounded-xl font-bold text-blue-600"
          id="password"
          placeholder="*************"
          type="password"
          name="password"
        />

        <button className="font-extrabold text-xl my-1 w-full bg-gradient-to-r text-white from-blue-600 to-fuchsia-600 h-[50px] rounded-xl border-none" >
          Login &rarr;
        </button>

        <p className="w-full my-2">
          Don't have account? <Link href="/register">Register</Link>
        </p>

        <div className="bg-gradient-to-r from-transparent via-fuchsia-700 to-transparent my-3 h-[1px] w-full" />
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("github");
        }}
      >
        <button
          className="font-extrabold text-xl my-1 w-full items-center flex gap-3 px-4 bg-gradient-to-r text-white from-blue-600  to-fuchsia-600 h-[50px] rounded-xl border-none"
          type="submit"
        >
          <IconBrandGithub className="w-8 font-extrabold" />
          <span className="">
            Github
          </span>
        </button>
      </form>
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button className="font-extrabold text-xl my-1 w-full items-center flex gap-3 px-4 bg-gradient-to-r text-white from-blue-600  to-fuchsia-600 h-[50px] rounded-xl border-none"
          type="submit"
        >
          <IconBrandGoogle className="w-8 font-extrabold" />
          <span className="">
            Google
          </span>
        </button>
      </form>
      </div>
    </div>
  );
};

export default Login;
