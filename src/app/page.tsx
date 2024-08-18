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
  keywords: string[];
  tags: string[];
  cover_image_url: string;
  availability: {
    status: string;
    due_date: string | null;
    library_location: string;
    number_of_copies: number;
  };
  rating: {
    average_rating: number;
    number_of_reviews: number;
    reviews: {
      reviewer: string;
      review_date: string;
      rating: number;
      comment: string;
    }[];
  };
  related_books: {
    title: string;
    author: string;
    isbn: string;
  }[];
  series_info: string | null;
  isbn_10: string;
  dewey_decimal: string;
  library_of_congress_classification: string;
  bibliography: any[];
  awards: {
    award_name: string;
    year: number;
    category: string;
  }[];
}

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

async function fetchBooks(): Promise<Book[]> {
  const response = await fetch("http://localhost:4000/books");
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
                  <TableHead>Pages</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {books.map(book => (
                   <TableRow key={book.isbn}>
                    <TableCell className="font-medium">{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.pages}</TableCell>
                    <TableCell>{book.rating.average_rating}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

      </div>
    </main>
  );
}
