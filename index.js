const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
var reqCont = 0;

function hasProject(req, res, next){
  const { project } = req.body;

  if(!project){
    return res.status(400).json({ erro: "Project is required" })
  }
  req.project = project
  return next();
}

function hasProjectId(req,res,next){
  const { id } = req.params;
  const project = projects.find( project => project['id'] === id );


  if(!project){
    return res.status(400).json({ erro: "Project is required" })
  }

  req.project = project
  req.projectId = id
  return next();

}

function hasTitle(req,res,next){
  const { title } = req.body;
  if(!title){
    return res.status(400).json({ error: 'Null title' })
  }

  req.title = title;

  return next();
}

server.use((req,res,next) => {
  reqCont++;

  console.log(reqCont);
  return next();
});

server.post('/projects', hasProject, (req, res) => {
  projects.push(req.project)
  return res.json(projects);
})

server.get('/projects', (req, res) => {
  return res.json(projects);
  
})

server.put('/projects/:id', hasProjectId, hasProject, (req, res) => {

  const index = projects.findIndex( (project,i) => {
    return project.id === req.projectId;
  } );

  projects[index] = req.project;

  return res.json(projects);
})

server.delete('/projects/:id', hasProjectId, (req,res) => {
  const index = projects.findIndex( (project,i) => {
    return project.id === req.projectId;
  } );

  projects.splice(index, 1);

  return res.send('Project has been deleted')
})

server.post('/projects/:id/tasks', hasTitle, hasProjectId, (req,res)=> {
  const index = projects.findIndex( (project,i) => {
    return project.id === req.projectId;
  } );
  const project = req.project
  project.tasks.push(req.title)

  projects[index] = project

  return res.json(projects)
})

server.listen(3000);