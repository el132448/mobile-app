import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-56817-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
})

onValue(shoppingListInDB, function(snapshot){
    let itemsArray = Object.entries(snapshot.val())
    //Object.entries/ keys/ values

    clearShoppingEl() //refractor to function

    for(let i = 0; i < itemsArray.length; i++){
        let currentItem = itemsArray[i]
        let currentItemID = currentItem[0]
        let currentItemValue = currentItem[1]
        appendItemToShoppingListEl(currentItem)
    } 
})

function clearShoppingEl(){
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li>${itemValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click",function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    shoppingListEl.append(newEl)
}



// //JSON: JavaScript Object Notation: store & save data
// //let: can change; const: can't change 
// let myLeads = []
// const inputEl = document.getElementById("input-el")
// const inputBtn = document.getElementById("input-btn")
// const tabBtn = document.getElementById("tab-btn")
// const deleteBtn = document.getElementById("delete-btn")
// // let deleteIndiBtn = getElementById("deleteIndi-btn")
// const ulEl = document.getElementById("ul-el")

// const leadsFromLocalStorage= JSON.parse(localStorage.getItem("myLeads"))
// if (leadsFromLocalStorage){
//     myLeads = leadsFromLocalStorage
//     render(myLeads)
// }

// //API: Application Programming Interface
// inputBtn.addEventListener("click", function saveInput(){
//     if(inputEl.value === ""){
//     }else{
//         myLeads.push(inputEl.value)
//     console.log(myLeads)
//     inputEl.value = ""
//     //localStorage.setItem: store item in local storage ("key", "value") 
//     localStorage.setItem("myLeads",JSON.stringify(myLeads))
//     //localStorage in DOMString format only: JSON.stringify(array)
//     render(myLeads)
//     }
// })

// tabBtn.addEventListener("click", function saveTab(){
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
//         myLeads.push(tabs[0].url)
//         localStorage.setItem("myLeads",JSON.stringify(myLeads))
//         render(myLeads)
//     })
// })

// deleteBtn.addEventListener("dblclick", function deleteAll(){
//     // const myLeadsLength = myLeads.length
//     // for(let i = 0; i < myLeadsLength; i++){
//     //     myLeads.pop()}
//     localStorage.removeItem("myLeads");
//     myLeads = []
//     render(myLeads)
// })

// // deleteIndiBtn.addEventListener("click", function deleteIndi(){
// //     render(myLeads)
// // })

// //low degree reusability --> make function more dynamic
// function render(leads){
// let listItems = ""
// for(let i = 0; i < leads.length; i++){
//     //method 1: creat element, set text content, append to ul
//     // const li = document.createElement("li")
//     // li.textContent = myLeads[i]
//     // ulEl.append(li)

//     //method 2: template string: ``,  ${} to escape
//     listItems += `<li>
//     <a target='_blank' href='${leads[i]}'> ${leads[i]} </a></li>`
//     ulEl.innerHTML = listItems

//     // let indiBtn = document.createElement("button")
//     // indiBtn.setAttribute("id", i)
//     // indiBtn.innerText = "X"
//     // console.log(indiBtn)
//     // .append(indiBtn)
// }
//     //avoid .innerHTML inside loop: affect performance
//     ulEl.innerHTML = listItems

// }

// //truthy value: true, "abc", 1  
// //falsy value: false, "", 0, null (how you as a developer signalize emptiness),
// //             undefuned (how JavaScript signalizes emptiness), NaN (Not a number)

// //arguments outside; parameters inside the function 

// // RECAP:
// // const
// // addEventListener()
// // innerHTML
// // input.value
// // function parameter
// // template strings & listItems
// // localStorage
// // The JSON Object (JSON.parse & JSON.stringify & .JSON file)
// // object in Array (array[0].url)

// // What next?
// // ES6: ECMAScript 6.0
// // APIs & async JavaScript
// // Server side of JS

// Aside: Turning an Object into an Array
// let scrimbaUsers = {
//     "00": "sindre@scrimba.com",
//     "01": "per@scrimba.com",
//     "02": "frode@scrimba.com"
// }
// // Challenge: Create a let variable called 'scrimbaUsersEmails' and use one of Object methods to set it equal to an array with the values
// let scrimbaUsersEmails = Object.values(scrimbaUsers)

// // Challenge: Create a let variable called 'scrimbaUsersIDs' and use one of Object methods to set it equal to an array with the keys
// let scrimbaUsersIDs = Object.keys(scrimbaUsers)

// // Challenge: Create a let variable called 'scrimbaUsersEntries' and use one of Object methods to set it equal to an array with the both the keys and values
// let scrimbaUsersEntries = Object.entries(scrimbaUsers)

// console.log(scrimbaUsersEntries)