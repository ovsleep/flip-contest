var edge = require('edge');

var dbAccess = edge.func(`${__dirname}/lib/DBAccess.dll`)

dbAccess("Data Source=DESKTOP-8JUJ5KI\\SQLEXPRESS01;Initial Catalog=WideWorldImporters;Integrated Security=True;MultipleActiveResultSets=True;", function(error, result){
  if(error) throw error;
  console.log(result);
})
