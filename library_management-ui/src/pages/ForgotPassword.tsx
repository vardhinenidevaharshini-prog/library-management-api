import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const response =
        await fetch(
          "http://localhost:5000/auth/forgot-password",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              email,
            }),
          }
        );

      const data =
        await response.json();

      if (data.success) {
        localStorage.setItem(
        "resetToken",
        data.resetToken
        );

        navigate(
          "/reset-password"
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert(
        "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-2">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Enter your email
        </p>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border rounded-lg p-3 mb-6"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
          >
            Send Reset Token
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;