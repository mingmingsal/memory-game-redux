import './Cardgrid.css';

const CardGrid = ({photos, clicked, status}) => {
  const link = 'https://images.dog.ceo/breeds/'
  fisherYatesShuffle(photos);
  return (
    <div className='cardGrid'>
        {
        photos.map(image =>{
            const id = image.slice(link.length)
            const stat = status.includes(image);
            return <img className='card' data-clicked={stat} src={image}  key={id} onClick={() => clicked(image)}></img>
          })
    }
    </div>
  )
}

function fisherYatesShuffle(array){
  let currentIndex = array.length;

  while (currentIndex != 0) {


    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}
export default CardGrid