const confirmButton = document.querySelector('#confirm'); 
const itemList = document.querySelector('#item-list'); 

const confirmOrder = async() => {
  // need to save the order as "Completed" status. 
  // update the stock for those product items in the order. 
  // yet to be completed.  further develpment. 

  // sending email through node mailer
  let mailOptions = {
    from: 'comic.world.125@gmail.com',
    to: `${document.querySelector('#email-address').textContent.trim()}`,
    subject: `Comic World Order Confirmation: Order Reference: ${document.querySelector('#order-ref').textContent}`,
    text: `Dear Customer, 

your order is confirmed with the following information:
              
Order Reference: ${document.querySelector('#order-ref').textContent}
No of Items: ${document.querySelector('#order-count').textContent}
Amount before GST: ${document.querySelector('#before-gst').textContent}
GST: ${document.querySelector('#gst').textContent}
Total Price: ${document.querySelector('#total').textContent}
              
Thanks for purchasing in Comic World.  Should you have any questions, please send email to comic.world.125@gmail.com
              
Best Regards, 
Customer Services Department
Comic World Ltd`            
  };

  const response = await fetch('/api/mails', {
    method: 'POST',
    body: JSON.stringify(mailOptions),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    // redirect to home page 
    // need further development
    document.location.replace('/confirm'); 
  }
}

const deleteItem = async(event) => {
  event.preventDefault(); 
  const itemClicked = event.target; 

  if (itemClicked.id == "delete-button") {
    const response = await fetch(`/api/orderItems/${itemClicked.dataset.id}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      document.location.replace(`/api/orders/${document.querySelector('#order-count').dataset.orderid}`); 
    }
  }
}

confirmButton.addEventListener('click', confirmOrder); 
itemList.addEventListener('click', deleteItem); 