import { useState, useEffect, useRef } from 'react'
import './App.css'
import { loadImage, fetchData } from './components/API';
import CardGrid from './components/CardGrid';
import chooseRandom from './components/ChooseRandom';
function App() {
  const [photos, setPhotos] = useState(null);
  const [photosLoaded, setPhotosLoaded] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [win, setWin] = useState(false);
  const menu = useRef(null);
  //Onload, fetch dogs and store in state.
  useEffect(() => {
    function displayDogs(data) {
      Promise.all(data.message.map(image => loadImage(image)))
        .then(() => {
          setPhotosLoaded(true);
          setPhotos(data);
          setChosen(chooseRandom(data, clicked));
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

  

  function cardClicked(id) {
    const newClicked = [...clicked, id];
    
    let currentscore = score + 1;
    if (clicked.includes(id)) gameOver();
    else if (currentscore === photos.message.length) winGame();
    else {
      setClicked(newClicked);
      setScore(n => n + 1);
      setChosen(chooseRandom(photos, newClicked));
    }
  }
  function winGame() {
    console.log('win')
    setWin(true);
  }
  function gameOver() {
    console.log('lose')
    setScore(0);
    setClicked([]);
    setChosen(chooseRandom(photos,[]));

  }
  function restart(){
    setScore(0);
    setClicked([]);
    setChosen(chooseRandom(photos,[]));
    setWin(false);
  }
  return (
    <>
      <h1>{score}</h1>
      {
        photosLoaded && <CardGrid photos={chosen} clicked={cardClicked} status={clicked} />
      }
      {
        <dialog open={win} >
          <p>you win!</p>
          <button ref={menu} onClick={restart}>Try again?</button>
        </dialog>
      }
    </>
  )
}

export default App
