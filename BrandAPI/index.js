const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',async(req,res)=>{
    try{
        res.json('WELCOME TO HR API');
    }catch(err){
        res.status(500).json({Error:err.message});
    }
});

app.get('/branches',async(req,res)=>{
    try{
        const result = await pool.query('select * from branches');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});

app.get('/categories',async(req,res)=>{
    try{
        const result = await pool.query('select * from categories');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});


app.get('/customers',async(req,res)=>{
    try{
        const result = await pool.query('select * from customers');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});

app.get('/employees',async(req,res)=>{
    try{
        const result = await pool.query('select * from employees');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});

app.get('/inventory',async(req,res)=>{
    try{
        const result = await pool.query('select * from inventory');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});

app.get('/order_items',async(req,res)=>{
    try{
        const result = await pool.query('select * from order_items');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});

app.get('/orders',async(req,res)=>{
    try{
        const result = await pool.query('select * from orders');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});

app.get('/payments',async(req,res)=>{
    try{
        const result = await pool.query('select * from payments');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});

app.get('/products',async(req,res)=>{
    try{
        const result = await pool.query('select * from products');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});


app.get('/suppliers',async(req,res)=>{
    try{
        const result = await pool.query('select * from suppliers');
        res.json(result.rows);
    }catch(err)
    {
        res.status(500).json({Error:err.message});
    }
});

app.get('/api/daily-orders', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT TO_CHAR(order_date, 'YYYY-MM-DD') AS order_day,
             COUNT(*) AS order_count
      FROM orders
      GROUP BY order_day
      ORDER BY order_day
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get('/report', async (req, res) => {
  try {
    const totalOrdersQuery = await pool.query('SELECT COUNT(*) FROM orders');
    const totalCustomersQuery = await pool.query('SELECT COUNT(*) FROM customers');
    const statusBreakdownQuery = await pool.query(`
      SELECT status, COUNT(*) 
      FROM orders 
      GROUP BY status
    `);

    res.json({
      totalOrders: parseInt(totalOrdersQuery.rows[0].count),
      totalCustomers: parseInt(totalCustomersQuery.rows[0].count),
      ordersByStatus: statusBreakdownQuery.rows.map(row => ({
        status: row.status,
        count: parseInt(row.count)
      }))
    });

  } catch (err) {
    console.error("❌ Error in /report route:", err);  // Log full error to terminal
    res.status(500).json({ error: err.message || "Unknown error" });  // Send detailed error back to frontend
  }
});


app.post('/customers', async (req, res) => {
  const { full_name, email, phone, address } = req.body;  // match your table fields

  try {
    const result = await pool.query(
      'INSERT INTO customers (full_name, email, phone, address) VALUES ($1, $2, $3, $4) RETURNING *',
      [full_name, email, phone, address]
    );
    res.status(201).json(result.rows[0]); // Send back the inserted row
  } catch (err) {
    console.error('Error inserting customer:', err.message);
    res.status(500).json({ error: err.message });
  }
});


app.post('/branches', async (req, res) => {
  const { branch_id, name, location, address, phone } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO branches (branch_id, name, location, address, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [branch_id, name, location, address, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting branch:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/categories', async (req, res) => {
  const { category_id, name, description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO categories (category_id, name, description) VALUES ($1, $2, $3) RETURNING *',
      [category_id, name, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting category:', err.message);
    res.status(500).json({ error: err.message });
  }
});


app.post('/employees', async (req, res) => {
  const { employee_id, name, email, branch_id, phone, position } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO employees (employee_id, name, email, branch_id, phone, position) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [employee_id, name, email, branch_id, phone, position]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting employee:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/inventory', async (req, res) => {
  const { inventory_id, product_id, quantity_in_stock } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO inventory (inventory_id, product_id, quantity_in_stock) VALUES ($1, $2, $3) RETURNING *',
      [inventory_id, product_id, quantity_in_stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting inventory record:', err.message);
    res.status(500).json({ error: err.message });
  }
});


app.post('/order_items', async (req, res) => {
  const { order_id, order_item_id, product_id, quantity, unit_price } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO order_items (order_id, order_item_id, product_id, quantity, unit_price)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [order_id, order_item_id, product_id, quantity, unit_price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting order item:', err.message);
    res.status(500).json({ error: err.message });
  }
});


app.post('/orders', async (req, res) => {
  const { order_id, customer_id, status, branch_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO orders (order_id, customer_id, status, branch_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [order_id, customer_id, status, branch_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting order:', err.message);
    res.status(500).json({ error: err.message });
  }
});


app.post('/payments', async (req, res) => {
  const { payment_id, order_id, amount, payment_method } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO payments (payment_id, order_id, amount, payment_method)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [payment_id, order_id, amount, payment_method]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting payment:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.post('/products', async (req, res) => {
  const { product_id, name, description, category_id, price, supplier_id } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO products (product_id, name, description, category_id, price, supplier_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [product_id, name, description, category_id, price, supplier_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting product:', err.message);
    res.status(500).json({ error: err.message });
  }
});


app.post('/suppliers', async (req, res) => {
  const { supplier_id, name, contact_person, phone, address } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO suppliers (supplier_id, name, contact_person, phone, address)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [supplier_id, name, contact_person, phone, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting supplier:', err.message);
    res.status(500).json({ error: err.message });
  }
});





const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected Succefully....on PORT ${PORT}`);
});