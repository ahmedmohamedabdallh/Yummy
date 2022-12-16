let rowData=document.getElementById("rowData")
let search=document.getElementById("search")

let submitBtn;
$(document).ready(()=>{
    searchByName("").then(()=>{
        $(".loding").fadeOut(500)
        $("body").css("overflow", "visible")
        $(".inner-loading-screen").fadeOut(300)
    })
    
})
function openSaidNave() {
    $(".said-nav-menu").animate({left:0},500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".link li").eq(i).animate({top:0},(i+6)*100)
        
    }
}
function closeSaidNave() {
    let bixWidth=   $(".said-nav-menu .nav-tabe").outerWidth()
    $(".said-nav-menu").animate({left:-bixWidth},500)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x ");
    $(".link li").animate({top:300},500)
}
closeSaidNave()
$(".said-nav-menu i.open-close-icon").click(()=>{
 if($(".said-nav-menu").css("left")=="0px"){
    closeSaidNave()
 }else{
    openSaidNave()
 }
 
})



function displayMeals(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 cursor">
                <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}
searchByName("")

 async function getGategories() {
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300)
    search.innerHTML=""
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response=await response.json()
    displayCategorieData(response.categories)
    $(".inner-loading-screen").fadeOut(300)
}
function displayCategorieData(arr) {

    cartona="";
    for (let i = 0; i < arr.length; i++) {
        cartona+=`   <div class="col-md-3">
        <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden cursor text-black rounded-2">
            <img class="w-100" src="${arr[i].strCategoryThumb}" alt="">
            <div class="meal-layer  position-absolute text-center p-2">
                <h3>${arr[i].strCategory}</h3>
                <p> ${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
        </div>
      
    </div>`
        
    }
    rowData.innerHTML = cartona
}
async function getArea() {
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300)
    search.innerHTML=""
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response=await response.json()
    displayArea(response.meals)
    $(".inner-loading-screen").fadeOut(300)
}
function displayArea(arr) {
    let cartoona = "";

    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-city  fa-3x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = cartoona
}

async function getIngredients() {
    rowData.innerHTML=""
    
    $(".inner-loading-screen").fadeIn(300)
    search.innerHTML=""
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response=await response.json()
    console.log(response.meals)
    displayIngredients(response.meals.slice(0,20))
   
    $(".inner-loading-screen").fadeOut(300)
}
function displayIngredients(arr) {
    cartona="";
    for (let i = 0; i < arr.length; i++) {
        cartona+=` <div class="col-md-3 cursor">
        <div class=""onclick="getIngredientsMeals('${arr[i].strIngredient}')" text-white rounded-2 cursor text-center">
            
        <i class="fa-solid fa-bowl-food fa-3x"></i>
                <h3>${arr[i].strIngredient}</h3>
                <p> ${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                
            
        </div>
        

    </div>`
    
        
    }
    rowData.innerHTML = cartona
    
}
async function getCategoryMeals(category) {
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300)
    search.innerHTML=""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}

async function getAreaMeals(area) {
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300)
    search.innerHTML=""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
async function getIngredientsMeals(ingredients) {
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300)
    search.innerHTML=""

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}
async function getMealDetails(mealID) {
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300)

    
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
    respone = await respone.json();

    displayDetalis(respone.meals[0])
    $(".inner-loading-screen").fadeOut(300)
}

function displayDetalis(meal) {
    search.innerHTML=""
    let ingredients = ``

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    // let tags = meal.strTags.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
    let cartona=`
    <div class="col-md-4">
    <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
    <h2>${meal.strMeal}</h2>
 </div>
 <div class="col-md-8">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
    <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex flex-wrap">
    ${ingredients}
    </ul>
    <h3>Tags :</h3>
    <ul class="list-unstyled d-flex flex-wrap">
    ${tagsStr}
        
    </ul>
    <a target="_blank" href="${meal.strSource}" class="btn btn-success mx-2">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
 </div>
    `
    rowData.innerHTML=cartona
}
function showSearch() {
    search.innerHTML=`
    <div class="row py-4">
    <div class="col-md-6">
        <input onkeyup="searchByName(this.value)" class="form-control text-white bg-transparent" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
        <input onkeyup="searchByFLitter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By Frist Litter">
    </div>
    
</div>
    `
    rowData.innerHTML=""
}
async function searchByName(term) {
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300)
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response =await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}
async function searchByFLitter(term) {
    rowData.innerHTML=""
    $(".inner-loading-screen").fadeIn(300)
    term=="" ? term = "a":"";
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`)
    response=await response.json()
    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)
}
function showContactUs(){
rowData.innerHTML=`
<div class="contant text-center min-vh-100 d-flex align-items-center justify-content-center">
    <div class="container w-75">
    <div class="row g-4">
        <div class="col-md-6">
            <input id="name" onkeyup="inputValidation()" class="form-control is-invalid  " type="text" placeholder="Enter Your Name">
            <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
            Special characters and numbers not allowed
        </div>
        </div>
        <div class="col-md-6">
            <input id="email" onkeyup="inputValidation()" class="form-control is-invalid " type="email" placeholder="Enter Your Email">
            <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
        </div>
        <div class="col-md-6">
            <input id="phone" onkeyup="inputValidation()" class="form-control is-invalid " type="text" placeholder="Enter Your Phone">
            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
            Enter valid Phone Number
        </div>
        </div>
        <div class="col-md-6">
            <input id="age" onkeyup="inputValidation()" class="form-control is-invalid " type="number" placeholder="Enter Your Age">
            <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
        </div>
        <div class="col-md-6">
            <input id="password" onkeyup="inputValidation()" class="form-control is-invalid " type="password" placeholder="Enter Your Password">
            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
        </div>
        <div class="col-md-6">
            <input id="repassword" onkeyup="inputValidation()" class="form-control is-invalid " type="password" placeholder=" Repassword">
            <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
        </div>
    </div>
    <button id ="button" disabled class="btn btn-outline-danger mt-3">submit</button>
</div>
</div>
`
 submitBtn=document.getElementById('button')
 document.getElementById("name").addEventListener("focus",()=>{
    nameInputTouche=true
})
document.getElementById("email").addEventListener("focus",()=>{
    emailInputTouche=true
})
document.getElementById("phone").addEventListener("focus",()=>{
    phoneInputTouche=true
})
document.getElementById("age").addEventListener("focus",()=>{
    ageInputTouche=true
})
document.getElementById("password").addEventListener("focus",()=>{
    passwordInputTouche=true
})
document.getElementById("repassword").addEventListener("focus",()=>{
    repasswordInputTouche=true
})
}
let nameInputTouche=false;
let emailInputTouche=false;
let phoneInputTouche=false;
let ageInputTouche=false;
let passwordInputTouche=false;
let repasswordInputTouche=false;


function inputValidation() {
if(nameInputTouche){
    if (nameValidation()) {
        document.getElementById("nameAlert").classList.replace("d-block","d-none")
        document.getElementById("name").classList.replace("is-invalid","is-valid")
    }else{
        document.getElementById("nameAlert").classList.replace("d-none","d-block")
        document.getElementById("name").classList.replace("is-valid","is-invalid")
    }
}
  
   if (emailInputTouche) {
    if (emaleValidation()) {
        document.getElementById("emailAlert").classList.replace("d-block","d-none")
        document.getElementById("email").classList.replace("is-invalid","is-valid")
    }else{
        document.getElementById("emailAlert").classList.replace("d-none","d-block")
        document.getElementById("email").classList.replace("is-valid","is-invalid")
    }
    
   }
  if(phoneInputTouche){
    if (phoneValidation()) {
        document.getElementById("phoneAlert").classList.replace("d-block","d-none")
        document.getElementById("phone").classList.replace("is-invalid","is-valid")
    }else{
        document.getElementById("phoneAlert").classList.replace("d-none","d-block")
        document.getElementById("phone").classList.replace("is-valid","is-invalid")
    }
  }
   if (ageInputTouche) {
    if (ageValidation()) {
        document.getElementById("ageAlert").classList.replace("d-block","d-none")
        document.getElementById("age").classList.replace("is-invalid","is-valid")
    }else{
        document.getElementById("ageAlert").classList.replace("d-none","d-block")
        document.getElementById("age").classList.replace("is-valid","is-invalid")
    }
   }
   if (passwordInputTouche) {
    if (passwordValidation()) {
        document.getElementById("passwordAlert").classList.replace("d-block","d-none")
        document.getElementById("password").classList.replace("is-invalid","is-valid")
    }else{
        document.getElementById("passwordAlert").classList.replace("d-none","d-block")
        document.getElementById("password").classList.replace("is-valid","is-invalid")
    }
   }
  if (repasswordInputTouche) {
    if (repasswordValidation()) {
        document.getElementById("repasswordAlert").classList.replace("d-block","d-none")
        document.getElementById("repassword").classList.replace("is-invalid","is-valid")
    }else{
        document.getElementById("repasswordAlert").classList.replace("d-none","d-block")
        document.getElementById("repassword").classList.replace("is-valid","is-invalid")
    }
  }

    if ( nameValidation()&&
    emaleValidation()&&
    phoneValidation()&&
    ageValidation()&&
    passwordValidation()&&
    repasswordValidation()) {
        submitBtn.removeAttribute("disabled")
    }else{
        submitBtn.setAttribute("disabled",true)
    }
   
}
function nameValidation() {
   return (/^[a-zA-Z ]+$/.test(document.getElementById("name").value))
}
function emaleValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value))
 }
 function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("phone").value))
}
function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age").value))
}

function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value))
}

function repasswordValidation() {
    return document.getElementById("repassword").value == document.getElementById("repassword").value
}