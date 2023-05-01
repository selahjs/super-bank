//8 & 9. go to cart.html when cart-button is clicked
document.getElementById("cart-btn").onclick = function () {
  console.log("clicked!");
  location.href = "cart.html";
};

//16. reworking the year from api
fetch("http://worldtimeapi.org/api/timezone/America/New_York")
  .then((res) => res.json())
  .then((data) => getData(data.datetime.split("-")[0]));

function getData(data) {
  document.getElementById("year").innerHTML = data;
}

//4. make year autoupdatable
// const currentYear = new Date().getFullYear();
// const yearElement = document.getElementById("year").innerHTML = currentYear;

//10. show logged in user on all pages
//additionaly show login button if user not logged in
function welcomeLoggedUser() {
  let logged_member = JSON.parse(localStorage.getItem("logged_member"));
  if (logged_member) {
    document.getElementById(
      "logged_member"
    ).innerHTML = `Welcome ${logged_member.name}
                    <button class="btn btn-outline-dark">
                    <i class="bi-person-fill me-1"></i>
                    Logout
                </button>`;
    //remove item from localStorage and redirect to login when clicked
    document.getElementById("logged_member").addEventListener("click", () => {
      localStorage.removeItem("logged_member");
      window.location.replace("/login.html");
    });
  } else {
    document.getElementById(
      "logged_member"
    ).innerHTML = `<button class="btn btn-outline-dark">
                    <i class="bi-person-fill me-1"></i>
                    Login
               </button>`;
    document.getElementById("logged_member").addEventListener("click", () => {
      window.location.replace("/login.html");
    });
  }
}

//12. check if member has sufficient fund
function checkfund(total, cart, email) {
  let logged_member = JSON.parse(localStorage.getItem("logged_member"));
  if (logged_member.deposit >= total) {
    let button = document.getElementById("btn");
    // button.innerHTML = "Succuss"
    // button.setAttribute("disabled","true")
    // document.getElementById('checkout').innerHTML = "Succussfully checked out!"
    console.log(cart);

    //13. storing information on orders storage
    const orders = [];
    cart.forEach((item, i) => {
      orders.push({
        productId: item.product.id,
        member: email,
        amount: item.product.productPrice,
        date: new Date(),
      });
    });
    localStorage.setItem("orders", JSON.stringify(orders));

    //15. deducting amount from the member's deposite
    let newLoggedMember = {
      ...logged_member,
      deposit: logged_member.deposit - total,
    };
    // console.log('newlogged: ',newLoggedMember)
    localStorage.setItem("logged_member", JSON.stringify(newLoggedMember));
  } else {
    document.getElementById("btn").innerHTML = "failed";
    document.getElementById("checkout").innerHTML = "Insufficient fund!";
  }
}
//14. deleteItem from product
function deleteItem(id, i) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  //check if the products match
  if (id === cart[i].product.id) {
    //remove the item from cart
    cart.splice(i, 1);
    //refresh cart.html to see the new cart
    window.location.replace("/cart.html");
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}
welcomeLoggedUser();
