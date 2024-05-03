import './Cardgrid.css';

const CardGrid = ({photos, clicked}) => {
  const link = 'https://images.dog.ceo/breeds/'
  console.log(photos);
  return (
    <div className='cardGrid'>
        {
        photos.map(image =>{
            const id = image.slice(link.length)
            return <img className='card' src={image} key={id} onClick={() => clicked(image)}></img>
          })
    }
    </div>
  )
}

export default CardGrid