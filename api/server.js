var mongoose = require('mongoose');

const app = require('./app');

//Connection to a database
//mongodb+srv://Nathalia:admin@cluster0-sxjux.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb://localhost/memento', { useNewUrlParser: true } )
  .then(db  =>  console.log('BD is connected'))
  .catch(err =>  console.log(err));

//Connection port

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is up and running on port number http://localhost:${port}`);
});