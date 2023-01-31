// List elements
const checkboxes = document.querySelectorAll('.list-items input[type="checkbox"]');
const listItems = document.querySelector('.list-items');
const placeholderItem = document.querySelector('#placeholder')
const inputText = document.querySelector('#text-input');

// Buttons
const clearListButton = document.querySelector('#clearList');
const addButton = document.querySelector('#add');
const clearFinishedButton = document.querySelector('#clearFinished');

// Helper variables
let lastChecked;


// Helper functions
const listCheck = () => {
    if(listItems.children.length >= 1) {
        placeholderItem.style.display = 'none';
    }
}

const handleCheck = (e) => {
    let inbetween = false;
    if(e.shiftKey && e.target.checked) {
        checkboxes.forEach(checkbox => {
            console.log(checkbox);
            if(checkbox === e.target || checkbox === lastChecked) {
                inbetween = !inbetween;
                console.log('starting to check them inbetween');
            }

            if(inbetween) {
                checkbox.checked = true;
            }
        })
    }
    lastChecked = e.target;
}

const clearFinished = () => {
    const checkboxes = document.querySelectorAll('.list-items input[type="checkbox"]');

    checkboxes.forEach(checkbox => {
        if(checkbox.checked) {
            checkbox.parentElement.remove();
        }
    })
}

const clearList = () => {
    while(listItems.firstChild) {
        listItems.removeChild(listItems.firstChild)
    }
    placeholderItem.style.display = 'flex'
}

const addElement = () => {
    let parentElement = document.createElement('div');
    parentElement.className = 'item';

    let input = document.createElement('input');
    input.setAttribute('type', 'checkbox');

    let text = document.createElement('p');
    text.textContent = inputText.value;

    parentElement.append(input);
    parentElement.append(text);

    listItems.appendChild(parentElement)
    
    listCheck();
    inputText.value = '';
}

// Event listeners 
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck))
clearListButton.addEventListener('click', clearList);
clearFinishedButton.addEventListener('click', clearFinished);
addButton.addEventListener('click', addElement)