let itemContainer = document.getElementById('item-container'); 

const openItemPage = async(event) => {
    let itemClicked = event.target; 

    if (itemClicked.matches("img")) {
        window.location.href = `/api/products/${itemClicked.dataset.id}`; 
    }
}

itemContainer.addEventListener("click", openItemPage); 