function lastItem(fruits, outputId){
    const outputDiv = document.getElementById(outputId);
    const sortedFruits = fruits.toSorted();
    if (!outputDiv.innerHTML){
        outputDiv.innerHTML = `Original fruit array: [${fruits}]
        <br>Sorted fruit list: ${sortedFruits.join(', ')}
        <br>Last Alphabetical Item: ${sortedFruits[sortedFruits.length-1]}`;
    }
    toggleVisibility(outputId);
}

const responses = {};

function sortInputItems() {
    while(isNaN(numItems) || numItems > 4 || numItems < 2 || !(Number.isInteger(numItems))){
        var numItems = Number(prompt("How many items would you like to enter? You must enter 2-4 items."))
    }

    // Collect user input
    for (let index = 0; index < numItems; index++) {
        let catInput = prompt(`Enter category ${index+1} of ${numItems}.`)
        let catItem = prompt(`Enter your ${catInput}`)
        responses[catInput] = catItem;
    };

    // Sort by key
    const responseKeys = Object.keys(responses).sort();

    for (const key of responseKeys) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `Your ${key.toLowerCase()} is ${responses[key]}`
        document.getElementById('outputArray').appendChild(newDiv)
    }
}

document.getElementById("userInputButton").addEventListener("click", sortInputItems);