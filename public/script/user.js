//set user name
const user = document.querySelector('.user-name')
const edit = document.querySelector('.edit-name')
const change = document.querySelector('.change')
const userArea = document.querySelector('.user')

let userName;

//display username if there's already a name in localstorage

const displayName = JSON.parse(localStorage.getItem('user-name'))

if (displayName) {
    user.value = displayName;
    user.style.border = 'none';
    user.disabled = true;
    inputSize();
}

//adjust input box size based on name's length

function inputSize() {
    const hide = document.getElementById('hideText');
    hide.textContent = user.value;
    user.style.width = hide.offsetWidth + 'px';
}

inputSize()


//adjust input box size as user is typing or resizing screen size
user.addEventListener('input', () => {
    inputSize();
})

window.addEventListener('resize', () => {
    inputSize();
})

//hit enter to save user name 
user.addEventListener('keyup', e => {
    if (e.key == 'Enter' && !user.disabled) {
        e.preventDefault();
        if (user.value) {
            userName = user.value;
            localStorage.setItem('user-name', JSON.stringify(userName));
            user.style.border = 'none';
            user.disabled = true;
        }
    }
})

//show 'edit name'

edit.addEventListener('mouseover', () => {
    change.style.display = 'block';
})


edit.addEventListener('mouseout', () => {
    change.style.display = 'none'
})

edit.addEventListener('click', () => {
    user.disabled = false;
    user.focus();
})