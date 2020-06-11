const weatherForm= document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#msg1')
const messageTwo=document.querySelector('#msg2')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent='Loading....'
    messageTwo.textContent=''
    const location=search.value
   

    fetch('/weather?address='+encodeURIComponent(location)+'').then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent=data.error
            } else {
                
                messageOne.textContent=data.address+', '+data.forecast.time
                messageTwo.textContent=data.forecast.report+', '+data.forecast.weather
            }
        })
    })
})