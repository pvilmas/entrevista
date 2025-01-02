const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

//ROUTES

// get all vets
app.get("/veterinarias", async(req, res) => {
    try {
        const all_vets = await pool.query("SELECT * FROM veterinaria");
        res.json(all_vets.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.get("/stock/:vet_id", async(req, res) => {
    try {
        const all_stock = await pool.query(
            "SELECT name, serial_number, quantity, expires FROM producto, stock WHERE available = TRUE AND vet_id = $1", 
            [vet_id]
        );
        res.json(all_stock.rows);
    } catch (err) {
        console.error(err.message);
    }
})

app.post("/venta/:vet_id", async(req, res) => {
    try {
        const { sale } = req.body;
        const newRequest = await pool.query(
            "INSERT INTO ventas (quantity) VALUES($1) RETURNING *",
            [sale]
        );
        res.json(newRequest);
    } catch (err) {
        console.error(err.message);
    }
})

app.get("/ventas", async(req, res) => {
    try {
        const sales = await pool.query(
            "SELECT client_id, product_name, product_serial_number, quantity FROM ventas"
        );
        res.json(sales.rows);
    } catch (err) {
        console.error(err.message);
    }
})

// //create a todo
// app.post("/todos", async(req, res) => {
//     try {
//         const { description } = req.body;
//         const newTodo = await pool.query(
//             "INSERT INTO todo (description) VALUES($1) RETURNING *",
//             [description]
//         );

//         res.json(newTodo);
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// //get all todos

// app.get("/todos", async(req, res) =>{
//     try {
//         const allTodos = await pool.query("SELECT * FROM todo");
//         res.json(allTodos.rows);
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// //get a todo

// app.get("/todos/:id", async(req, res) =>{
//     try {
//         const { id } = req.params;
//         const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

//         res.json(todo.rows[0]);
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// //update a todo

// app.put("/todos/:id", async(req, res) => {
//     try {
//         const { id } = req.params;
//         const { description } = req.body;
//         const updateTodo = await pool.query(
//             "UPDATE todo SET description = $1 WHERE todo_id = $2",
//             [description, id]
//         );
//         res.json("Todo was updated :)");
//     } catch (err) {
//         console.error(err.message);
//     }
// })

// //delete a todo

// app.delete("/todos/:id", async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
//         res.json("Todo was deleted successfully");
//     } catch (err) {
//         console.error(err.message);
//     }
// })

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});