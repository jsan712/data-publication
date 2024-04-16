function greetUser(){
    const date = new Date();
    const hour = date.getHours();
    let greeting;

    if (hour < 12){
        greeting = "Good morning!";
    }
    else if (hour < 18){
        greeting = "Good afternoon!";
    }
    else{
        greeting = "Good evening!";
    }

    alert(greeting);
}

function changeButton(){
    let button = document.getElementById("button2");
    console.log("Before: ", button.textContent, button.className);
    
    button.textContent = "Done";
    button.className = "btn btn-success";
    console.log("After: ", button.textContent, button.className);
}

document.getElementById("button1").addEventListener("click", greetUser);
document.getElementById("button2").addEventListener("click", changeButton);