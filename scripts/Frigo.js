"use strict";

class Item {
    constructor(name, expirationDate, image, n = 1) {
        this.name = name;
        this.expirationDate = expirationDate;
        this.image = image;
        this.n = n;
    }

}


let searchFrom = document.querySelector(".search-form");

const stock = [new Item("Queijo", "2023-12-20", "../media/image-firgo-6.jpg", 1), 
    new Item("Leite", "2023-11-3", "../media/image-firgo-2.jpg", 3), 
new Item("Iogurte", "2023-12-25", "../media/image-firgo-13.jpg", 2),
new Item ("Água com gás", "2024-12-30","../media/image-firgo-7.jpg",2),
new Item("Cogumelos", "2024-02-22", "../media/image-firgo-5.jpg",3)];


const suggested = [new Item("Farinha", "none", "../media/farinha.jpg"),
  new Item("Leite", "none", "../media/image-firgo-2.jpg"),
  new Item("Ovos", "none", "../media/image-firgo-10.jpg"), 
  new Item('Frango', "none", "../media/image-firgo-9.jpg")];


document.querySelector("#search_icon").onclick = () =>{
    searchFrom.classList.toggle("active");
}


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

    if (product.expirationDate != "none"){
        var p = document.createElement("p");
        p.textContent = "Validade: " + product.expirationDate;

    }
    

    // Append elements to the box
    box.appendChild(img);
    box.appendChild(h3);
    if (product.expirationDate != "none"){
        box.appendChild(p);
    }

    return box;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    //return array.slice(Math.floor(Math.random() * (array.length-1)));
    return array;
}

// Function to get or generate the randomized products
function getOrGenerateRandomizedProducts() {
    // Check if the products are already stored in local storage
    var storedProducts = sessionStorage.getItem("randomizedProducts");

    if (storedProducts) {
        // If products are stored, parse and return them
        return JSON.parse(storedProducts);
    } else {
        // If no products are stored, shuffle the products, store them, and return
        var shuffledProducts = shuffleArray(suggested);
        sessionStorage.setItem("randomizedProducts", JSON.stringify(shuffledProducts));
        return shuffledProducts;
    }
}

// Get or generate the randomized products
var randomizedProducts = getOrGenerateRandomizedProducts();

var ratio = 0.7;
var products1Count = Math.ceil(randomizedProducts.length * ratio);
// Split the randomized array into two
var products1 = stock;
var products2 = randomizedProducts;

// Function to display products
function displayProducts1(filteredProducts) {
    var container = document.getElementById("product-container1");
    container.innerHTML = "";

    if (filteredProducts.length === 0) {
        var noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No matching products found.";
        container.appendChild(noResultsMessage);
    } else {
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