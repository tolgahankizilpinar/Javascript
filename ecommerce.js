let products = [];
const shoppingCards = [];

if(localStorage.getItem("mystorage")){
    products = JSON.parse(localStorage.getItem("mystorage")); // string i object e çevirmek
}

setProductToHTML();
setShoppingCardCountUsingLocalStorage();

function setProductToHTML() {
    const ProductsRowElement = document.getElementById("ProductsRow");
    ProductsRowElement.innerHTML = "";

    for (const index in products) {
        const product = products[index];

        let buttonText = `
        <button class="btn btn-danger w-100 disabled">
            <i class="bi bi-exclamation-diamond-fill"></i>
            No product in stock
        </button>
        `;

        if(product.stock > 0){
            buttonText = `
            <button onclick="addShoppingCard(${index})" class="btn btn-outline-dark w-100">
                 <i class="bi bi-cart-plus"></i>
                 Add Shopping Cart
            </button>`
        }

        const text = `
    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mt-2">
    <div class="card">
        <div class="card-body product-image-div">
            <img src="${product.image}" style="width: 100%; max-height:100%">
        </div>
        <div class="card-header product-name-div" style="flex-direction:column">
            <h6>${product.name.substring(0, 77)}</h6>
            <span>Stock: ${product.stock}</span>
        </div>
        <div class="card-body text-center">
            <h4 class="alert alert-danger">
                ${formatCurrency(product.price)}
            </h4>
           ${buttonText}
        </div>
    </div>
    </div> `


        if (ProductsRowElement !== null) {
            ProductsRowElement.innerHTML += text;
        }
    }
}

function save(event) {
    event.preventDefault();
    const nameElement = document.getElementById("name");
    const priceElement = document.getElementById("price");
    const imageElement = document.getElementById("image");
    const stockElement = document.getElementById("stock");
    const id = products.length + 1;

    const product = {
        id: id,
        name: nameElement.value,
        price: priceElement.value,
        image: imageElement.value,
        stock: stockElement.value
    };

    products.push(product);

    localStorage.setItem("mystorage", JSON.stringify(products));

    nameElement.value = "";
    priceElement.value = "";
    imageElement.value = "";
    stockElement.value = 0;

    const closeBtnElement = document.getElementById("addProductModalCloseBtn");
    closeBtnElement.click();

    setProductToHTML();

    const toastrOptions = {
        closeButton: true,
        progressBar: true,
        positionClass: "toast-bottom-right"
    }
    toastr.options = toastrOptions;
    toastr.success('Product is added successfully.')
}

function addShoppingCard(index){
    const product = products[index];
    shoppingCards.push(product);

    product.stock -= 1;

    localStorage.setItem("myShoppingCards", JSON.stringify(shoppingCards));
    localStorage.setItem("mystorage", JSON.stringify(products));
  
    setProductToHTML();  // product listesi gosterimi
    setShoppingCardCountUsingLocalStorage();
}

function setShoppingCardCountUsingLocalStorage(){
    let cards = [];
    if (localStorage.getItem("myShoppingCards")) {
        cards = JSON.parse(localStorage.getItem("myShoppingCards"));
    }

    const shoppingCardCountElement = document.getElementById("shopping-card-count");

    shoppingCardCountElement.innerHTML = cards.length;
}
