
const recipeContainer = document.getElementById('recipe-container');
const testnew = document.getElementById('test');





// we fetch 6 random food and display
document.addEventListener("DOMContentLoaded", function() {
    fetchRandomMeals(6);
  });
  
  function fetchRandomMeals(numberOfMeals) {
    const urls = Array.from({ length: numberOfMeals }, () => 'https://www.themealdb.com/api/json/v1/1/random.php');
  
    Promise.all(urls.map(url =>
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => data.meals[0])
        .catch(error => console.error('Error fetching meal:', error))
    ))
    .then(meals => {
      displayRandomMeals(meals);
    });
  }
  
  function displayRandomMeals(meals) {
    const recipeContainer = document.getElementById('recipe-container');
  
    if (!meals || meals.length === 0) {
        recipeContainer.innerHTML = "<p>No meals found.</p>";
      return;
    }
    recipeContainer.innerHTML = meals.map(meal => `

    <div class="recipe-item" onclick="SendId('${meal.idMeal}')">
    <div class="recipe-title">${meal.strMeal}</div>
    <div class="recipe-img">
        <img src="${meal.strMealThumb}" alt="${meal.strMealThumb}">
    </div>
    
</div>
    `).join('');
  }
  


  // after click on a food we send food Id with onclick function to get detail of specefic food

  function SendId(test) {
    ClearApp();
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${test}`;
         
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            displayProductDetails(data.meals[0]);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
      }
  
      function displayProductDetails(product) {
        const newCont = document.getElementById('recipe-container');
  
        console.log(product);
     
        if (!product) {
            newCont.innerHTML = "<p>No product found.</p>";
          return;
        }
 
        newCont.innerHTML = `
          <div>
            <h2>${product.strMeal}</h2>
            
            <img src="${product.strMealThumb}" alt="${product.strMeal}" style="max-width: 200px;">
            <p>${product.strIngredient1}, ${product.strIngredient2}, ${product.strIngredient3}   </p>
            <div id=Ingredient><img src="${product.strIngredient1}" alt="${product.strIngredient1}" style="max-width: 200px;"> </div>
            <p>${product.strInstructions}</p>
            <h1>${product.strIngredient8}</h1>
          </div>
        `;
    }







     //Function for clear app
     function ClearApp(){
        const recipeContainer = document.getElementById('recipe-container');
        recipeContainer.innerHTML = '';
    }













// Burger Menu

function openMenu() {
    console.log("Menu clicked");
    const menu = document.querySelector('.menu');
    console.log(menu);
    menu.classList.toggle('active');
}
<<<<<<< HEAD
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
  
  
=======

function LogoCallback() {
  ClearApp();
  fetchRandomMeals(6);
}
>>>>>>> 2e6514651bf1982a079531fdf34591e91c4c8e2f
