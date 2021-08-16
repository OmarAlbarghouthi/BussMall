'use strict';

let result = document.getElementById('results');
let container = document.getElementById('image-container');
let attemptEl = document.getElementById('attempts');
let leftImg = document.getElementById('leftImg');
let rightImg = document.getElementById('rightImg');
let middleImg = document.getElementById('middleImg');


let busImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];

let maxAttempts = 25;
let attempt = 1;
let bus = [];

function BUSIMAGES(busName) {
    this.bName = busName.split('.')[0];
    this.bImg = `images/${busName}`;
    this.votes = 0;
    this.views = 0;
    bus.push(this);
}

for (let x = 0; x < busImages.length; x++) {
    new BUSIMAGES(busImages[x]);
    console.log(busImages[x]);
}
console.log(bus);

function randomImage() {
    return Math.floor(Math.random() * bus.length);
}

let leftIndex;
let rightIndex;
let middleIndex;


function renderImg() {

    leftIndex = randomImage();
    rightIndex = randomImage();
    middleIndex = randomImage();

    while (leftIndex === rightIndex) {
        leftIndex = randomImage();

    }
    while (leftIndex === middleIndex) {
        leftIndex = randomImage();

    }
    while (middleIndex === rightIndex) {
        middleIndex = randomImage();

    }
    leftImg.setAttribute('src', bus[leftIndex].bImg);
    rightImg.setAttribute('src', bus[rightIndex].bImg);
    middleImg.setAttribute('src', bus[middleIndex].bImg);

    console.log(bus[leftIndex].bImg);

    bus[leftIndex].views++;
    bus[rightIndex].views++;
    bus[middleIndex].views++;

}
renderImg();

leftImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);
middleImg.addEventListener('click', clickHandler);

function clickHandler(event) {

    if (attempt <= maxAttempts) {
        let clickedImage = event.target.id;

        if (clickedImage === 'leftImg') {
            bus[leftIndex].votes++;

        } else if (clickedImage === 'rightImg') {
            bus[rightIndex].votes++;

        } else if (clickedImage === 'middleImg') {
            bus[middleIndex].votes++;
        }
        renderImg();
        console.log(bus);
        attempt++;

    } else {

        leftImg.removeEventListener('click', clickHandler);
        rightImg.removeEventListener('click', clickHandler);
        middleImg.removeEventListener('click', clickHandler);
    }

}

function showingResult() {
    for (let i = 0; i < bus.length; i++) {
        let liEl = document.createElement('li');
        result.appendChild(liEl);
        liEl.textContent = `${bus[i].bName} has ${bus[i].votes} votes and  ${bus[i].views} views.`;
    }
}