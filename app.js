/**
 * Inports
 */
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Carregando express para execução na variavél app
const app = express();

//Config JSON response (Configurando express para receber dados JSON)
app.use(express.json());

// Models
const User = require('./models/User');

//Helpers
const checkToken = require('./helpers/checkToken');

//Rotas
//Open Route - Public Route - Rota Publica
app.get('/', (req, res) => {
    res.status(200).json({ msg: 'Bem vindo a nosaa API! '})
});

// Privare Route
app.get("/user/:id", checkToken, async (req, res)=> {
    const id = req.params.id;
    //check if uder exists
    const user = await User.findById(id, '-password');

    if(!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
    }

    res.status(200).json({ user })

})


// Register User
app.post('/auth/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body
    //Validations
    if (!name){
        return res.status(422).json({ msg: 'O nome é obrigatório! '});
    }
    if (!email){
        return res.status(422).json({ msg: 'E-mail é obrigatório! '});
    }
    if (!password){
        return res.status(422).json({ msg: 'O password e é obrigatório! '});
    }
    if (password !== confirmpassword){
        return res.status(422).json({ msg: 'As senhas não conferem '});
    }

    //Check if user exists
    const userExists = await User.findOne({email: email});
    if(userExists) {
        return res.status(422).json({ msg: 'Por favor, utilize outro email '});
    }

    //Create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
        name,
        email,
        password: passwordHash
    });

    try {

        await user.save()
        res.status(201).json({ msg: 'Usuário criado com sucesso!' })

    } catch(error) {
        console.log(error)
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente mais tarde novamente!'});
    }

})

// Login User
app.use("/auth/login", async (req, res)=> {
    
    const { email, password } = req.body
    
    //Validations
    if (!email){
        return res.status(422).json({ msg: 'E-mail é obrigatório! '});
    }
    if (!password){
        return res.status(422).json({ msg: 'O password e é obrigatório! '});
    }

    // Check if user exists
    const user = await User.findOne({email: email});
    if (!user){
        return res.status(404).json({ msg: 'Usuário não encontrado '});
    }

    //Check if password match
    const checkPassword = await bcrypt.compare(password, user.password);
    
    if (!checkPassword){
        return res.status(422).json({ msg: 'Senha inválida! '});
    }

    try {

        const secret = process.env.SECRET

        const token = jwt.sign(
            {
                id: user._id,
            },
            secret,
        );

        res.status(200).json({ msg: 'Autenticação realizada com sucesso! ', token });

    } catch(error) {
        console.log(error)
        res.status(500).json({msg: 'Aconteceu um erro no servidor, tente mais tarde novamente!'});
    }





})

//Credencials
const urlDB = process.env.URL_DB
const dbName = process.env.DB_NAME
const port = process.env.PORT_APLICATION

mongoose
    .connect(urlDB + dbName)
    .then(()=> {
        app.listen(port)
        console.log('Conectado ao Banco de dados!')
        
    })
    .catch((err)=> console.log(err))
