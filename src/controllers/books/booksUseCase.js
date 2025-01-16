const sql = require('../../Modules/sqlHandler');
sqlQuery = sql.queryWithParams;
// sqlQuery = sql.query;

module.exports = {
  getBooks: async (filters, page = 1, limit = 25) => {
    try {
      const offset = (page - 1) * limit;

      const params = [
        filters.gutenberg_id || null,
        filters.gutenberg_id || null,
        filters.language || null,
        filters.language || null,
        filters.mime_type || null,
        filters.mime_type || null,
        filters.topic || null,
        filters.topic ? `%${filters.topic}%` : null,
        filters.topic ? `%${filters.topic}%` : null,
        filters.author || null,
        filters.author ? `%${filters.author}%` : null,
        filters.title || null,
        filters.title ? `%${filters.title}%` : null
      ];

      // Count query for total books matching the criteria
      const countQuery = `
            SELECT COUNT(DISTINCT b.id) AS totalBooks
            FROM books_book b
            LEFT JOIN books_book_authors ba ON b.id = ba.book_id
            LEFT JOIN books_author a ON ba.author_id = a.id
            LEFT JOIN books_book_subjects bbs ON b.id = bbs.book_id
            LEFT JOIN books_subject s ON bbs.subject_id = s.id
            LEFT JOIN books_book_bookshelves bbb ON b.id = bbb.book_id
            LEFT JOIN books_bookshelf bs ON bbb.bookshelf_id = bs.id
            LEFT JOIN books_book_languages bbl ON b.id = bbl.book_id
            LEFT JOIN books_language l ON bbl.language_id = l.id
            LEFT JOIN books_format f ON b.id = f.book_id
            WHERE 1 = 1
              AND (b.gutenberg_id IN (?) OR ? IS NULL)
              AND (l.code IN (?) OR ? IS NULL)
              AND (f.mime_type IN (?) OR ? IS NULL)
              AND (? IS NULL OR s.name LIKE ? OR bs.name LIKE ?)
              AND (? IS NULL OR a.name LIKE ?)
              AND (? IS NULL OR b.title LIKE ?)
          `;

      const totalBooksResult = await sqlQuery(countQuery, params);
      const totalBooks = totalBooksResult[0]?.totalBooks || 0;

      // Query for fetching books with pagination
      const booksQuery = `
            SELECT
              b.id,
              b.title,
              GROUP_CONCAT(DISTINCT a.name) AS authors,
              GROUP_CONCAT(DISTINCT s.name) AS subjects,
              GROUP_CONCAT(DISTINCT bs.name) AS bookshelves,
              GROUP_CONCAT(DISTINCT CONCAT(f.mime_type, ':', f.url)) AS formats,
              GROUP_CONCAT(DISTINCT l.code) AS languages,
              b.download_count
            FROM books_book b
            LEFT JOIN books_book_authors ba ON b.id = ba.book_id
            LEFT JOIN books_author a ON ba.author_id = a.id
            LEFT JOIN books_book_subjects bbs ON b.id = bbs.book_id
            LEFT JOIN books_subject s ON bbs.subject_id = s.id
            LEFT JOIN books_book_bookshelves bbb ON b.id = bbb.book_id
            LEFT JOIN books_bookshelf bs ON bbb.bookshelf_id = bs.id
            LEFT JOIN books_book_languages bbl ON b.id = bbl.book_id
            LEFT JOIN books_language l ON bbl.language_id = l.id
            LEFT JOIN books_format f ON b.id = f.book_id
            WHERE 1 = 1
              AND (b.gutenberg_id IN (?) OR ? IS NULL)
              AND (l.code IN (?) OR ? IS NULL)
              AND (f.mime_type IN (?) OR ? IS NULL)
              AND (? IS NULL OR s.name LIKE ? OR bs.name LIKE ?)
              AND (? IS NULL OR a.name LIKE ?)
              AND (? IS NULL OR b.title LIKE ?)
            GROUP BY b.id
            ORDER BY b.download_count DESC
            LIMIT ?, ?;
          `;

      const booksParams = [...params, offset, limit];
      const books = await sqlQuery(booksQuery, booksParams);

      return {
        total: totalBooks,
        books
      };
    } catch (error) {
      console.error('Error fetching books:', error.message);
      throw new Error('Failed to retrieve books.');
    }
  }
};
