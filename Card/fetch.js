const buttonQuery = document.getElementById('buttonQuery')
const inputQuery = document.getElementById('inputQuery')
const cardsBlock = document.getElementById('cardsBlock')
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
            results.forEach(elem => {
                const cardImage = document.createElement('img')
                const cardTime = document.createElement('div')
                cardTime.setAttribute('id','cardTime')
                const cardName = document.createElement('div')
                cardName.setAttribute('id','cardName')
                const card = document.createElement('div')
                card.setAttribute('id','card')
                const timeFilm = elem.release_date.replace(/[^0-9]/g, '')
                getDataMoonPhase(timeFilm,card) //fn fetch query Moon
                if(elem.poster_path){
                    cardName.append('Name: ' + elem.original_title)
                    card.append(cardName)
                    cardImage.setAttribute('src',`${urlImage + urlImageSize + elem.poster_path}`)
                    cardsBlock.style.display = "flex"
                    cardsBlock.style.flexWrap = "wrap"
                    card.append(cardImage)
                    cardTime.append('Release: ' + elem.release_date)
                    card.append(cardTime)
                    cardsBlock.append(card)
                }
            });
        })
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
        results.forEach(elem => {
            console.log(card)
            const cardMoonPhase = document.createElement('div')
            if(elem.Phase){
                cardMoonPhase.append('Phase: ' + elem.Phase)
                // cardMoonPhase.style.width = '50px'
                // cardMoonPhase.style.height = '30px'
                cardMoonPhase.setAttribute('id','cardPhase')
                console.log(cardsBlock)
                card.append(cardMoonPhase)
                cardsBlock.append(card)
            }
        });
    })
}


buttonQuery.addEventListener('click',function(event){
    if(event){
        cardsBlock.innerHTML = ''
        getDataCard()
    }
})
getDataCard()