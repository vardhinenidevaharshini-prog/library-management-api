import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import StudentDashboard from "./pages/StudentDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={<AdminDashboard />}
      />
      <Route
        path="/librarian/dashboard"
        element={<LibrarianDashboard />}
      />
      <Route
        path="/student/dashboard"
        element={<StudentDashboard />}
      />
    </Routes>
  );
}

export default App;