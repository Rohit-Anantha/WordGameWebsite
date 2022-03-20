'use strict';

const themeSwitch = document.querySelector('.btn');
themeSwitch.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');

    if(document.body.className == "light-theme") {
        this.textContent = "Dark";
    }
    else {
        this.textContent = "Light";
    }
});