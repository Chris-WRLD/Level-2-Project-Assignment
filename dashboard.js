document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if(!loggedInUser){
        window.location.href = "login.html";
        return;
    }

    const profileImg = document.getElementById("profileImg");
    const displayUser = document.getElementById("displayUser");
    const logoutBtn = document.getElementById("logoutBtn");

    const totalIncomeEl = document.getElementById("totalIncome");
    const totalExpensesEl = document.getElementById("totalExpenses");
    const balanceEl = document.getElementById("balance");

    const incomeAmount = document.getElementById("incomeInput");
    const addIncomeBtn = document.getElementById("addIncomeBtn");
    const expenseTitle = document.getElementById("expenseTitle");

    const expenseAmount = document.getElementById("expenseAmount");
    const addExpenseBtn = document.getElementById("addExpenseBtn");
    const expenseList = document.getElementById("expenseList");

    profileImg.src = loggedInUser.profile || "https://via.placeholder.com/40";
    displayUser.textContent = loggedInUser.firstName || "User";

    const transactionsKey = `transactions_${loggedInUser.email}`;
    let transactions = JSON.parse(localStorage.getItem(transactionsKey)) || [];

    function updateDashboard(){
        let income = 0;
        let expenses = 0;

        expenseList.innerHTML = "";

        transactions.forEach((t, index) => {
            if(t.type === "income") income += t.amount;
            if(t.type === "expense") expenses += t.amount;

            if (t.type === "expense"){
                const tr = document.createElement("tr");

                tr.innerHTML =`
                <td>${t.title}</td>
                <td>$${t.amount}</td>
                <td>${t.date}</td>
                <td><button class="btn-delete">Delete</button></td>
                `;

                tr.querySelector(".btn-delete").addEventListener("click",()=> {
                    transactions.splice(index, 1);
                    saveAndUpdate();
                });

                expenseList.appendChild(tr)
            }
    });

    totalIncomeEl.textContent = income;
    totalExpensesEl.textContent = expenses;
    balanceEl.textContent = income - expenses;
};

function saveAndUpdate(){
    localStorage.setItem(transactionsKey,JSON.stringify(transactions));
    updateDashboard();
}

addIncomeBtn.addEventListener("click",()=>{
    const amount = parseFloat(incomeAmount.value);
    if(!amount||amount <= 0){
        alert("Enter valid income amount");
        return;
    };

    transactions.push({
        type: "income",
        amount,
        date: new Date().toLocaleDateString()
    });
    
    incomeAmount.value = "";
    saveAndUpdate();
});

addExpenseBtn.addEventListener("click", ()=> {
    const title = expenseTitle.value.trim();
    const amount = parseFloat(expenseAmount.value);

    if(!title|| !amount || amount <= 0){
        alert("Enter valid expense data");
        return;
    };

    transactions.push({
    type: "expense",
    title,
    amount,
    date: new Date().toLocaleDateString()
});

expenseTitle.value = "";
expenseAmount.value = "";
saveAndUpdate();
});

logoutBtn.addEventListener("click",() => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
});

updateDashboard();
});
