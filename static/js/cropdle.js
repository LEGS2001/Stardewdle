
const GREEN = '#70C725'
const YELLOW = '#8D272B'
const RED = '#FFFDAF'


let health_lost = 1
let guess_input = document.getElementById('guess');
let crops_container = document.getElementById('crops-container')
let guess_container_grid = document.getElementById('guess-container')
let health_bar = document.getElementById('health-bar')

const quality_images = [
    "/static/images/no-quality.png",
    "https://stardewvalleywiki.com/mediawiki/images/thumb/8/8a/Silver_Quality_Icon.png/24px-Silver_Quality_Icon.png",
    "https://stardewvalleywiki.com/mediawiki/images/thumb/4/47/Gold_Quality_Icon.png/20px-Gold_Quality_Icon.png",
    "https://stardewvalleywiki.com/mediawiki/images/thumb/e/e4/Iridium_Quality_Icon.png/20px-Iridium_Quality_Icon.png"
]

let alreadySelected = []

let cropData
let randomCrop
window.addEventListener('load', function () {
    fetch('/static/json/crops.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (responseData) {
            cropData = responseData
            randomCrop = generate_random_crop(responseData)

        });
});

function generate_random_crop(data) {
    let data_array = Object.values(data);
    return data_array[Math.floor(Math.random() * data_array.length)];
}

function checkAnswers() {
    let selected_crop = cropData.find(crop => crop.name == guess_input.value);

    // revisa que exista un crop seleccionado
    if (!selected_crop) {
        return
    }

    if (alreadySelected.includes(selected_crop)){
        alert('Crop already guessed!')
        guess_input.value = ''
        crops_container.innerHTML = '';
        return
    }
    alreadySelected.push(selected_crop)



    if (selected_crop == randomCrop){
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
        alert(`You lost, the crop was ${randomCrop.name}`)
        location.reload()
    }


    guess_container = document.createElement('div')
    guess_container.classList.add("guess-container-row");

    // name comparison
    crop_name = document.createElement('div')
    crop_name.classList.add("guess-container-row-item")

    crop_name.innerHTML = selected_crop.name
    if (selected_crop.name == randomCrop.name) {
        crop_name.style.backgroundColor = GREEN
    } else {
        crop_name.style.backgroundColor = YELLOW
    }
    guess_container.appendChild(crop_name)

    // pierre price comparison
    pierre_price = document.createElement('div')
    pierre_price.classList.add("guess-container-row-item")

    if (selected_crop.pierre_price < randomCrop.pierre_price) {
        pierre_price.style.backgroundColor = RED
        pierre_price.innerHTML = `${selected_crop.pierre_price} ↑`
    } else if (selected_crop.pierre_price > randomCrop.pierre_price) {
        pierre_price.style.backgroundColor = RED
        pierre_price.innerHTML = `${selected_crop.pierre_price} ↓`
    } else {
        pierre_price.style.backgroundColor = GREEN
        pierre_price.innerHTML = `${selected_crop.pierre_price}`
    }
    guess_container.appendChild(pierre_price)

    // joja price comparison
    joja_price = document.createElement('div')
    joja_price.classList.add("guess-container-row-item")
    if (selected_crop.joja_price < randomCrop.joja_price) {
        joja_price.style.backgroundColor = RED
        joja_price.innerHTML = `↑ ${selected_crop.joja_price}`
    } else if (selected_crop.joja_price > randomCrop.joja_price) {
        joja_price.style.backgroundColor = RED
        joja_price.innerHTML = `↓ ${selected_crop.joja_price}`
    } else {
        joja_price.style.backgroundColor = GREEN
        joja_price.innerHTML = `${selected_crop.joja_price}`
    }
    guess_container.appendChild(joja_price)

    // growth time
    growth_time = document.createElement('div')
    growth_time.classList.add("guess-container-row-item")
    if (selected_crop.growth_time < randomCrop.growth_time) {
        growth_time.style.backgroundColor = RED
        growth_time.innerHTML = `↑ ${selected_crop.growth_time}`
    } else if (selected_crop.growth_time > randomCrop.growth_time) {
        growth_time.style.backgroundColor = RED
        growth_time.innerHTML = `↓ ${selected_crop.growth_time}`
    } else {
        growth_time.style.backgroundColor = GREEN
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
        if (selected_crop.sell_value[quality] < randomCrop.sell_value[quality]) {
            sell_value_quality.style.backgroundColor = RED
            sell_value_quantity.textContent = `↑ ${selected_crop.sell_value[quality]}`
        } else if (selected_crop.sell_value[quality] > randomCrop.sell_value[quality]) {
            sell_value_quality.style.backgroundColor = RED
            sell_value_quantity.textContent = `↓ ${selected_crop.sell_value[quality]}`
        } else {
            sell_value_quality.style.backgroundColor = GREEN
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
        if (selected_crop.energy[quality] < randomCrop.energy[quality]) {
            energy_quality.style.backgroundColor = RED
            energy_quantity.textContent = `↑ ${selected_crop.energy[quality]}`
        } else if (selected_crop.energy[quality] > randomCrop.energy[quality]) {
            energy_quality.style.backgroundColor = RED
            energy_quantity.textContent = `↓ ${selected_crop.energy[quality]}`
        } else {
            energy_quality.style.backgroundColor = GREEN
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
        if (selected_crop.health[quality] < randomCrop.health[quality]) {
            health_quality.style.backgroundColor = RED
            health_quantity.textContent = `↑ ${selected_crop.health[quality]}`
        } else if (selected_crop.health[quality] > randomCrop.health[quality]) {
            health_quality.style.backgroundColor = RED
            health_quantity.textContent = `↓ ${selected_crop.health[quality]}`
        } else {
            health_quality.style.backgroundColor = GREEN
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
    if (selected_crop.recipes == randomCrop.recipes){
        recipe.style.backgroundColor = GREEN
        recipe.innerHTML = selected_crop['recipes']
    } else if (selected_crop['recipes'].some(item => randomCrop['recipes'].includes(item))){
        recipe.style.backgroundColor = RED
        recipe.innerHTML = selected_crop['recipes']
    } else {
        recipe.style.backgroundColor = YELLOW
        recipe.innerHTML = selected_crop['recipes']
    }

    guess_container.appendChild(recipe)

    guess_container_grid.appendChild(guess_container)

}

