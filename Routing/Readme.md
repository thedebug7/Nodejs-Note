# Routing in Express

### 1. What is Routing?

Routing refers to how an application responds to client requests to specific endpoints (URIs) using HTTP methods (GET, POST, etc.). In Express, routing involves defining:

- HTTP Method (GET, POST, PUT, DELETE, etc.)
- Path (URL or URI)
- Handler Function (Logic to execute when the route is matched)

### 2. Basic Route Structure

`app.METHOD(PATH, HANDLER);`
`METHOD`: HTTP method (e.g., `app.get()`, `app.post()`).
`PATH`: URL path (e.g., `/users`, `/posts/:id`).
`HANDLER`: Function executed when the route is matched.

## HTTP Methods

- `GET`: Retrieve data.

- `POST`: Submit data.

- `PUT`: Update data.

- `DELETE`: Delete data.

- `PATCH`: Partial update.

- `ALL`: Handle all methods for a path.

## 4. Route Paths

Paths can be static or dynamic using route parameters (:param).

### Static Path:

```
app.get('/about', (req, res) => {
  res.send('About Page');
});
```

### Dynamic Path with Parameters:

```
app.get('/users/:userId', (req, res) => {
  res.send(`User ID: ${req.params.userId}`);
});
```
