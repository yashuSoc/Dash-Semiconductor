const express = require('express');
const pg = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Admin-dashboard",
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
  app.post('/signup', async (req, res) => { 
    const { email, password, role } = req.body;
  
    try {
      if (!email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const query = `
        INSERT INTO Users (email, password, role)
        VALUES ($1, $2, $3)
      `;
      await db.query(query, [email, password, role]); 
      res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const query = {
        text: 'SELECT * FROM Users WHERE emailid = $1 AND password = $2',
        values: [email, password],
      };
  
      const result = await db.query(query);
      if (result.rows.length > 0) {
        const selectedOption = result.rows[0].selected_option;
        res.json({ success: true, selected_option: selectedOption });
      } else {
        res.status(401).json({ success: false, message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error signing in:', error);
      res.status(500).json({ success: false, message: 'An error occurred while signing in' });
    }
  });
  

app.get('/customer', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM customer');
      res.json(result.rows); 
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
app.get('/customerClients', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM customer_clients');
      res.json(result.rows); 
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
  
app.get('/customerProjects', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM customer_projects');
      res.json(result.rows); 
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/customersInprogress', async (req, res) => {
  try {
    const { companyName, location, numberOfEmployees, projectsDelivered, existingClients } = req.body;

    const insertQuery = `
      INSERT INTO customer_in (company_name, location, number_of_employees, projects_delivered, existing_clients)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await db.query(insertQuery, [companyName, location, numberOfEmployees, projectsDelivered, existingClients]);

    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/engineer' , async (req, res) => {
  try{
    const result = await db.query('SELECT * FROM engineer');
    res.json(result.rows);
  }catch (error){
    console.error('Error executing query' , error);
    res.status(500).json({error: 'Internal server error'});
  }
})
app.get('/engineerProjects' , async (req, res) => {
  try{
    const result = await db.query('SELECT * FROM engineer_projects');
    res.json(result.rows);
  }catch (error){
    console.error('Error executing query' , error);
    res.status(500).json({error: 'Internal server error'});
  }
})
app.post('/engineerInprogress', async (req, res) => {
  try {
    const { specialization, years, pastprojects, owork, location} = req.body;

    const insertQuery = `
      INSERT INTO engineer_in (specialization, years, pastProjects, openToWork, location)
      VALUES ($1, $2, $3, $4, $5)
    `;
    await db.query(insertQuery, [specialization, years, pastprojects, owork, location]);

    res.status(200).json({ message: 'Form data saved successfully!' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Domian Leader//
app.get('/domain', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM domainleader');
    res.json(result.rows); 
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/domainclients', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM domainleaders_clients');
    res.json(result.rows); 
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/domainprojects', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM domainleaders_projects');
    res.json(result.rows); 
  } catch (error) {
    console.error('Error executing query', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.get('/events', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM events');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
app.post('/events', async (req, res) => {
  try {
    const { title, start, end, all_day } = req.body;

    const insertQuery = `INSERT INTO events (title, start, end, all_day)
                         VALUES ($1, $2, $3, $4)`;
    await db.query(insertQuery, [title, start, end, all_day]);

    res.status(200).json({message: 'Events saved successfully'});
  } catch (error) {
    console.error('Error adding event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});





app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
