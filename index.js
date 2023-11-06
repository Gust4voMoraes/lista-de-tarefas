const express = require("express");
const { path } = require("express/lib/application");
const pathh = require("path");
var bodyParser = require("body-parser");
const { type } = require("os");

const app = express();

// support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use("/public", express.static(pathh.join(__dirname,"public")));
app.set("views", pathh.join(__dirname, "/views"));

var tarefas = ["Arrumar o quarto","Comprar pão"]

app.post("/",(req,res)=>{
    tarefas.push(req.body.tarefa)
    res.render("index",{tarefasList:tarefas});
});

app.get("/",(req,res)=>{
    res.render("index",{tarefasList:tarefas});
});

app.get("/deletar/:id",(req,res)=>{
    tarefas = tarefas.filter(function(val,index){
        if(index != req.params.id){
            return val;
        }
    })
    res.render("index",{tarefasList:tarefas});
})

app.listen(5000,()=>{
    console.log("server rodando");
})