# Books API Documentation

Welcome to the **Books API**! This API allows you to retrieve information about books with various filter criteria, enabling searches based on authors, languages, topics, formats, and more. The results are paginated and sorted by popularity (download count).

---

## **Base URL**

```
http://localhost:3000
```

---

## **Endpoints**

### **1. Retrieve Books**

**URL**:  
`GET /books`

**Description**:  
Fetch books based on various filter criteria.

**Query Parameters**:
- `gutenberg_id` (Optional): Filter books by Gutenberg ID. Example: `gutenberg_id=12345`
- `language` (Optional): Filter books by language. Example: `language=en,fr`
- `mime_type` (Optional): Filter books by mime type. Example: `mime_type=application/epub+zip`
- `topic` (Optional): Filter books by topic (subject or bookshelf). Example: `topic=child`
- `author` (Optional): Filter books by author. Example: `author=jane`
- `title` (Optional): Filter books by title. Example: `title=adventure`
- `page` (Optional, Default: 1): Page number for pagination. Example: `page=2`
- `limit` (Optional, Default: 25): Number of books per page (max 25). Example: `limit=10`

**Example Request**:  
```
GET /books?page=1&limit=10&language=en&topic=child&author=jane
```

**Response**:
```json
{
  "success": true,
  "data": {
    "total" :54859,
    "books":[
    {
      "title": "The Adventures of Tom Sawyer",
      "authors": "Mark Twain",
      "subjects": "Adventure, Children",
      "bookshelves": "Children's Literature",
      "formats": [
        "text/plain: http://example.com/tomsawyer.txt",
        "application/epub+zip: http://example.com/tomsawyer.epub"
      ],
      "languages": "en",
      "download_count": 5000
    },
    ...
  ]
  }
}
```

---

## **Error Responses**

| Status Code | Message                  |
|-------------|--------------------------|
| 400         | Bad Request              |
| 404         | Resource Not Found       |
| 500         | Internal Server Error    |

**Example Error Response**:
```json
{
  "success": false,
  "message": "some error message."
}
```

---

## **Setup Instructions**

1. Clone the repository:
   ```bash
   git clone https://github.com/QureshiTaha/Books-API.git
   ```

2. Install dependencies:
   ```bash
   cd books-api
   npm install
   ```

3. Configure the database connection in `.env`.

4. Start the server:
   ```bash
   npm start
   ```

5. Access the API at `http://localhost:3000`.

---

## **Notes**
- Ensure your database is populated with the necessary data before using the API.
- Use appropriate headers in your requests, such as `Content-Type: application/json`.
- For large datasets, paginate results using `?page` and `?limit` parameters.

---

If you encounter issues or have questions, feel free to reach out to me!
- +91 9326239256
- qureshi.t2000@gmail.com

