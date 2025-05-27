const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
// Rota principal renderiza a tabela formatada
app.get("/", async (req, res) => {
    // Renderiza a tabela no HTML
    res.render("index");
});

app.get("/perguntar", async (req, res) => {
    // Renderiza a tabela no HTML
    res.render("perguntar");
});

app.listen(3000, () => {
  console.log("App rodando em http://localhost:3000");
});
