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
  const [win, setWin] = useState(false);

  //Onload, fetch dogs and store in state.
  useEffect(() => {
    function displayDogs(data) {
      Promise.all(data.message.map(image => loadImage(image)))
        .then(() => {
          setPhotosLoaded(true);
          setPhotos(data);
          chooseRandom(data, clicked);
        })
        .catch(err => {
          setPhotosLoaded(false);
          console.log('failed to load images', err)
        });
    }

    function onDisplayError(err) {
      setPhotos(null);
      console.log(err);
    }

    fetchData().then(displayDogs).catch(onDisplayError);
  }, [])

  function chooseRandom(data, curClick) {
    console.table(curClick);
    const size = 5;
    let available = [...data.message];
    const photosPicked = [];
    const photosClicked = [...curClick]
    //console.log(photosClicked);
    const notPicked = available.filter(e => {
      return !photosClicked.includes(e);
    })
    if (notPicked.length >= size) {
      for (let i = 0; i < size; i++) {
        let random = Math.floor(Math.random() * notPicked.length);
        photosPicked.push(notPicked[random]);
        notPicked.splice(random, 1);  
      }
    }
    else {
      const l = notPicked.length;
      for (let i = 0; i < l; i++) {
        let random = Math.floor(Math.random() * notPicked.length);
        photosPicked.push(notPicked[random]);
        notPicked.splice(random, 1);
      }
      for (let i = 0; i < size - l; i++) {
        let random = Math.floor(Math.random() * photosClicked.length);
        photosPicked.push(photosClicked[random]);
        photosClicked.splice(random, 1);
      }
    }

    setChosen(photosPicked);
    console.table(photosPicked);
  }

  function cardClicked(id) {
    const newClicked = [...clicked, id];
    
    let currentscore = score + 1;
    if (clicked.includes(id)) gameOver();
    else if (currentscore === photos.message.length) winGame();
    else {
      setClicked(newClicked);
      setScore(n => n + 1);
      chooseRandom(photos, newClicked);
    }
  }
  function winGame() {
    console.log('win')
    setWin(true);
  }
  function gameOver() {
    console.log('lose')
    setScore(0);
    setClicked([], chooseRandom(photos));

  }
  return (
    <>
      <h1>{score}</h1>
      {
        photosLoaded && <CardGrid photos={chosen} clicked={cardClicked} status={clicked} />
      }
      {
        win &&
        <dialog>
          <h1>you win!</h1>
          <button>Try again?</button>
        </dialog>
      }
    </>
  )
}

export default App
