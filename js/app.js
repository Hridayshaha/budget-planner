const totalBudgetField = document.getElementById("totalBudgetField")
const totalBudget = document.getElementById("totalBudget")
const totalBudgetButton = document.getElementById("totalBudgetSubmit")
const costQuantity = document.getElementById("costQuantity")
const costField = document.getElementById("inputCost")
const costButton = document.getElementById("costSubmit")
const totalCost = document.getElementById("totalCost")
const limit = document.getElementById("limit")
const more = document.getElementById("more")
const remaining = document.getElementById("remianing")



function inputToValue(input) {
    let numValue = parseInt(input.value)
    if(isNaN(numValue)){
        alert("Please provide valid positive number.")
        input.value = ''
        return numValue = 0;
    }
    if(numValue <= 0){
        alert("Please enter a positive number.")
        input.value = ''
        return numValue = 0;
    }   
    input.value = ''
    return numValue
}
function stringToNum(value) {
    return parseInt(value) 
}

function valueAdd(inputField, placeId, quantity=1){
    const value = inputToValue(inputField);
    const oldValue = stringToNum(placeId.innerText)
    return placeId.innerText = oldValue + ( value * quantity);
}
function valueAddwithNumber(number, placeId, quantity=1){
    const oldValue = stringToNum(placeId.innerText)
    return placeId.innerText = oldValue + ( number * quantity);
}

// For Budget Click Event
totalBudgetButton.addEventListener("click", () => {
    const total = valueAdd(totalBudgetField, totalBudget)
    remaining.innerText = total - stringToNum(totalCost.innerText)

})
// For Budget Enter Event
totalBudgetField.addEventListener("keypress", (e) => {
    if(e.key === "Enter") {
     const total = valueAdd(totalBudgetField, totalBudget)
    remaining.innerText = total - stringToNum(totalCost.innerText)
    }

})

function budgetChecker(budget, cost){
    if(cost > budget){
        limit.classList.remove("none")
        limit.classList.add("show")
        more.innerText = "Need Budget More " + (cost - budget)
        totalBudgetField.placeholder = "Need Budget More " + (cost - budget)
        more.addEventListener("click", () => {
            valueAddwithNumber((cost - budget), totalBudget)
            limit.classList.add("none")
            totalBudgetField.placeholder = "Total Budget"
            remaining.innerText = stringToNum(totalBudget.innerText) - stringToNum(totalCost.innerText)
        })

    }


}

function remainValue(){
    remaining.innerText = stringToNum(totalBudget.innerText) - stringToNum(totalCost.innerText)
}

// For Cost Click Event
costButton.addEventListener("click", () => {
    const quantity = inputToValue(costQuantity)
    const budget = stringToNum(totalBudget.innerText);
    const cost = valueAdd(costField, totalCost, quantity)
    budgetChecker(budget, cost)
    remainValue()
})




