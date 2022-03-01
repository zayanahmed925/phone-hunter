// Load Search data
const loadPhone = () => {
    const searchField = document.getElementById('scarch-field');
    const searchFieldText = searchField.value;
    searchField.value = '';
    if (searchFieldText === '') {
        document.getElementById('phones-area').textContent = '';
        document.getElementById('phone-details').textContent = '';
        const errorDiv = document.getElementById('error');

        errorDiv.innerHTML = `<h5 class="text-center text-danger">please search Your Device</h5>`
    }
    else {
        const errorDiv = document.getElementById('error');
        errorDiv.innerText = '';
        const ul = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`
        fetch(ul)
            .then(res => res.json())
            .then(data => searchResult(data))
    }

}
// Display Search Result
const searchResult = (phones) => {
    if (phones.data.length === 0) {
        document.getElementById('phones-area').textContent = '';
        document.getElementById('phone-details').textContent = '';
        const errorDiv = document.getElementById('error');

        errorDiv.innerHTML = `<h5 class="text-center text-danger">Result not Found</h5>`

    }
    else {
        document.getElementById('phone-details').textContent = '';
        const displaySearchResult = document.getElementById('phones-area');
        displaySearchResult.innerText = '';
        const get = phones.data.slice(0, 20);
        get.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card shadow border-0">
                <img src="${phone.image}" class="card-img-top w-50 mx-auto" alt="...">
                <div class="card-body text-center">
                    <h5 class="card-title fw-bold">${phone.phone_name}</h5>
                    <p class="card-text fw-bold">Brand: ${phone.brand}</p>
                </div>
                <button onClick="loadDetails('${phone.slug}')" type="button" class="btn btn-outline-info">Details</button>
            </div>
        `
            displaySearchResult.appendChild(div);
        });
    }

}
// Load Id For Details
const loadDetails = (detailId) => {
    const ul = `https://openapi.programming-hero.com/api/phone/${detailId}`
    fetch(ul)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}
// Phone ditails Display
const displayDetails = (details) => {
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerText = '';
    phoneDetails.innerHTML = `
            <div class="col-sm-12 col-md-6">
                <img src="${details.image} " id="details-image" class="me-4">
            </div>
            <div class="col-sm-12 col-md-6 ">
                    <h4 class="card-title">
                    ${details.name}</h4>
                    <h6 class="card-text"><span class="text-secondary">Release Date: ${details.releaseDate ? details.releaseDate : 'Not Found'}</span></h6>
                    <h5 class="card-text">Main Feautre:</h5>
                    <h6 class="card-text">Chipset: <span class="text-secondary">${details.mainFeatures.chipSet}</span></h6>
                    <h6 class="card-text">Display: <span class="text-secondary">${details.mainFeatures.displaySize}</span></h6>
                    <h6 class="card-text">Memory: <span class="text-secondary">${details.mainFeatures.storage}</span></h6>
                    <h5 class="card-text">Other Feautre</h5>
                    <h6 class="card-text">Bluetooth: <span class="text-secondary">${details.others?.Bluetooth ? details.others?.Bluetooth : 'Not Found'}</span></h6>
                    <h6 class="card-text">GPS: <span class="text-secondary">${details.others?.GPS ? details.others?.GPS : 'Not Found'}</span></h6>
                    <h6 class="card-text">NFC: <span class="text-secondary">${details.others?.NFC ? details.others?.NFC : 'Not Found'}</span></h6>
                    <h6 class="card-text">Radio: <span class="text-secondary">${details.others?.Radio ? details.others?.Radio : 'Not Found'}</span></h6>
                    <h6 class="card-text">USB: <span class="text-secondary">${details.others?.USB ? details.others?.USB : 'Not Found'}</span></h6>
                    <h6 class="card-text">WLAN: <span class="text-secondary">${details.others?.WLAN ? details.others?.WLAN : 'Not Found'}</span></h6>
                    <h5 class="card-text">Sensor</h5>
                    <div>
                    <ul id="sensor" >
                    
                    </ul>
                    </div>
            </div>     
    `;
    // For Sensor
    const sensorDetails = document.getElementById('sensor')
    const getsenores = details.mainFeatures.sensors
    console.log(getsenores)
    getsenores.forEach(sensor => {
        const li = document.createElement('li')
        li.innerText = sensor;
        sensorDetails.appendChild(li)
    })
}