const userName=document.getElementById('user-name');
const cartBox=document.querySelector('.cart-box')
const loginBox=document.querySelector('.login')
const row =document.querySelector('.row')
const favouriteItems=document.getElementById('favouriteItems');
const cart=document.querySelector('.cart')
const cartList=document.querySelector('#favouriteItems');
const number=document.getElementById('number')
const select=document.querySelector('.custom-select')
const search=document.querySelector('.search')
const logoutBox=document.querySelector('.logout-box')
const logout=document.querySelector('.logout')
const userNameBox=document.querySelector('.userName')

console.log(userNameBox)

let favourite=[];
let product=[]
product.push('nothing')
let userProducts=[]

logout.addEventListener('click',()=>{
    localStorage.removeItem('log')
    location.assign('login.html')
})


class products{
    constructor(name,price,category,img,id){
        this.name=name;
        this.category=category,
        this.img=img
        this.id=id
        this.price=price;
        this.count=1
        product.push(this);
    }
}

const product1=new products('T-shirt adidas','80 $','fashion','images/product1.jpg',1);
const product2=new products('earpods','150 $','Phone accessories ','images/product2.jpg',2);
const product3=new products('Jacket','120 $','fashion','images/product3.jpg',3);
const product4=new products('Adidas bottle','50 $','Sport','images/product4.jpg',4);
const product5=new products('Glasses','80 $','Men accessories','images/product5.jpg',5);
const product6=new products('Cap','20 $','Men accessories','images/product6.jpg',6);
const product7=new products('Bag adidas',' 110 $','Bags','images/product7.jpg',7);
const product8=new products('Shoes adidas','80 $','sport','images/product8.jpg',8);
const product9=new products('Bag','100 $','fashion','images/product9.png',9);

function draw(){
for(let i =1;i<product.length;i++){
    row.innerHTML+=`
    <div class="card col-lg-4 col-md-6 col-sm-12 mt-1 mb-1" style="width: 18rem;">
        <img src="${product[i].img}" class="card-img-top" alt="product-1">
            <div class="card-body">
                <h5 class="card-title">Product : ${product[i].name}</h5>
                <h5 class="card-text">Price :  ${product[i].price}</h5>
                 <h5>Category : ${product[i].category}</h5>
                    <div class="d-flex" style="justify-content: space-between;"> 
                        <button class="btn btn-primary" id="${product[i].id}" onclick='addItems(this.id)'>Add to cart</button>
                        <button class="btn btn-danger" id="${product[i].id}0000" onclick='removeItems(this.id)'>Remove from cart</button>
                        <a href="#" style="margin-left: auto; display: inline-block;" ><i class="fas fa-heart" style="font-size: 1.5rem;" id="${product[i].id}00000" onclick='addFavourite(this.id)'></i></a>
                    </div> 
            </div>
    </div> <!-- End of card -->
    `
}
}

draw();
function addItems(id){
   let addItem= document.getElementById(id)
   let removeItem= document.getElementById(id+'0000')
    if(localStorage.getItem('first')  && localStorage.getItem('log')){
        addItem.style.display='none';
        removeItem.style.display='block';
        userProducts.push(product[id])
        localStorage.setItem('items',JSON.stringify(userProducts));
        cartDraw()
        number.innerHTML=userProducts.length
    }else{
        setTimeout(()=>{
               location.assign('login.html')
        },1000)
     
    }
}

function removeItems(id){
    let removeItem= document.getElementById(id)
    let addItem= document.getElementById(id/10000);
    addItem.style.display='block';
    removeItem.style.display='none';

    let id2=id/10000

    var ele= userProducts.findIndex((x)=>{
        return x.id==id2
    })
    userProducts.splice(ele,1)
        if(userProducts.length==0){
            cart.style.display='none';
        }
    localStorage.setItem('items',JSON.stringify(userProducts));
    cartDraw()
    number.innerHTML=userProducts.length

} 

function cartDraw(){
    number.innerHTML=userProducts.length
    if(userProducts.length != 0){
            if(userProducts.length !=0){
                // cart.style.display='block';
                cartList.innerHTML=''
                        for(let i=0;i<userProducts.length;i++){
                        cartList.innerHTML+=`
                        <li>
                            <span style="margin-right: 20px;">${userProducts[i].name}</span>
                           <div class="plus">
                                <span style="margin-right: 0px;">${userProducts[i].count}</span>
                                <a href="#" class="pluss"><i class="fas fa-plus text-success" onclick="plusBtn(${userProducts[i].id})"></i></a>
                                <a href="#" class="minus"><i class="fas fa-minus text-danger" onclick="minusBtn(${userProducts[i].id})"></i></a>
                            </div>
                        </li>
                        `
                        }
            }else{
                cart.style.display='none';
            }
    }else if(localStorage.getItem('items')){
        userProducts=JSON.parse(localStorage.getItem('items'))
        if(userProducts.length!=0){
                    cartDraw()

        }
        
        let btns=userProducts.map((arr)=>{
            return arr.id;
        })
        btns.forEach(ele => {
            document.getElementById(ele).style.display='none'
            document.getElementById(ele+'0000').style.display='block'
        });
    }else{

    }
}
cartDraw()

function cartBtn(){
    const arrow=document.querySelector('#arrow');
    arrow.style.color='#007bff';
    if(cart.style.display=='none' && userProducts.length!=0){
        cart.style.display='block'
        arrow.classList='fas fa-caret-up arrow'
    }else{
        cart.style.display='none'
        arrow.classList='fas fa-caret-down arrow'


    }
}

function addFavourite(id,e){
    const ele=document.getElementById(id)
    mainId=id/100000;
if(localStorage.getItem('first') && localStorage.getItem('log')){
    if(ele.style.color=='red'){
        ele.style.color='rgb(185, 184, 184)'

        favourite.splice(favourite.findIndex((x)=>{
            return favourite.id==id;
        }),1)
        localStorage.setItem('favourite',JSON.stringify(favourite));
    }else{
        ele.style.color='red'
        favourite.push(product[id/100000]) 
        localStorage.setItem('favourite',JSON.stringify(favourite));
    }
}else{
    setTimeout(()=>{
        location.assign('login.html')
    },500)
}

    addEventListener('click',(e)=> e.preventDefault())

}

if(localStorage.getItem('favourite')){
    let fav= JSON.parse(localStorage.getItem('favourite')) 
    
    for(let i =0;i<fav.length;i++){
        let x=document.getElementById(fav[i].id+'00000')
        x.style.color='red'
    }
}

function plusBtn(id){
    ele=userProducts.find((x)=>{
       return x.id==id
    })
    ele.count++;
    localStorage.setItem('items',JSON.stringify(userProducts))
    cartDraw()
}

function minusBtn(id){
    const btnDanger=document.getElementById(id+"0000")
    const btnprimary=document.getElementById(id)

    ele=userProducts.find((x)=>{
       return x.id==id
    })
        if(userProducts.length!=1){
            if(ele.count !=1){
                ele.count--;
                localStorage.setItem('items',JSON.stringify(userProducts))
                cartDraw() 
            }else{
                let index= userProducts.indexOf(ele)
                userProducts.splice(index,1)
                localStorage.setItem('items',JSON.stringify(userProducts))
                btnDanger.style.display='none'
                btnprimary.style.display='block'
                draw() 
                cartDraw() 
            }
      
        }else{
            let index= userProducts.indexOf(ele)
            userProducts.splice(index,1)
            localStorage.setItem('items',JSON.stringify(userProducts))
            cart.style.display='none';
            btnDanger.style.display='none'
            btnprimary.style.display='block'
            number.innerHTML=0
            cartDraw() 
            draw()
        }
    }

    search.addEventListener('keyup',()=>{
        row.innerHTML=''

        if(search.value){
                if(select.value=='Search by Name'){
                    for(let i =1;i<product.length;i++){
                        if(product[i].name.toLowerCase().includes(search.value)){
                            row.innerHTML+=`
                            <div class="card col-lg-4 col-md-6 col-sm-12 mt-1 mb-1" style="width: 18rem;">
                                <img src="${product[i].img}" class="card-img-top" alt="product-1">
                                    <div class="card-body">
                                        <h5 class="card-title">Product : ${product[i].name}</h5>
                                        <h5 class="card-text">Price :  ${product[i].price}</h5>
                                        <h5>Category : ${product[i].category}</h5>
                                            <div class="d-flex" style="justify-content: space-between;"> 
                                                <button class="btn btn-primary" id="${product[i].id}" onclick='addItems(this.id)'>Add to cart</button>
                                                <button class="btn btn-danger" id="${product[i].id}0000" onclick='removeItems(this.id)'>Remove from cart</button>
                                                <a href="#" style="margin-left: auto; display: inline-block;" ><i class="fas fa-heart" style="font-size: 1.5rem;" id="${product[i].id}00000" onclick='addFavourite(this.id)'></i></a>
                                            </div> 
                                    </div>
                            </div> <!-- End of card -->
                            `
                        
                        }
                    }
                }else{
                    for(let i =1;i<product.length;i++){
                        if(product[i].category.toLowerCase().includes(search.value)){
                            row.innerHTML+=`
                            <div class="card col-lg-4 col-md-6 col-sm-12 mt-1 mb-1" style="width: 18rem;">
                                <img src="${product[i].img}" class="card-img-top" alt="product-1">
                                    <div class="card-body">
                                        <h5 class="card-title">Product : ${product[i].name}</h5>
                                        <h5 class="card-text">Price :  ${product[i].price}</h5>
                                        <h5>Category : ${product[i].category}</h5>
                                            <div class="d-flex" style="justify-content: space-between;"> 
                                                <button class="btn btn-primary" id="${product[i].id}" onclick='addItems(this.id)'>Add to cart</button>
                                                <button class="btn btn-danger" id="${product[i].id}0000" onclick='removeItems(this.id)'>Remove from cart</button>
                                                <a href="#" style="margin-left: auto; display: inline-block;" ><i class="fas fa-heart" style="font-size: 1.5rem;" id="${product[i].id}00000" onclick='addFavourite(this.id)'></i></a>
                                            </div> 
                                    </div>
                            </div> <!-- End of card -->
                            `
                        
                        }
                    }
                }
        }else{
            draw()
        }
   
    })
let btnAdd=document.querySelectorAll('.btn-primary')
let btnremove=document.querySelectorAll('.btn-danger')
let btnfav=document.querySelectorAll('.fa-heart')


    if(localStorage.getItem('first') && localStorage.getItem('log')){
        userName.innerHTML=`${localStorage.getItem('first')}`
        cartBox.style.display='block';
        loginBox.style.display='none';
        logoutBox.style.display='block';
    }else{
        loginBox.style.display='block';
        cartBox.style.display='none';
        logoutBox.style.display='none'
        userNameBox.style.display='none'

        btnAdd.forEach((ele)=>{
            ele.style.display='block'
        })
        btnremove.forEach((ele)=>{
            ele.style.display='none'
        })
        btnfav.forEach((ele)=>{
            ele.style.color='rgb(185, 184, 184)'
        })
    }
    

   function viewProduct(){
    location.assign('products.html')
   }