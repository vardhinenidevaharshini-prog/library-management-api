import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Profile
        </h1>

        <div className="space-y-4 mb-8">

          <div>
            <p className="text-gray-500">
              Name
            </p>

            <p className="font-semibold">
              {user.name}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Email
            </p>

            <p className="font-semibold">
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-gray-500">
              Role
            </p>

            <p className="font-semibold">
              {user.role}
            </p>
          </div>

        </div>

        <button
          onClick={() =>
            navigate(
              "/change-password"
            )
          }
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg mb-3"
        >
          Change Password
        </button>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;