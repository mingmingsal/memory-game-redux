import { useState, useEffect } from 'react'
import './App.css'
import { loadImage, fetchData } from './components/API';
import CardGrid from './components/CardGrid';
function App() {
  const [photos, setPhotos] = useState(null);
  const [photosLoaded, setPhotosLoaded] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  useEffect(()=>{
    function displayDogs(data){
      console.log(data);
      Promise.all(data.message.map(image =>loadImage(image)))
      .then(()=>{
        setPhotosLoaded(true); 
        setPhotos(data);
        chooseRandom(data);
      })
      .catch(err => {
        setPhotosLoaded(false);
        console.log('failed to load images',  err)});
    }

    function onDisplayError(err){
      setPhotos(null);
      console.log(err);
    }
    
    fetchData().then(displayDogs).catch(onDisplayError);
  },[])

  function chooseRandom(data){
    
    let available = [...data.message];
    const photosPicked = [];
    const notPicked = available.filter(e => {
      return clicked.indexOf(e) > -1;
    })
    for(let i =0;i<5;i++){
      let random = Math.floor(Math.random() * available.length);
      photosPicked.push(available[random]);
      available.splice(random,1);
    }
    setChosen(photosPicked);
  }

  function cardClicked(id){
    if(clicked.includes(id)) gameOver();
    else {
      setClicked([...clicked, id]);
      setScore(n => n+1);
      chooseRandom(photos);
    }
  }

function gameOver(){
    setScore(0);
    setClicked([]);
    chooseRandom(photos);
}
return (
  <>
    <h1>{score}</h1>
    {
      photosLoaded === true && <CardGrid photos={chosen} clicked={cardClicked}/>
    }
  </>
)
}

export default App
