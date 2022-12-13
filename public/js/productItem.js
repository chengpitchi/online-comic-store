let addReviewBtn = document.querySelector('#add-review-btn'); 
let addToCartBtn = document.querySelector('#add-btn'); 

const addReview = async(event) => {
    event.preventDefault(); 

    const reviewText = document.querySelector('#review-text').value.trim(); 
    const productId = addReviewBtn.dataset.productid; 
    const userId = document.querySelector('#logout').dataset.userid;
//    const createdAt = Date.now(); 
//    const updatedAt = Date.now();

    if (reviewText) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/reviews', {
          method: 'POST',
          body: JSON.stringify({ review_text: reviewText, 
                                  product_id: productId, 
                                  user_id: userId }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          // If successful, refresh the product item
          document.location.replace(`/api/products/${productId}`);
        } else {
          alert(response.statusText);
        }
      }
}

//addToCartBtn.addEventListener('click', addItemToCart); 
addReviewBtn.addEventListener('click', addReview); 
