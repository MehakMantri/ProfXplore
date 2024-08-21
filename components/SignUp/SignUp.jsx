"use client";
import React from "react";
import { useRouter } from "next/navigation";
import SignupFormDemo from "../SignUp/signup-form-demo";

const SignUp = ({ isOpen, onClose, onSuccess }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSignupSuccess = () => {
    onClose();
    router.push("/proff/page");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[6000] bg-black bg-opacity-60">
      <SignupFormDemo onSuccess={handleSignupSuccess} />
    </div>
  );
};

export default SignUp;