const mongoose = require('mongoose');
//tell mongoose to use es6 implementation of promises
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/testmemento'); 
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ',error);
    });
