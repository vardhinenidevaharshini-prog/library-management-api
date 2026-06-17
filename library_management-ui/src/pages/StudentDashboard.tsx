import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
}

function StudentDashboard() {

    const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const [books, setBooks] = useState<Book[]>([]);

  const fetchBooks = async () => {
    try {
      const token =
        localStorage.getItem("accessToken");

      const response = await fetch(
        "http://localhost:5000/books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setBooks(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-5xl font-bold text-center mb-4">
        Library Management System
      </h1>

      <h2 className="text-3xl text-green-600 font-bold text-center mb-10">
        Student Dashboard
      </h2>


<div className="flex justify-end gap-3 mb-6">
  <button
    onClick={() => navigate("/profile")}
    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
  >
    Profile
  </button>

  <button
    onClick={handleLogout}
    className="bg-red-500 text-white px-4 py-2 rounded-lg"
  >
    Logout
  </button>
</div>



      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold mb-4">
          Welcome, {user.name}
        </h3>

        <p className="mb-2">
          <strong>Email:</strong>{" "}
          {user.email}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {user.role}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-2xl font-bold mb-4">
          Available Books
        </h3>

        <p className="text-lg">
          Total Books:
          <span className="font-bold text-blue-600 ml-2">
            {books.length}
          </span>
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4">
          Books List
        </h3>

        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">
                Title
              </th>

              <th className="border p-2">
                Author
              </th>

              <th className="border p-2">
                ISBN
              </th>
            </tr>
          </thead>

          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td className="border p-2">
                  {book.title}
                </td>

                <td className="border p-2">
                  {book.author}
                </td>

                <td className="border p-2">
                  {book.isbn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default StudentDashboard;