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





const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Connected Succefully....on PORT ${PORT}`);
});