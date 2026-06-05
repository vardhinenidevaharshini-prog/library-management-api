import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
}

interface Member {
  id: number;
  name: string;
}

interface BorrowRecord {
  id: number;
  borrowDate: string;
  returnDate: string | null;
  status: string;

  book: {
    title: string;
  };

  member: {
    name: string;
  };
}

function BorrowRecordsDashboard() {
  const [books, setBooks] = useState<Book[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [records, setRecords] = useState<BorrowRecord[]>([]);

  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");

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

  const fetchRecords = async () => {
    try {
      const token =
        localStorage.getItem("accessToken");

      const response = await fetch(
        "http://localhost:5000/borrow-records",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setRecords(data.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const issueBook = async () => {
    try {
      const token =
        localStorage.getItem("accessToken");

      const response = await fetch(
        "http://localhost:5000/borrow-records",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            bookId: Number(bookId),
            memberId: Number(memberId),
          }),
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Book Issued Successfully");

      setBookId("");
      setMemberId("");

      fetchRecords();
    } catch (error) {
      console.log(error);
    }
  };

  const returnBook = async (
    id: number
  ) => {
    try {
      const token =
        localStorage.getItem("accessToken");

      const response = await fetch(
        `http://localhost:5000/borrow-records/return/${id}`,
        {
          method: "PATCH",
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

      alert("Book Returned");

      fetchRecords();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
    fetchMembers();
    fetchRecords();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        Borrow Records Dashboard
      </h1>

      <div className="border p-5 rounded mb-6">
        <h2 className="text-xl font-bold mb-4">
          Issue Book
        </h2>

        <div className="flex gap-3">
          <select
            value={memberId}
            onChange={(e) =>
              setMemberId(
                e.target.value
              )
            }
            className="border p-2"
          >
            <option value="">
              Select Member
            </option>

            {members.map(
              (member) => (
                <option
                  key={member.id}
                  value={member.id}
                >
                  {member.name}
                </option>
              )
            )}
          </select>

          <select
            value={bookId}
            onChange={(e) =>
              setBookId(
                e.target.value
              )
            }
            className="border p-2"
          >
            <option value="">
              Select Book
            </option>

            {books.map((book) => (
              <option
                key={book.id}
                value={book.id}
              >
                {book.title}
              </option>
            ))}
          </select>

          <button
            onClick={issueBook}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Issue Book
          </button>
        </div>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">
              Book
            </th>

            <th className="border p-2">
              Member
            </th>

            <th className="border p-2">
              Borrow Date
            </th>

            <th className="border p-2">
              Return Date
            </th>

            <th className="border p-2">
              Status
            </th>

            <th className="border p-2">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td className="border p-2">
                {record.book.title}
              </td>

              <td className="border p-2">
                {record.member.name}
              </td>

              <td className="border p-2">
                {new Date(
                  record.borrowDate
                ).toLocaleDateString()}
              </td>

              <td className="border p-2">
                {record.returnDate
                  ? new Date(
                      record.returnDate
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td className="border p-2">
                {record.status}
              </td>

              <td className="border p-2">
                {record.status ===
                "BORROWED" ? (
                  <button
                    onClick={() =>
                      returnBook(
                        record.id
                      )
                    }
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Return Book
                  </button>
                ) : (
                  <span>
                    Returned
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowRecordsDashboard;