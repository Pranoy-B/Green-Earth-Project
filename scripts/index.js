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
                <button class="pl-2 text-left rounded-sm py-1 hover:bg-[#15803D] w-full hover:text-white ">${category.category_name}</button>
        `
        // append into container
        categoryContainer.append(categoryBtn)
    }

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
            <div id="card" class="p-2 space-y-3 max-h-full items-stretch">
                <img class="h-[250px] lg:h-[178px] w-full" src="${plant.image}" alt="">
                <h3 class="text-xl font-bold">${plant.name}</h3>
                <p class="text-justify">${plant.description}</p>
                <div class="flex justify-between pr-2">
                <span class="text-xl py-1 px-4 rounded-4xl bg-green-200">${plant.category}</span>
                <span class="text-xl"><i class="fa-solid fa-bangladeshi-taka-sign"></i> ${plant.price}</span>
                </div>
                <button class="w-full p-2 rounded-3xl bg-green-700 text-white">Add to Cart</button>
          </div>
        `
        cardContainer.append(plantCard)
    }
}

loadCards()
loadCategories()