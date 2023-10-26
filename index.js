require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const Person = require("./models/person");

app.use(cors());
app.use(express.static("dist"));

morgan.token("data", function getData(req) {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(":method :url :response-time :data"));

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/info", (request, response) => {
  const date = new Date();
  response.send(`<p>
    Phonebook has info for ${persons.length} people </p>
    <p>${date}
    </p>`);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((note) => {
    response.json(note);
  });
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  // const check = persons.map((person) =>
  //   person.name == body.name ? true : null
  // );
  // if (check.includes(true)) {
  //   return response.status(400).json({
  //     error: "name already exists in phonebook",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
