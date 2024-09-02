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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

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
      <div className="container mx-auto grid grid-cols-1 gap-8">

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead className="invisible md:visible">Pages</TableHead>
                  <TableHead className="invisible md:visible">Rating</TableHead>
                  <TableHead className="invisible md:visible">Completed</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {books.map(book => (
                   <TableRow key={book.isbn}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell className="invisible md:visible">{book.pages}</TableCell>
                    <TableCell className="invisible md:visible">{book.rating}</TableCell>
                    <TableCell className="invisible md:visible">{book.completed ? 'Yes' : 'No'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

      </div>
    </main>
  );
}
