# URL Shortening Service

This project is a URL shortening service built with NestJS. The service provides endpoints to encode a long URL into a short URL, decode a short URL back to the original URL, fetch statistics for a short URL, and redirect from a short URL to the original URL.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/evidenze/shortlink.git
   cd shortlink
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm run start
   ```

4. **Run the application in development mode**:
   ```bash
   npm run start:dev
   ```

5. **Run tests**:
   ```bash
   npm test
   ```

## API Endpoints

### Encode URL
Encodes a long URL into a short URL.

- **URL**: `/encode`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "url": "https://indicina.co"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "message": "URL has been shortened successfully",
    "data": {
      "shortUrl": "http://short.est/abc123",
      "url": "https://indicina.co"
    }
  }
  ```

### Decode URL
Decodes a short URL back to the original long URL.

- **URL**: `/decode`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "url": "http://short.est/abc123"
  }
  ```
- **Response**:
  ```json
  {
    "status": true,
    "message": "URL decoded successfully",
    "data": "https://indicina.co"
  }
  ```

### Get URL Statistics
Fetches statistics for a short URL.

- **URL**: `/statistic/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id` - The identifier part of the short URL (e.g., `abc123` in `http://short.est/abc123`).
- **Response**:
  ```json
  {
    "status": true,
    "message": "Statistics fetched successfully",
    "data": {
      "url": "https://indicina.co",
      "hits": 0,
      "createdAt": "2024-06-23T10:00:00.000Z"
    }
  }
  ```

### Redirect to Original URL
Redirects from a short URL to the original long URL.

- **URL**: `/:id`
- **Method**: `GET`
- **URL Parameters**:
  - `id` - The identifier part of the short URL (e.g., `abc123` in `http://short.est/abc123`).
- **Response**:
  - Redirects to the original URL.

## Running the Application

To start the application, run:
```bash
npm run start
```

The application will be running at `http://localhost:3000`.

## Testing

To run the tests, use the following command:
```bash
npm test
```

## Project Structure

```text
src/
├── app.module.ts
├── main.ts
├── shortener/
│   ├── dto/
│   │   ├── encode.dto.ts
│   │   ├── decode.dto.ts
│   ├── shortener.controller.ts
│   ├── shortener.service.ts
│   ├── shortener.module.ts
│   ├── shortener.controller.spec.ts
│   ├── shortener.service.spec.ts
```