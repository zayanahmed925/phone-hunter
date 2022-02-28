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
    // console.log(phones.data)
    const displaySearchResult = document.getElementById('phones-area');
    phones.data.forEach(phone => {
        console.log(phone)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">Brand: ${phone.brand}</p>
                </div>
                <button type="button" class="btn btn-outline-info">Details</button>
            </div>
        `
        displaySearchResult.appendChild(div);
    });

}