import { useEffect, useState } from "react";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string;
}

function MembersDashboard() {
  const [members, setMembers] = useState<Member[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const fetchMembers = async () => {
    try {
      const token =
        localStorage.getItem("accessToken");

      const response = await fetch(
        "http://localhost:5000/members",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setMembers(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const createMember = async () => {
    try {
      const token =
        localStorage.getItem("accessToken");

      await fetch(
        "http://localhost:5000/members",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            email,
            phone,
          }),
        }
      );

      setName("");
      setEmail("");
      setPhone("");

      fetchMembers();
    } catch (error) {
      console.log(error);
    }
  };

  const editMember = (
    member: Member
  ) => {
    setEditingId(member.id);

    setName(member.name);
    setEmail(member.email);
    setPhone(member.phone);
  };

  const updateMember = async () => {
    try {
      const token =
        localStorage.getItem("accessToken");

      await fetch(
        `http://localhost:5000/members/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            email,
            phone,
          }),
        }
      );

      setEditingId(null);

      setName("");
      setEmail("");
      setPhone("");

      fetchMembers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMember = async (
    id: number
  ) => {
    try {
      const token =
        localStorage.getItem("accessToken");

      const response = await fetch(
        `http://localhost:5000/members/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      fetchMembers();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        Members Dashboard
      </h1>

      <div className="border p-5 rounded mb-6">
        <h2 className="text-xl font-bold mb-4">
          {editingId
            ? "Edit Member"
            : "Add Member"}
        </h2>

        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="border p-2"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="border p-2"
          />

          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            className="border p-2"
          />

          {editingId ? (
            <button
              onClick={updateMember}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Member
            </button>
          ) : (
            <button
              onClick={createMember}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Create Member
            </button>
          )}
        </div>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">
              Name
            </th>
            <th className="border p-2">
              Email
            </th>
            <th className="border p-2">
              Phone
            </th>
            <th className="border p-2">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="border p-2">
                {member.name}
              </td>

              <td className="border p-2">
                {member.email}
              </td>

              <td className="border p-2">
                {member.phone}
              </td>

              <td className="border p-2">
                <button
                  onClick={() =>
                    editMember(member)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteMember(member.id)
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MembersDashboard;