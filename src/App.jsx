import { useState, useEffect, useRef } from "react";
import "./App.css";
import { loadImage, fetchData } from "./components/API";
import CardGrid from "./components/CardGrid";
import chooseRandom from "./components/ChooseRandom";
function App() {
  const [photos, setPhotos] = useState(null);
  const [easy, setEasy] = useState(false);
  const [photosLoaded, setPhotosLoaded] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [highscore, setHighScore] = useState(0);
  const [win, setWin] = useState(false);
  const [dogs, setDogs] = useState(0);
  const menu = useRef(null);
  //Onload, fetch dogs and store in state.
  useEffect(() => {
    let ignore = false;
    function displayDogs(data) {
      Promise.all(data.message.map((image) => loadImage(image)))
        .then(() => {
          if (!ignore) {
            setPhotosLoaded(true);
            setPhotos(data);
            setChosen(chooseRandom(data, []));
          }
        })
        .catch((err) => {
          setPhotosLoaded(false);
          console.log("failed to load images", err);
        });
    }

    function onDisplayError(err) {
      setPhotos(null);
      console.log(err);
    }

    fetchData().then(displayDogs).catch(onDisplayError);
    return () => {
      ignore = true;
    };
  }, [dogs]);

  function cardClicked(id) {
    const newClicked = [...clicked, id];

    let currentscore = score + 1;
    if (clicked.includes(id)) gameOver();
    else if (currentscore === photos.message.length) winGame();
    else {
      setClicked(newClicked);
      setScore((n) => n + 1);
      setChosen(chooseRandom(photos, newClicked));
    }
  }
  function winGame() {
    setWin(true);
    if (score > highscore) setHighScore(score);
    menu.current.showModal();
  }
  function gameOver() {
    setWin(false);
    if (score > highscore) setHighScore(score);
    menu.current.showModal();
  }
  function restart() {
    setToZero();
    setChosen(chooseRandom(photos, []));
    menu.current.close();
  }
  function newDogs() {
    setToZero();
    setPhotosLoaded(false);
    menu.current.close();
  }
  function setToZero() {
    setScore(0);
    setClicked([]);
    setWin(false);

    setDogs(dogs + 1);
  }
  function easyMode() {
    setEasy(!easy);
  }
  return (
    <div className="game">
      {photosLoaded && (
        <>
          <h1>Dog Memory Game</h1>
          <h2>Click on a Dog that has NOT been Clicked Yet</h2>
          <div className="options">
          <button onClick={newDogs}>New Dogs!</button>
          <button onClick={easyMode}>Easy Mode</button>
          </div>
          <h1>{score}</h1>
          <CardGrid
            photos={chosen}
            clicked={cardClicked}
            status={clicked}
            easyMode={easy}
          />
        </>
      )}
      {!photosLoaded && <h1>Loading Doggies...</h1>}

      {
        <dialog ref={menu}>
          <h3>{!win ? `That Dog's Already Clicked!` : `You Win!`}</h3>
          <p>Score:{score}</p>
          <p>Highest Score:{highscore}</p>
          <button onClick={restart}>Try again?</button>
          <br />
          <button onClick={newDogs}>New Dogs!</button>
        </dialog>
      }
    </div>
  );
}

export default App;
