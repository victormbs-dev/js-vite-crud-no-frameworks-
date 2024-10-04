import usersStore from '../../store/users-store';
import {renderTable} from '../../presentation/render-table/render-table'
import '../render-buttons/render-buttons.css';

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const renderButtons = ( element ) =>{

    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next >';
    
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '< Next';

    const currentPageLabel = document.createElement('span');
    currentPageLabel.id = 'current-page';
    currentPageLabel.innerHTML = usersStore.getCurrentPage();


    element.append(prevButton, currentPageLabel, nextButton);


    nextButton.addEventListener('click', async() => {
        await usersStore.loadNextPage();
        currentPageLabel.innerText = usersStore.getCurrentPage();
        renderTable( element );
    });

    prevButton.addEventListener('click', async() => {
        await usersStore.loadPreviousPage();
        currentPageLabel.innerHTML = usersStore.getCurrentPage();
        renderTable( element );
    });

}