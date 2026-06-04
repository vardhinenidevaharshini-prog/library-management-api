function StudentDashboard() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-4">
          Welcome, {user.name}
        </h1>

        <p className="text-gray-600 text-lg">
          Student Dashboard
        </p>
      </div>
    </div>
  );
}

export default StudentDashboard;