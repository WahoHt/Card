const buttonQuery = document.getElementsByClassName('buttonQuery')[0]
const inputQuery = document.getElementsByClassName('inputQuery')[0]
const cardsBlock = document.getElementsByClassName('cardsBlock')[0]
const urlImage = "https://image.tmdb.org/t/p"
const urlImageSize = "/w300"
const queryFilmDefault = '&query=War'

let queryFilm ='&query='

<<<<<<< HEAD
async function getData(nameFilm) {
  const { results } = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=f4ecb1fb8bfb1422c9eb54f8bf56eb52${
      nameFilm ? queryFilm + nameFilm : queryFilmDefault}`
  ).then((response) => response.json())

  const moonPhase = await Promise.all(
=======
async function getData() {
  const { results } = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=f4ecb1fb8bfb1422c9eb54f8bf56eb52${
      inputQuery.value ? queryFilm + inputQuery.value : queryFilmDefault}`
  ).then((response) => response.json())

  const dataApiTwo = await Promise.all(
>>>>>>> 96728ddd984655c918b105686f7108fdbfda4ead
    results.map((elemFilm) => {
      const timeFilm = elemFilm.release_date.replace(/[^0-9]/g, "");
      return fetch(
        `https://api.farmsense.net/v1/moonphases/?d=${timeFilm}`
      ).then((r) => r.json()).then(([res]) => ({ ...elemFilm, ...res })).catch((error)=>{alert('Status Error: ',error)})
    })
  );

<<<<<<< HEAD
  moonPhase.forEach((elemFilm) => {
=======
  dataApiTwo.forEach((elemFilm) => {
>>>>>>> 96728ddd984655c918b105686f7108fdbfda4ead
    setData(elemFilm)
  });
}

function setData(elemFilm) {
  const cardImage = document.createElement('img')
  const cardTime = document.createElement('p')
  cardTime.setAttribute('class','cardTime')
  const cardName = document.createElement('p')
  cardName.setAttribute('class','cardName')
  const card = document.createElement('div')
  card.setAttribute('class','card')
  const cardMoonPhase = document.createElement('p')
  cardMoonPhase.setAttribute('class','cardPhase')
  if(elemFilm.poster_path){
    cardMoonPhase.append('Phase: ' + elemFilm.Phase)
    cardName.append('Name: ' + elemFilm.original_title)
    card.append(cardName)
    cardImage.setAttribute('src',`${urlImage + urlImageSize + elemFilm.poster_path}`)
    card.append(cardImage)
    cardTime.append('Release: ' + elemFilm.release_date)
    card.append(cardTime)
    card.append(cardMoonPhase)
    cardsBlock.append(card)
  }
}
buttonQuery.addEventListener('click',function(event){
    if(event){
        cardsBlock.innerHTML = ''
<<<<<<< HEAD
        const nameFilm = inputQuery.value
        getData(nameFilm)
=======
        getData()
>>>>>>> 96728ddd984655c918b105686f7108fdbfda4ead
    }
})

getData()