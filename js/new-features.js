// let currentYearFromApi;
fetch('http://worldtimeapi.org/api/timezone/America/New_York')
    .then(res=> res.json())
    .then(data=> getData(data.datetime.split('-')[0]))

function getData(data){
    document.getElementById("year").innerHTML = data;
}
//old code
// const currentYear = new Date().getFullYear();
// const yearElement = document.getElementById("year").innerHTML = currentYear;

function welcomeLoggedUser() {
    let logged_member = JSON.parse(localStorage.getItem('logged_member'));
    if (logged_member) {
        document.getElementById('logged_member').innerHTML = `Welcome ${logged_member.name}`;
    }
}
function checkfund(total,cart,email){
    let logged_member = JSON.parse(localStorage.getItem('logged_member'));
    if (logged_member.deposit >= total) {
        let button = document.getElementById('btn');
        // button.innerHTML = "Succuss"
        // button.setAttribute("disabled","true")
        // document.getElementById('checkout').innerHTML = "Succussfully checked out!"
        console.log(cart)
        const orders = []
        cart.forEach((item,i)=>{
            orders.push({
                productId:item.product.id,
                member:email,
                amount:item.product.productPrice,
                date:new Date()
            })
        })
        localStorage.setItem('orders', JSON.stringify(orders))
    }else{
        document.getElementById('btn').innerHTML = "failed"
        document.getElementById('checkout').innerHTML = "Insufficient fund!"
    }
}
welcomeLoggedUser();