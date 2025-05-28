const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.get("/", async (req, res) => {
    // Renderiza a tabela no HTML
    res.render("index");
});

app.get("/perguntar", async (req, res) => {
    // Renderiza a tabela no HTML
    res.render("perguntar");
});

app.post("/salvarpergunta", async (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  res.send(`Formulario recebido!! <br>Titulo: ${titulo} <br>Descricao: ${descricao}`);
});

app.listen(3000, () => {
  console.log("App rodando em http://localhost:3000");
});
