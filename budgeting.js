//Declare all the variables grouped by function applicable
let totalIncome = [];
let totalExpenses = [];

let TotalOfIncomeItems = 0;
let TotalOfExpenseItems = 0;

let incomeMessage = "";
let expensesMessage = "";

let happyIncomeInput = "";
let newIncome = "";
let newAmountIncome = "";
let newRecurringIncome = "";

let happyExpenseInput = "";
let newExpense = "";
let newAmountExpense = "";
let newRecurringExpense = "";

let disposableIncomeVar = "";
let save = "";

//Object construct all the income
function Income(income, amount, recurring) {
    this.income = income;
    this.amount = amount;
    this.recurring = recurring;
};

//Object construct all the expenses
function Expenses(expense, amount, recurring) {
    this.expense = expense;
    this.amount = amount;
    this.recurring = recurring;
};

//Set variables for the starting income objects
let inc1 = new Income("Salary", 25000, true);
let inc2 = new Income("Rental-received", 10000, true);
let inc3 = new Income("Subscription-received", 500, true);
let inc4 = new Income("Website-built", 8000, false);
let inc5 = new Income("Sold-car", 90000, false);

//Set variables for the starting expenses objects
let exp1 = new Expenses("Groceries", 9000, true);
let exp2 = new Expenses("Insurance", 1000, true);
let exp3 = new Expenses("Levies", 3500, true);
let exp4 = new Expenses("Car-repairs", 25000, false);
let exp5 = new Expenses("Bond-repayment", 9000, true);

//On load of page - start running this function
function pushStart() {
    //If the page is opened and session not started yet - set all the starting objects of the income and expense session
    if (sessionStorage.getItem("Income") === null) {
        totalIncome.push(inc1);
        totalIncome.push(inc2);
        totalIncome.push(inc3);
        totalIncome.push(inc4);
        totalIncome.push(inc5);

        sessionStorage.setItem("Income", JSON.stringify(totalIncome));

        totalExpenses.push(exp1);
        totalExpenses.push(exp2);
        totalExpenses.push(exp3);
        totalExpenses.push(exp4);
        totalExpenses.push(exp5);

        sessionStorage.setItem("Expenses", JSON.stringify(totalExpenses));
    }
    //If the page is opened and session has already started - recall all the information that is stored into the income and expense session and allocate to variables in JS
    else {
        totalIncome = JSON.parse(sessionStorage.getItem("Income"));
        totalExpenses = JSON.parse(sessionStorage.getItem("Expenses"));
    };

    //Hide the add income button until income is shown
    let incomeAddHide = document.getElementById("addIncomeId");
    //Hide the add expense button until expenses are shown
    let expenseAddHide = document.getElementById("addExpenseId");
    //Hide the disposable section until the expenses are calculated
    let disposable = document.getElementById("disposable_hide");
    incomeAddHide.style.visibility = "hidden";
    expenseAddHide.style.visibility = "hidden";
    disposable.style.visibility = "hidden";
    //Run the function of income message to store in variables
    messageIncome();
    //Run the function of expense message to store in variables 
    messageExpense();
};

//Income message to be used in the paragraph as well as in the prompt
function messageIncome() {
    for (i = 0; i < totalIncome.length; i++) {
        let displayMessage = (totalIncome[i].income + " income is R" + totalIncome[i].amount + " Recurring is: " + totalIncome[i].recurring + "<br/>");
        incomeMessage += displayMessage
    };
};

//Expense message to be used in the paragraph as well as in the promos
function messageExpense() {
    for (i = 0; i < totalExpenses.length; i++) {
        let displayMessage = (totalExpenses[i].expense + " expense is R" + totalExpenses[i].amount + " Recurring is: " + totalExpenses[i].recurring + "<br/>");
        expensesMessage += displayMessage;
    };
};

//Calculate the total income
function TotalOfIncomeItemsFunction() {
    //Retrieve the information that is stored in session storage
    totalIncome = JSON.parse(sessionStorage.getItem("Income"));
    //Use the reduce method to calculate the total
    TotalOfIncomeItems = totalIncome.reduce((Acc, Cur) => {
        return Acc + Cur.amount;
    }, 0);
};

//Calculate the total expenses
function TotalOfExpenseItemsFunction() {
    //Retrieve the information that is stored in session storage
    totalExpenses = JSON.parse(sessionStorage.getItem("Expenses"));
    //Use the reduce method to calculate the total
    TotalOfExpenseItems = totalExpenses.reduce((Acc, Cur) => {
        return Acc + Cur.amount;
    }, 0);
};

//click on buton - show the income
function incomeParagraph() {
    //run function to calculate total income
    TotalOfIncomeItemsFunction();
    //write the income_items in paragraph and display total income
    let incomeParagraphs = document.getElementById("income_items");
    incomeParagraphs.innerHTML = incomeMessage + "The total of all the items are R" + TotalOfIncomeItems;
    //Make the add income button visible
    let incomeAddHide = document.getElementById("addIncomeId");
    incomeAddHide.style.visibility = "visible";
};

//click on buton - show the expense
function expenseParagraph() {
    //run function to calculate total expense
    TotalOfExpenseItemsFunction();
    //write the expense items in paragraph and display total expenses
    let incomeParagraphs = document.getElementById("expense_items");
    incomeParagraphs.innerHTML = expensesMessage + "The total of all the items are R" + TotalOfExpenseItems;
    let expensesAddHide = document.getElementById("addExpenseId");
    /*Make the add income button visible
    Make the disposable income div visible*/
    let disposable = document.getElementById("disposable_hide");
    expensesAddHide.style.visibility = "visible";
    disposable.style.visibility = "visible";
};

//Prompt to ask questions about the new income to be added
function addIncomePrompt() {
    //display income message and prompt if want to add an income
    newIncome = prompt(incomeMessage + "\n \n Add another income type:");
    //Prompt to ask the amount - convert to number for calculation because prompt is string
    newAmountIncome = Number(prompt("How many Rand is this income? (Number)"));
    //Ask item recurring - use a while loop to only allow Y or N as answers
    newRecurringIncome = ("Is this income recurring? \n Y - Yes \n N - No");
    while (!((newRecurringIncome === "Y") || (newRecurringIncome === "N"))) {
        newRecurringIncome = prompt("Is this income recurring? \n Y - Yes \n N - No");
    };
    /*Show the data that is captured - ask if the user is happy to proceed or want to recapture.
    Run a while loop that only allows Y or N answer*/
    happyIncomeInput = prompt("Income: " + newIncome + "\n Amount: " + newAmountIncome + "\n Recurring: " + newRecurringIncome + " \n Are you happy with the input? \n Y- Yes \n N - No");
    while (!((happyIncomeInput === "Y") || (happyIncomeInput === "N"))) {
        happyInput = prompt("Income: " + newIncome + "\n Amount: " + newAmountIncome + "\n Recurring: " + newRecurringIncome + " \n Are you happy with the input? \n Y- Yes \n N - No");
    };
}

//Run function on click of add income
function addIncome() {
    //Run the add Income questions function
    addIncomePrompt();
    //Run a while loop if the items is captured incorrect - N is selected - the addIncomePrompt function will run again until the user selects Y - Yes they are happy. 
    while ((happyIncomeInput === "N")) {
        addIncomePrompt();
    };
    //Using the switch function to change string to boolean - change the Y to true and N for false if the income is recurring or not
    switch (newRecurringIncome) {
        case "Y":
            newRecurringIncome = true;
            break;
        case "N":
            newRecurringIncome = false;
            break;
    };
    //Object construct of the new income item
    let newIncomeObject = new Income(
        newIncome,
        newAmountIncome,
        newRecurringIncome,
    );

    //Add the new object to the array
    totalIncome.push(newIncomeObject);
    //Set the session storage with the update array of income
    sessionStorage.setItem("Income", JSON.stringify(totalIncome));
    //Reload the page to activate the pushStart() function again to update values
    document.location.reload();
};

//Prompt to ask questions about the new expense to be added
function addExpensePrompt() {
    //Display expenses message and ask for new expense item
    newExpense = prompt(expensesMessage + "\n \n Add another expense type:");
    //As new expense amount and convert to a number because prompt is in string format
    newAmountExpense = Number(prompt("How many Rand is this expense? (Number)"));
    //Ask if cost is recurring - use while loop to only allow Y or N answer
    newRecurringExpense = ("Is this expense recurring? \n Y - Yes \n N - No");
    while (!((newRecurringExpense === "Y") || (newRecurringExpense === "N"))) {
        newRecurringExpense = prompt("Is this income recurring? \n Y - Yes \n N - No");
    };
    //Display results of items captured - ask user if happy with result. Run a while loop o that only Y or N can be captured
    happyExpenseInput = prompt("Expense: " + newExpense + "\n Amount: " + newAmountExpense + "\n Recurring: " + newRecurringExpense + " \n Are you happy with the input? \n Y- Yes \n N - No");
    while (!((happyExpenseInput === "Y") || (happyExpenseInput === "N"))) {
        happyExpenseInput = prompt("Expense: " + newExpense + "\n Amount: " + newAmountExpense + "\n Recurring: " + newRecurringExpense + " \n Are you happy with the input? \n Y- Yes \n N - No");
    };
};

//on Click of add expense button - run function
function addExpense() {
    //Run the function which prompts the use questions
    addExpensePrompt();
    //Run a while loop - if the user is not happy with the information captured - N result - run the addExpensePrompt function again until user is happy with information
    while ((happyExpenseInput === "N")) {
        addExpensePrompt();
    };
    //Swith the Y with true and N with false - make it a boolean
    switch (newRecurringExpense) {
        case "Y":
            newRecurringExpense = true;
            break;
        case "N":
            newRecurringExpense = false;
            break;
    };
    //Object construction of the new expense
    let newExpenseObject = new Expenses(
        newExpense,
        newAmountExpense,
        newRecurringExpense,
    );
    //Add the new expense to the array
    totalExpenses.push(newExpenseObject);
    //Save the new updated array to the sessionstorage
    sessionStorage.setItem("Expenses", JSON.stringify(totalExpenses));
    //Reload the page so that pushStart() function will run and all the values updated
    document.location.reload()
};

//On click - show the disposable income
function disposableIncome() {
    //Run the function to update the TotalOfIncomeItems
    TotalOfIncomeItemsFunction();
    //Run the function to update the TotalOfExpenseItems
    TotalOfExpenseItemsFunction();
    //calculate the disposable income
    disposableIncomeVar = TotalOfIncomeItems - TotalOfExpenseItems;
    //Display in the paragraph the disposable income
    let disposeParagraph = document.getElementById("disposableParagraph");
    disposeParagraph.innerHTML = ("My disposable income for this month is R" + disposableIncomeVar);
};

//On click - ask user how much money they want to save
function saveAmount() {
    // Run the disposable income function to update the disposableIncomeVar
    disposableIncome();
    //Prompt user to get the amount they want to save out of the total available disposable income - convert string to a number
    save = Number(prompt("How much money would you like to save out of the R" + disposableIncomeVar + "?"));
    //Run a while loop - if the amount is more than the disposable income - ask promt again.
    while (save > disposableIncomeVar) {
        save = Number(prompt("How much money would you like to save out of the R" + disposableIncomeVar + "?"));
    };
    //Save in session storage the saving amount
    sessionStorage.setItem("Savings", JSON.stringify(save));
    //Calculate the amount that is left after savings is deducted
    const incomeLeftAfterSaving = (disposableIncomeVar - save);
    //Alert the amount that is left
    alert("My money that is left after savings deductions are R" + incomeLeftAfterSaving);
    //Save in session storage the amount that is left
    sessionStorage.setItem("Disposable Income Left", JSON.stringify(incomeLeftAfterSaving));
};