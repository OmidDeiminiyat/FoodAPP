
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
// JavaScript Buttons
document.getElementById('button1').addEventListener('click', function() {
    alert('Button1');
  });
  
  document.getElementById('button2').addEventListener('click', function() {
    alert('Button2');
  });
  
  document.getElementById('button3').addEventListener('click', function() {
    alert('button3');
    
  });
  document.getElementById('button4').addEventListener('click', function() {
    alert('Button4');
  });
  
  document.getElementById('button5').addEventListener('click', function() {
    alert('Button5');
  });
  
  document.getElementById('button6').addEventListener('click', function() {
    alert('button6');
    
  });
  document.getElementById('button7').addEventListener('click', function() {
    alert('Button7');
  });
  
  document.getElementById('button8').addEventListener('click', function() {
    alert('Button8');
  });
  
  document.getElementById('button9').addEventListener('click', function() {
    alert('button9');
    
  });
  
  