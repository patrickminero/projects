//variables
let form = document.getElementById('form');
let name = document.getElementById('name');
let email = document.getElementById('email');
let message = document.getElementById('message');
let submit = document.getElementById('submit');
let errorElement = document.getElementById('error');
let password = document.getElementById('password')
let passwordKey = '#Parangara19';
let valid;
errorMessage = [];

name.addEventListener('blur', ()=>{
    if(name.value === '' || name.value == null ){
        errorMessage.push('You need to enter name')
    }

    if(name.value.length <= 2){
        errorMessage.push('Name is too short');
    }
})

email.addEventListener('blur', ()=>{
    let emailArray = email.value.split('');
    if(!emailArray.includes('@') || emailArray.indexOf('@') === emailArray.length -1 || emailArray.indexOf('@') === 0){
        errorMessage.push('Pleade enter a valid email address')
    }
})

message.addEventListener('blur', ()=>{
    if(message.value.length < 10){
        errorMessage.push('Message needs to be longer than 10 characters')
    }
})


form.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(errorMessage < 1){
        document.getElementById('success').innerHTML = "Message Sent!"
        form.reset()
    }else{
        document.getElementById('success').innerHTML = "Error!"
        document.getElementById('success').style.backgroundColor = 'red'
        errorMessage.forEach(element => {
            let p = document.createElement('p');
            p.innerHTML = element;
            errorElement.appendChild(p);
        });
    }
});

// password.addEventListener('focus', function(){
//     document.getElementById('password-message').style.display = 'block';
// });
// password.addEventListener('blur', function(){
//     document.getElementById('password-message').style.display = 'none';
// });

// password.addEventListener('keyup', function(){
    
//     let lowerCase = /[a-z]/g;
//     let upperCase = /[A-Z]/g;
//     let digits = /[0-9]/g;
//     let characters = /[!@#$%^&*()_+{}|"?><,./;']/g
//     let lower = document.getElementById('lower');
//     let upper = document.getElementById('upper');
//     let number = document.getElementById('number');
//     let character = document.getElementById('character');
//     if(password.value.match(lowerCase)){
//         lower.style.color = 'green';
//         document.querySelector('#lower span').innerHTML = '✔'
//         valid++
//     }else{
//         lower.style.color = 'var(--primary)';
//         document.querySelector('#lower span').innerHTML = '✖';
//     }
//     if(password.value.match(upperCase)){
//         upper.style.color = 'green';
//         document.querySelector('#upper span').innerHTML = '✔';
//         valid++
//     }else{
//         upper.style.color = 'var(--primary)';
//         document.querySelector('#upper span').innerHTML = '✖';
//     }
//     if(password.value.match(digits)){
//         number.style.color = 'green';
//         document.querySelector('#number span').innerHTML = '✔';
//         valid++
//     }else{
//         number.style.color = 'var(--primary)';
//         document.querySelector('#number span').innerHTML = '✖';
//     }
//     if(password.value.match(characters)){
//         character.style.color = 'green';
//         document.querySelector('#character span').innerHTML = '✔';
//         valid++
//     }else{
//         character.style.color = 'var(--primary)';
//         document.querySelector('#character span').innerHTML = '✖';
//     }
// })

// ✔ pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])"