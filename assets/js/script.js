
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
    Clearinte();

    const foodName1 = test; 
    getNewOne(foodName1);
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
          <div class="details">
            <h2>${product.strMeal}</h2>
            
            <img src="${product.strMealThumb}" alt="${product.strMeal}" >
            <p class="text1">Ingredients:</p>
            <p class="ingredient">${product.strMeasure1} ${product.strIngredient1},${product.strMeasure2} ${product.strIngredient2},${product.strMeasure3} ${product.strIngredient3}, ${product.strMeasure4} ${product.strIngredient4}   </p>
            
            <p class="text2">Instructions:</p>
            <p class="text3">${product.strInstructions}</p>
          </div>
        `;
    }



    //Search function 
  // here

  const searchInput = document.getElementById('searchInput');
  const searchResultsDiv = document.getElementById('searchResults');

  searchInput.addEventListener('input', function() {
  
      const searchTerm = this.value.trim();
      if (searchTerm === '') {
          searchResultsDiv.innerHTML = ''; 
          return;
      }

      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
          .then(response => response.json())
          .then(data => {
              if (data.meals === null) {
                  searchResultsDiv.innerHTML = '<p>No results found</p>';
              } else {
                  const meals = data.meals;

                  const mealList = meals.map(meal => `<div class="searchMeal" onclick="CallForsearch('${meal.idMeal}')"><h2>${meal.strMeal}</h2><img src="${meal.strMealThumb}" alt="${meal.strMeal}"></div>`).join('');

                  searchResultsDiv.innerHTML = mealList;
              }
          })
          .catch(error => {
              console.error('Error fetching data:', error);
              searchResultsDiv.innerHTML = '<p>Failed to fetch data. Please try again later.</p>';
          });
  });





  // after click on a food we send food Id with onclick function to get detail of specefic food
//Work here
  
  function CallForsearch(SearchDetail) {
    ClearApp();
    ClearSecondApp();
    Clearinte();

    const foodName1 = SearchDetail; 
    getNewOne(foodName1);

        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${SearchDetail}`;
         
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
        const searchDisplay = document.getElementById('recipe-container');
  
        console.log(product);
     
        if (!product) {
          searchDisplay.innerHTML = "<p>No product found.</p>";
          return;
        }

        searchDisplay.innerHTML = `
                                    <div class="details">
                                      <h2>${product.strMeal}</h2>
                                      
                                      <img src="${product.strMealThumb}" alt="${product.strMeal}" >
                                     
                                      <p class="text2">Instructions:</p>
                                      <p>${product.strInstructions}</p>
                                    </div>
                                  `;

    }

// Here we fetch ingredients from search result
    async function getNewpp(foodName1) {
      try {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodName1}`);
          const data = await response.json();
          return data.meals[0];
      } catch (error) {
          console.error('Error fetching ingredients:', error);
      }
    }
    
    async function getNewOne(foodName1) {
      const foodData = await getNewpp(foodName1);
    
      
    
    
      const ingredientsContainer = document.getElementById('detail');
    
      if (foodData) {
          for (let i = 1; i <= 20; i++) { // Assuming there are maximum 20 ingredients
            console.log(foodData);
              const ingredientName = foodData[`strIngredient${i}`];
    
              
              if (ingredientName) {
              
                const containerDiv = document.createElement('span');
                containerDiv.classList.add('container');
                
         
    
                  const imageUrl = `https://www.themealdb.com/images/ingredients/${ingredientName}.png`;
    
                  const img = document.createElement('img');
                  img.src = imageUrl;
                  img.alt = ingredientName;
    
                  const paraf = document.createElement('p');
                  paraf.textContent = `${ingredientName}`;
    
    
    
                
                  containerDiv.appendChild(img);
                  containerDiv.appendChild(paraf);
                
                  ingredientsContainer.appendChild(containerDiv);
              }
            
          }
      }
    }




    





// ftch all categories
document.addEventListener("DOMContentLoaded", function() {
    fetchMealCategories();
  });

  function fetchMealCategories() {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        createCategoryView(data.meals);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }




  function createCategoryView(categories) {
    const no1Container = document.getElementById('GetCategories');

    if (!categories || categories.length === 0) {
      no1Container.innerHTML = "<p>No categories found.</p>";
      return;
    }
console.log(categories);

    no1Container.innerHTML = categories.map(category => `
    <ul>
    <li onclick="fetchFoodCate('${category.strCategory}')" >${category.strCategory}</li>
  </ul> 
    `).join('');
  }






 






     //Function for clear app
     function ClearApp(){
        const recipeContainer = document.getElementById('recipe-container');
        recipeContainer.innerHTML = '';
    }

    function ClearSecondApp(){
      const searchResultsDiv = document.getElementById('searchResults');
      searchResultsDiv.innerHTML = '';
  }
  function Clearinte() {
    const ingredientsContainer = document.getElementById('detail');
   ingredientsContainer.innerHTML = '';
  }





  // code 100 get letter and fetch data 
  function fetchMealsByFirstLetter(letter) {
    ClearApp()
    Clearinte();
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
    return fetch(url)
      .then(response => {
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        return response.json();
      })
      .then(data => {
        displayMeals(data.meals);
      })
      .catch(error => {

        console.error('There was a problem with the fetch operation:', error);
      });
  }
  
  
  // get letter after click and send to Modal for fetch data
  function pushed(value) {
    console.log(value);

    fetchMealsByFirstLetter(value)
    .then(data => {

      console.log(data);
    });
}


// Here we create a view of foods which acourding to code 100
function displayMeals(meals) {
  const recipeContainer = document.getElementById('recipe-container');

  if (!meals || meals.length === 0) {
    recipeContainer.innerHTML = "<p>No meals found.</p>";
    return;
  }

  recipeContainer.innerHTML = meals.map(meal => `
  <div onclick="reDirect('${meal.idMeal}')" class="letter">
      
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" >
      <h2>${meal.strMeal}</h2>
    </div>
  `).join('');
}

 //  code 100 end
 // After click on a food from letter we displaye all food with same letter 


function reDirect(tenewVersionst) {
  const foodName = tenewVersionst; 
  displayIngredientsForFood(foodName);
  ClearApp();
  Clearinte();
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${tenewVersionst}`;
       
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(letterDataSend => {
          newVerData(letterDataSend.meals[0]);
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }





    function newVerData(product) {
      const newCont = document.getElementById('recipe-container');

     // console.log(product);
   
      if (!product) {
          newCont.innerHTML = "<p>No product found.</p>";
        return;
      }


      newCont.innerHTML = `
      <div class="details">
    <h2>${product.strMeal}</h2>
    <img src="${product.strMealThumb}" alt="${product.strMeal}" >
    <p class="text2">Instructions:</p>
    <p>${product.strInstructions}</p>
  </div>
      `;
  
// after click on food we display all information of food


function LetterGenerateIngeredients(product) {
let ingredientsHTML = '';


const numbers = Array.from({ length: 20 }, (_, i) => i + 1);


numbers.forEach(i => {
const ingredient = product[`strIngredient${i}`];
const measurement = product[`strMeasure${i}`];

// console.log(ingredient);
if (ingredient && measurement) {

ingredientsHTML += `<p class="ingredients">${measurement} ${ingredient}</p>`;

} else {

return;
}
});

return ingredientsHTML;
}

}




async function fetchIngredients(foodName) {
  try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodName}`);
      const data = await response.json();
      return data.meals[0];
  } catch (error) {
      console.error('Error fetching ingredients:', error);
  }
}

async function displayIngredientsForFood(foodName) {
  const foodData = await fetchIngredients(foodName);

  


  const ingredientsContainer = document.getElementById('detail');

  if (foodData) {
      for (let i = 1; i <= 20; i++) { // Assuming there are maximum 20 ingredients
        console.log(foodData);
          const ingredientName = foodData[`strIngredient${i}`];

          
          if (ingredientName) {
          
            const containerDiv = document.createElement('span');
            containerDiv.classList.add('container');
            
     

              const imageUrl = `https://www.themealdb.com/images/ingredients/${ingredientName}.png`;

              const img = document.createElement('img');
              img.src = imageUrl;
              img.alt = ingredientName;

              const paraf = document.createElement('p');
              paraf.textContent = `${ingredientName}`;



            
              containerDiv.appendChild(img);
              containerDiv.appendChild(paraf);
            
              ingredientsContainer.appendChild(containerDiv);
          }
        
         
      }
  }
}













  // after click on a food we send food Id with onclick function to get detail of specefic food

  function ThirdLink(byLetter) {
    ClearApp();
    Clearinte();
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${byLetter}`;
         
        fetch(url)
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            DisplayByLetterGet(data.meals[0]);
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
      }
  
      function DisplayByLetterGet(product) {
        const newCont = document.getElementById('recipe-container');
  
        console.log(product);
     
        if (!product) {
            newCont.innerHTML = "<p>No product found.</p>";
          return;
        }
 
        newCont.innerHTML = `
          <div class="details">
            <h2>${product.strMeal}</h2>
            
            <img src="${product.strMealThumb}" alt="${product.strMeal}" >
            <p class="text1">Ingredients:</p>
            <p class="ingredient">${product.strMeasure1} ${product.strIngredient1},${product.strMeasure2} ${product.strIngredient2},${product.strMeasure3} ${product.strIngredient3}, ${product.strMeasure4} ${product.strIngredient4}   </p>
            <div id="Ingredient"><img src="${product.strIngredient1}" alt="${product.strIngredient1}" style="max-width: 200px;"> </div>
            <p class="text2">Instructions:</p>
            <p>${product.strInstructions}</p>
          </div>
        `;
    }

    



// BURGER MENU

function openMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
    openDialog();

}

// LOG CALLBACK
function LogoCallback() {
  ClearApp();
  fetchRandomMeals(6);
}



// DIALOG
function openDialog() {
  document.getElementById('dialog').style.display = 'block';
}

function closeDialog() {
  document.getElementById('dialog').style.display = 'none';
}

// REDIRECTION
function redirectToMain() {
  window.location.href = "index.html";
}

function redirectToAPI() {
  window.location.href = 'https://www.themealdb.com/api.php';
}


function toggleDialog() {
  var dialog = document.getElementById('dialog1');
  dialog.classList.toggle('hidden');
}


function toggleDialog() {
  const dialog = document.getElementById('dialog1');
  dialog.classList.toggle('hidden');
}