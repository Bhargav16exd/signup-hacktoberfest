  const PORT = xyz; //your port ;

  const app = require('./app.js');

  app.listen(PORT,()=>{

     app.on('error', (err)=>{
         console.log('ERROR:',err)
    })
    console.log('Server IS UP');
    
  })
