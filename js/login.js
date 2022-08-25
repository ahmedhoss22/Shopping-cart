const email=document.getElementById('email')
const pass=document.getElementById('password')
const submit=document.getElementById('submit')

userEmail=localStorage.getItem('email')
userPass=localStorage.getItem('password')

submit.addEventListener('click' ,(e)=>{
    e.preventDefault();

    if(email.value != '' && pass.value != ''){
        localStorage.setItem('log' , 'true')
            if(email.value.trim() === userEmail && pass.value.trim()=== userPass){
                setTimeout(()=>{
                    location.assign('index.html')
                },1000)
            }else{
                alert('Invalid password')
            }
    }
})