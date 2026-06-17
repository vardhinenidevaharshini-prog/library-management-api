import { Navigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  role: string;
};

function RoleProtectedRoute({
  children,
  role,
}: Props) {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  if (user.role !== role) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export default RoleProtectedRoute;