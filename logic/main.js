const btnSwitch = document.querySelector('#switch');

btnSwitch.addEventListener('click',() => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active');
    btnSwitchMobile.classList.toggle('active');
})

const btnSwitchMobile = document.querySelector('#switch-mobile');

btnSwitchMobile.addEventListener('click',() => {
    document.body.classList.toggle('dark');
    btnSwitchMobile.classList.toggle('active');
    btnSwitch.classList.toggle('active');
})