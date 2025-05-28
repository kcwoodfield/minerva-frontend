export interface Book {
  id: string;
  title: string;
  author: string;
  isbn_13: string;
  isbn_10: string | null;
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
    isbn_13: string;
  }[];
  series_info: string | null;
  completed: boolean;
  date_added: string;
}