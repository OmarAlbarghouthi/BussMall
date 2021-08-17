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
let imgNames = [];
let views = [];
let votes = [];
let ranImg = [];


function saveInLocalStorage(){
let data = JSON.stringify(bus);
localStorage.setItem('BUSMALL', data);

}

function readByLocalStorage() {
let stringObj = localStorage.getItem('BUSMALL');
let normalObj = JSON.parse(stringObj);

if (normalObj) {

    bus = normalObj;
    renderImg();
    
}
    
}

function BUSIMAGES(busName) {
    this.bName = busName.split('.')[0];
    this.bImg = `images/${busName}`;
    this.votes = 0;
    this.views = 0;
    bus.push(this);
    imgNames.push(this.bName);
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

    
    while (leftIndex === middleIndex ||
        middleIndex === rightIndex || leftIndex === rightIndex ||ranImg.includes(leftIndex) || ranImg.includes(middleIndex) || ranImg.includes(rightIndex)) {

            leftIndex = randomImage();
            rightIndex = randomImage();
            middleIndex = randomImage();
            
     }

     ranImg[0]=(leftIndex);
     ranImg[1]=(rightIndex);
     ranImg[2]=(middleIndex);


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
        saveInLocalStorage();

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
        votes.push(bus[i].votes);
        views.push(bus[i].views);
    }
    chartRender();

}

function chartRender() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: imgNames,
            datasets: [{
                label: '# of Votes',
                data: votes,
                backgroundColor: [
                    'blue'
                ],
                borderColor: [
                    'red'
                    
                ],
                borderWidth: 2
            },{
                label: '# of Views',
                data: views,

                backgroundColor: [
                    'red'
                ],
                borderColor: [                   
                    'blue'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

readByLocalStorage();
