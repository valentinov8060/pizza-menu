var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        let menu = JSON.parse(this.responseText).menu;
        cardMenu(menu)
    }
};

xhr.open('GET', 'data/menu.json', true);
xhr.send();

function showMenuCatagory(catagory) {
    catagory = catagory.toLowerCase()
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            let menu = JSON.parse(this.responseText).menu;
            let catagoryMenu = menu.filter(function (e) {
                return e.kategori == catagory
            })
            cardMenu(catagoryMenu)
        }
    }
    xhr.open('GET', 'data/menu.json', true);
    xhr.send();
}

function cardMenu (menu) {
    let menuHTML = menu.map(function (e) {
        return `<div class="col mb-5">
                    <div class="card" style="width: 18rem;">
                        <img src="img/menu/${e.gambar}" class="card-img-top" alt="${e.gambar}">
                        <div class="card-body">
                            <h5 class="card-title">${e.nama}</h5>
                            <p class="card-text">${e.deskripsi}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${e.kategori}</li>
                            <li class="list-group-item">Rp. ${e.harga}</li>
                        </ul>
                    </div>
                </div>`
    })
    let cardMenu = document.getElementById('card-menu')
    cardMenu.innerHTML = menuHTML
}


let menuCatagory = document.querySelectorAll('.nav-item .nav-link')
let menuTitle = document.querySelector('#menu-title')

menuCatagory.forEach(function (e) {
    e.addEventListener('click', function () {
        menuCatagory.forEach(function (e) {
            e.classList.remove('active')
        })
        e.classList.add('active')

        if (e.innerHTML == 'All') {
            xhr.open('GET', 'data/menu.json', true);
            xhr.send();
            menuTitle.innerHTML = 'ALL'
        } else if (e.innerHTML == 'Pizza') {
            showMenuCatagory(e.innerHTML)
            menuTitle.innerHTML = 'PIZZA'
        } else if (e.innerHTML == 'Pasta') {
            showMenuCatagory(e.innerHTML)
            menuTitle.innerHTML = 'PASTA'
        } else if (e.innerHTML == 'Nasi') {
            showMenuCatagory(e.innerHTML)
            menuTitle.innerHTML = 'NASI'
        } else if (e.innerHTML == 'Minuman') {
            showMenuCatagory(e.innerHTML)
            menuTitle.innerHTML = 'MINUMAN'
        }
    })
})