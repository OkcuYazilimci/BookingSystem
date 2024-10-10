# Hotel Room Booking API Documentation

This API allows users to book rooms in a hotel, handling room availability, booking, and user authentication. Admins can create, update, and delete rooms, while regular users can search for room availability and make bookings.

## Features

- **User Authentication**: Register, login, and token-based authentication for users (admins and customers).
- **Room Management**: Create, update, delete, and list rooms (admin-only).
- **Booking Management**: Create and list bookings, with real-time room availability checks.
- **Room Availability**: Check for room availability by type and date range.
- **User Roles**: Admin can manage rooms, and customers can book rooms.

## Tech Stack

- **Architecture**: N Layered Arhitecture
- **Backend**: Node.js, Express.js, TypeScript, MongoDB, Mongoose
- **Authentication**: JWT (JSON Web Token)
- **Caching**: Redis
- **Validation**: class-validator

## Installation

### 1. Clone the repository

```bash
git clone git@github.com:OkcuYazilimci/BookingSystemCase.git <fileName>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure .env file

Update the .env file with your MongoDB, Redis connection strings, and JWT secret.

```bash
JWT_SECRET="ElegantOffice"
PORT=5001
MONGO_URI="mongodb+srv://ituumutuygun:123@elegantcluster.t4ft1.mongodb.net/?retryWrites=true&w=majority&appName=ElegantCluster"
```

### 4. Run the Application

```bash
npm run build
npm start
```

## API References

### Auth

#### Register

```http
POST /api/v1/auth/register
```

**Body**

| Field    | Type   | Description                      |
|----------|--------|----------------------------------|
| email    | string | Required fields to register a user |
| password | string | Required fields to register a user |

#### Login

```http
POST /api/v1/auth/login
```

**Body**

| Field    | Type   | Description                      |
|----------|--------|----------------------------------|
| email    | string | Required fields for user login   |
| password | string | Required fields for user login   |

### Rooms

#### Create Room (Admin)

```http
POST /api/v1/rooms
```

**Body**

| Field    | Type   | Description                      |
|----------|--------|----------------------------------|
| roomType | string | Admin can create new rooms       |
| price    | string | Admin can create new rooms       |

**Bearer Auth**

| Type  | Description                         |
|-------|-------------------------------------|
| Token | Required for authorization          |

#### Update Room (Admin)

```http
PUT /api/v1/rooms/{id}
```

**Param**

| Field | Type   | Description                      |
|-------|--------|----------------------------------|
| id    | string | Room ID to be updated            |

**Body**

| Field    | Type   | Description                      |
|----------|--------|----------------------------------|
| roomType | string | Updated room details             |
| price    | string | Updated room details             |

**Bearer Auth**

| Type  | Description                         |
|-------|-------------------------------------|
| Token | Required for authorization          |

#### Delete Room (Admin)

```http
DELETE /api/v1/rooms/{id}
```

**Param**

| Field | Type   | Description                      |
|-------|--------|----------------------------------|
| id    | string | Room ID to be deleted            |

**Bearer Auth**

| Type  | Description                         |
|-------|-------------------------------------|
| Token | Required for authorization          |

#### Get All Rooms

```http
GET /api/v1/rooms
```

**Bearer Auth**

| Type  | Description                         |
|-------|-------------------------------------|
| JWT   | Token required for authorization     |

#### Get Room by ID

```http
GET /api/v1/rooms/{id}
```

**Param**

| Field | Type   | Description                      |
|-------|--------|----------------------------------|
| id    | string | Get room details by ID          |

**Bearer Auth**

| Type  | Description                         |
|-------|-------------------------------------|
| Token | Required for authorization          |

### Bookings

#### Create Booking

```http
POST /api/v1/bookings
```

**Body**

| Field          | Type   | Description                      |
|----------------|--------|----------------------------------|
| roomType       | string | Create a booking with room type  |
| checkInDate    | string | Check-in date                    |
| checkOutDate   | string | Check-out date                   |
| guests         | object | Guest details                    |

**Bearer Auth**

| Type  | Description                         |
|-------|-------------------------------------|
| Token | Required for authorization          |

#### Get All Bookings (Admin)

```http
GET /api/v1/bookings
```

**Bearer Auth**

| Type  | Description                         |
|-------|-------------------------------------|
| JWT   | Token required for authorization     |

#### Get Booking by ID

```http
GET /api/v1/bookings/{id}
```

**Param**

| Field | Type   | Description                      |
|-------|--------|----------------------------------|
| id    | string | Get booking details by ID       |

**Bearer Auth**

| Type  | Description                         |
|-------|-------------------------------------|
| Token | Required for authorization          |

## Example JSON Bodies

### Create Room

```json
{
  "roomType": "suite",
  "price": 100
}
```

### Create Booking

```json
{
  "roomType": "suite",
  "checkInDate": "2024-12-01",
  "checkOutDate": "2024-12-05",
  "guests": [
    {
      "name": "John Doe",
      "gender": "male",
      "age": 30
    },
    {
      "name": "Jane Doe",
      "gender": "female",
      "age": 28
    }
  ],
  "paymentMethod": "credit_card"
}
```

## Authors

@OkcuYazilimci
