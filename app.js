// Import the express library
import express from "express";

// Create an express app
const app = express();

// Export the app
export default app;
import employees from "#db/employees";

// get/send Hello Message
app.route("/").get((req, res) => {
  res.send("Hello employees!");
});

app.get("/employees", (req, res) => {
  res.send(employees);
});
//get a random employee
app.get("/employees/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});
//get employee by id
app.get("/employees/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: "Invalid employee id" });
  }

  const employee = employees.find((e) => e.id === id);
  if (!employee) {
    return res.status(404).json({ error: "Employee not found" });
  }

  return res.json(employee);
});
