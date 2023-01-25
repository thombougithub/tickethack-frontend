function todayDate(){
    const dateToday = new Date()
    document.querySelector('#date').value=dateToday.toString()
}
function displayResult(){
    const departureValue=document.querySelector('#departure').value
    const arrivalValue=document.querySelector('#arrival').value
    const dateDay = document.querySelector('#date').value
    fetch(`http://localhost:3000/trips/${departureValue}/${arrivalValue}/${dateDay}`).then(response=>response.json())
    .then(data=>{
        if(data.result){
            document.querySelector('#background_image').display = 'none';
            for(let i=0;i<data.trips.length;i++){
                document.querySelector('#right_container').innerHTML+=`
                <div class='container_result>
                <p class='trip_result'>${data.trips[i].departure} > ${data.trips[i].arrival}</p>
                <p class='hour_result'>${data.trips[i].date} </p>
                <p class='price__result'> ${data.trips[i].price}</p>
                <button class='btn_book'>Book</button>
                </div>
                `
            }
        }else{
            document.querySelector('#background_image').src = 'url(./images/notfound.png)';
            document.querySelector('#right_container>h3').textContent='No trip found'
        }
    })
}
document.querySelector('#btn_search').addEventListener('click',displayResult)