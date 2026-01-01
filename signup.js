document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const firstName = document.querySelector('input[placeholder= "First name"]').value.trim();
        const lastName = document.querySelector('input[placeholder= "Last name"]').value.trim();
        const email = document.querySelector('input[placeholder= "E-mail"]').value.trim();
        const password = document.querySelector('input[placeholder= "Password"]').value.trim();

        if(!firstName || !lastName || !email || !password){
            alert("Please fill all fields");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userExists = users.find(user => user.email === email);
        if(userExists){
            alert("User already exists");
            return;
        }

        const newUser = {
            firstName,
            lastName,
            email,
            password
        };

        users.push(newUser);
        localStorage.setItem("users",JSON.stringify(users));

        alert("Signup Successful");
        window.location.href = "index.html";




    })
})