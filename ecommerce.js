let products = [];

if(localStorage.getItem("mystorage")){
    products = JSON.parse(localStorage.getItem("mystorage")); // string i object e çevirmek
}

setProductToHTML();

function setProductToHTML() {
    const ProductsRowElement = document.getElementById("ProductsRow");
    ProductsRowElement.innerHTML = "";

    for (const product of products) {
        const text = `
    <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12 mt-2">
    <div class="card">
        <div class="card-body product-image-div">
            <img src="${product.image}" style="width: 100%; max-height:100%">
        </div>
        <div class="card-header product-name-div">
            <h6>${product.name.substring(0, 77)}</h6>
        </div>
        <div class="card-body text-center">
            <h4 class="alert alert-danger">
                ${product.price}
            </h4>
            <button class="btn btn-outline-dark w-100">
                <i class="bi bi-cart-plus"></i>
                Add Shopping Cart
            </button>
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

    const product = {
        name: nameElement.value,
        price: priceElement.value,
        image: imageElement.value
    };

    products.push(product);

    localStorage.setItem("mystorage", JSON.stringify(products));

    nameElement.value = "";
    priceElement.value = "";
    imageElement.value = "";

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


