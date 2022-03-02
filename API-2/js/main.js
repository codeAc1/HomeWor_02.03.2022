let btn=document.querySelector("#btn_add");
let allPost=document.querySelector(".allPost");
let dataNum = 0;
btn.onclick=function(){

     let http=new XMLHttpRequest();
     
     http.onreadystatechange=function()
     {
         if(this.readyState==4 && this.status==200)
         {
             
             let response=JSON.parse(this.responseText);
             for(let post of response)
             {
                 dataNum++;
                let col=document.createElement("div");
                col.classList.add("col-lg-3","box","col-12","col-md-6");

                let card =document.createElement("div");
                card.classList.add("card");
                card.setAttribute("data-id",dataNum)

                let card_h=document.createElement("div");
                card_h.classList.add("card-header")

                let image=document.createElement("img");
                image.setAttribute('src',post.image);
                image.classList.add("card-img-top");

                let cardBody=document.createElement("div");
                cardBody.classList.add("card-body");

                let cardTitle=document.createElement("h5");
                cardTitle.classList.add("card-title");
                cardTitle.innerText=post.title;

                let desc=document.createElement("p");
                desc.classList.add("card-text");
                desc.innerText="Price"+" "+"$"+post.price;


                let btn1=document.createElement("button");
                btn1.classList.add("btn","btn-primary");
                btn1.innerText="Watch"

                let btn2=document.createElement("button");
                btn2.classList.add("btn","btn-success");
                btn2.innerText="Add To Card"

                cardBody.append(cardTitle,desc,btn1,btn2);
                card_h.append(image)
                card.append(card_h,cardBody);
                col.append(card);
                allPost.append(col);
                
                
             }
             
         }
         Trim();
         AddBasketBtn();
     }
     http.open("GET","./products.json");
     http.send();
     

     

}


function Trim(){
    let str=document.querySelectorAll(".box .card .card-body .card-title")
    for(elem of str)
    {
        let str = elem.innerText;
        if(str.length>18){
            elem.innerText=str.substring(0,18)+"..."
        }
        else{
            elem.innerText=str
        }
    }
}

if(localStorage.getItem("basket")==null)
{
    localStorage.setItem("basket",JSON.stringify([]));
}

function AddBasketBtn()
{
    let addBasketAll=document.querySelectorAll(".card-body .btn-success");
    for(let addBasket of addBasketAll){
        addBasket.addEventListener("click",function(e){
            e.preventDefault();
            let basket=JSON.parse(localStorage.getItem("basket"));
            let name=this.parentElement.firstElementChild.innerText
            let src=this.parentElement.previousElementSibling.firstElementChild.getAttribute("src");
            let data_id=this.parentElement.parentElement.getAttribute("data-id");
            let price=this.parentElement.firstElementChild.nextElementSibling.innerHTML;
            let priceN=price.substring(7,price.length)
            let priceNum=Number(priceN)
            let existingPro=basket.find(p=>p.Id==data_id);
            if(existingPro==undefined)
            {
                basket.push(
                    {   
                        Id:data_id,
                        Name:name,
                        Src:src,
                        Price:priceNum,
                        Count:1
                    })
            }
            else{
                existingPro.Count+=1;
            }
            localStorage.setItem("basket",JSON.stringify(basket));
        })
    }
}




