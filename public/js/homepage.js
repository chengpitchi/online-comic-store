let itemContainer = document.getElementById('item-container'); 
let nameSearch = document.getElementById('search-button'); 

const openItemPage = (event) => {
    let itemClicked = event.target; 

    if (itemClicked.matches("img")) {
        window.location.href = `/api/products/${itemClicked.dataset.id}`; 
    }
}

const openItemPagebyName = (event) => {
    event.preventDefault(); 

    const productName = document.querySelector('#name-search').value.trim(); 
    let elements = document.getElementsByTagName("option"); 
    let productID = "";
    
    for (let i=0; i < elements.length; i++) {
        console.log(elements[i].value); 
        if (elements[i].value.trim() == productName) {
            productID = elements[i].id; 
            break; 
        }
    }
    console.log(productID); 
    if (productID !== "") {
        window.location.href = `/api/products/${productID}`;
    }
}

itemContainer.addEventListener("click", openItemPage); 
nameSearch.addEventListener("click", openItemPagebyName); 