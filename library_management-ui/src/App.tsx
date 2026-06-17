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

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
        <ProtectedRoute>
          <RoleProtectedRoute role="ADMIN">
            <AdminDashboard />
          </RoleProtectedRoute>
        </ProtectedRoute>
    }
    />

      <Route
  path="/librarian/dashboard"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute role="LIBRARIAN">
        <LibrarianDashboard />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>

      <Route
  path="/student/dashboard"
  element={
    <ProtectedRoute>
      <RoleProtectedRoute role="STUDENT">
        <StudentDashboard />
      </RoleProtectedRoute>
    </ProtectedRoute>
  }
/>


      <Route
        path="/admin/books"
        element={
          <ProtectedRoute>
            <BooksDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/members"
        element={
          <ProtectedRoute>
            <MembersDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/borrow-records"
        element={
          <ProtectedRoute>
            <BorrowRecordsDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/librarian/books"
        element={
          <ProtectedRoute>
            <BooksDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/librarian/members"
        element={
          <ProtectedRoute>
            <MembersDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/librarian/borrow-records"
        element={
          <ProtectedRoute>
            <BorrowRecordsDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/forgot-password"
        element={
            <ForgotPassword />
        }
      />

      <Route
        path="/reset-password"
        element={
            <ResetPassword />
        }
      />

      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <ChangePassword />
          </ProtectedRoute>
        }
      />

      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;