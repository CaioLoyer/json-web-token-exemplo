require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');
const crypto = require('./crypto');
var cookieParser = require('cookie-parser')

var corsOperation = {
   origin:"https://localhost:3000",
   methods: "GET,POST,PUT,DELETE",
   allowedHeaders:"Content-Type,Authorization",
   credentials: true
}

const express = require('express');
const { usuario } = require('./models');



const app = express();

app.set('view engine', 'ejs');

app.use(cors(corsOperation));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser()); 
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar", "/cadastrar", "/listar"] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/', async function(req, res){
  res.render("home")
})

app.get('/usuarios/cadastrar', async function(req, res){
  res.render('cadastrar');
})

app.post('/usuarios/cadastrar', async function(req, res){
  
  if(req.body.senha == req.body.confirmar){
    let usercrypto = req.body
    usercrypto.senha = crypto.encrypt(req.body.senha);
    await usuario.create(usercrypto);
    res.redirect('/usuarios/listar')
  } else {
    res.status(500).json({mensagem:"Erro nas Senhas"})
  }
})

app.get('/usuarios/listar', async function(req, res){
  try{
    var lista = await usuario.findAll();
    res.json(lista );
    
  }
    catch (err) {
      console.log(err);
      res.status(500).json({ message: 'erro'});
    }
  });



app.post('/logar', async (req, res) => {
  const user = await usuario.findOne ({ 
    where: { nome: req.body.nome, senha: crypto.encrypt(req.body.senha) 
    } });
  if(user) {
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 3003
    })
    return res.cookie('token', token, {httpOnly:true}).json({
      nome: user.nome,
      token: token,
    });
  }
  res.status(500).json({mensagem :"Login inválido"})
})
app.post('/deslogar', function(req, res) {
  res.cookie('token', null, {httpOnly: true});
  res.json({
    deslogar: true
  })
})

app.listen(4000, function() {
  console.log('App de Exemplo escutando na porta 4000!')
});