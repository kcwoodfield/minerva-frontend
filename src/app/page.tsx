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

export default function Home() {
  return (
    <main>
      home
    </main>
  );
}
