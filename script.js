// List elements
const checkboxes = document.querySelectorAll('.list-items input[type="checkbox"]');
const listItems = document.querySelector('.list-items');
const placeholderItem = document.querySelector('#placeholder')
const inputText = document.querySelector('#text-input');
const modifyTextFields = document.querySelectorAll('.change');

// Buttons
const clearListButton = document.querySelector('#clearList');
const addButton = document.querySelector('#add');
const clearFinishedButton = document.querySelector('#clearFinished');
const modifyButtons = document.querySelectorAll('.modify');
const deleteButtons = document.querySelectorAll('.delete');

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

    let modifyInput = document.createElement('input');
    modifyInput.setAttribute('type','text');
    modifyInput.className = 'change';

    let modifyButton = document.createElement('button');
    modifyButton.setAttribute('type', 'submit');
    modifyButton.id = 'modify';
    modifyButton.className = 'button modify';
    modifyButton.textContent = 'Modify';
    modifyButton.addEventListener('click', modifyElement);

    let deleteButton = document.createElement('button');
    deleteButton.setAttribute('type','submit');
    deleteButton.id = 'delete';
    deleteButton.className = 'button delete';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', deleteElement)


    parentElement.append(input);
    parentElement.append(text);
    parentElement.append(modifyInput);
    parentElement.append(modifyButton);
    parentElement.append(deleteButton);

    listItems.appendChild(parentElement)
    
    listCheck();
    inputText.value = '';
}

const deleteElement = (e) => {
    e.target.parentElement.remove();
}

const modifyElement = (e) => {
    let oldText = e.target.parentElement.children[1];
    if(oldText.style.display === 'none') {
        oldText.style.display = 'flex';
    } else {
        oldText.style.display = 'none';
    }

    let text = e.target.parentElement.children[2];
    if(text.style.display === 'flex') {
        text.style.display = 'none';
    } else {
        text.style.display = 'flex';
    }

    if(e.target.style.backgroundColor === 'green') {
        e.target.style.backgroundColor = 'lightgray'
    } else {
        e.target.style.backgroundColor = 'green';
    }

    text.addEventListener('keydown', submitChange);
}

const submitChange = (e) => {

    if(e.keyCode == 13) {
        let oldText = e.target.parentElement.children[1];
        let text = e.target.parentElement.children[2];
        let modifyButton = e.target.parentElement.children[3];
        oldText.textContent = text.value;
        text.style.display = 'none';
        oldText.style.display = 'flex';
        modifyButton.style.backgroundColor = 'lightgray';
    }
}

// Event listeners 
checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck))
clearListButton.addEventListener('click', clearList);
clearFinishedButton.addEventListener('click', clearFinished);
addButton.addEventListener('click', addElement);
deleteButtons.forEach(deleteButton => deleteButton.addEventListener('click', deleteElement));
modifyButtons.forEach(modifyButton => modifyButton.addEventListener('click', modifyElement));
