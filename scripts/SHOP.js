"use strict";


class ShopItem {
    constructor(name, image, price, n = 1, expiryDate, nutritionalScore) {
        this.name = name;
        this.image = image;
        this.price = price;
        this.n = n;
        this.expiryDate = expiryDate;
        this.nutritionalScore = nutritionalScore;
    }

}


let searchFrom = document.querySelector(".search-form");

const buyList = [new ShopItem("Farinha", "../media/farinha.jpg", 1.79, 1, "2024-07-15","A"), 
    new ShopItem("Leite", "../media/image-firgo-2.jpg", 0.99, 1, "2024-09-03","B"), 
new ShopItem("Ovos", "../media/image-firgo-10.jpg", 2.20, 1, "2024-05-15", "A"),
new ShopItem('Frango', "../media/image-firgo-8.jpg", 4.60,1, "2024-05-15", "A"),
new ShopItem('Cogumelos', "../media/image-firgo-5.jpg", 2.39,1,"2024-01-02", "A"),
new ShopItem('Iogurte', "../media/image-firgo-13.jpg", 1.29,1,"2024-03-02", "B")];

const storedCartInfo = sessionStorage.getItem("CARTINFO");

let cart = [];



function Menu_Perfil(){
    const userMenu = document.getElementById('user-menu');
    if (userMenu.style.display === 'block') {
        userMenu.style.display = 'none';
    } else {
        userMenu.style.display = 'block';
    }
}

function GoBack() {
    window.history.back();
}

function displayItems() {

    buyList.sort((a, b) => a.name.localeCompare(b.name));
    
    for (let i=0 ; i < buyList.length; i++){
        const itemBox = document.createElement("div");
        itemBox.classList.add("box");

        const productImage = document.createElement("img");
        productImage.src = buyList[i].image;

        itemBox.innerHTML = "<h3>" + buyList[i].name + "</h3>";

        const formattedPrice = parseFloat(buyList[i].price).toFixed(2);
        const productPrice = document.createElement("p");
        productPrice.textContent = "€" + formattedPrice + "/un";;
        
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info-button");

        const infoButton = document.createElement("button");
        infoButton.classList.add("itemInfoButton");
        infoButton.innerText = "Ver mais";

        const itemInfoDiv = document.getElementById("item-info");

        infoButton.addEventListener("click", () => {
            const selectedItem = buyList[i]; 
            const itemInfo = `
                <span id="close-icon" class="fas fa-times-circle" style="color: red; font-size: 24px;"></span>
                <h2>${selectedItem.name}</h2>
                <img src="${selectedItem.image}" alt="${selectedItem.name}" style="width: 80px; height: auto;">
                <p>Data de Validade: ${selectedItem.expiryDate}</p>
                <p>Score Nutricional: ${selectedItem.nutritionalScore}</p>
                
            `;
            itemInfoDiv.innerHTML = itemInfo;
            itemInfoDiv.style.display = "block";
        

            const closeIcon = document.getElementById('close-icon');
            if (closeIcon) {
                closeIcon.addEventListener('click', () => {
                    
                    itemInfoDiv.style.display = 'none';
                });
            } else {

            }
        });
        
        const addButton = document.createElement("button");
        addButton.classList.add("addButton");
        addButton.id = "add"+buyList[i].name;
        addButton.innerText = "Adicionar ao carrinho";
        
        document.getElementById("items-container").appendChild(itemBox);
        document.getElementsByClassName("box")[i].appendChild(productImage);
        document.getElementsByClassName("box")[i].appendChild(productPrice);
        document.getElementsByClassName("box")[i].appendChild(infoDiv);
        document.getElementsByClassName("info-button")[i].appendChild(infoButton);
        document.getElementsByClassName("box")[i].appendChild(addButton);       
    }
}

function displayCartItems() {
    for (let i=0 ; i < cart.length; i++){
        let cartItem = cart[i];

        const cartItemBox = document.createElement("div");
        cartItemBox.classList.add("cartItemBox");

        const productImage = document.createElement("img");
        productImage.src = cartItem.image;

        const productTitle = document.createElement("h4");
        productTitle.innerText = cartItem.name;
        productTitle.style.fontSize = "20px"; 

        const itemPrice = document.createElement("p");
        itemPrice.classList.add("itemPrice");
        itemPrice.innerText = "€" + cartItem.price.toFixed(2) + "/un";

        const productQuantity = document.createElement("p");
        productQuantity.id = cartItem.name + "Number";
        productQuantity.classList.add("productQuantity");
        productQuantity.innerText = cartItem.n.toString().padStart(2, '0');

        const quantityButtons = document.createElement("div");
                
        const addButton = document.createElement("button");
        addButton.classList.add("addItemButton");
        addButton.innerText = "+";
        addButton.addEventListener("click", function(){
            increaseItemNumber(cartItem)});

        const removeButton1 = document.createElement("button");
        removeButton1.classList.add("removeItemButton1");
        removeButton1.innerText = "-";
        removeButton1.addEventListener("click", function(){
            decreaseItemNumber(cartItem)});

        const removeButton = document.createElement("button");
        removeButton.classList.add("removeItemButton");
        removeButton.id = "remove"+cartItem.name;
        removeButton.innerText = "Remover";

        quantityButtons.appendChild(removeButton1);
        quantityButtons.appendChild(productQuantity);
        quantityButtons.appendChild(addButton);

        document.getElementById("cartBox").prepend(cartItemBox);
        cartItemBox.appendChild(productTitle);
        cartItemBox.appendChild(productImage);
        cartItemBox.appendChild(itemPrice);
        cartItemBox.appendChild(quantityButtons);

        cartItemBox.appendChild(removeButton);
        removeButton.addEventListener("click", function() {
            cartItem.n=1;
            removeFromCart(removeButton);
        });

    }
    printTotal();
    checkCart();
}

function addToCart(button){
    let cartItem = null;
    for (let i=0 ; i < buyList.length; i++){
        if ("add"+buyList[i].name == button.id) {
            if (!cartIncludes(buyList[i])) {
                cart.push(buyList[i]);
    
                cartItem = buyList[i];

                const cartItemBox = document.createElement("div");
                cartItemBox.classList.add("cartItemBox");


                const productImage = document.createElement("img");
                productImage.src = cartItem.image;

                const productTitle = document.createElement("h4");
                productTitle.innerText = cartItem.name;
                productTitle.style.fontSize = "20px"; 

                const itemPrice = document.createElement("p");
                itemPrice.classList.add("itemPrice");
                itemPrice.innerText = "€" + cartItem.price.toFixed(2) + "/un";

                const productQuantity = document.createElement("p");
                productQuantity.id = cartItem.name + "Number";
                productQuantity.classList.add("productQuantity");
                productQuantity.innerText = cartItem.n.toString().padStart(2, '0');
                
                const quantityButtons = document.createElement("div");
                
                const addButton = document.createElement("button");
                addButton.classList.add("addItemButton");
                addButton.innerText = "+";
                addButton.addEventListener("click", function(){
                    increaseItemNumber(cartItem)});

                const removeButton1 = document.createElement("button");
                removeButton1.classList.add("removeItemButton1");
                removeButton1.innerText = "-";
                removeButton1.addEventListener("click", function(){
                    decreaseItemNumber(cartItem)});

                const removeButton = document.createElement("button");
                removeButton.classList.add("removeItemButton");
                removeButton.id = "remove"+cartItem.name;
                removeButton.innerText = "Remover";

                quantityButtons.appendChild(removeButton1);
                quantityButtons.appendChild(productQuantity);
                quantityButtons.appendChild(addButton);

                document.getElementById("cartBox").prepend(cartItemBox);
                cartItemBox.appendChild(productTitle);
                cartItemBox.appendChild(productImage);
                cartItemBox.appendChild(itemPrice);
                cartItemBox.appendChild(quantityButtons);

                cartItemBox.appendChild(removeButton);
                removeButton.addEventListener("click", function() {
                    cartItem.n=1;
                    removeFromCart(removeButton);
                });

            }
            else {
                increaseItemNumber(cartIncludes(buyList[i]));
            }

        }
    }

    uploadCartToSessionStorage();
    printTotal();
    checkCart();
}



function removeFromCart(button) {
    let removed = false;
    for (let i=0 ; i < cart.length; i++){
        if (("remove"+cart[i].name == button.id) && (removed == false)) {
            cart.splice(i, 1);

            button.parentElement.remove();
            uploadCartToSessionStorage();

            removed = true;
            printTotal();
            checkCart();
        }
    }
}

function decreaseItemNumber(item) {
    const currentNumberDisplay = document.getElementById(item.name + "Number");
    
    if (item.n > 1) {
        item.n--;
        currentNumberDisplay.innerText = item.n.toString().padStart(2, '0');
    }
    else {
        removeFromCart(document.getElementById("remove"+item.name));
    }
    printTotal(); 
    uploadCartToSessionStorage();
}

function increaseItemNumber(item) {
    const currentNumberDisplay = document.getElementById(item.name + "Number");

    if (item.n < 30) {
        item.n++;
        currentNumberDisplay.innerText = item.n.toString().padStart(2, '0');
    }
    printTotal(); 
    uploadCartToSessionStorage();
}

function downloadCartFromSessionStorage() {
    if (storedCartInfo) {
        let tempCart = JSON.parse(storedCartInfo);
        for (let i=0 ; i < tempCart.length; i++){
            cart.push(new ShopItem(tempCart[i].name, tempCart[i].image, tempCart[i].price, tempCart[i].n, tempCart[i].expiryDate, tempCart[i].nutritionalScore));
        }
        displayCartItems();
    }

}

function checkCart() {
    if (cart.length == 0) {
        document.getElementById("cartBox").style.display = 'none';
    }
    else {
        document.getElementById("cartBox").style.display = 'block';
    }

}

function cartIncludes(item) {
    for (let i=0 ; i < cart.length; i++){
        if (cart[i].name == item.name){
            return cart[i];
        }
    }
    return false;
}

function uploadCartToSessionStorage() {
    sessionStorage.setItem("CARTINFO",JSON.stringify(cart));
}


function defineEventHandlersParaElementosHTML(){
    const userIcon = document.getElementById('user-icon');
    const BackButton = document.getElementById('back-button');
    const addButton = document.getElementsByClassName("addButton");

    userIcon.addEventListener("click", Menu_Perfil);
    BackButton.addEventListener("click", GoBack);
    
    
    displayItems(); 

    for (let i=0 ; i < addButton.length; i++){
        addButton[i].addEventListener("click", function() {
            addToCart(addButton[i]);});  
    }

}

function printTotal(){
    let total = 0;
    for (let i=0 ; i < cart.length; i++){
        total += parseFloat(cart[i].price)*cart[i].n;
    }
    const formattedTotal = total.toFixed(2); 
    document.getElementById("total").innerHTML = "Total: " + formattedTotal + "€";
    localStorage.setItem("totalValue", formattedTotal);
    
}

function principal(){
    downloadCartFromSessionStorage();
    checkCart();
    defineEventHandlersParaElementosHTML();
}


window.addEventListener("load", principal);