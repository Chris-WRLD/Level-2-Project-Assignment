document.addEventListener("DOMContentLoaded", ()=> {
    const form = document.querySelector(".form");
    const emailInput = document.getElementById("email");
    const newPasswordInput = document.getElementById("newPassword");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();
        const newPassword = newPasswordInput.value.trim();

        if (!email || !newPassword) {
            alert("please fill all fields");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userIndex = users.findIndex(u => u.email === email);

        if (userIndex === -1){
            alert("Email not found");
            return;
        }

        users[userIndex].password = newPassword;
        localStorage.setItem("users",JSON.stringify(users));

        alert("Password reset successful");
        window.location.href = "login.html"
    })
})