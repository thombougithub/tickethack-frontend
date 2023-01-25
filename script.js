/* Date today Input date */

function todayDate() {
    const dateToday = new Date()
    document.querySelector('#date').value = dateToday.toISOString().substr(0, 10)
}

todayDate()



/* place the trip in the cart*/


function bookTrip() {

    const buttonBook = document.querySelectorAll('.btn_book')
    
    for(let i = 0 ; i < buttonBook.length; i++){
    buttonBook[i].addEventListener('click', function () {
        
        const tripToBook = this.parentNode.id
        fetch(`http://localhost:3000/cart/${tripToBook}`)
        .then(response => response.json())
        .then(() => {window.location.pathname = './cart.html'}) 
    })
}

}


/* Display the search result */


function displayResult(){
    const departureValue = document.querySelector('#departure').value 
    const arrivalValue = document.querySelector('#arrival').value
    const dateDay = document.querySelector('#date').value
    

    fetch(`http://localhost:3000/trips/${departureValue}/${arrivalValue}/${dateDay}`).then(response => response.json())
    .then(data => {
        if(data.result){
            document.querySelector('#background_image').style.display = 'none';
            document.querySelector('#right_container > h3').style.display = 'none';
            for(let i = 0; i < data.trips.length; i++){
                document.querySelector('#right_container').innerHTML += 
                `<div id=${data.trips[i]._id} class='container_result'>
                <p class='trip_result'>${data.trips[i].departure} > ${data.trips[i].arrival}</p>
                <p class='hour_result'>${new Date(data.trips[i].date).getHours()}:${new Date(data.trips[i].date).getMinutes()} </p>
                <p class='price_result'> ${data.trips[i].price}€</p>
                <button class='btn_book' type='button'>Book</button>
                </div>`
            }

        } else {
        document.querySelector('#background_image').src = 'url(./images/notfound.png)';
        document.querySelector('#right_container > h3').textContent = 'No trip found'
        }

        bookTrip()
        
    })
    
}


document.querySelector('#btn_search').addEventListener('click', displayResult)

















