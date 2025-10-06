# UDMT Backend Server

## Overview
Express.js REST API server with SQLite database for persistent data storage, authentication, and application management.

## Features
- ✅ JWT-based authentication
- ✅ SQLite database for data persistence
- ✅ Full CRUD operations for applications
- ✅ User and admin role management
- ✅ Audit logging
- ✅ File upload support (ready to implement)

## Getting Started

### 1. Start the Backend Server
```bash
npm run server
```

The server will start on `http://localhost:3001`

### 2. Start the Frontend (in a separate terminal)
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### 3. Or Start Both Together
```bash
npm run start:all
```

## Default Login Credentials

### Admin Account
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Role**: Admin (can view and edit all applications)

### User Accounts
- **Email**: `applicantA@example.com`
- **Password**: `user123`
- **Role**: User

- **Email**: `applicantB@example.com`
- **Password**: `user123`
- **Role**: User

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/register` - Register new user
- `GET /api/auth/profile` - Get current user profile (requires auth)

### Applications
- `GET /api/applications` - Get all applications for current user
- `GET /api/applications/:id` - Get specific application
- `POST /api/applications` - Create new application
- `PUT /api/applications/:id` - Update application
- `POST /api/applications/:id/submit` - Submit application
- `DELETE /api/applications/:id` - Delete application

### Admin
- `GET /api/applications/admin/all` - Get all applications (admin only)
- `GET /api/applications/admin/all?status=submitted` - Filter by status

## Database Schema

### Users Table
```sql
- id: INTEGER PRIMARY KEY
- email: TEXT UNIQUE
- password_hash: TEXT
- name: TEXT
- role: TEXT (user/admin)
- created_at: DATETIME
- last_login: DATETIME
```

### Applications Table
```sql
- id: INTEGER PRIMARY KEY
- user_id: INTEGER (FK to users)
- status: TEXT (draft/submitted/under_review)
- form_data: TEXT (JSON)
- created_at: DATETIME
- updated_at: DATETIME
- submitted_at: DATETIME
```

### Files Table
```sql
- id: INTEGER PRIMARY KEY
- application_id: INTEGER (FK to applications)
- filename: TEXT
- original_name: TEXT
- file_type: TEXT
- file_category: TEXT
- file_path: TEXT
- file_size: INTEGER
- upload_date: DATETIME
```

### Audit Log Table
```sql
- id: INTEGER PRIMARY KEY
- application_id: INTEGER (FK to applications)
- user_id: INTEGER (FK to users)
- action: TEXT
- details: TEXT
- timestamp: DATETIME
```

## Database Location
The SQLite database file is stored at: `server/udmt.db`

To reset the database, simply delete this file and restart the server.

## Environment Variables
Create a `.env` file in the `server` directory:

```env
PORT=3001
JWT_SECRET=your-secret-key
NODE_ENV=development
```

## Security Notes
- JWT tokens expire after 7 days
- Passwords are hashed with bcrypt (10 rounds)
- CORS enabled for local development
- Change JWT_SECRET in production!

## Next Steps
1. ✅ Basic server setup
2. ✅ Authentication system
3. ✅ Application CRUD operations
4. ⏳ File upload implementation
5. ⏳ Frontend integration
6. ⏳ Enhanced admin dashboard
7. ⏳ PDF generation on submission
8. ⏳ Email notifications

## Troubleshooting

### Port Already in Use
If port 3001 is in use, change it in `server/.env`:
```env
PORT=3002
```

### Database Errors
Delete `server/udmt.db` and restart the server to recreate the database.

### Authentication Issues
Clear localStorage in browser DevTools or use:
```javascript
localStorage.removeItem('udmt_token')
```

## Development
The server uses `tsx watch` for hot-reloading during development. Any changes to server files will automatically restart the server.
