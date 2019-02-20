const express = require("express");

const app = express();

//set a simple route. Put the route in a different folder. Now it is for testing purpose
app.get("/", (req, res) => res.send("Hello"));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
