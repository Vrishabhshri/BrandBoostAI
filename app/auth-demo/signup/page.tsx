'use client'

import { useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "../layouts/Layout";
import SignupForm from '@/app/auth-demo/Auth/SignupForm';
import { AuthContext } from "../AuthContext2";

const Signup = () => {
  const router = useRouter();
  const { setAuthStatus } = useContext(AuthContext);

  const rightContent = (
    <div className="flex justify-center content-start flex-col text-left ml-5">
      <div className="flex content-center items-center h-[1.8rem] mb-4">
        <Link
          href="/"
          className="text-[0.8rem] italic font-semibold text-black hover:underline"
          tabIndex={0}
          aria-label="Go back to home page"
        >
          &lt; Go back
        </Link>
      </div>

      <h2 className="text-[28px] font-semibold text-gray-800 mb-3 text-left">
        Enter your info
      </h2>

      {/* Progress Indicators */}
      <div className="mb-6 flex gap-2">
        <div className="h-1 w-24 rounded-full bg-gray-600" />
        <div className="h-1 w-24 rounded-full bg-gray-400" />
      </div>

      <SignupForm />
    </div>
  );

  return <Layout rightContent={rightContent} />;
};

export default Signup;
