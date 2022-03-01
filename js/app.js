const loadPhone = () => {
    const searchField = document.getElementById('scarch-field');
    const searchFieldText = searchField.value;
    searchField.value = '';
    const ul = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`
    fetch(ul)
        .then(res => res.json())
        .then(data => searchResult(data))
    // console.log(searchFieldText);
}

const searchResult = (phones) => {
    // console.log(phones)
    const displaySearchResult = document.getElementById('phones-area');
    phones.data.forEach(phone => {
        // console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                </div>
                <button onClick="loadDetails('${phone.slug}')" type="button" class="btn btn-outline-info">Details</button>
            </div>
        `
        displaySearchResult.appendChild(div);
    });

}

const loadDetails = (detailId) => {
    // console.log('detailId')
    const ul = `https://openapi.programming-hero.com/api/phone/${detailId}`
    fetch(ul)
        .then(res => res.json())
        .then(data => displayDetails(data.data))
}

const displayDetails = (details) => {
    console.log(details)
    const phoneDetails = document.getElementById('phone-details')
    const div = document.createElement('div');
    div.classList.add('row');
    div.innerHTML = `
    <div class="col-md-4">
                <img src="${details.image}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h4 class="card-title">
                    ${details.name}</h4>
                    <h6 class="card-text"><span class="text-secondary">Release Date: ${details.releaseDate ? details.releaseDate : 'Not Found'}</span></h6>
                    
                    
                    <h5 class="card-text">Main Feautre:</h5>
                    <h6 class="card-text">Chipset: <span class="text-secondary">${details.mainFeatures.chipSet}</span></h6>
                    <h6 class="card-text">Display: <span class="text-secondary">${details.mainFeatures.displaySize}</span></h6>
                    <h6 class="card-text">Memory: <span class="text-secondary">${details.mainFeatures.storage}</span></h6>
                    <br>
                    <h5 class="card-text">Other Feautre</h5>
                    <h6 class="card-text">Bluetooth: <span class="text-secondary">${details.others.Bluetooth}</span></h6>
                    <h6 class="card-text">GPS: <span class="text-secondary">${details.others.GPS}</span></h6>
                    <h6 class="card-text">NFC: <span class="text-secondary">${details.others.NFC}</span></h6>
                    <h6 class="card-text">Radio: <span class="text-secondary">${details.others.Radio}</span></h6>
                    <h6 class="card-text">USB: <span class="text-secondary">${details.others.USB}</span></h6>
                    <h6 class="card-text">WLAN: <span class="text-secondary">${details.others.WLAN}</span></h6>
                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    <h5 class="card-text">sensors:</h5>
                    <p class="sensors"><span>${details.mainFeatures.sensors[0]
        }</span> <span>${details.mainFeatures.sensors[1]}</span><span>${details.mainFeatures.sensors[2]
        }</span> <span>${details.mainFeatures.sensors[3]}</span><span>${details.mainFeatures.sensors[4]
        }</span> <span>${details.mainFeatures.sensors[5]}</span></p>
                </div>
            </div>
    `;
    phoneDetails.appendChild(div);
}