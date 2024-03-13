
const recipeContainer = document.getElementById('recipe-container');

// Fetch API Data
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(res => res.json())
    .then(data => {
        receiveData(data.categories);
    });

// ReceiveData function
function receiveData(recipes) {
    console.log(recipes);
    showListMeal(recipes);
}


//Show ListMeal function
function showListMeal(recipeList) {

    recipeContainer.innerHTML = '';

   
    recipeList.forEach(recipe => {
        const html = `
            <div class="recipe-item">
                <div class="recipe-title">${recipe.strCategory}</div>
                <div class="recipe-img">
                    <img src="${recipe.strCategoryThumb}" alt="${recipe.strCategory}">
                </div>
                
            </div>
        `;
   
        recipeContainer.innerHTML += html;
    });
}

// Burger Menu

function openMenu() {
    console.log("Menu clicked");
    const menu = document.querySelector('.menu');
    console.log(menu);
    menu.classList.toggle('active');
}