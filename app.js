// 1 Create Initial references

let totalAmount = document.getElementById("total-amount");
let userAmount = document.getElementById("user-amount");
const checkAmountButton = document.getElementById("check-amount");
const totalAmountButton = document.getElementById("total-amount-button");
const productTitle = document.getElementById('product-title')
const errorMessage = document.getElementById("budget-error");
const productTitleError = document.getElementById('product-title-error')
const productCostError = document.getElementById('product-cost-error')
const amount = document.getElementById('amount')
const expenditureValue = document.getElementById('expenditure-value')
const balanceValue = document.getElementById('balance-amount')
const list = document.getElementById('list')
let tempAmount = 0

// 2 Function to set budget
// set budget part

totalAmountButton.addEventListener('click', () => {
    tempAmount = totalAmount.value;
    //empty or negative input
    if (tempAmount === '' || tempAmount < 0) {
        errorMessage.classList.remove('hide');
    } else {
        errorMessage.classList.add('hide');

        //set Budget
        amount.innerHTML  = tempAmount;

        //set Balance
        balanceValue.innerText = tempAmount - expenditureValue.innerHTML;

        // Clear Input Box
        totalAmount.value = '';
    }
})

// 3 Function To Disable 'Edit' & 'Delete' Button

const disableButtons = (bool) => {
    let editButtons = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    })
}

// 4 Function To Modify List Elements

const modifyElement = (element,edit=false) => {
    let parentDiv = element.parentElement;
    let currentBalance = balanceValue.innerHTML;
    let currentExpense = expenditureValue.innerText;
    let parentAmount = parentDiv.querySelector('.amount').innerText;

    if (edit) {
        let parentText = parentDiv.querySelector('.product').innerHTML;

        productTitle.value = parentText;
        userAmount.value = parentAmount;
        disableButtons(true);
    }
    balanceValue.innerText = parseInt
    (currentBalance) + parseInt(parentAmount);  //1he line me asakta tha 
    expenditureValue.innerText = parseInt(currentExpense) - parseInt(parentAmount);

    parentDiv.remove()
};

// 5 Function To Create List

const listCreator = (expenseName, expenseValue) => {

    let sublistContent = document.createElement('div');
    sublistContent.classList.add('sublist-content', 'flex-space');

    list.appendChild(sublistContent);
    sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
    
    let editButton = document.createElement('button');
    editButton.classList.add("fa-solid", "fa-pen-to-square", "edit"); // edit icons

    editButton.style.fontSize = "24px"
    editButton.addEventListener('click', () => {
        modifyElement(editButton, true);

    });


    let deleteButton = document.createElement('button');
    deleteButton.classList.add("fa-solid", "fa-trash-can", 'delete'); // delete icons font owesome 

    deleteButton.style.fontSize = '24px';
    deleteButton.addEventListener('click', () => {
        modifyElement(deleteButton);
    });

    sublistContent.appendChild(editButton);
    sublistContent.appendChild(deleteButton);
    document.getElementById('list').appendChild(sublistContent);
}

// 6 Function To Calculate Expenses & Balance

// function to add expenses

checkAmountButton.addEventListener('click', () => {
    // empty checks
    if (!userAmount.value || !productTitle.value) {
        productTitleError.classList.remove('hide');
        return false;
    }
    // Enable buttons
    disableButtons(false);
    // Expense

    let expenditure = parseInt(userAmount.value);
    // Total expense (existing + new)
    let sum  = parseInt(expenditureValue.innerText) + expenditure;

    expenditureValue.innerText = sum;
    
    //Total balance(budget - total expense)
    const totalBalance = tempAmount - sum;
    balanceValue.innerText = totalBalance;

    // Create list
    listCreator(productTitle.value,userAmount.value);

    // Empty inputs
    productTitle.value = "";
    userAmount.value = '';
})