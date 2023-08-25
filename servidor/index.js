// JWT
require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var { expressjwt: expressJWT } = require("express-jwt");
const cors = require('cors');

var cookieParser = require('cookie-parser')

const express = require('express');
const { usuario } = require('./models');

const app = express();

app.set('view engine', 'ejs');

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

app.use(cookieParser());//
app.use(
  expressJWT({
    secret: process.env.SECRET,
    algorithms: ["HS256"],//usa pra fazer criptografia
    getToken: req => req.cookies.token
  }).unless({ path: ["/autenticar", "/logar", "/deslogar","/usuarios","/usuario/cadastrar"] })
);

app.get('/autenticar', async function(req, res){
  res.render('autenticar');
})

app.get('/usuarios', async function(req, res){
  res.render('usuarios');
})

app.get('/', async function(req, res){
  res.render('home')
})

app.post('/logar', (req, res) => {
  if (req.body.usuario == "caio" && req.body.senha == "777"){
    let id ="1";

    const token = jwt.sign({id }, process.env.SECRET,{ 
      expiresIn:3003
    })
    res.cookie('token',token, {httpOnly:true});
     return res.json({
      usuario: req.body.usuario,
      senha : req.body.senha,
      token: token
     })
  }
 res.status(500).json({mensagem :"Erro"})
})

app.get('/usuario/cadastrar', async function(req, res){
  res.render('usuario/cadastrar');
})

app.post('/usuario/cadastrar', (req, res) => {
  try {
     usuario.create(req.body);
    res.redirect('/usuarios')
} catch (err) {
    console.error(err);
    res.status(500).json({mensagem :"that words are not in my grimore of origin"})
}
  
})


app.post('/deslogar', function(req, res) { //quando é para deslogar deleta o TOKEN
  res.cookie('token', null, {httpOnly:true});
   res.json({
   deslogado:true
   })
})

app.listen(3000, function() {
  console.log('App funcionando na porta 3000!')
});