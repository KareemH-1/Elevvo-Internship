let sidebarOpen = false;

const sidebar = document.querySelector(".sidebar")
const outerToggle = document.querySelector(".toggle-sidebar")
const innerToggle = document.querySelector(".toggle-btn")
outerToggle.addEventListener("click", () => {
    sidebar.classList.add('open');
    sidebarOpen = true;
    outerToggle.style.display = "none";
});

innerToggle.addEventListener("click", () => {
    sidebar.classList.remove('open');
    sidebarOpen = false;
    setTimeout(() => {
        outerToggle.style.display = "block";
    }, 250);
});


document.querySelector('.sidebar-theme').addEventListener('click', function() {
    document.body.classList.toggle('darkMode');
    const icon = this.querySelector('i');
    const text= this.querySelector('.theme-text');
    if(document.body.classList.contains('darkMode')) {
       icon.className = 'fa fa-sun theme-icon';
       text.textContent = 'Light Mode';
    } else {
        icon.className = 'fa fa-moon theme-icon';
        text.textContent = 'Dark Mode';
    }
});


document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.current-page').classList.remove('current-page');
        this.classList.add('current-page');
    });
});