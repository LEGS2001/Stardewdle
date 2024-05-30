const filePath = '/static/json/crops.json';

const WRONG_BG = '#8D272B'
const WARNING_BG = '#FFFDAF'
const CORRECT_BG = '#90EE90'

let data;
let random_crop;
let health_lost = 1

let guess_input = document.getElementById('guess');
let crops_container = document.getElementById('crops-container')
let guess_container_grid = document.getElementById('guess-container')
let health_bar = document.getElementById('health-bar')

let quality_images = [
    
    "/static/images/no-quality.png",
    "https://stardewvalleywiki.com/mediawiki/images/thumb/8/8a/Silver_Quality_Icon.png/24px-Silver_Quality_Icon.png",
    "https://stardewvalleywiki.com/mediawiki/images/thumb/4/47/Gold_Quality_Icon.png/20px-Gold_Quality_Icon.png",
    "https://stardewvalleywiki.com/mediawiki/images/thumb/e/e4/Iridium_Quality_Icon.png/20px-Iridium_Quality_Icon.png"
]

let already_selected = []

window.onload = function () {
    fetch(filePath)
        .then(function (response) {
            return response.json();
        })
        .then(function (responseData) {
            data = responseData;
            generate_random_crop(responseData);
        });
};

function generate_random_crop(data) {
    // escoge un crop random del JSON
    var data_array = Object.values(data);
    random_crop = data_array[Math.floor(Math.random() * data_array.length)];

}

function checkAnswers() {


    let selected_crop = data.find(crop => crop.name == guess_input.value);
    
    // revisa que exista un crop seleccionado
    if (!selected_crop) {
        return
    }

    if (already_selected.includes(selected_crop)){
        alert('Crop already guessed!')
        guess_input.value = ''
        crops_container.innerHTML = '';
        return
    }
    already_selected.push(selected_crop)



    if (selected_crop == random_crop){
        alert('GANASTE')
        guess_input.value = ''
        crops_container.innerHTML = '';
        // agregar un boton para recargar la pagina
    } else{
        health_lost += 1
    }
    guess_input.value = ''
    crops_container.innerHTML = '';
    health_bar.src = `/static/images/healthBar${health_lost}.png`

    if (health_lost == 6){
        alert(`You lost, the crop was ${random_crop.name}`)
        location.reload()
    }


    guess_container = document.createElement('div')
    guess_container.classList.add("guess-container-row");

    // name comparison
    crop_name = document.createElement('div')
    crop_name.classList.add("guess-container-row-item")

    crop_name.innerHTML = selected_crop.name
    if (selected_crop.name == random_crop.name) {
        crop_name.style.backgroundColor = CORRECT_BG
    } else {
        crop_name.style.backgroundColor = WRONG_BG
    }
    guess_container.appendChild(crop_name)

    // pierre price comparison
    pierre_price = document.createElement('div')
    pierre_price.classList.add("guess-container-row-item")

    if (selected_crop.pierre_price < random_crop.pierre_price) {
        pierre_price.style.backgroundColor = WARNING_BG
        pierre_price.innerHTML = `${selected_crop.pierre_price} ↑`
    } else if (selected_crop.pierre_price > random_crop.pierre_price) {
        pierre_price.style.backgroundColor = WARNING_BG
        pierre_price.innerHTML = `${selected_crop.pierre_price} ↓`
    } else {
        pierre_price.style.backgroundColor = CORRECT_BG
        pierre_price.innerHTML = `${selected_crop.pierre_price}`
    }
    guess_container.appendChild(pierre_price)

    // joja price comparison
    joja_price = document.createElement('div')
    joja_price.classList.add("guess-container-row-item")
    if (selected_crop.joja_price < random_crop.joja_price) {
        joja_price.style.backgroundColor = WARNING_BG
        joja_price.innerHTML = `↑ ${selected_crop.joja_price}`
    } else if (selected_crop.joja_price > random_crop.joja_price) {
        joja_price.style.backgroundColor = WARNING_BG
        joja_price.innerHTML = `↓ ${selected_crop.joja_price}`
    } else {
        joja_price.style.backgroundColor = CORRECT_BG
        joja_price.innerHTML = `${selected_crop.joja_price}`
    }
    guess_container.appendChild(joja_price)

    // growth time
    growth_time = document.createElement('div')
    growth_time.classList.add("guess-container-row-item")
    if (selected_crop.growth_time < random_crop.growth_time) {
        growth_time.style.backgroundColor = WARNING_BG
        growth_time.innerHTML = `↑ ${selected_crop.growth_time}`
    } else if (selected_crop.growth_time > random_crop.growth_time) {
        growth_time.style.backgroundColor = WARNING_BG
        growth_time.innerHTML = `↓ ${selected_crop.growth_time}`
    } else {
        growth_time.style.backgroundColor = CORRECT_BG
        growth_time.innerHTML = `${selected_crop.growth_time}`
    }
    guess_container.appendChild(growth_time)


    // sell value
    // energy comparisons per quality
    sell_value = document.createElement('div')
    sell_value.classList.add("guess-container-row-item")
    for (quality in selected_crop.sell_value) {
        sell_value_quality = document.createElement('div')
        sell_value_quality.classList.add('text-center')
        sell_value_quantity = document.createElement('span')
        if (selected_crop.sell_value[quality] < random_crop.sell_value[quality]) {
            sell_value_quality.style.backgroundColor = WARNING_BG
            sell_value_quantity.textContent = `↑ ${selected_crop.sell_value[quality]}`
        } else if (selected_crop.sell_value[quality] > random_crop.sell_value[quality]) {
            sell_value_quality.style.backgroundColor = WARNING_BG
            sell_value_quantity.textContent = `↓ ${selected_crop.sell_value[quality]}`
        } else {
            sell_value_quality.style.backgroundColor = CORRECT_BG
            sell_value_quantity.textContent = `${selected_crop.sell_value[quality]}`
        }
        image = document.createElement('img')
        image.src = "https://stardewvalleywiki.com/mediawiki/images/thumb/1/10/Gold.png/18px-Gold.png"

        sell_value_quality.appendChild(sell_value_quantity)
        sell_value_quality.appendChild(image)


        image_qual = document.createElement('img')
        image_qual.src = quality_images[quality]
        sell_value_quality.appendChild(image_qual)


        sell_value.appendChild(sell_value_quality)
    }
    guess_container.appendChild(sell_value)

    // energy comparisons per quality
    energy = document.createElement('div')
    energy.classList.add("guess-container-row-item")
    for (quality in selected_crop.energy) {
        energy_quality = document.createElement('div')
        energy_quality.classList.add('text-center')
        energy_quantity = document.createElement('span')
        if (selected_crop.energy[quality] < random_crop.energy[quality]) {
            energy_quality.style.backgroundColor = WARNING_BG
            energy_quantity.textContent = `↑ ${selected_crop.energy[quality]}`
        } else if (selected_crop.energy[quality] > random_crop.energy[quality]) {
            energy_quality.style.backgroundColor = WARNING_BG
            energy_quantity.textContent = `↓ ${selected_crop.energy[quality]}`
        } else {
            energy_quality.style.backgroundColor = CORRECT_BG
            energy_quantity.textContent = `${selected_crop.energy[quality]}`
        }
        image = document.createElement('img')
        image.src = "https://stardewvalleywiki.com/mediawiki/images/thumb/a/a9/Energy.png/20px-Energy.png"

        energy_quality.appendChild(energy_quantity)
        energy_quality.appendChild(image)

        image_qual = document.createElement('img')
        image_qual.src = quality_images[quality]
        energy_quality.appendChild(image_qual)

        

        energy.appendChild(energy_quality)
    }
    guess_container.appendChild(energy)

    // health comparisons per quality
    health = document.createElement('div')
    health.classList.add("guess-container-row-item")
    for (quality in selected_crop.health) {
        health_quality = document.createElement('div')
        health_quantity = document.createElement('span')
        if (selected_crop.health[quality] < random_crop.health[quality]) {
            health_quality.style.backgroundColor = WARNING_BG
            health_quantity.textContent = `↑ ${selected_crop.health[quality]}`
        } else if (selected_crop.health[quality] > random_crop.health[quality]) {
            health_quality.style.backgroundColor = WARNING_BG
            health_quantity.textContent = `↓ ${selected_crop.health[quality]}`
        } else {
            health_quality.style.backgroundColor = CORRECT_BG
            health_quantity.textContent = `${selected_crop.health[quality]}`
        }
        image = document.createElement('img')
        image.src = "https://stardewvalleywiki.com/mediawiki/images/thumb/9/94/Health.png/20px-Health.png"
        health_quality.appendChild(health_quantity)
        health_quality.appendChild(image)



        image_qual = document.createElement('img')
        image_qual.src = quality_images[quality]
        health_quality.appendChild(image_qual)


        health.appendChild(health_quality)
    }
    guess_container.appendChild(health)

    // recipes comparison
    recipe = document.createElement('div')
    recipe.classList.add("guess-container-row-item")
    if (selected_crop.recipes == random_crop.recipes){
        recipe.style.backgroundColor = CORRECT_BG
        recipe.innerHTML = selected_crop['recipes']
    } else if (selected_crop['recipes'].some(item => random_crop['recipes'].includes(item))){
        recipe.style.backgroundColor = WARNING_BG
        recipe.innerHTML = selected_crop['recipes']
    } else {
        recipe.style.backgroundColor = WRONG_BG
        recipe.innerHTML = selected_crop['recipes']
    }

    guess_container.appendChild(recipe)

    guess_container_grid.appendChild(guess_container)

}

function filterCrops() {

    let input_value = guess_input.value.toLowerCase();
    crops_container.innerHTML = '';

    if (input_value == ''){
        return
    }
    
    data.forEach(element => {
        if (element.name.toLowerCase().includes(input_value)) {
            item = document.createElement('div');
            item.classList.add("btn", "btn-primary", "m-2");

            item.addEventListener('click', () => {
                guess_input.value = element.name;

            });

            image = document.createElement('img')
            image.src = element.image

            crop_name = document.createElement('span')
            crop_name.textContent = element.name

            item.appendChild(image)
            item.appendChild(crop_name)

            crops_container.appendChild(item);
        }
    });
}