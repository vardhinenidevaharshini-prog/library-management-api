import { useState } from "react";

function ChangePassword() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      newPassword !== confirmPassword
    ) {
      alert(
        "Passwords do not match"
      );
      return;
    }

    try {
      const response =
        await fetch(
          "http://localhost:5000/auth/change-password",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              uuid: user.uuid,
              currentPassword,
              newPassword,
            }),
          }
        );

      const data =
        await response.json();

      if (data.success) {
        alert(data.message);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
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
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Change Password
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="password"
            placeholder="Current Password"
            className="w-full border rounded-lg p-3 mb-4"
            value={
              currentPassword
            }
            onChange={(e) =>
              setCurrentPassword(
                e.target.value
              )
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
            value={
              confirmPassword
            }
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;