const loadPhone = () => {
    const searchField = document.getElementById('scarch-field');
    const searchFieldText = searchField.value;
    const ul = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`
    fetch(ul)
        .then(res => res.json())
        .then(data => searchResult(data))
    // console.log(searchFieldText);
}

const searchResult = (phones) => {
    // console.log(phones.data)
    phones.data.forEach(phone => {
        console.log(phone)
    });

}