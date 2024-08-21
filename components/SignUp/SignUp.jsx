"use client";
import React from "react";
import SignupFormDemo from "../SignUp/signup-form-demo";

const SignUp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[6000] bg-black bg-opacity-60" >
        <SignupFormDemo />
    </div>
  );
};

export default SignUp;
