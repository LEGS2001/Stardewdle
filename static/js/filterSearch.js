var cropNames = [];

var guessBox = document.getElementById('guess')
var cropsContainer = document.querySelector('.crops-container')

window.addEventListener('fetchComplete', function () {
    cropData.forEach((element) => cropNames.push([element.name, element.image]));
});

guessBox.oninput = function () {
    let result = [];
    let guess = guessBox.value;
    if (guess.length) {
        result = cropNames.filter((keyword) => {
            return keyword[0].toLowerCase().includes(guess.toLowerCase());
        });
    }
    display(result)
}

function display(result) {
    const content = result.map((list) => {
        return "<li onclick=selectInput(this)><img src=" + list[1] + ">" + list[0] + "</li>";
    });

    cropsContainer.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list){
    guessBox.value = list.textContent;
    cropsContainer.innerHTML = '';
}