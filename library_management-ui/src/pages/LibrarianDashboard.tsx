import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LibrarianDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  navigate("/");
};

  const [booksCount, setBooksCount] =
    useState(0);

  const [membersCount, setMembersCount] =
    useState(0);

  const [borrowCount, setBorrowCount] =
    useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token =
        localStorage.getItem("accessToken");

      const booksResponse =
        await fetch(
          "http://localhost:5000/books",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const booksData =
        await booksResponse.json();

      setBooksCount(
        booksData.data?.length || 0
      );

      const membersResponse =
        await fetch(
          "http://localhost:5000/members",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const membersData =
        await membersResponse.json();

      setMembersCount(
        membersData.data?.length || 0
      );

      const borrowResponse =
        await fetch(
          "http://localhost:5000/borrow-records",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      const borrowData =
        await borrowResponse.json();

      setBorrowCount(
        borrowData.data?.length || 0
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold text-center mb-4">
        Library Management System
      </h1>

      <h2 className="text-3xl text-blue-600 font-bold text-center mb-10">
        Librarian Dashboard
      </h2>

      <div className="flex justify-end gap-3 mb-6">
  <button
    onClick={() => navigate("/profile")}
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
  >
    Profile
  </button>

  <button
    onClick={handleLogout}
    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
  >
    Logout
  </button>
</div>

      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg">
            Total Books
          </h3>

          <p className="text-4xl font-bold text-green-600">
            {booksCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg">
            Total Members
          </h3>

          <p className="text-4xl font-bold text-purple-600">
            {membersCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-lg">
            Borrow Records
          </h3>

          <p className="text-4xl font-bold text-red-600">
            {borrowCount}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <button
          onClick={() =>
            navigate(
              "/librarian/books"
            )
          }
          className="bg-blue-500 text-white p-6 rounded text-xl"
        >
          Manage Books
        </button>

        <button
          onClick={() =>
            navigate(
              "/librarian/members"
            )
          }
          className="bg-green-500 text-white p-6 rounded text-xl"
        >
          Manage Members
        </button>

        <button
          onClick={() =>
            navigate(
              "/librarian/borrow-records"
            )
          }
          className="bg-purple-500 text-white p-6 rounded text-xl"
        >
          Borrow Records
        </button>
      </div>
    </div>
  );
}

export default LibrarianDashboard;