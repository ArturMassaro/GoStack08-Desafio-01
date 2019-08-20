const express = require('express');

const server = express();

server.use(express.json());

const projects = [];


function hasProject(req, res, next){
  const { project } = req.body;

  if(!project){
    return res.status(400).json({ erro: "Project is required" })
  }
  req.project = project
  return next();
}

server.post('/projects', hasProject, (req, res) => {
  projects.push(req.project)
  return res.json(projects);
})

server.get('/projects', (req, res) => {
  return res.json(projects);
  
})

server.put('/projects', hasProject, (req, res) => {
  // Aqui deve ser criado a modificaçao de um projeto 

  // Se atentar as middlewares propostas no desafio !

  
})


server.listen(3000);