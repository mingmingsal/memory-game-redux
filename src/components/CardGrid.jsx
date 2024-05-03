import './Cardgrid.css';

const CardGrid = ({photos, clicked, status}) => {
  const link = 'https://images.dog.ceo/breeds/'
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

export default CardGrid