const buttonQuery = document.getElementsByClassName('buttonQuery')[0]
const inputQuery = document.getElementsByClassName('inputQuery')[0]
const cardsBlock = document.getElementsByClassName('cardsBlock')[0]
const urlImage = "https://image.tmdb.org/t/p"
const urlImageSize = "/w300"
const urlMoonPhase = `http://api.farmsense.net/v1/moonphases/?d=`
const queryFilmDefault = '&query=War'

let queryFilm ='&query='

function getDataCard(){
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=f4ecb1fb8bfb1422c9eb54f8bf56eb52${
        inputQuery.value ? queryFilm + inputQuery.value : queryFilmDefault}`)
        .then((response) => {
            if (response.status !== 200) {
                console.log('Looks like there was a problem');
                console.log(`Status Code: ${response.status}`);
                return;
            }
            return response.json();
        })
        .then(( { results } )=>{
            setDataCard(results)
        })
        .catch((Error)=>{
            console.log(Error)
        })
}

function setDataCard(results){
    results.forEach(elem => {
        const cardImage = document.createElement('img')
        const cardTime = document.createElement('div')
        cardTime.setAttribute('class','cardTime')
        const cardName = document.createElement('div')
        cardName.setAttribute('class','cardName')
        const card = document.createElement('div')
        card.setAttribute('class','card')
        const timeFilm = elem.release_date.replace(/[^0-9]/g, '')
        getDataMoonPhase(timeFilm,card)
        if(elem.poster_path){
            cardName.append('Name: ' + elem.original_title)
            card.append(cardName)
            cardImage.setAttribute('src',`${urlImage + urlImageSize + elem.poster_path}`)
            card.append(cardImage)
            cardTime.append('Release: ' + elem.release_date)
            card.append(cardTime)
            cardsBlock.append(card)
        }
    });
}

function getDataMoonPhase(timeFilm,card){
    fetch(`http://api.farmsense.net/v1/moonphases/?d=${timeFilm}`)
    .then((response)=>{
        if (response.status !== 200) {
            console.log('Looks like there was a problem');
            console.log(`Status Code: ${response.status}`);
            return;
        }
        return response.json();
    })
    .then((results)=>{
        setDataMoonPhase(results,card)
    })
}

function setDataMoonPhase(results,card){
    results.forEach(elem => {
        const cardMoonPhase = document.createElement('div')
        if(elem.Phase){
            cardMoonPhase.append('Phase: ' + elem.Phase)
            cardMoonPhase.setAttribute('class','cardPhase')
            card.append(cardMoonPhase)
            cardsBlock.append(card)
        }
    });
}


buttonQuery.addEventListener('click',function(event){
    if(event){
        cardsBlock.innerHTML = ''
        setDataCard()
    }
})
getDataCard()