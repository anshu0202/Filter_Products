const data =[
    {
        id:1,
        name:"Invicta Men's Pro Diver",
        img :"https://www.specsraja.com/wp-content/uploads/2018/06/a.jpg",
        price:75,
        cat:"Dress"
    },
    {
        id:2,
        name:"Invicta Men's Pro Diver",
        img :"https://cdn-s3.touchofmodern.com/products/001/316/814/68c2ed2d03e72aef63a39791bbada290_medium.jpg?1543616374",
        price:40,
        cat:"Dress"
    },
    {
        id:3,
        name:"Invicta Men's Rem Diver",
        img :"https://cdn-s3.touchofmodern.com/products/001/316/814/68c2ed2d03e72aef63a39791bbada290_medium.jpg?1543616374",
        price:50,
        cat:"Sport"
    },
    {
        id:4,
        name:"Invicta Men's Tez Diver",
        img :"https://cdn-s3.touchofmodern.com/products/001/316/814/68c2ed2d03e72aef63a39791bbada290_medium.jpg?1543616374",
        price:85,
        cat:"Luxury"
    },
    {
        id:5,
        name:"Invicta Men's Pro Diver",
        img :"https://cdn-s3.touchofmodern.com/products/001/316/814/68c2ed2d03e72aef63a39791bbada290_medium.jpg?1543616374",
        price:54,
        cat:"Casual"
    }
]

const productsContainer= document.querySelector(".products")
const searchInput= document.querySelector(".search")
const categoriesContainer= document.querySelector(".cats")
const priceRange= document.querySelector(".priceRange")
const priceValue= document.querySelector(".priceValue")


const displayProducts=(filteredProducts)=>{
    console.log("fliter products are ",filteredProducts)
    productsContainer.innerHTML=filteredProducts.map(product=>
        `<div class="product">
        <img src=${product.img} alt="">
        <span class="name">${product.name}</span>
        <span class="priceText">$ ${product.price}</span>
        </div>`
    ).join("");
    // join is used tto remove the comma
}

displayProducts(data);

searchInput.addEventListener("keyup",(e)=>{
    const value= e.target.value.toLowerCase();

    if(value){
     displayProducts(data.filter(item=>
  item.name.toLowerCase().indexOf(value) !==-1))
    }
    else{
        displayProducts(data)
    }
});



const setCategories=()=>{
    const allCats= data.map(item=> item.cat)
    // spread operator is used here to add at the begging
    const categories= ["All",...allCats.filter((item,i)=>{
        return allCats.indexOf(item)===i
    })
];
categoriesContainer.innerHTML=categories.map(cat=>`<span class="cat">${cat}</span>`).join("")

categoriesContainer.addEventListener("click",(e)=>{
    
       const selectedCat = e.target.textContent;
       
       if(selectedCat === "All"){
        displayProducts(data)
       } 
       else {
        displayProducts(data.filter((item) => item.cat === selectedCat));
        }      
});
};


const setPrices =()=>{
    const priceList= data.map(item=> item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList)
    priceRange.min=minPrice;
    priceRange.max=maxPrice;
    priceRange.value=maxPrice;
    priceValue.textContent="$ "+ maxPrice

    priceRange.addEventListener("input",(e)=>{
        priceValue.textContent="$ "+ e.target.value
        displayProducts(data.filter(item=>item.price<=e.target.value))

    })

}



setPrices();
setCategories()