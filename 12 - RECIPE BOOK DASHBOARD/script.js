let recipes = JSON.parse(localStorage.getItem("recipes")) || [];
let editIndex = null;

function saveRecipes() {
    localStorage.setItem("recipes", JSON.stringify(recipes));
}

function clearForm() {
    document.getElementById("title").value = "";
    document.getElementById("ingredients").value = "";
    document.getElementById("instructions").value = "";
    document.getElementById("cuisine").value = "";
}

function addRecipe() {

    const title = document.getElementById("title").value.trim();
    const ingredients = document.getElementById("ingredients").value.trim();
    const instructions = document.getElementById("instructions").value.trim();
    const cuisine = document.getElementById("cuisine").value;

    if (title === "" || ingredients === "") {
        alert("Title and Ingredients required!");
        return;
    }

    const recipe = {
        id: Date.now(),
        title,
        ingredients,
        instructions,
        cuisine
    };

    if (editIndex !== null) {

        recipes[editIndex] = recipe;
        editIndex = null;

    } else {

        recipes.push(recipe);

    }

    saveRecipes();
    displayRecipes();
    clearForm();

}



function displayRecipes() {

    const search = document.getElementById("search").value.toLowerCase();
    const cuisineFilter = document.getElementById("filterCuisine").value;

    const list = document.getElementById("recipeList");
    list.innerHTML = "";


    let filtered = recipes.filter(r => {

        const matchSearch =
            r.title.toLowerCase().includes(search) ||
            r.ingredients.toLowerCase().includes(search);

        const matchCuisine =
            cuisineFilter === "" || r.cuisine === cuisineFilter;

        return matchSearch && matchCuisine;

    });


    filtered.forEach((recipe, index) => {

        const card = document.createElement("div");
        card.className = "recipe";

        card.innerHTML = `

<h3>${recipe.title}</h3>

<p><b>Ingredients:</b><br>${recipe.ingredients}</p>

<p><b>Instructions:</b><br>${recipe.instructions}</p>

<p><b>Cuisine:</b> ${recipe.cuisine}</p>

<div class="actions">

<button class="edit" onclick="editRecipe(${index})">Edit</button>

<button class="delete" onclick="deleteRecipe(${index})">Delete</button>

</div>

`;

        list.appendChild(card);

    });

}

function editRecipe(index) {

    const recipe = recipes[index];

    document.getElementById("title").value = recipe.title;
    document.getElementById("ingredients").value = recipe.ingredients;
    document.getElementById("instructions").value = recipe.instructions;
    document.getElementById("cuisine").value = recipe.cuisine;
    editIndex = index;

}

function deleteRecipe(index) {

    if (confirm("Delete this recipe?")) {

        recipes.splice(index, 1);

        saveRecipes();
        displayRecipes();

    }

}


window.onload = displayRecipes;