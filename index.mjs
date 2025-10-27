import express from 'express';
const solarSystem = (await import('npm-solarsystem')).default;
import fetch from 'node-fetch';

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//root route
//this is a function declaration syntax style, so we can make it asynchronous
app.get('/', async (req, res) => {
   let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&per_page=50&orientation=horizontal&q=solar%20system";
   let response = await fetch(url);
   let data = await response.json()
   console.log(data);

   let random_num = Math.floor(Math.random() * data.hits.length);
   console.log(random_num);

   let randomImage = data.hits[random_num].webformatURL;
   res.render('home.ejs', {randomImage})
});

//POD route
app.get('/Nasa_POD', (req, res) => {
   res.render('nasa_pod.ejs')
});

//planet route (template)
app.get('/planet', (req, res) => {
   let planet_name = req.query.planetName;

   let planetInfo = solarSystem[`get${planet_name}`]();

   res.render('planetInfo.ejs', {planetInfo, planet_name})
});

//mercury route
// app.get('/mercury', (req, res) => {
//    let planetInfo = solarSystem.getMercury();
//    console.log(planetInfo)
//    res.render('mercury.ejs', {planetInfo})
// });

app.listen(3000, () => {
   console.log('server started');
});