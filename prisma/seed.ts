import "dotenv/config";
import prisma from "../src/config/prisma";

async function main() {
  await prisma.book.createMany({
    data: [
      {
        title: "Clean Code",
        author: "Robert C. Martin",
        isbn: "100000001",
      },
      {
        title: "The Pragmatic Programmer",
        author: "Andrew Hunt",
        isbn: "100000002",
      },
      {
        title: "Design Patterns",
        author: "Erich Gamma",
        isbn: "100000003",
      },
      {
        title: "Refactoring",
        author: "Martin Fowler",
        isbn: "100000004",
      },
      {
        title: "You Don't Know JS",
        author: "Kyle Simpson",
        isbn: "100000005",
      },
      {
        title: "Eloquent JavaScript",
        author: "Marijn Haverbeke",
        isbn: "100000006",
      },
      {
        title: "Introduction to Algorithms",
        author: "Thomas H. Cormen",
        isbn: "100000007",
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        isbn: "100000008",
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        isbn: "100000009",
      },
      {
        title: "The Psychology of Money",
        author: "Morgan Housel",
        isbn: "100000010",
      },
    ],
  });

  console.log("🌱 Books Seeded Successfully");
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });