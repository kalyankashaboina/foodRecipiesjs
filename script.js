const searchBtn = document.getElementById('search-btn');
// search page
const mealList = document.getElementById('meal');


// create seemore card
const mealDetailsContent = document.querySelector('.meal-details-content');
// recipie closing button
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);

// removes  seemorecard
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});


// get meal list that matches with the search input

function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {


        // console.log(mealList.classList)
        // console.log(data)
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
        // console.log(mealList)
    });
}



// function to get the recipe of a meal
function getMealRecipe(e) {
    e.preventDefault();
    
    
    if (e.target.className === 'recipe-btn') {
        // find the meal item element
        let mealItem = e.target.closest('.meal-item');
        
        // fetch the meal data using the meal items data-id 
        console.log(mealItem.dataset.id)
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
            .then(response => response.json())
            .then(data => mealRecipeModal(data.meals));
    }
}


// create a show more page
// here above we are calling mealrecipemodal functuion and passing argument and here below we are writing a function cards
function mealRecipeModal(meal){
    console.log(meal);


    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    console.log(mealDetailsContent.parentElement)

    mealDetailsContent.parentElement.classList.add('showRecipe');
}