const fs = require('fs');
const express = require('express');
const path = require('path');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./Develop/public'));

app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, './Develop/public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, './Develop/public/notes.html'))
);


app.get('/api/notes', (req, res) =>{

    fs.readFile('./Develop/db/db.json', 'utf8', (error, data) => {
        
        error ? console.error(error) : console.log(data);
        res.json(JSON.parse(data));

    }
    );
}
);

app.post('/api/notes', (req, res) => {

  fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {

      
      var notes = JSON.parse(data);
      req.body.id = notes.length + 1
      notes.push(req.body); 

      fs.writeFile('./Develop/db/db.json', JSON.stringify(notes), (err) => {
          
          res.json(req.body);
      });
  });

});

app.delete('/api/notes/:id', (req, res) => {

  fs.readFile('./Develop/db/db.json', 'utf8', (err, data) => {

      var notes = JSON.parse(data);
      for (let i = 0; i<notes.length; i++) {
        if(notes[i].id == req.params.id) {
          notes.splice(i, 1)
        }
      }

      fs.writeFile('./Develop/db/db.json', JSON.stringify(notes), (err) => {
          
          res.json(req.body);
      });
  });
});


app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, './Develop/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);