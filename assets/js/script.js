
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
          <div class="details">
            <h2>${product.strMeal}</h2>
            
            <img src="${product.strMealThumb}" alt="${product.strMeal}" >
            <p class="text1">Ingredienser:</p>
            <p class="ingredient">${product.strMeasure1} ${product.strIngredient1},${product.strMeasure2} ${product.strIngredient2},${product.strMeasure3} ${product.strIngredient3}, ${product.strMeasure4} ${product.strIngredient4}   </p>
            
            <p class="text2">Instruktioner:</p>
            <p>${product.strInstructions}</p>
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

  function CallForsearch(SearchDetail) {
    ClearApp();
    ClearSecondApp();
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
            <p class="ingredient">${product.strIngredient1}, ${product.strIngredient2}, ${product.strIngredient3}, ${product.strIngredient4 }   </p>
            <div id=Ingredient><img src="${product.strIngredient1}" alt="${product.strIngredient1}" style="max-width: 200px;"> </div>
            <p class="text1">Ingredienser:</p>
            <p>${product.strInstructions}</p>
          </div>
        `;
    }





    

/*

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
    const no1Container = document.getElementById('no1');

    if (!categories || categories.length === 0) {
      no1Container.innerHTML = "<p>No categories found.</p>";
      return;
    }

    const ul = document.createElement('ul');

    categories.forEach(category => {
      const li = document.createElement('li');
      li.textContent = category.strCategory;
      ul.appendChild(li);
    });

    no1Container.appendChild(ul);
  }

*/








     //Function for clear app
     function ClearApp(){
        const recipeContainer = document.getElementById('recipe-container');
        recipeContainer.innerHTML = '';
    }

    function ClearSecondApp(){
      const searchResultsDiv = document.getElementById('searchResults');
      searchResultsDiv.innerHTML = '';
  }





  //Omid code 100 get letter and fetch data 
  function fetchMealsByFirstLetter(letter) {
    ClearApp()
    
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
    <div>
      
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="max-width: 200px;">
      <h2 onclick="secondLink('${meal.idMeal}')">${meal.strMeal}</h2>
    </div>
  `).join('');
}

 // Omid code 100 end









// Burger Menu

function openMenu() {
    console.log("Menu clicked");
    const menu = document.querySelector('.menu');
    console.log(menu);
    menu.classList.toggle('active');

}

function LogoCallback() {
  ClearApp();
  fetchRandomMeals(6);
}




















