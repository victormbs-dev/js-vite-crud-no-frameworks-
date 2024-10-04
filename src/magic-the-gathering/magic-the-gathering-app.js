

/**
 * @returns { Object } card information
 */
const fetchCard = async() => {
    
    const res = await fetch('https://api.magicthegathering.io/v1/cards');
    const data = await res.json();

    //console.log(data.cards[0]);
    
    return data.cards[0];

}




/**
 * 
 * @param {HTMLDivElement} element 
 */
export const MagicTheGatheringApp = async( element ) =>{

    document.querySelector('#app-title').innerHTML = 'Magic The Gathering App';

    element.innerHTML = 'Loading...';
    
    
    const cardLabel = document.createElement('blockquote');
    const authoLabel = document.createElement('h3');
    const nextCardButton = document.createElement('button');
    nextCardButton.innerHTML = 'Next Card';
    
    
    const renderCard = ( cardData ) => {
        cardLabel.innerHTML = cardData.text;
        authoLabel.innerHTML = cardData.name;
        
        element.replaceChildren( cardLabel, authoLabel, nextCardButton );
        
    }

    nextCardButton.addEventListener('click', async()=>{

        element.innerHTML = 'Loading...';
        const card = await fetchCard();
        renderCard( card );
    });
    
    fetchCard()
        .then( data => renderCard(data));
    
}