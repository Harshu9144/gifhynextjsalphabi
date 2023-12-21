"use client";
import React, { Component, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import "./globals.css";
import Script from "next/script";
import GoogleButton from "react-google-button";
import { auth, db } from "../app/firebase";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
const provider = new GoogleAuthProvider();

const login = () => {
  const router = useRouter();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const signupHandler = async () => {
    if (!email || !name || !password) return;

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });

      router.push("/home");
    } catch (error) {
      console.log("An error occured", error);
    }
  };

  //User Auth Feature
  const loginHandler = async () => {
    if (!email || !password) return;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error) {
      console.log("An error occured", error);
    }
  };

  // sign in with google
  const singinWithGoogle = async () => {
    const user = await signInWithPopup(auth, provider);
    console.log(user);
    console.log("Cliked");
    router.push("/home");
  };

  const [showSignup, setShowSignup] = useState(true);

  const toggleSlide = () => {
    setShowSignup((prevState) => !prevState);
  };

  // Client Components
  return (
    <div className="loginMain">
      <div className="wrapper">
        {showSignup ? (
          <div className="loginSlide">
            <h2 id="heading">Create your account here</h2>

            {/* signup form */}
            <form onSubmit={(e) => e.preventDefaul()}>
              <div className="w-full flex flex-col gap-4" id="card">
                <div
                  className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                  id="singupName"
                >
                  <Input
                    type="text"
                    variant="bordered"
                    label="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div
                  className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                  id="signupEmail"
                >
                  <Input
                    type="email"
                    variant="bordered"
                    label="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div
                  className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                  id="signupPassword"
                >
                  <Input
                    type="password"
                    variant="bordered"
                    label="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <Button
                onClick={signupHandler}
                color="primary"
                id="signupBtn"
                style={{ width: "100%" }}
              >
                Sign up
              </Button>
              <GoogleButton
                type="light"
                id="googleBtn"
                onClick={singinWithGoogle}
              />
            </form>
            <h4>
              Already have an account?, please{" "}
              <span id="loginText" onClick={toggleSlide}>
                Login Here
              </span>
            </h4>
          </div>
        ) : (
          <div className="loginSlide2">
            <h2 id="heading">Login your account here</h2>

            {/* login form */}
            <form>
              <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                id="loginEmail"
              >
                <Input
                  type="email"
                  variant="bordered"
                  label="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div
                className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4"
                id="loginpass"
              >
                <Input
                  type="password"
                  variant="bordered"
                  label="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button
                onClick={loginHandler}
                color="primary"
                id="signupBtn"
                style={{ width: "100%" }}
              >
                Login
              </Button>
              <GoogleButton
                onClick={singinWithGoogle}
                type="light"
                label="Login with Google"
                id="googleBtn"
              />
            </form>
            <h4>
              Don't have an account?, please{" "}
              <span id="createText" onClick={toggleSlide}>
                Create Here
              </span>
            </h4>
          </div>
        )}
      </div>

      <Script src="../javascript/script.js" />
    </div>
  );
};

export default login;
