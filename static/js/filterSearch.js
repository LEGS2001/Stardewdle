const cropsContainer = document.querySelector('.crops-container')
const guessBox = document.getElementById('guess')

let cropNames = [];

window.addEventListener('load', function () {
    fetch('/static/json/crops.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (responseData) {
            responseData.forEach(element => {
                cropNames.push(element.name);
            });
        });
});


guessBox.oninput = function () {
    let result = [];
    let guess = guessBox.value;
    if (guess.length) {
        result = cropNames.filter((keyword) => {
            return keyword.toLowerCase().includes(guess.toLowerCase());
        });
    }
    display(result)
}

function display(result) {
    const content = result.map((list) => {
        return "<li onclick=selectInput(this)>" + list + "</li>";
    });

    cropsContainer.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list){
    guessBox.value = list.innerHTML;
    cropsContainer.innerHTML = '';
}