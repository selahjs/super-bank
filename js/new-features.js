//8 & 9. go to cart.html when cart-button is clicked 
document.getElementById("cart-btn").onclick = function () {
    console.log('clicked!')
    location.href = "cart.html";
};

//16. reworking the year from api
fetch('http://worldtimeapi.org/api/timezone/America/New_York')
    .then(res=> res.json())
    .then(data=> getData(data.datetime.split('-')[0]))

function getData(data){
    document.getElementById("year").innerHTML = data;
}

//4. make year autoupdatable
// const currentYear = new Date().getFullYear();
// const yearElement = document.getElementById("year").innerHTML = currentYear;

//10. show logged in user on all pages
function welcomeLoggedUser() {
    let logged_member = JSON.parse(localStorage.getItem('logged_member'));
    if (logged_member) {
        document.getElementById('logged_member').innerHTML = `Welcome ${logged_member.name}`;
    }
}

//12. check if member has sufficient fund
function checkfund(total,cart,email){
    let logged_member = JSON.parse(localStorage.getItem('logged_member'));
    if (logged_member.deposit >= total) {
        let button = document.getElementById('btn');
        // button.innerHTML = "Succuss"
        // button.setAttribute("disabled","true")
        // document.getElementById('checkout').innerHTML = "Succussfully checked out!"
        console.log(cart)

        //13. storing information on orders storage
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

        //15. deducting amount from the member's deposite 
        let newLoggedMember = {...logged_member, deposit: logged_member.deposit-total}
        // console.log('newlogged: ',newLoggedMember)
        localStorage.setItem('logged_member', JSON.stringify(newLoggedMember))

    }else{
        document.getElementById('btn').innerHTML = "failed"
        document.getElementById('checkout').innerHTML = "Insufficient fund!"
    }
}
welcomeLoggedUser();