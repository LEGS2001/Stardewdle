const fetchCompleteEvent = new Event('fetchComplete');

window.addEventListener('load', function () {
    fetch('/static/json/crops.json')
        .then(function (response) {
            return response.json();
        })
        .then(function (responseData) {
            cropData = responseData
            randomCrop = generate_random_crop(responseData)
            window.dispatchEvent(fetchCompleteEvent);
        });
        
});

function generate_random_crop(data) {
    let data_array = Object.values(data);
    return data_array[Math.floor(Math.random() * data_array.length)];
}