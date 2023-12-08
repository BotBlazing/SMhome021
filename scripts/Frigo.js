"use strict";

class Item {
    constructor(name, expirationDate, image, n, nutritionalScore) {
        this.name = name;
        this.expirationDate = expirationDate;
        this.image = image;
        this.n = n;
        this.nutritionalScore=nutritionalScore;
    }

}


let searchFrom = document.querySelector(".search-form");

const stock = [new Item("Queijo", "2023-12-20", "../media/image-firgo-6.jpg", 1, "C"), 
    new Item("Leite", "2023-11-3", "../media/image-firgo-2.jpg", 3, "B"), 
new Item("Iogurte", "2023-12-25", "../media/image-firgo-13.jpg", 2, "B"),
new Item ("Água com gás", "2024-12-30","../media/image-firgo-7.jpg",2, "A"),
new Item("Cogumelos", "2024-02-22", "../media/image-firgo-5.jpg",3, "A"),
new Item("Bacon", "2024-02-27", "../media/image-firgo-12.jpg",2, "D"),
new Item("Leite UCAL", "2024-05-10", "../media/image-firgo-16.jpg",1, "B"),
new Item("Coca-Cola", "2024-03-02", "../media/image-firgo-17.jpg",4, "E")];


const suggested = [new Item("Farinha", "none", "../media/farinha.jpg",2, "B"),
  new Item("Leite", "none", "../media/image-firgo-2.jpg",3,"B"),
  new Item("Ovos", "none", "../media/image-firgo-10.jpg",6,"A"), 
  new Item('Frango', "none", "../media/image-firgo-9.jpg",2,"A")];


document.querySelector("#search_icon").onclick = () =>{
    searchFrom.classList.toggle("active");
}

document.addEventListener("click", function (event) {
    const searchForm = document.querySelector(".search-form");
    const searchIcon = document.querySelector("#search_icon");

    if (!searchForm.contains(event.target) && event.target !== searchIcon) {
        
        searchForm.classList.remove("active");
    }
});


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

function createProductBox(product) {
    var box = document.createElement("div");
    box.className = "box";

    var img = document.createElement("img");
    img.src = product.image;

    var h3 = document.createElement("h3");
    h3.textContent = product.name;

    box.appendChild(h3);
    box.appendChild(img);
    
    if (product.n !== "none") {
        var quantityParagraph = document.createElement("p");
        quantityParagraph.innerHTML = "<strong>Quantidade:</strong> " + product.n;
        box.appendChild(quantityParagraph);
    }
    

    const infoButton = document.createElement("button");
    infoButton.classList.add("itemInfoButton");
    infoButton.innerText = "Ver mais";

    const itemInfoDiv = document.getElementById("item-info");

    const expirationParagraph = document.createElement("p");
    expirationParagraph.textContent = "Data de Validade: " + product.expirationDate;

    const expirationDate = new Date(product.expirationDate);
    const today = new Date();

    if (expirationDate < today) {
        infoButton.classList.add("expired");
        expirationParagraph.classList.add("expired-text");
    }
    
    infoButton.addEventListener("click", () => {
        if  (product.expirationDate != "none"){
            const itemInfo = `
                <span id="close-icon" class="fas fa-times-circle" style="color: red; font-size: 24px;"></span>
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}" style="width: 80px; height: auto;">
                ${expirationParagraph.outerHTML}
                <p>Score Nutricional: ${product.nutritionalScore}</p>
                
            `;
            itemInfoDiv.innerHTML = itemInfo;
            itemInfoDiv.style.display = "block";
        }else{
            const itemInfo = `
                <span id="close-icon" class="fas fa-times-circle" style="color: red; font-size: 24px;"></span>
                <h2>${product.name}</h2>
                <img src="${product.image}" alt="${product.name}" style="width: 80px; height: auto;">
                <p>Score Nutricional: ${product.nutritionalScore}</p>
                
            `;
            itemInfoDiv.innerHTML = itemInfo;
            itemInfoDiv.style.display = "block";
        }
        
            

        const closeIcon = document.getElementById('close-icon');
        if (closeIcon) {
            closeIcon.addEventListener('click', () => {
                
                itemInfoDiv.style.display = 'none';
            });
        } else {

        }
    });
    
    box.appendChild(infoButton);

    return box;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    
    return array;
}

function getOrGenerateRandomizedProducts() {
    
    var storedProducts = sessionStorage.getItem("randomizedProducts");

    if (storedProducts) {

        return JSON.parse(storedProducts);
    } else {
        
        var shuffledProducts = shuffleArray(suggested);
        sessionStorage.setItem("randomizedProducts", JSON.stringify(shuffledProducts));
        return shuffledProducts;
    }
}


var randomizedProducts = getOrGenerateRandomizedProducts();

var ratio = 0.7;
var products1Count = Math.ceil(randomizedProducts.length * ratio);

var products1 = stock;
var products2 = randomizedProducts;

function displayProducts1(filteredProducts) {
    var container = document.getElementById("product-container1");
    container.innerHTML = "";

    if (filteredProducts.length === 0) {
        var noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No matching products found.";
        container.appendChild(noResultsMessage);
    } else {

        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        
        filteredProducts.forEach(function(product) {
            var box = createProductBox(product);
            container.appendChild(box);
        });
    }
}

function displayProducts2(filteredProducts) {
    var container = document.getElementById("product-container2");
    container.innerHTML = "";

    if (filteredProducts.length === 0) {
        var noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No matching products found.";
        container.appendChild(noResultsMessage);
    } else {

        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

        filteredProducts.forEach(function(product) {
            var box = createProductBox(product);
            container.appendChild(box);
        });
    }
}

function mostrarSugestoes() {
    
    // Disable the button
    document.getElementById("frigo_btn").classList.remove("disabled");

    // Enable the other button if needed
    document.getElementById("sugestoes_btn").classList.add("disabled");

    // Esconder o conteúdo normal
    document.getElementById("Frigo_normal").classList.add("hidden");
    
    // Mostrar o conteúdo de sugestões
    document.getElementById("Frigo-sugestoes").classList.remove("hidden");

}


function mostrarFrigo() {

    // Disable the button
    document.getElementById("frigo_btn").classList.add("disabled");

    // Enable the other button if needed
    document.getElementById("sugestoes_btn").classList.remove("disabled");

    // Esconder o conteúdo normal
    document.getElementById("Frigo-sugestoes").classList.add("hidden");
    
    // Mostrar o conteúdo de sugestões
    document.getElementById("Frigo_normal").classList.remove("hidden");

    
}


function defineEventHandlersParaElementosHTML(){
    const userIcon = document.getElementById('user-icon');
    const itemInfoButton = document.getElementById('itemInfoButton');
    const BackButton = document.getElementById('back-button');

    
    userIcon.addEventListener("click", Menu_Perfil);
    BackButton.addEventListener("click", GoBack);   

    
    document.getElementById("search-box").addEventListener("input", function() {
    var searchTerm = this.value.toLowerCase();

    var filteredProducts1 = products1.filter(function(product) {
        return product.name.toLowerCase().startsWith(searchTerm);
    });

    var filteredProducts2 = products2.filter(function(product) {
        return product.name.toLowerCase().startsWith(searchTerm);
    });

    displayProducts1(filteredProducts1);
    displayProducts2(filteredProducts2);
});
}



function principal(){
    defineEventHandlersParaElementosHTML();

    mostrarFrigo();
    displayProducts1(products1);
    displayProducts2(products2);
  
}

window.addEventListener("load", principal);