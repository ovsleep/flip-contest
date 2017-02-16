var edge = require('edge');

var convertJpg = edge.func(`${__dirname}/c#/Solution/ImgConverter/bin/Debug/ImgConverter.dll`)

convertJpg(`E:\\Proyectos\\Personal\\flip\\server\\uploads\\2921ec6e80501103499e17a6ac9380c41487221069639.jpeg`, function(error, result){
  if(error) throw error;
  console.log(result);
})
