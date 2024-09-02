interface Book {
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  publication_date: string;
  genre: string;
  sub_genre: string;
  language: string;
  pages: number;
  format: string;
  edition: string;
  summary: string;
  tags: string[];
  cover_image_url: string;
  rating: number;
  related_books: {
    title: string;
    author: string;
    isbn: string;
  }[];
  series_info: string | null;
  completed: boolean;
}


async function fetchBooks(): Promise<Book[]> {
  const response = await fetch("http://127.0.0.1:8001/api/library");
  if (!response.ok) {
    throw new Error("Failed to fetch books");
  }
  return response.json();
}

export default async function Home() {
  const books = await fetchBooks();

  return (
    <main>
    {books.map(book => (
      <li key={book.isbn}>
        <div className="font-medium">{book.title}</div>
        <div>{book.author}</div>
        <div className="invisible md:visible">{book.pages}</div>
        <div className="invisible md:visible">{book.rating}</div>
        <div className="invisible md:visible">{book.completed ? 'Yes' : 'No'}</div>
      </li>
    ))}
    </main>
  );
}
