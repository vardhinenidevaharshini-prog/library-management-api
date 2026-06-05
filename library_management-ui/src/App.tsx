import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import LibrarianDashboard from "./pages/LibrarianDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import BooksDashboard from "./pages/BooksDashboard";
import MembersDashboard from "./pages/MembersDashboard";
import BorrowRecordsDashboard from "./pages/BorrowRecordsDashboard";

import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";


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


      <Route
        path="/admin/books"
        element={<BooksDashboard />}
      />

      <Route
        path="/admin/members"
        element={<MembersDashboard />}
      />

      <Route
        path="/admin/borrow-records"
        element={<BorrowRecordsDashboard />}
      />

      <Route
        path="/librarian/books"
        element={<BooksDashboard />}
      />

      <Route
        path="/librarian/members"
        element={<MembersDashboard />}
      />

      <Route
        path="/librarian/borrow-records"
        element={<BorrowRecordsDashboard />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      <Route
        path="/change-password"
        element={<ChangePassword />}
      />

    </Routes>
  );
}

export default App;