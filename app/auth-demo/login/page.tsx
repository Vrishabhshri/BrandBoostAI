'use client'

import Link from "next/link";
import Layout from "../layouts/Layout";
import LoginForm from "../Auth/LoginForm";

const Login = () => {
  const leftContent = (
    <p className="mt-3 text-sm text-left text-gray-800">
      Unlock AI-powered insights, strategy recommendations, and competitive analysis.
    </p>
  );

  const rightContent = (
    <div className="w-full max-w-md mx-5 space-y-4">
      <div className="h-[4em]" />

      <Link href="/" className="text-[0.8rem] italic font-semibold text-black hover:underline">
        &lt; Go back
      </Link>

      <h2 className="text-[28px] font-semibold text-gray-800 mb-2 text-left">
        Welcome back!
      </h2>

      {/* Progress Indicators */}
      <div className="mb-4 flex gap-2">
        <div className="h-1 w-24 rounded-full bg-gray-400" />
        <div className="h-1 w-24 rounded-full bg-gray-600" />
      </div>

      <LoginForm />
    </div>
  );

  return <Layout leftContent={leftContent} rightContent={rightContent} />;
};

export default Login;
