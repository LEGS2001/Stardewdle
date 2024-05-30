// main.js

// Function to fetch data from the Flask API
async function fetchData() {
    try {
        const response = await fetch('/random-crop');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        console.log(data);

        // Update the content div with the fetched data
        const contentDiv = document.getElementById('content');
        contentDiv.innerHTML = `<p>${data.message}</p>`;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Call the fetchData function when the page loads
document.addEventListener('DOMContentLoaded', fetchData);
