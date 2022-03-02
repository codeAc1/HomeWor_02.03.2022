let products=JSON.parse(localStorage.getItem("basket"));
let count=1;
for(let product of products)
{
    //console.log(product)

    let tdN=document.createElement("td");
    let tdImage=document.createElement("td");
    let tdName=document.createElement("td");
    let tdCount=document.createElement("td");
    let tdPrice=document.createElement("td");
    let tdAmount=document.createElement("td");

    tdN.innerText=count;
    count++;

    let img=document.createElement("img");
    img.setAttribute("src",product.Src);
    tdImage.append(img);
    tdImage.classList.add("ImgClass")


    tdName.innerText=product.Name;
    tdCount.innerText=product.Count;
    tdPrice.innerText=product.Price;
    tdAmount.innerText=product.Count*product.Price

    let tr=document.createElement("tr")

    tr.append(tdN,tdImage,tdName,tdCount,tdPrice,tdAmount)

    document.querySelector(".table").lastElementChild.append(tr)



}


function CountBasket() {
    let basket = JSON.parse(localStorage.getItem("basket"));
    let countPro = basket.reduce((total, p) => total + p.Count, 0);
    let countItem = basket.length
    document.getElementById("ProCount").innerText = countItem;
    document.getElementById("ProCountItem").innerText = countPro;
}
CountBasket();
