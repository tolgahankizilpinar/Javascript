let shoppingCards = [];
let totalAmount = 0;

if (localStorage.getItem("myShoppingCards")) {
    shoppingCards = JSON.parse(localStorage.getItem("myShoppingCards")); // string i object e çevirmek

    for (let card of shoppingCards) {
        totalAmount += +card.price;
    }
}

setShoppingCardToHTML();
setShoppingCardCountUsingLocalStorage();

function setShoppingCardToHTML() {
    const shoppingCardsRowElement = document.getElementById("shoppingCardsRow");
    shoppingCardsRowElement.innerHTML = "";

    for (const index in shoppingCards) {
        const shoppingCard = shoppingCards[index];
        const text = `
        <div class="col-xl-3 col-lg-4 col-md-6 col-sm-8 col-12 mt-2">
        <div class="card">
            <div class="card-body product-image-div">
                <img src="${shoppingCard.image}" style="width: 100%; max-height:100%">
            </div>
            <div class="card-header product-name-div">
                <h6>${shoppingCard.name.substring(0, 77)}</h6>
            </div>
            <div class="card-body text-center">
                <h4 class="alert alert-danger">
                    ${formatCurrency(shoppingCard.price)}
                </h4>
                <button onclick="deleteByIndex(${index}, ${shoppingCard.id})" class="btn btn-outline-danger w-100">
                    <i class="bi bi-trash"></i>
                    Delete
                </button>
            </div>
        </div>
        </div> `

        if (shoppingCardsRowElement !== null) {
            shoppingCardsRowElement.innerHTML += text;
        }
    }

    const totalAmountEl = document.getElementById("totalAmount");
    totalAmountEl.innerHTML = formatCurrency(totalAmount);
}


function setShoppingCardCountUsingLocalStorage() {
    let cards = [];
    if (localStorage.getItem("myShoppingCards")) {
        cards = JSON.parse(localStorage.getItem("myShoppingCards"));
    }

    const shoppingCardCountElement = document.getElementById("shopping-card-count");

    shoppingCardCountElement.innerHTML = cards.length;
}

function deleteByIndex(index, id) {
    Swal.fire({
        title: 'Delete!',
        text: 'Do you want to delete?',
        icon: 'question',
        confirmButtonText: 'Delete',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "Cancel"
    }).then((res) => {
        if (res.isConfirmed) {
            shoppingCards.splice(index, 1);

            localStorage.setItem("myShoppingCards", JSON.stringify(shoppingCards));

            const products = JSON.parse(localStorage.getItem("mystorage"));

            const product = products.find(p => p.id === id);
            product.stock += 1;

            localStorage.setItem("mystorage", JSON.stringify(products));

            setShoppingCardToHTML();
            setShoppingCardCountUsingLocalStorage();
        }
    });
} 

function payAndCreateOrder(e) {
    e.preventDefault();
    const currentTarget = event.currentTarget;

    Swal.fire({
        title: 'Pay!',
        text: 'Do you want to buy thats products?',
        icon: 'question',
        confirmButtonText: 'Pay',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "Cancel"
    }).then(res => {
        if (res.isConfirmed) {
            const creditCard = {};

            for (const el of currentTarget) {
                if (el.name) {
                    creditCard[el.name] = el.value;
                }
            }

            const data = {
                creditCard: creditCard,
                totalAmount: totalAmount,
                products: shoppingCards
            }

            shoppingCards = [];
            localStorage.removeItem("myShoppingCards");
            setShoppingCardToHTML();

            localStorage.setItem("orders", JSON.stringify(data));

            for(let el of currentTarget){
                if(el.value){
                    el.value = "";
                }
            }
        }
    })
}