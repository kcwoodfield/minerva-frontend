This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and shadcn-ui.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

then, to mock a rest api use json-server and point to the data.json on a different port than Next.js:

```bash
npm install -g json-server
# then
npx json-server --watch ./_data/db.json --port 4000
```

## Book data

Below is a description of a json object for a list of books, including fields that are typically used in a library's inventory system:

### Explanation of Fields:

- **`title`**: The title of the book.
- **`author`**: The author(s) of the book.
- **`isbn`**: The International Standard Book Number, typically in the 13-digit format.
- **`publisher`**: The name of the publishing company.
- **`publication_date`**: The date the book was published.
- **`genre`**: Fiction, Non-Fiction, etc.
- **`sub_genre`**: A more specific genre like Mystery, Biography, etc.
- **`language`**: The language in which the book is written.
- **`pages`**: The number of pages in the book.
- **`format`**: The format of the book (e.g., Hardcover, Paperback, eBook).
- **`edition`**: The edition of the book.
- **`summary`**: A brief summary of the book's content.
- **`keywords`**: Keywords related to the book.
- **`tags`**: Tags for categorization.
- **`cover_image_url`**: A URL to the book’s cover image.
- **`availability`**: Information about the book's availability in the library.
  - **`status`**: Whether the book is available or checked out.
  - **`due_date`**: When the book is due back if checked out.
  - **`library_location`**: The location within the library.
  - **`number_of_copies`**: How many copies are available.
- **`rating`**: Ratings and reviews for the book.
  - **`average_rating`**: The average rating score.
  - **`number_of_reviews`**: The number of reviews.
  - **`reviews`**: A list of individual reviews.
    - **`reviewer`**: The name of the reviewer.
    - **`review_date`**: The date the review was posted.
    - **`rating`**: The reviewer's rating.
    - **`comment`**: The reviewer's comment.
- **`related_books`**: Books that are related to this one.
  - **`title`**: The title of the related book.
  - **`author`**: The author of the related book.
  - **`isbn`**: The ISBN of the related book.
- **`series_info`**: Information about the series if the book is part of one.
  - **`series_name`**: The name of the series.
  - **`book_number`**: The book's position in the series.
- **`isbn_10`**: The 10-digit version of the ISBN.
- **`dewey_decimal`**: The Dewey Decimal Classification for the book.
- **`library_of_congress_classification`**: The Library of Congress Classification number.
- **`bibliography`**: References or works cited in the book.
  - **`title`**: The title of the related work.
  - **`author`**: The author of the related work.
  - **`publication_date`**: The publication date of the related work.
  - **`pages`**: The number of pages in the related work.
- **`awards`**: Awards the book has won.
  - **`award_name`**: The name of the award.
  - **`year`**: The year the award was won.
  - **`category`**: The category in which the award was won.
