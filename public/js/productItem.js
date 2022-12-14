let addReviewBtn = document.querySelector('#add-review-btn'); 
let addToCartBtn = document.querySelector('#add-btn'); 

const addItemToCart = async(event) => {
  event.preventDefault(); 

  const productId = addToCartBtn.dataset.productid; 
  const orderId = document.querySelector('#order-count').dataset.orderid; 
  const price = document.querySelector('#price').dataset.price; 

  if (productId && orderId && price) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/orderItems', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, 
                              order_id: orderId,
                              quantity: 1,  
                              total_price: price }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, refresh the order count and redirct to home page 
      const response = await fetch(`/api/orders/orderCount/${orderId}`); 

      if (response.ok) {
        document.location.replace(`/api/products/${productId}`); 
      }
    } else {
      alert(response.statusText);
    }
  }
}

const addReview = async(event) => {
    event.preventDefault(); 

    if (!addReviewBtn.dataset.userid) document.location.replace(`/login`);

    const reviewText = document.querySelector('#review-text').value.trim(); 
    const productId = addReviewBtn.dataset.productid; 
    const userId = addReviewBtn.dataset.userid;

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
          // If successful, refresh the review item; 
          if (document.querySelector('#review-content').dataset.count == 0) {
            document.querySelector('#review-content').innerHTML=""; 
            document.querySelector('#review-content').setAttribute('data-count', '1'); 
          }

          let date = Date.now(); 

          let p1 = document.createElement('p'); 
          p1.innerHTML = reviewText; 

          let p2 = document.createElement('p'); 
          p2.innerHTML = `- written by ${document.querySelector('#logout').dataset.user} on ${new Date(date).getFullYear()}-${new Date(date).getMonth() + 1}-${new Date(date).getDate()} ${new Date(date).toLocaleTimeString()}`

          let item = document.createElement('div'); 
          item.setAttribute('id', 'review-item'); 

          item.appendChild(p1); 
          item.appendChild(p2); 
          document.querySelector('#review-content').appendChild(item); 
        } else {
          alert(response.statusText);
        }
    }
}

addToCartBtn.addEventListener('click', addItemToCart); 
addReviewBtn.addEventListener('click', addReview); 
