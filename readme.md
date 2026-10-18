# AI URL Shortener — Backend API Documentation

## Overview

The AI URL Shortener backend provides REST APIs for URL shortening, AI-powered URL safety analysis, user authentication, URL management, and click tracking.

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Google Gemini API
- Redis
- Docker
- GitHub Actions

## Base URL

**Production API:** `https://ai-url-shortener-i219.onrender.com/`

**Health Check:** `https://ai-url-shortener-i219.onrender.com/health`

Replace the placeholder with your deployed backend URL.

## Features

- Create shortened URLs
- AI-powered URL safety analysis
- User authentication using HTTP-only cookies
- Retrieve user-specific URLs
- Delete URLs
- Track link clicks
- MongoDB Atlas integration
- Redis caching

## API Endpoints

All endpoints below are relative to the production base URL.

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check backend availability |

### AUTH Management

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/auth/register` | Register a user | Required |
| POST | `/api/auth/login` | Login a user | Required |
| POST | `/api/auth/get-me` | Get Current user | Required |
| POST | `/api/auth/logout` | Logout a user | Required |

### URL Management

| Method | Endpoint | Description | Authentication |
|---|---|---|---|
| POST | `/api/url/create` | Create a short URL | Required |
| GET | `/api/url/` | Retrieve the user's URLs | Required |
| DELETE | `/api/url/:id` | Delete a URL by its database ID | Required |

### URL Redirection

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/url/:shortCode` | Redirect to the original URL |

**Note:** Verify the exact redirect path against the deployed Express router before publishing this table.

### Authentication

Add the registration, login, logout, and current-user endpoints from the actual authentication router.

## Example: Create a Short URL

**Method:** `POST`

**Endpoint:** `/api/url/create`

**Request Body:**

```json
{
  "originalUrl": "https://ai-url-shortener-i219.onrender.com/"
}
```

Send the request to:

`https://ai-url-shortener-i219.onrender.com/url/create`

Provide the authentication cookie if the endpoint requires an authenticated user.

The response structure and status codes depend on the backend implementation.

## Authentication

Protected endpoints require a valid authentication cookie.

- The cookie should be configured as HTTP-only.
- Production cookie settings must match the frontend and backend deployment domains.
- Requests from the frontend must include credentials when required.
- Never share authentication cookies or secrets publicly.

## Environment Variables

Configure the required environment variables in the hosting provider's dashboard.

Typical configuration includes:

- `MONGODB_URI` — MongoDB Atlas connection string
- `GEMINI_API_KEY` — Google Gemini API key
- `REDIS_URL` — Redis connection URL
- `NODE_ENV` — Runtime environment
- Authentication secret — Use the exact name defined in the backend
- `FRONTEND_URL` — Allowed frontend origin, if used by the application

Do not publish actual secret values in this documentation.

## Deployment

The backend is deployed using the configured hosting platform and can be built using Docker.

After deployment:

1. Verify the health-check endpoint.
2. Confirm that MongoDB Atlas is connected.
3. Check that required environment variables are configured.
4. Test protected endpoints with valid authentication.
5. Verify URL creation and redirection.
6. Confirm that the frontend uses the production backend URL.

## Error Handling

The API may return HTTP errors for invalid requests, authentication failures, missing resources, duplicate URLs, or server-side failures.

Document the exact status codes and response bodies according to the controller implementation.

## Security

- Keep API keys and credentials private.
- Validate user input.
- Verify URL ownership before deletion.
- Restrict protected endpoints to authenticated users.
- Configure CORS for trusted frontend origins.
- Avoid exposing sensitive internal errors.

## License

Specify the project's license here, if applicable.
