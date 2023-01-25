// total purchase price //



function computePurchasePrice() {

    let totalPrice = 0
    fetch('http://localhost:3000/cart')
    .then(response => response.json())
    .then(data => {
        if(data.result){
                
                for(let i =0 ; i < data.result.length; i++){
                    for(let j = 0 ; j <data.result[i].trips.length; j++){
                totalPrice += data.result[i].trips[j].price
                }
                }
                
            }
            document.querySelector('#total_price').textContent = totalPrice;}
    )      
    }



//delete trip in cart

function deleteTrips(){
    const deleteButton = document.querySelectorAll('.delete_btn')
    
    for(let i = 0 ; i < deleteButton.length ; i ++){
        deleteButton[i].addEventListener('click', function() {
            const tripToDelete = this.parentNode.id
            
            console.log(tripToDelete)
            fetch(`http://localhost:3000/cart/${tripToDelete}`, {
                method : 'DELETE'})

            .then(response => response.json)
            .then(data => {
                if(data){
                    this.parentNode.remove()
                }
                computePurchasePrice()
            })
           
            })
            }
            
        }
    
// function book cart

function bookCart() {

    const buttonPurchase = document.querySelector('#btn_purchase')
    buttonPurchase.addEventListener('click', function () {
        fetch(`http://localhost:3000/cart`, {
            method : 'PUT'})
        .then(response => response.json())
        .then(() => {window.location.pathname = './bookings.html'}) 
    })
}


function displayCart(){
    fetch('http://localhost:3000/cart')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.result){

                for(let i =0 ; i < data.result.length; i++){
                    for(let j = 0 ; j <data.result[i].trips.length; j++){
                document.querySelector('.container_cart').innerHTML += 
                `<div id=${data.result[i]._id} class='container_result_cart'>
                <p class='trip_cart'>${data.result[i].trips[j].departure} > ${data.result[i].trips[j].arrival}</p>
                <p class='hour_cart'>${new Date(data.result[i].trips[j].date).getHours()}:${new Date(data.result[i].trips[j].date).getMinutes()} </p>
                <p class='price_cart'> ${data.result[i].trips[j].price}€</p>
                <button class='delete_btn' type='button'>X</button>
                </div>`
            }
            }
            deleteTrips()
            }
        })
        computePurchasePrice()
        bookCart()
}

displayCart()






