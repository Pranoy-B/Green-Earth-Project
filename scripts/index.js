let totalAmount = 0;
const cartSection = []


const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((json) => displaycategories(json.categories));
}


const displaycategories = (categories) => {
    // get the container & empty it
    const categoryContainer = document.getElementById("category-container");
    // categoryContainer.innerHTML = ""
    // get into every category
    for (let category of categories){
        // create element
        const categoryBtn = document.createElement("div");
        categoryBtn.innerHTML = `
                <button id="category-btn-${category.id}" onclick="treeByCategory('${category.id}')" class="pl-2 text-left rounded-sm py-1 hover:bg-[#15803D] w-full hover:text-white active-btn">${category.category_name}</button>
        `
        // append into container
        categoryContainer.append(categoryBtn)
    }

}

const removeActive =() => {
  const activeBtn = document.querySelectorAll(".active-btn")
  activeBtn.forEach(btn=>btn.classList.remove("active"))
}


const loadTreeDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    // console.log(url)
    const res = await fetch(url);
    const details = await res.json();
    displayTreeDetails(details.plants)
} 

const displayTreeDetails = (plants) =>{
  const modalContainer = document.getElementById("tree-details-container")
  modalContainer.innerHTML = `
                          <div id="tree-details-container" class="bg-white">
                          <div class="modal-action">
                              <form method="dialog">
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn">Close</button>
                              </form>
                            </div>
                            <div class="p-2 h-[650px] w-[400px] space-y-3  card">
                              <img class="h-[320px] lg:h-[320px] w-full rounded-lg" src="${plants.image}" alt="">
                              <h3 onclick="loadTreeDetails(${plants.id})" class="text-xl font-bold plant-name">${plants.name}</h3>
                              <p class="text-justify">${plants.description}</p>
                              <div class="flex justify-between pr-2">
                              <span class="text-md py-1 px-4 rounded-4xl bg-green-200">${plants.category}</span>
                              <span class="text-xl"><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span class="plant-price"> ${plants.price}</span></span>
                              </div>
                              <button class="w-full p-2 rounded-3xl bg-green-700 text-white cart">Add to Cart</button>
                            </div>
                            
                          </div>
  
  `
  document.getElementById("tree_detail").showModal()
}



const treeByCategory = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive()
      const categoryBtn = document.getElementById(`category-btn-${id}`)
      categoryBtn.classList.add("active")

      displayByCategory(data.plants)

  });
    
}

const displayByCategory = (plants) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for( let plant of plants) {
        const plantCard = document.createElement("div");
        plantCard.innerHTML = `
            <div class="p-2 h-[650px] space-y-3  card">
                <img class="h-[320px] lg:h-[320px] w-full rounded-lg" src="${plant.image}" alt="">
                <h3 onclick="loadTreeDetails(${plant.id})" class="text-xl font-bold plant-name">${plant.name}</h3>
                <p class="text-justify card-description">${plant.description}</p>
                <div class="flex justify-between pr-2">
                <span class="text-md py-1 px-4 rounded-4xl bg-green-200">${plant.category}</span>
                <span class="text-xl"><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span class="plant-price"> ${plant.price}</span></span>
                </div>
                <button class="w-full p-2 rounded-3xl bg-green-700 text-white cart">Add to Cart</button>
            </div>
        `
        cardContainer.append(plantCard)


    }
    cartAdds()
 }



const loadCards = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
    .then((plant) => plant.json())
    .then((json) => displayCards(json.plants));
}

const displayCards = (plants) => {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    for( let plant of plants) {
        const plantCard = document.createElement("div");
        plantCard.innerHTML = `
            <div class="p-2 lg:h-[650px] space-y-3 card rounded-lg">
                <img class="h-[320px] lg:h-[320px] w-full rounded-lg" src="${plant.image}" alt="">
                <h3 onclick="loadTreeDetails(${plant.id})" class="text-xl font-bold plant-name">${plant.name}</h3>
                <p class="text-justify card-description">${plant.description}</p>
                <div class="flex justify-between pr-2">
                <span class="text-md py-1 px-4 rounded-4xl bg-green-200">${plant.category}</span>
                <span class="text-xl"><i class="fa-solid fa-bangladeshi-taka-sign"></i> <span class="plant-price"> ${plant.price}</span></span>
                </div>
                <button class="w-full p-2 rounded-3xl bg-green-700 text-white cart">Add to Cart</button>
          </div>
        `
        cardContainer.append(plantCard)
        
    }
    cartAdds()
}

const cartAdds = () => {
    const addCartBtns = document.querySelectorAll(".cart")
    for(let i = 0; i<addCartBtns.length; i++){
    addCartBtns[i].addEventListener("click", function(){
      alert("Items added to your cart")      
        const card = this.closest(".card")
        const plantName = card.querySelector(".plant-name").innerText;
        const plantPrice = card.querySelector(".plant-price").innerText

        const cartData = {
            name : plantName,
            price : plantPrice,
        }

        cartSection.push(cartData)
        updatedCart();
    });
  };
};


const updatedCart = () => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  totalAmount = 0;

  cartSection.forEach((data, index) => {
    totalAmount += parseInt(data.price);
    const div = document.createElement("div");
    div.classList.add("p-2", "flex", "justify-between");
    div.innerHTML = `
      <span>${data.name}</span>
      <span>
        <i class="fa-solid fa-bangladeshi-taka-sign"></i>${data.price}
        <button class="cancel ml-2 text-red-600 font-bold">x</button>
      </span>
    `
    cartContainer.appendChild(div);

   
    div.querySelector(".cancel").addEventListener("click", () => {
      cartSection.splice(index, 1);
      updatedCart();
    });
  });
  let totalDiv = document.getElementById("cart-total");
  if (!totalDiv) {
    totalDiv = document.createElement("div");
    totalDiv.id = "cart-total";
    totalDiv.classList.add("flex", "justify-between", "font-bold", "mt-2");
    cartContainer.appendChild(totalDiv);
  }
  totalDiv.innerHTML = `<span>Total</span> <span><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${totalAmount}</span>`;
}


loadCards()
loadCategories()