var productsSection = document.querySelector(".products-section");
var cartProducts = [];
var modal = document.getElementsByClassName("modal")[0];
var modalBackground = document.querySelector(".modal-background");
var productsCounter = document.querySelector("#counter");
var searchField = document.getElementById("filter-products");

window.onload = loadAllProducts;

function loadAllProducts() {
    loadProducts();
    loadCartProducts();
}

function loadProducts() {

    while (productsSection.hasChildNodes()) {
        productsSection.removeChild(productsSection.lastChild);
    }

    products.forEach(function (product) {
        var article = document.createElement("article");
        article.id = product.idProd;
        article.className = "product-article"

        var productImage = document.createElement("img");
        productImage.src = product.imgSrc;

        var productName = document.createElement("h3");
        productName.appendChild(document.createTextNode(product.titlu));

        var productDescription = document.createElement("p");
        productDescription.appendChild(document.createTextNode(product.descriere))

        var addLink = document.createElement("div");
        addLink.onclick = function (event) {
            var currentProduct;
            var currentProductId = event.target.parentNode.id;
            for (var i = 0; i < products.length; i++) {
                if (products[i].idProd == currentProductId) {
                    currentProduct = products[i];
                }
            }
            var productExistsInCart = false;

            for (var i = 0; i < cartProducts.length; i++) {
                if (cartProducts[i].id === currentProduct.idProd) {
                    productExistsInCart = true;
                }
            }

            if (!productExistsInCart) {
                var cartProduct = {
                    id: currentProduct.idProd,
                    name: currentProduct.titlu,
                    quantity: 1,
                    price: parsePrice(currentProduct.pret)
                }
                cartProducts.push(cartProduct);

            } else {
                for (var i = 0; i < cartProducts.length; i++) {
                    if (cartProducts[i].id === currentProduct.idProd) {
                        cartProducts[i].quantity = cartProducts[i].quantity + 1;
                        cartProducts[i].price = cartProducts[i].price + parsePrice(currentProduct.pret)
                    }
                }
            }
            loadCartProducts();
        }

        addLink.className = "button";
        addLink.appendChild(document.createTextNode("Adauga in cos"));

        article.appendChild(productImage);
        article.appendChild(productName);
        article.appendChild(productDescription);
        article.appendChild(addLink)
        productsSection.appendChild(article);
    });
}

function computeCounter() {
    var sum = 0;
    for (var i = 0; i < cartProducts.length; i++) {
        sum += parseInt(cartProducts[i].quantity);
    }

    productsCounter.textContent = sum;
}

function parsePrice(price) {
    return parseFloat(price.substring(0, price.length - 4));
}

function loadCartProducts() {
    var table = document.getElementsByTagName("table")[0];
    while (table.hasChildNodes()) {
        table.removeChild(table.lastChild);
    }

    var trHeader = document.createElement("tr");
    var thName = document.createElement("th");
    thName.appendChild(document.createTextNode("Nume"));

    var thQuantity = document.createElement("th");
    thQuantity.appendChild(document.createTextNode("Cantitate"));

    var thPrice = document.createElement("th");
    thPrice.appendChild(document.createTextNode("Pret"));

    var thAction = document.createElement("th");
    thAction.appendChild(document.createTextNode("Actiune"));

    trHeader.appendChild(thName);
    trHeader.appendChild(thQuantity);
    trHeader.appendChild(thPrice);
    trHeader.appendChild(thAction);
    table.appendChild(trHeader);

    cartProducts.forEach(function (cartProduct) {
        var tr = document.createElement("tr");
        tr.id = "tr" + cartProduct.id;
        var tdName = document.createElement("td");
        tdName.appendChild(document.createTextNode(cartProduct.name));

        var tdQuantity = document.createElement("td");
        tdQuantity.appendChild(document.createTextNode(cartProduct.quantity));

        var tdPrice = document.createElement("td");
        tdPrice.appendChild(document.createTextNode(cartProduct.price));

        var tdAction = document.createElement("td");
        var actionLink = document.createElement("a");
        actionLink.onclick = function (event) {
            var currentId = event.target.parentNode.parentNode.id;

            cartProducts.forEach(function (cartProduct) {
                if (cartProduct.id == currentId.substring(2)) {
                    if (cartProduct.quantity == 1) {

                        cartProducts = cartProducts.filter(function (cartProduct) {
                            return currentId.substring(2) != cartProduct.id;
                        });
                    } else {
                        cartProduct.quantity -= 1;
                        var currentProduct;
                        for (var i = 0; i < products.length; i++) {
                            if (products[i].idProd == cartProduct.id) {
                                currentProduct = products[i];
                            }
                        }
                        console.log(currentProduct)
                        cartProduct.price -= parsePrice(currentProduct.pret);
                    }
                    loadCartProducts();
                }
            })
        }
        actionLink.href = "#";
        actionLink.appendChild(document.createTextNode("Delete"));

        tdAction.appendChild(actionLink);
        tr.appendChild(tdName);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdPrice);
        tr.appendChild(tdAction);
        table.appendChild(tr);
    })

    computeCounter();
}

var buttonDelete = document.getElementById("button-delete");
buttonDelete.addEventListener("click", function () {
    cartProducts = [];
    loadCartProducts();
})

var buttonSend = document.getElementById("button-send");
buttonSend.addEventListener("click", function () {
    if (cartProducts.length > 0) {
        modal.classList.add("active");
        modalBackground.classList.add("active");
        cartProducts = [];
        loadCartProducts();
    }
})


modalBackground.addEventListener("click", function () {
    modal.classList.remove("active");
    modalBackground.classList.remove("active");
})

var buttonCloseModal = document.getElementById("modal-button");
buttonCloseModal.addEventListener("click", function () {
    modal.classList.remove("active");
    modalBackground.classList.remove("active");
})

function filterProducts() {
    var searchedText = searchField.value.toUpperCase();
    products.forEach(function (product) {
        var filteredArticle = document.getElementById(product.idProd);
        if (product.titlu.toUpperCase().indexOf(searchedText) > -1) {
            filteredArticle.style.display = "flex";
        } else {
            filteredArticle.style.display = "none";
        }
    })
}

searchField.addEventListener("search", function () {
    filterProducts();
})