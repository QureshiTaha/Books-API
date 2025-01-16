const { getBooks } = require('./booksUseCase');

module.exports = () => {
  return async (req, res) => {
    try {
      const { gutenberg_id, language, mime_type, topic, author, title, page, limit } = req.query;
      const filters = {
        gutenberg_id: gutenberg_id ? gutenberg_id.split(',') : undefined,
        language: language ? language.split(',') : undefined,
        mime_type: mime_type ? mime_type.split(',') : undefined,
        topic,
        author,
        title
      };
      const books = await getBooks(filters, parseInt(page) || 1, parseInt(limit) || 25);
      // Return JSON response
      res.status(200).json({
        success: true,
        total: books.length,
        data: books
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };
};
