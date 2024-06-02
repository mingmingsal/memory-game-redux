export function fetchData(){
    return new Promise(function(resolve,reject){{
      fetch('https://dog.ceo/api/breeds/image/random/20')
      .then(response => response.json())
      .then(data => resolve(data))
    }})
  }
  export  function loadImage (image) {
    return new Promise((resolve, reject) => {
      const loadImg = new Image()
      loadImg.src = image;
      loadImg.onload = () => resolve(image.url);

      loadImg.onerror = err => reject(err)
    })
  }
  

