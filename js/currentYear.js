const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("year").innerHTML = currentYear;

function welcomeLoggedUser() {
    let logged_member = JSON.parse(localStorage.getItem('logged_member'));
    if (logged_member) {
        document.getElementById('logged_member').innerHTML = `Welcome ${logged_member.name}`;
    }
}

welcomeLoggedUser();