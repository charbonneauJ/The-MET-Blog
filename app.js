const session = require('express-session');  // Provides middleware for session management in Express applications (Allows you to create and manage sessions, they are used to store data across different requests from the same user)
const pgSession = require('connect-pg-simple')(session);  // This is a session store for express-session that stores session data in a PostgreSQL database.
const { Pool } = require('pg');  //  Allows for multiple client connections to the PostgreSQL database, allowing for efficient querying. (More than one query can be ran at once)

const pool = new Pool();

app.use(session({  // This line adds the session middleware to your Express app. It manages session creation, validation, and storage
    store: new pgSession({  // This option specifies where to store session data. In this case, sessions are stored in PostgreSQL using pgSession
      pool: pool, // Connects to your PostgreSQL
    }),
    secret: 'your-secret-key',  //  This is a string used to sign the session ID cookie (Must be kept secure. Should store this secret in an environment variable in future)
    resave: false,  // This option determines whether to save the session back to the store even if it hasn't been modified during the request(set to false will prevent saving without changes being made)
    saveUninitialized: false,  // This option ensures that a session is only saved to the store if it has been modified
    cookie: { secure: true } // Set secure: true in production with HTTPS
  }));