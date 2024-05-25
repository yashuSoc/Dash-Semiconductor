const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const session = require('express-session');
const nodemailer = require('nodemailer');

const port = 3000;
const app = express();
const upload = multer();
app.use(cors());
app.use(bodyParser.json())
const crypto = require('crypto');

const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

const secretKey = generateSecretKey();
console.log('Secure secret key:', secretKey);

app.use(session({
  secret:  secretKey || 'default-secret-key', // Change this to a secure random key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1*60*60*1000 } // Set secure: true in production with HTTPS
}));

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Dash-semiconductor",
  password: "YAsh2@@1",
  port: 5432
});

db.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
    process.exit(1); // Exit the process if unable to connect to the database
  });
  app.get('/', (req, res) => {
    if (req.session) {
        res.send(`Session is active. User ID:, Role ID: `);
    } else {
        res.send('Session is not active.');
    }
});


async function sendMail(){
  //1. create an email transporter.
  //SMTP (Simple Mail Transfer Protocol)
 const transporter =  nodemailer.createTransport({
      service: 'gmail',
      auth:{
          user: 'yashukhowal15@gmail.com',
          pass: 'trtxankmvhliqhda'
      }
  })


  //2.configure email content.
  const mailOptions = {
    from: 'socteamup@gmail.com',
    to: 'yash.ec19@nsut.ac.in',
    subject: 'Welcome to NodeJS App',
    html: `
    <html>
  <head>
    <style>
      /* Reset CSS */
      body,
      html {
        margin: 0;
        padding: 0;
        font-family: Arial, sans-serif;
        line-height: 1.6;
        background-color: #f2f2f2;
      }

      /* Container */
      .container {
        max-width: 600px;
        margin: 20px auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        padding: 30px;
      }

      /* Heading */
      .heading {
        text-align: center;
        color: #333333;
        font-size: 24px;
        margin-bottom: 20px;
      }

      /* Image */
      .image-container {
        text-align: center;
        margin-bottom: 20px;
      }

      /* Content */
      .content {
        text-align: center;
        margin-bottom: 30px;
        color: #666666;
      }

      /* Button */
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #ffffff;
        text-decoration: none;
        border-radius: 5px;
        transition: background-color 0.3s ease;
      }

      .button:hover {
        background-color: #0056b3;
      }

      /* Company Details */
      .company-details {
        margin-top: 40px;
        border-top: 1px solid #cccccc;
        padding-top: 20px;
        color: #666666;
        font-size: 14px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="heading">Hurray! your Request at SOCTeamup</h1>
      <div class="image-container">
  <img src="data:image/png;base64,base64-encoded-image-data" alt="Logo" style="max-width: 200px; height: auto;">
</div>
      <p class="content">Your request has been approved. Thank you!</p>
      <a href="https://your-website.com">Visit Our Website</a>
    </div>
    <div class="company-details">
      <p>SocTeamup Semiconductor</p>
      <p></p>
      <p>Email: info@example.com | Phone: +123456789</p>
    </div>
  </body>
</html>
    `,
  };

  //3. send email
  try {
     const result = await transporter.sendMail(mailOptions);
     console.log('Eamil sent successfully')
  } catch (error) {
      console.log('Email send failed with error:', error)
  }
}

// sendMail()


const authenticateUser = async (req, res, next) => {
  try {
      // Extract the session ID from the request sent by the frontend
      const sessionId = req.headers.authorization;// Assuming session ID is stored in the session

      // Check if the session ID is present in the session
      if (!sessionId) {
          return res.status(401).json({ error: 'Unauthorized' });
      }

      // Authenticate the session by verifying the session ID with the one stored in the database
      const sessionExists = await db.query('SELECT * FROM user_sessions WHERE session_id = $1', [sessionId]);

      if (!sessionExists.rows.length) {
          // If session ID does not exist in the database, return unauthorized
          return res.status(401).json({ error: 'Unauthorized' });
      }

      // If session is valid, proceed to the next middleware or route handler
      next();
  } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

















app.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = {
      text: 'SELECT user_id, role_id FROM "user" WHERE email = $1 AND password = $2',
      values: [email, password],
    };

    const result = await db.query(query);
    if (result.rows.length > 0) {
      // Authentication successful, retrieve user_id and role_id
      const user_id = result.rows[0].user_id;
      const role_id = result.rows[0].role_id;

      // Generate a session ID using crypto
      const session_id = crypto.randomBytes(16).toString('hex');
      const expirationTime = new Date();
      expirationTime.setDate(expirationTime.getDate() + 1);

      // Store user_id, role_id, and session_id in the user_session table
      const insertQuery = {
        text: 'INSERT INTO user_sessions (user_id, role_id, session_id, expiration_time) VALUES ($1, $2, $3, $4)',
        values: [user_id, role_id, session_id, expirationTime],
      };
      await db.query(insertQuery);

      // Store user_id and role_id in the session
      req.session.user_id = user_id;
      req.session.role_id = role_id;
      req.session.session_id = session_id;
      req.session.expiration_time = expirationTime;

      res.json({ success: true, user_id, role_id, session_id });
    } else {
      // Authentication failed
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ success: false, message: 'An error occurred while signing in' });
  }
});

app.post('/signup', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Map role names to role IDs
    let role_id;
    switch (role) {
      case 'Admin':
        role_id = 1;
        break;
      case 'Customer':
        role_id = 2;
        break;
      case 'IC design service provider':
        role_id = 3;
        break;
      case 'Domain Leader':
        role_id = 4;
        break;
      case 'Engineer':
        role_id = 5;
        break;
      default:
        return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    // Check if the email is already registered
    const emailExistsQuery = {
      text: 'SELECT COUNT(*) FROM "user" WHERE email = $1',
      values: [email],
    };
    const emailExistsResult = await db.query(emailExistsQuery);
    const emailExists = emailExistsResult.rows[0].count > 0;
    if (emailExists) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    // Insert the new user into the database
    const insertUserQuery = {
      text: 'INSERT INTO "user" (email, password, role_id)  VALUES ($1, $2, $3) RETURNING user_id',
      values: [email, password, role_id],
    };
    const insertedUser = await db.query(insertUserQuery);
    const user_id = insertedUser.rows[0].user_id;

    // Generate a session ID using crypto
    const session_id = crypto.randomBytes(16).toString('hex');
    const expirationTime = new Date();
    expirationTime.setDate(expirationTime.getDate() + 1);

    // Store user_id, role_id, and session_id in the user_session table
    const insertSessionQuery = {
      text: 'INSERT INTO user_sessions (user_id, role_id, session_id, expiration_time) VALUES ($1, $2, $3, $4)',
      values: [user_id, role_id, session_id, expirationTime],
    };
    await db.query(insertSessionQuery);

    // Store user_id and role_id in the session
    req.session.user_id = user_id;
    req.session.role_id = role_id;
    req.session.session_id = session_id;
    req.session.expiration_time = expirationTime;

    res.status(201).json({ success: true, user_id, role_id, session_id });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ success: false, message: 'An error occurred while signing up' });
  }
});



// Logout endpoint
app.post('/logout', async (req, res) => {
  const { user_id } = req.body;

  try {
    // Delete user session from the table
    const deleteQuery = {
      text: 'DELETE FROM user_sessions WHERE user_id = $1',
      values: [user_id],
    };
    await db.query(deleteQuery);

    // Respond with success message
    res.json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error('Error logging out:', error);
    res.status(500).json({ success: false, message: 'An error occurred while logging out' });
  }
});

// Protected endpoint
app.get('/protected', (req, res) => {
  const { user_id } = req.session;
  if (user_id) {
    // You can use the user_id to fetch the role_id from the database,
    // or you can directly use the role_id if you are already storing it in the session
    const role_id = req.session.role_id; // Assuming you're storing role_id in the session

    // Check if the user has the appropriate role to access the protected endpoint
    if (role_id === 2 /* customer */ || role_id === 3 /* ic_designer */ || role_id === 4 /* domainleader */ || role_id === 5 /* engineer */) {
      res.json({ success: true, user_id, role_id });
    } else {
      res.status(403).json({ success: false, message: 'Unauthorized' });
    }
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
});

  

//Customer Dashboard//
  app.get('/customerProfile',authenticateUser,  async (req, res) => {
    try {
      const { user_id } = req.query;
        const query = `
    SELECT u.name AS user_name,
           u.location,
           up.project_name,
           uc.client_name AS project_client
    FROM "user" u
    LEFT JOIN user_projects up ON u.user_id = up.user_id
    LEFT JOIN user_clients uc ON u.user_id = uc.user_id
    WHERE u.user_id = $1 AND u.user_status = 'approved';
`;
        
        // Execute the query
        const result = await db.query(query, [user_id]);
        
        // Send the result as JSON
        res.json(result.rows); 
    } catch (error) {
        console.error('Error executing query', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
  
// app.get('/customerClients', async (req, res) => {
//     try {
//       const result = await db.query('SELECT * FROM customer_clients');
//       res.json(result.rows); 
//     } catch (error) {
//       console.error('Error executing query', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
// });
  
// app.get('/customerProjects', async (req, res) => {
//     try {
//       const result = await db.query('SELECT * FROM customer_projects');
//       res.json(result.rows); 
//     } catch (error) {
//       console.error('Error executing query', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
// });
app.post('/customersInprogress', async (req, res) => {
  try {
    const { companyName, location, numberOfEmployees, projectsDelivered, existingClients, user_id  } = req.body;

    const query = `
      UPDATE "user"
      SET name = $1, location = $2, no_of_employees = $3, projects_delivered = $4, existing_clients = $5
      WHERE user_id = $6
      RETURNING *;`;
    const values = [companyName, location, numberOfEmployees, projectsDelivered, existingClients, user_id]; 

      const result = await db.query(query, values);

    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/adminCustomerProfile', async (req, res) => {
  try {
    const result = await db.query(`SELECT 
    u.user_id,
    u.name AS user_name,
    u.location,
    u.no_of_employees,
    u.email,
    up.project_name,
    uc.client_name AS project_client
  FROM "user" u
  LEFT JOIN user_projects up ON u.user_id = up.user_id
  LEFT JOIN user_clients uc ON u.user_id = uc.user_id
  WHERE u.user_status = 'approved' AND u.role_id = 2;`);
  res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/customerRequirements', upload.single('file'), async (req, res) => {
  try {
    const { user_id, dv, dft, pd, info } = req.body;
    const fileData = req.file.buffer; // Access the file data from the request

    // Insert file into file table and get the file_id
    const fileQuery = `
      INSERT INTO "user_files" (file)
      VALUES ($1)
      RETURNING file_id;`;
    
    const fileResult = await db.query(fileQuery, [fileData]);
    const fileId = fileResult.rows[0].file_id;

    // Insert form data into user_request table with file_id reference
    const userRequestQuery = `
      INSERT INTO "user_request" (user_id, requeststatus_id, changeuserid,  no_of_ic, no_of_dl, no_of_eng, add_information, file_id)
      VALUES ($1, 0, $1, $2, $3, $4, $5, $6)
      RETURNING *;`;

    const userRequestValues = [user_id, dv, dft, pd, info, fileId];

    const userRequestResult = await db.query(userRequestQuery, userRequestValues);

    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/customerReq', async (req, res) => {
  try {
    // Assuming you have a middleware to verify the user's session and set userId in the request object
    const user_id = req.query.user_id;
    if (!user_id) {
      return res.status(400).json({ error: 'User ID is missing or invalid' });
    }
    const query = `
      SELECT no_of_ic, no_of_dl, no_of_eng, requeststatus_id 
      FROM "user_request" WHERE user_id = $1
    `;

    const result = await db.query(query, [user_id]);

    if (result.rows.length === 0) {
      // If no data is found for the authenticated user, send a 404 Not Found response
      res.status(404).json({ error: 'User request data not found' });
    } else {
      // Send the user request data if found
      res.status(200).json({ userRequestData: result.rows });
    }
  } catch (error) {
    console.error('Error fetching user request data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/getCustomerRequirements', async (req, res) => {
  try {
    // const userId = req.params.userId;

    const query = `
      SELECT  ur.user_id, u.name AS user_name, ur.no_of_ic, ur.no_of_dl, ur.no_of_eng 
      FROM "user_request" ur
      JOIN "user" u ON ur.user_id = u.user_id WHERE requeststatus_id = 0
    `;

    const result = await db.query(query);

    if (result.rows.length === 0) {
      // If no data is found for the provided user ID, send a 404 Not Found response
      res.status(404).json({ error: 'User request data not found' });
    } else {
      // Send the user request data if found
      res.status(200).json({ userRequestData: result.rows });
    }
  } catch (error) {
    console.error('Error fetching user request data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ....Admin Customer.....//
app.get('/admincustomerInprogress', async (req, res) => {
  try {
    const result = await db.query('SELECT user_id, name, location, no_of_employees, projects_delivered, existing_clients FROM "user" WHERE role_id=2 AND user_status = \'inprogress\'');
    res.json(result.rows); 
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/adminRejected', async (req, res) => {
  try {
    const result = await db.query('SELECT user_id, name, location, no_of_employees, projects_delivered, existing_clients FROM "user" WHERE role_id=2 AND user_status = \'rejected\'');
    res.json(result.rows); 
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.get('/adminApproved', async (req, res) => {
  try {
    const result = await db.query('SELECT user_id, name, location, no_of_employees, projects_delivered, existing_clients FROM "user" WHERE role_id=2 AND user_status = \'approved\'');
    res.json(result.rows); 
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/admincustomerApproved', async (req, res) => {
  try {
    const { id } = req.body;
    // Update the status in the database for users with role_id = 2
    await db.query('UPDATE "user" SET user_status = $1 WHERE user_id = $2 AND role_id = 2', ["approved", id]);
    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/admincustomerRejected', async (req, res) => {
  try {
    const { id } = req.body;
    // Update the status in the database for users with role_id = 2
    await db.query('UPDATE "user" SET user_status = $1 WHERE user_id = $2 AND role_id = 2', ["rejected", id]);
    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/customerRequestRejected', async (req, res) => {
  try {
    const { id } = req.body;
    // Update the status in the database for users with role_id = 2
    await db.query('UPDATE "user_request" SET requeststatus_id = $1 WHERE user_id = $2', [2, id]);
    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/customerRequestApproved', async (req, res) => {
  try {
    const { id } = req.body;

    await db.query('UPDATE "user_request" SET requeststatus_id = $1 WHERE user_id = $2', [1, id]);
    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});









// IC Design Service Provider Firm
app.post('/IcDesignInprogress', async (req, res) => {
  try {
    const { icname, iclocation, icemployees, icprojects, icclients, no_of_employees_dv, no_of_employees_dft, no_of_employees_pd, details_of_dv, details_of_pd, details_of_dft, user_id } = req.body;

    // Update query for the "user" table
    const userQuery = `
      UPDATE "user"
      SET name = $1, location = $2, no_of_employees = $3, projects_delivered = $4, existing_clients = $5
      WHERE user_id = $6
      RETURNING *;`;

    // Update query for the "icdesign_fields" table
    const icdesignQuery = `
    INSERT INTO "icdesign_fields" (no_of_employees_dv, no_of_employees_dft, no_of_employees_pd, details_of_dv, details_of_pd, details_of_dft, user_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    ON CONFLICT (user_id)
    DO UPDATE SET
      no_of_employees_dv = $1,
      no_of_employees_dft = $2,
      no_of_employees_pd = $3,
      details_of_dv = $4,
      details_of_pd = $5,
      details_of_dft = $6
    RETURNING *;`;

    // Execute the update queries separately
    const userValues = [icname, iclocation, icemployees, icprojects, icclients, user_id];
    const icdesignValues = [no_of_employees_dv, no_of_employees_dft, no_of_employees_pd, details_of_dv, details_of_pd, details_of_dft, user_id];

    const userResult = await db.query(userQuery, userValues);
    const icdesignResult = await db.query(icdesignQuery, icdesignValues);

    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

















// ENGINEER DASHBOARD
app.post('/engineerInprogress', async (req, res) => {
  try {
    const {name, location, years, specialization, owork, pastprojects, user_id} = req.body;

    const query = `
      UPDATE "user"
      SET name=$1 , location = $2, expin_in_years = $3, specialization = $4, open_to_work = $5, projects_delivered = $6
      WHERE user_id = $7
      RETURNING *;`;
    const values = [name, location, years, specialization, owork, pastprojects, user_id]; 

      const result = await db.query(query, values);

    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ENGINEER PROFILE
app.get('/engineerProfile', async (req, res) => {
  try {
    const { user_id } = req.query;
    const query = `
      SELECT user_id AS engineerid,
             name,
             location,
             specialization,
             expin_in_years,
             open_to_work
      FROM "user"
      WHERE user_id = $1 AND role_id = 5
    `;
    
    // Execute the query
    const result = await db.query(query, [user_id]);
    
    // Send the result as JSON
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ENGINEER PROJECTS
app.get('/engineerProjects', async (req, res) => {
  try {
    const { user_id } = req.query;
    const query = `
      SELECT user_id AS projectid,
             project_name,
             project_details
      FROM "user_projects"
      WHERE user_id = $1
    `;
    
    // Execute the query
    const result = await db.query(query, [user_id]);
    
    // Send the result as JSON
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





//ADMIN ENGINEER
app.get('/adminEngineerProfile', async (req, res) => {
  try {
    const result = await db.query(`SELECT 
    u.user_id,
    u.name AS user_name,
    u.specialization,
    u.expin_in_years,
    u.email,
    up.project_name,
    up.project_details
  FROM "user" u
  LEFT JOIN user_projects up ON u.user_id = up.user_id
  WHERE u.user_status = 'approved' AND u.role_id = 5;`);
  res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//ADMIN ENGINEER INPROGRESS
app.get('/adminEngineerInprogress', async (req, res) => {
  try {
    const result = await db.query('SELECT user_id AS engineerid, name, location, specialization, expin_in_years, open_to_work FROM "user" WHERE role_id=5 AND user_status = \'inprogress\'');
    res.json(result.rows); 
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ADMIN ENGINEER APPROVED
app.post('/adminEngineerApproved', async (req, res) => {
  try {
    const { id } = req.body;
    // Update the status in the database for users with role_id = 2
    await db.query('UPDATE "user" SET user_status = $1 WHERE user_id = $2 AND role_id = 5', ["approved", id]);
    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ADMIN ENGINEER REJECTED
app.post('/adminEngineerRejected', async (req, res) => {
  try {
    const { id } = req.body;
    // Update the status in the database for users with role_id = 2
    await db.query('UPDATE "user" SET user_status = $1 WHERE user_id = $2 AND role_id = 5', ["rejected", id]);
    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//ADMIN ENGINEER APPROVED PROFILE
app.get('/EngineerApprovedProfile', async (req, res) => {
  try {
    const result = await db.query('SELECT user_id as engineerid, name, email, location, specialization, expin_in_years, open_to_work FROM "user" WHERE role_id=5 AND user_status = \'approved\'');
    res.json(result.rows); 
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// ADMIN ENGINEER REJECTED PROFILE
app.get('/EngineerRejectedProfile', async (req, res) => {
  try {
    const result = await db.query('SELECT user_id as engineerid, name, email, location, specialization, expin_in_years, open_to_work FROM "user" WHERE role_id=5 AND user_status = \'rejected\'');
    res.json(result.rows); 
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});












// DOMAIN LEADER DASHBOARD
app.post('/domainInprogress', async (req, res) => {
  try {
    const { names, years, tapeouts, projects, clients, user_id  } = req.body;

    const query = `
      UPDATE "user"
      SET name = $1, expin_in_years = $2, no_of_tapeouts_handled = $3, projects_delivered = $4, existing_clients = $5
      WHERE user_id = $6 AND role_id = 4
      RETURNING *;`;
    const values = [names, years, tapeouts, projects, clients, user_id]; 

      const result = await db.query(query, values);

    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// DOMAIN DASHBOARD PROFILE
app.get('/domainProfile',authenticateUser,  async (req, res) => {
  try {
    const { user_id } = req.query;
    const query = `
    SELECT user_id AS domainid,
    expin_in_years,
    no_of_tapeouts_handled,
    projects_delivered,
    existing_clients
FROM "user"
WHERE user_id = $1 AND role_id = 4
`;
      
      // Execute the query
      const result = await db.query(query, [user_id]);
      
      // Send the result as JSON
      res.json(result.rows); 
  } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// DOMAIN ADMIN PROFILE
app.get('/adminDomainProfile', async (req, res) => {
  try {
    const result = await db.query(`SELECT 
    user_id AS domainid,
    name,
    expin_in_years,
    no_of_tapeouts_handled,
    projects_delivered,
    existing_clients
FROM "user"
WHERE role_id = 4 AND user_status = 'approved'
    ;`);
  res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// DOMAIN ADMIN INPROGRESS
app.get('/adminDomainInprogress', async (req, res) => {
  try {
    const result = await db.query(`SELECT 
    user_id AS domainid,
    name,
    expin_in_years,
    no_of_tapeouts_handled,
    projects_delivered,
    existing_clients
FROM "user"
WHERE role_id = 4 AND user_status = 'inprogress'
    ;`);
  res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// DOMAIN ADMIN REJECTED
app.get('/domainRejected', async (req, res) => {
  try {
    const result = await db.query(`SELECT 
    user_id AS domainid,
    name,
    expin_in_years,
    no_of_tapeouts_handled
FROM "user"
WHERE role_id = 4 AND user_status = 'rejected'
    ;`);
  res.json(result.rows);
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// DOMAIN ADMIN APPROVAL REQUEST
app.post('/adminDomainApproved', async (req, res) => {
  try {
    const { id } = req.body;
    // Update the status in the database for users with role_id = 2
    await db.query('UPDATE "user" SET user_status = $1 WHERE user_id = $2 AND role_id = 4', ["approved", id]);
    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// DOMAIN ADMIN REJECTION REQUEST
app.post('/adminDomainRejected', async (req, res) => {
  try {
    const { id } = req.body;
    // Update the status in the database for users with role_id = 2
    await db.query('UPDATE "user" SET user_status = $1 WHERE user_id = $2 AND role_id = 4', ["rejected", id]);
    res.sendStatus(200); // Send a success response
  } catch (error) {
    console.error('Error approving user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});









// USER
app.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params; // Destructure userId from req.params
    const query = `
      SELECT name
      FROM "user"
      WHERE user_id = $1
    `;
    
    // Execute the query
    const result = await db.query(query, [userId]); // Pass userId to the query
    
    // Check if user is found
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Send the result as JSON
    res.json(result.rows[0]); // Return the first row (assuming user_id is unique)
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
