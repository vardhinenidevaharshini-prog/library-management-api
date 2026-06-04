/* import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (
e: React.FormEvent
) => {
e.preventDefault();


try {
  const response = await fetch(
    "http://localhost:5000/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data = await response.json();

  console.log(data);

  if (data.success) {
    const role = data.data.role;

    localStorage.setItem(
      "accessToken",
      data.accessToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.data)
    );

    if (role === "ADMIN") {
      navigate("/admin/dashboard");
    } else if (role === "LIBRARIAN") {
      navigate("/librarian/dashboard");
    } else if (role === "STUDENT") {
      navigate("/student/dashboard");
    }
  } else {
    alert(data.message);
  }
} catch (error) {
  alert("Login failed");
}


};

return ( <div className="min-h-screen flex items-center justify-center"> <form
     onSubmit={handleLogin}
     className="w-96 p-6 border rounded-lg shadow"
   > <h1 className="text-2xl font-bold mb-4 text-center">
Login </h1>


    <input
      type="email"
      placeholder="Email"
      className="w-full border p-2 mb-3"
      value={email}
      onChange={(e) =>
        setEmail(e.target.value)
      }
    />

    <input
      type="password"
      placeholder="Password"
      className="w-full border p-2 mb-4"
      value={password}
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    <button
      type="submit"
      className="w-full bg-black text-white p-2 rounded"
    >
      Login
    </button>
  </form>
</div>


);
}

export default Login ; */




import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleLogin = async (
e: React.FormEvent
) => {
e.preventDefault();

try {
  const response = await fetch(
    "http://localhost:5000/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  const data =
    await response.json();

  console.log(data);

  if (data.success) {
    const role = data.data.role;

    localStorage.setItem(
      "accessToken",
      data.accessToken
    );

    localStorage.setItem(
      "user",
      JSON.stringify(data.data)
    );

    if (role === "ADMIN") {
      navigate(
        "/admin/dashboard"
      );
    } else if (
      role === "LIBRARIAN"
    ) {
      navigate(
        "/librarian/dashboard"
      );
    } else if (
      role === "STUDENT"
    ) {
      navigate(
        "/student/dashboard"
      );
    }
  } else {
    alert(data.message);
  }
} catch (error) {
  alert("Login failed");
}


};

return ( <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4"> <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"> <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">
Library Management System </h1>


    <p className="text-center text-gray-500 mb-8">
      Login to continue
    </p>

    <form
      onSubmit={handleLogin}
    >
      <input
        type="email"
        placeholder="Email Address"
        className="w-full border rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={email}
        onChange={(e) =>
          setEmail(
            e.target.value
          )
        }
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border rounded-lg p-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={password}
        onChange={(e) =>
          setPassword(
            e.target.value
          )
        }
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition"
      >
        Login
      </button>
    </form>
  </div>
</div>


);
}

export default Login;

