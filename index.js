document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form");
    const emailInput = document.querySelector('input[placeholder="E-mail"]');
    const passwordInput = document.querySelector('input[placeholder="Password"]');

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if(!email || !password){
            alert("Please fill in all fields");
            return;
        }

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (!user){
            alert("Invalid email or password");
            return;
        };

        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login successful");

        window.location.href = "dashboard.html";
    
    })

})