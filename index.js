const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./databse/database");
const Pergunta = require("./databse/Pergunta");
const Resposta = require("./databse/resposta");

// database
connection
  .authenticate()
  .then(() => {
    console.log("Conexão feita com sucesso!");
  })
  .catch((error) => {
    console.log("Erro ao conectar: " + error);
  });


app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.get("/", async (req, res) => {
    // Busca todas as perguntas do banco de dados
    Pergunta.findAll({raw: true, order: [['id', 'DESC']]}).then(perguntas => {
        // Renderiza a tabela no HTML com as perguntas    
        res.render("index", {
            perguntas: perguntas
        });
    }).catch((error) => {
        console.error("Erro ao buscar perguntas: ", error);
});
});

app.get("/perguntar", async (req, res) => {
    // Renderiza a tabela no HTML
    res.render("perguntar");
});

app.post("/salvarpergunta", async (req, res) => {
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
  // Insere a pergunta no banco de dados
  Pergunta.create({  
    titulo: titulo,
    descricao: descricao
  }).then(() => {
    res.redirect("/");
  }).catch((error) => {
    console.error("Erro ao salvar pergunta: ", error);
    res.status(500).send("Erro ao salvar pergunta");
  });
});

app.get("/pergunta/:id",(req, res) => {
  var id = req.params.id;
  Pergunta.findOne({
    where: {id: id}
  }).then(pergunta => {
    if (pergunta != undefined) {
      Resposta.findAll({
        where: {perguntaId: pergunta.id},
        order: [['id', 'DESC']]
      }).then(respostas => {
        res.render("pergunta", {
          pergunta: pergunta,
          respostas: respostas
        });
      }).catch((error) => {
        console.error("Erro ao buscar respostas: ", error);
        res.status(500).send("Erro ao buscar respostas");
      });
    } else {
      res.redirect("/");
    }
    });
});

app.post("/responder", (req, res) => {
  var corpo = req.body.corpo;  
  var perguntaId = req.body.pergunta;
  Resposta.create({
    corpo: corpo,
    perguntaId: perguntaId
  }).then(() => {
    res.redirect("/pergunta/" + perguntaId);
  }).catch((error) => {
    console.error("Erro ao salvar resposta: ", error);
    res.status(500).send("Erro ao salvar resposta");
  });
}
);

app.listen(3000, () => {
  console.log("App rodando em http://localhost:3000");
});
