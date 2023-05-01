const currentYear = new Date().getFullYear();
const yearElement = document.getElementById("year").innerHTML = currentYear;

function welcomeLoggedUser() {
    let logged_member = JSON.parse(localStorage.getItem('logged_member'));
    if (logged_member) {
        document.getElementById('logged_member').innerHTML = `Welcome ${logged_member.name}`;
    }
}
function checkfund(total){
    let logged_member = JSON.parse(localStorage.getItem('logged_member'));
    if (logged_member.deposit >= total) {
        console.log('sufficient fund')
        let button = document.getElementById('btn');
        button.innerHTML = "Succuss"
        button.setAttribute("disabled","true")
        document.getElementById('checkout').innerHTML = "Succussfully checked out!"
    }else{
        console.log('not enough')
        document.getElementById('btn').innerHTML = "failed"
        document.getElementById('checkout').innerHTML = "Insufficient fund!"
    }
}
welcomeLoggedUser();