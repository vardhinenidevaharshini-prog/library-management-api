import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
id: number;
uuid: string;
name: string;
email: string;
role: string;
}

function AdminDashboard() {
const [users, setUsers] = useState<User[]>([]);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("STUDENT");
const [editingUuid, setEditingUuid] = useState("");
const [isEditing, setIsEditing] = useState(false);
const [bookCount, setBookCount] = useState(0);
const [memberCount, setMemberCount] = useState(0);
const [borrowCount, setBorrowCount] = useState(0);
const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");

  navigate("/");
};


const fetchUsers = async () => {
try {
const token = localStorage.getItem("accessToken");


  const response = await fetch(
    "http://localhost:5000/users",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  setUsers(data);
} catch (error) {
  console.log(error);
}


};

const deleteUser = async (uuid: string) => {
try {
const token = localStorage.getItem("accessToken");


  await fetch(
    `http://localhost:5000/users/${uuid}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  fetchUsers();
} catch (error) {
  console.log(error);
}


};

const createUser = async () => {
try {
const token = localStorage.getItem("accessToken");


  await fetch(
    "http://localhost:5000/users",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    }
  );

  fetchUsers();

  setName("");
  setEmail("");
  setPassword("");
  setRole("STUDENT");
} catch (error) {
  console.log(error);
}


};

const updateUser = async () => {
try {
const token = localStorage.getItem("accessToken");


  await fetch(
    `http://localhost:5000/users/${editingUuid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        email,
        role,
      }),
    }
  );

  fetchUsers();

  setName("");
  setEmail("");
  setPassword("");
  setRole("STUDENT");

  setEditingUuid("");
  setIsEditing(false);
} catch (error) {
  console.log(error);
}


};

const handleEdit = (user: User) => {
setName(user.name);
setEmail(user.email);
setRole(user.role);


setEditingUuid(user.uuid);
setIsEditing(true);


};


const fetchDashboardStats = async () => {
  try {
    const token =
      localStorage.getItem(
        "accessToken"
      );

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const [
      booksResponse,
      membersResponse,
      borrowResponse,
    ] = await Promise.all([
      fetch(
        "http://localhost:5000/books",
        { headers }
      ),
      fetch(
        "http://localhost:5000/members",
        { headers }
      ),
      fetch(
        "http://localhost:5000/borrow-records",
        { headers }
      ),
    ]);

    const books =
      await booksResponse.json();

    const members =
      await membersResponse.json();

    const borrowRecords =
      await borrowResponse.json();

    console.log(books);
    console.log(members);
    console.log(borrowRecords);
    

    setBookCount(
  books.data?.length || 0
);

setMemberCount(
  members.data?.length || 0
);

setBorrowCount(
  borrowRecords.data?.length || 0
);
  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
fetchUsers();
fetchDashboardStats();
}, []);

return ( <div className="min-h-screen bg-gray-100 p-10"> <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
Library Management System </h1>

    <div className="flex justify-between items-center mb-8">
  <div>
    <h2 className="text-2xl font-semibold text-blue-700">
      Admin Dashboard
    </h2>

    <p className="text-gray-500">
      User Management Dashboard
    </p>
  </div>

  <div className="flex justify-center gap-4 mb-6">
  <button
    onClick={handleLogout}
    className="bg-red-500 text-white px-6 py-3 rounded-lg"
  >
    Logout
  </button>

  <button
    onClick={() => navigate("/profile")}
    className="bg-blue-600 text-white px-6 py-3 rounded-lg"
  >
    Profile
  </button>
</div>

</div>


  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

  <div className="bg-white shadow-lg rounded-xl p-5">
    <h3 className="text-gray-500 text-sm">
      Total Users
    </h3>

    <p className="text-3xl font-bold text-blue-700">
      {users.length}
    </p>
  </div>

  <div
  onClick={() =>
    navigate("/admin/books")
  }
  className="bg-white shadow-lg rounded-xl p-5 cursor-pointer hover:scale-105 transition"
>
    <h3 className="text-gray-500 text-sm">
      Total Books
    </h3>

    <p className="text-3xl font-bold text-green-700">
      {bookCount}
    </p>
  </div>

  <div
  onClick={() =>
    navigate("/admin/members")
  }
  className="bg-white shadow-lg rounded-xl p-5 cursor-pointer hover:scale-105 transition"
>
    <h3 className="text-gray-500 text-sm">
      Total Members
    </h3>

    <p className="text-3xl font-bold text-purple-700">
      {memberCount}
    </p>
  </div>

  <div
  onClick={() =>
    navigate(
      "/admin/borrow-records"
    )
  }
  className="bg-white shadow-lg rounded-xl p-5 cursor-pointer hover:scale-105 transition"
>
    <h3 className="text-gray-500 text-sm">
      Borrow Records
    </h3>

    <p className="text-3xl font-bold text-red-700">
      {borrowCount}
    </p>
  </div>

</div>


  <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-6 text-gray-700">
      {isEditing ? "Edit User" : "Add User"}
    </h2>

    <div className="flex flex-wrap gap-3">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={role}
        onChange={(e) =>
          setRole(e.target.value)
        }
        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="ADMIN">
          ADMIN
        </option>

        <option value="LIBRARIAN">
          LIBRARIAN
        </option>

        <option value="STUDENT">
          STUDENT
        </option>
      </select>

      <button
        onClick={
          isEditing
            ? updateUser
            : createUser
        }
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
      >
        {isEditing
          ? "Update User"
          : "Create User"}
      </button>
    </div>
  </div>

  <div className="bg-white shadow-lg rounded-xl overflow-hidden">
    <table className="w-full">
      <thead className="bg-gray-800 text-white">
        <tr>
          <th className="p-4">
            Name
          </th>
          <th className="p-4">
            Email
          </th>
          <th className="p-4">
            Role
          </th>
          <th className="p-4">
            Actions
          </th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr
            key={user.uuid}
            className="hover:bg-gray-50"
          >
            <td className="border p-4">
              {user.name}
            </td>

            <td className="border p-4">
              {user.email}
            </td>

            <td className="border p-4">
              <span
                className={
                  user.role === "ADMIN"
                    ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium"
                    : user.role ===
                      "LIBRARIAN"
                    ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                    : "bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium"
                }
              >
                {user.role}
              </span>
            </td>

            <td className="border p-4">
              <div className="flex gap-2">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
                  onClick={() =>
                    handleEdit(user)
                  }
                >
                  Edit
                </button>

                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg"
                  onClick={() =>
                    deleteUser(
                      user.uuid
                    )
                  }
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


);
}

export default AdminDashboard;
