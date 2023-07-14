"use client";
import Link from "next/link";
import Head from "next/head";
import { useEffect, useState, useRef } from "react";

import { SubmitButton } from "./components/SubmitButton";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const [emailAlert, setEmailAlert] = useState<boolean>(false);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [passwordAlert, setPasswordAlert] = useState<boolean>(false);

  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailRef.current?.value) {
      setEmailAlert(true);
    } else {
      setEmailAlert(false);
    }

    if (!passwordRef.current?.value) {
      setPasswordAlert(true);
    } else {
      setPasswordAlert(false);
    }

    if (!emailRef.current?.value || !passwordRef.current?.value) {
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Head>
        <title>My page title</title>
        <meta property="og:title" content="My page title" key="title" />
      </Head>
      <main className="flex items-center justify-center h-screen background-image">
        <div className="border-lime-600 border-2 bg-white rounded p-6 max-w-md">
          <h2 className="text-lime-600 text-4xl font-bold mb-4 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 font-medium text-lime-600"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="youremail@provider.com"
              />
              <div
                className={`mt-2 text-red-700 ${
                  emailAlert ? "visible" : "invisible"
                }`}
              >
                <p>Please enter an email</p>
              </div>
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block mb-2 font-medium text-lime-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                ref={passwordRef}
                className="w-full border border-gray-300 rounded px-3 py-2"
                placeholder="secret password..."
              />
              <div
                className={`mt-2 text-red-700 ${
                  passwordAlert ? "visible" : "invisible"
                }`}
              >
                <p>Please enter an password</p>
              </div>
            </div>
            <div className="flex justify-center items-center h-11">
              <SubmitButton loadingState={isLoading} />
            </div>
          </form>
          <div className="text-center text-sm my-6">
            Not a member yet?{"  "}
            <Link href="/register" className="underline text-lime-600">
              Create an Account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
