let shoppingCards = [];

if(localStorage.getItem("myShoppingCards")){
    shoppingCards = JSON.parse(localStorage.getItem("myShoppingCards")); // string i object e çevirmek
}
 
setShoppingCardToHTML();
setShoppingCardCountUsingLocalStorage();

function setShoppingCardToHTML(){
    const shoppingCardsRowElement = document.getElementById("shoppingCardsRow");
    shoppingCardsRowElement.innerHTML = "";

    for(const index in shoppingCards){
        const shoppingCard = shoppingCards[index];
        const text = `
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mt-2">
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

        if(shoppingCardsRowElement !== null){
            shoppingCardsRowElement.innerHTML += text;
        }
    }
}


function setShoppingCardCountUsingLocalStorage(){
    let cards = [];
    if (localStorage.getItem("myShoppingCards")) {
        cards = JSON.parse(localStorage.getItem("myShoppingCards"));
    }

    const shoppingCardCountElement = document.getElementById("shopping-card-count");

    shoppingCardCountElement.innerHTML = cards.length;
}

function deleteByIndex(index, id){
    Swal.fire({
        title: 'Delete!',
        text: 'Do you want to delete?',
        icon: 'question',
        confirmButtonText: 'Delete',
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "Cancel"
      }).then((res) => {
        if(res.isConfirmed){
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