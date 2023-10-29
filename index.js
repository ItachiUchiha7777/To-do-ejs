const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;



let tasks = [];
const tasksFile = 'tasks.json';
tasks = JSON.parse(fs.readFileSync(tasksFile));

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index.ejs', { tasks });
});

app.post('/', (req, res) => {
  const taskin = req.body.task;
  tasks.push(taskin);
  console.log(tasks);

  const existingTasks = JSON.parse(fs.readFileSync(tasksFile));

  // Add the new task to the existing tasks
  existingTasks.push(taskin);

  // Save the updated tasks to the JSON file
  fs.writeFileSync(tasksFile, JSON.stringify(existingTasks));


  res.render('index.ejs', { tasks:tasks });

});
app.post('/clear', (req, res) => {
  const taskin = req.body.task;
  tasks.push(taskin);

  const existingTasks = []

  // Add the new task to the existing tasks
  

  // Save the updated tasks to the JSON file
  fs.writeFileSync(tasksFile, JSON.stringify(existingTasks));
console.log("heheh")
    res.redirect('/');
    res.reload()
    
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});