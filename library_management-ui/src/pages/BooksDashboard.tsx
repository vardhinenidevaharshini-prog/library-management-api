import { useEffect, useState } from "react";

interface Book {
  id: number;
  uuid: string;
  title: string;
  author: string;
  isbn: string;
}

function BooksDashboard() {
  const [books, setBooks] = useState<Book[]>([]);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchBooks = async () => {
    try {
      const token = localStorage.getItem("accessToken");

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

  const createBook = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      await fetch(
        "http://localhost:5000/books",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            author,
            isbn,
          }),
        }
      );

      setTitle("");
      setAuthor("");
      setIsbn("");

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBook = async (id: number) => {
  try {
    const token =
      localStorage.getItem("accessToken");

    const response = await fetch(
      `http://localhost:5000/books/${id}`,
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

    fetchBooks();
  } catch (error) {
    console.log(error);
  }
};

  const editBook = (book: Book) => {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setIsbn(book.isbn);
  };

  const updateBook = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      await fetch(
        `http://localhost:5000/books/${editingId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            author,
            isbn,
          }),
        }
      );

      setEditingId(null);
      setTitle("");
      setAuthor("");
      setIsbn("");

      fetchBooks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        Books Dashboard
      </h1>

      <div className="border p-5 rounded mb-6">
        <h2 className="text-xl font-bold mb-4">
          {editingId ? "Edit Book" : "Add Book"}
        </h2>

        <div className="flex gap-3 flex-wrap">
          <input
            type="text"
            placeholder="Book Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="border p-2"
          />

          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) =>
              setAuthor(e.target.value)
            }
            className="border p-2"
          />

          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) =>
              setIsbn(e.target.value)
            }
            className="border p-2"
          />

          {editingId ? (
            <button
              onClick={updateBook}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Update Book
            </button>
          ) : (
            <button
              onClick={createBook}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Create Book
            </button>
          )}
        </div>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">
              Title
            </th>
            <th className="border p-2">
              Author
            </th>
            <th className="border p-2">
              ISBN
            </th>
            <th className="border p-2">
              Actions
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

              <td className="border p-2">
                <button
                  onClick={() =>
                    editBook(book)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteBook(book.id)
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

export default BooksDashboard;