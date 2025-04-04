
# Loan Management System API

Welcome to the Loan Management System API! This API allows you to manage loans efficiently with features like fetching loans by status, retrieving user-specific loans, and even deleting loans (restricted to superadmins).

## Features
- **Get all loans**
- **Get loans by status**
- **Get loans by user**
- **Get expired loans**
- **Delete loan (superadmin only)**

## Technologies
- Node.js
- Express
- TypeScript
- File System (fs) for data storage
- JSON for loan data

## Setup

### Prerequisites
- Node.js (v14+)
- npm

### Installation
1. Clone the repo:
   ```bash
   git clone https://github.com/oluwaseun-odueso/loans.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `data/loans.json` file with loan data:
   ```json
   [
     {
       "id": "1",
       "applicantEmail": "user1@example.com",
       "amount": 1000,
       "status": "approved",
       "maturityDate": "2025-05-01",
       "totalLoan": 1200
     }
   ]
   ```
4. Start the server:
   ```bash
   npm run start
   ```

## API Endpoints

### `GET /loans`
Retrieve all loans.

### `GET /loans/expired`
Get expired loans.

### `GET /:userEmail/get`
Get loans for a specific user.

### `GET /loans/status`
Get loans by status (query parameter: `status`).

### `DELETE /:loanId/delete`
Delete a loan (only for superadmin).

## Middleware
- **authenticate**: Authenticates users via token.
- **authorize**: Restricts actions based on roles (e.g., superadmin).

## Error Handling
- **400**: Missing query parameters.
- **404**: Loan not found.
- **403**: Unauthorized access.
- **500**: Server errors.

## Example Requests
### Get All Loans
```bash
curl -X GET https://loans-6rzr.onrender.com/api/v1/loans
```

### Get Loans by Status
```bash
curl -X GET "https://loans-6rzr.onrender.com/api/v1/loans/status?status=approved"
```

### Delete a Loan
```bash
curl -X DELETE https://loans-6rzr.onrender.com/api/v1/loans/1/delete
```

## Contributing
1. Fork the repo.
2. Create a feature branch.
3. Commit and push your changes.
4. Create a pull request.

## License
MIT License
