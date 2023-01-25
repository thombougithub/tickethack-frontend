function displayBooking(){
    fetch('http://localhost:3000/book')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.result){
                for(let i =0 ; i < data.result.length; i++){
                    for(let j = 0 ; j <data.result[i].trips.length; j++){
                document.querySelector('.container_booking').innerHTML += 
                `<div  class='container_result_booking'>
                <p class='trip_booking'>${data.result[i].trips[j].departure} > ${data.result[i].trips[j].arrival}</p>
                <p class='hour_booking'>${new Date(data.result[i].trips[j].date).getHours()}:${new Date(data.result[i].trips[j].date).getMinutes()} </p>
                <p class='price_booking'> ${data.result[i].trips[j].price}€</p>
                </div>`
            }
            }
        }
        })

}

displayBooking()
