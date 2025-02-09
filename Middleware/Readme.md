# Middleware

Middleware functions process requests before they reach routes.

Middleware functions are functions that:

1. Access the request (`req`), response (`res`), and `next` function.
2. Execute code (e.g., logging, authentication, data parsing).
3. Modify `req/res` objects (e.g., adding properties like `req.user`).
4. End the request (by sending a response with `res.send()`) or pass control to the next middleware using `next()`.

# use of Middleware

### 1. Logging & Monitoring

Purpose: Track requests, response times, and errors for debugging and analytics.
Example: Use morgan for HTTP request logging and winston for structured logging.

```
const morgan = require('morgan');
const winston = require('winston');

// HTTP request logging
app.use(morgan('combined')); // Logs: IP, method, URL, status, response time

// Custom logging for errors/events
const logger = winston.createLogger({
  transports: [new winston.transports.File({ filename: 'app.log' })],
});
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

```

### 2. Authentication & Authorization

Purpose: Secure routes by validating user credentials (e.g., JWT, API keys).
Example: Middleware to check if a user is authenticated.

```
// Middleware to validate JWT tokens
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user data to the request
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

// Protect a route
app.get('/dashboard', authMiddleware, (req, res) => {
  res.send(`Welcome, ${req.user.name}`);
});

```

### 3. Error Handling

Purpose: Centralize error handling to avoid crashing the app and return clean error responses.
Example: Global error handler for all uncaught exceptions.

```
// Route that might throw an error
app.get('/api/data', (req, res, next) => {
  try {
    // Some operation that could fail
    if (!data) throw new Error('Data not found');
  } catch (err) {
    next(err); // Pass to error-handling middleware
  }
});

// Global error handler (define after all routes/middleware)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' ? 'Server error' : err.message,
  });
});

```

Purpose: Validate incoming data (e.g., form submissions, API payloads) and sanitize inputs to prevent attacks (e.g., SQL injection).
Example: Use `express-validator` to validate and sanitize request bodies.

```
const { body, validationResult } = require('express-validator');

// Validate user registration data
app.post(
  '/register',
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Proceed with valid data
  }
);

```

### Rate Limiting & Throttling

Purpose: Prevent abuse (e.g., DDoS attacks, brute-force attempts) by limiting requests from a client.
Example: Use `express-rate-limit` to restrict API calls.

```
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use('/api/', apiLimiter);

```

### 6. CORS (Cross-Origin Resource Sharing)

Purpose: Control which domains can access your API.
Example: Use the cors middleware for API endpoints.

```
const cors = require('cors');
app.use(cors({
  origin: ['https://your-frontend-domain.com'], // Whitelist specific domains
  methods: ['GET', 'POST'], // Allow only specific HTTP methods
}));

```

### 7. Security Headers

Purpose: Protect against common vulnerabilities (e.g., XSS, clickjacking).
Example: Use `helmet` to set secure HTTP headers.

```
const helmet = require('helmet');
app.use(helmet()); // Sets headers like X-Content-Type-Options, X-XSS-Protection
```

### 8. Request Data Processing

Purpose: Parse incoming data (e.g., JSON, URL-encoded, multipart/form-data).
Example: Use built-in middleware for JSON and URL-encoded data.

```
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
```

### 9. Caching

Purpose: Improve performance by caching responses.
Example: Cache static assets or API responses.

```
const apicache = require('apicache');
const cache = apicache.middleware;

// Cache all GET requests for 5 minutes
app.use(cache('5 minutes'));
app.get('/api/posts', (req, res) => { /* ... */ });

```

### 10. Monitoring & Health Checks

Purpose: Ensure the app is running smoothly and detect issues early.
Example: Add a health check endpoint.

```
app.use('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: Date.now() });
});

```
