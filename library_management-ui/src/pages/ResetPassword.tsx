import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const [token, setToken] = useState(
    localStorage.getItem("resetToken") || ""
  );

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch(
      "http://localhost:5000/auth/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
          confirmPassword,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {
      alert(data.message);

      localStorage.removeItem(
        "resetToken"
      );

      navigate("/");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Reset Token"
            className="w-full border rounded-lg p-3 mb-4"
            value={token}
            onChange={(e) =>
              setToken(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full border rounded-lg p-3 mb-4"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg p-3 mb-6"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-lg"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;