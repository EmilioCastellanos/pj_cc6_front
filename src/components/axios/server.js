const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'speedyBox',
  password: 'papapa123',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Ruta para obtener Informacion de paquete
app.get('/api/data/:trnumber', async (req, res) => {
  try {
    const trnumber = req.params.trnumber;
    const result = await pool.query('SELECT * FROM envios WHERE no_orden=$1', [trnumber]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

app.get('/api/users/:nombre_usuario', async (req, res) => {
  try {
    const nombre_usuario = req.params.nombre_usuario;
    const result = await pool.query('SELECT * FROM usuario WHERE correo=$1', [nombre_usuario]);
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

app.post('/api/newUser', async (req, res) => {
  try {
    const { new_no_orden, direccion, peso, correo_usuario, codigoPostal } = req.body;
    const result = await pool.query(
      'INSERT INTO envios (no_orden, direccion, peso, status, correo_usuario, codigo_postal_departamento) VALUES ($1, $2, $3, \'orden_nueva\', $4, $5);',
      [new_no_orden, direccion, peso, correo_usuario, codigoPostal]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

app.post('/api/updateStatus', async (req, res) => {
  try {
    const { newStatus, orderNo } = req.body;
    const result = await pool.query(
      'UPDATE envios SET status = $1 WHERE no_orden = $2;',
      [newStatus, orderNo]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

app.get('/api/disponibilidad', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM departamento');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
