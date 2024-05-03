export default function chooseRandom(data, curClick) {
    const size = 10;
    let available = [...data.message];
    const photosPicked = [];
    const photosClicked = [...curClick]
    const notPicked = available.filter(e => {
      return !photosClicked.includes(e);
    })
    
    if (notPicked.length >= size) {
      let r = 0;
      if(photosClicked.length>=size) r = Math.floor(Math.random() * size);
      else r = Math.floor(Math.random() * photosClicked.length)

      for (let i = 0; i < size-r; i++) {
        let random = Math.floor(Math.random() * notPicked.length);
        photosPicked.push(notPicked[random]);
        notPicked.splice(random, 1);  
      }
      for (let i = 0; i < r; i++) {
        let random = Math.floor(Math.random() * photosClicked.length);
        photosPicked.push(photosClicked[random]);
        photosClicked.splice(random, 1);
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

    return(photosPicked);
  }