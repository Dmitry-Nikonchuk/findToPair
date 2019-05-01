// const game = document.getElementById('game-container');

// const shuffle = function(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var num = Math.floor(Math.random() * (i + 1));
//         var d = array[num];
//         array[num] = array[i];
//         array[i] = d;
//     }
//     return array;
// }


// let resultsArray = [];
// let images = [1, 2, 3, 4, 5, 6, 7, 8];
// let clone = images.slice(0);
// images = shuffle([...images, ...clone]);

// let init = function() {
//     for (let i = 0; i < 16; i++) {
//         let item = document.createElement('div');
//         let front = document.createElement('div');
//         let back = document.createElement('div');
//         let img = document.createElement('img');
//         item.classList = 'item';
//         item.dataset.item = images[i];
//         front.classList = 'front';
//         back.classList = 'back';
//         img.src = `img/${images[i]}.png`;
//         front.appendChild(img);
//         item.appendChild(front);
//         item.appendChild(back);
//         game.appendChild(item);
//     }
//     setTimeout(() => {
//         let items = document.querySelectorAll('.item');
//         for (let item of items) {
//             item.classList.add('close');
//         }
//     }, 3000);
//     const items = document.querySelectorAll('.item');

//     for(let item of items) {
//         item.onclick = function() {
//             if(!this.classList.contains('flipped') && !this.classList.contains('correct')) {
//                 this.classList.add('flipped');
//                 this.classList.remove('close');
//                 resultsArray.push(this.dataset.item);
//             }
//             if(resultsArray.length > 1) {
//                 if(resultsArray[0] === resultsArray[1]) {
//                     check('correct');
//                     resultsArray = [];
//                 }
//                 else {
//                     setTimeout(() => {
//                         check('close');
//                     }, 500);
//                 }
//                 resultsArray = [];
//             }
            
//            console.log(resultsArray);
           
//         }
//     }
// }

// function check(className) {
//     let flipped = document.getElementsByClassName('flipped');
//     for (let flip of flipped) {
//         flip.classList.remove('flipped');
//         flip.classList.add(className);
//     }
// }



class Game  {
    constructor() {
        this.items = document.getElementsByClassName('item');
        this.resultsArray = [];
    }

    init() {
        let images = [1, 2, 3, 4, 5, 6, 7, 8];
        let clone = images.slice(0);
        let container = document.getElementById('game-container');
        let that = this;
        container.innerHTML = "";
        images = this.shuffle([...images, ...clone]);
        for (let i = 0; i < 16; i++) {
            let item = document.createElement('div');
            let front = document.createElement('div');
            let back = document.createElement('div');
            let img = document.createElement('img');
            item.classList = 'item';
            item.dataset.item = images[i];
            front.classList = 'front';
            back.classList = 'back';
            img.src = `img/${images[i]}.png`;
            front.appendChild(img);
            item.appendChild(front);
            item.appendChild(back);
            container.appendChild(item);
        }
        setTimeout(() => {
            for (let item of this.items) {
                item.classList.add('close');
            }
            [...this.items].map(item => {
                item.onclick = this.click.bind(that);
            });
        }, 2000);
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let num = Math.floor(Math.random() * (i + 1));
            let d = array[num];
            array[num] = array[i];
            array[i] = d;
        }
        return array;
    }

    click(e) {
        let that = e.target.parentElement;
        if(!that.classList.contains('flipped') || !that.classList.contains('correct')) {
            that.classList.add('flipped');
            that.classList.remove('close');
            this.resultsArray.push(that.dataset.item);
        }
        if(this.resultsArray.length > 1) {
            if(this.resultsArray[0] === this.resultsArray[1]) {
                this.check('correct');
                this.resultsArray = [];
            }
            else {
                this.check('close');
                this.resultsArray = [];
            }
        }
    }
    check(className) {
        let flipped = document.getElementsByClassName('flipped');

        setTimeout(() => {
            for (let i = flipped.length - 1; i >= 0; i--) {
                flipped[i].classList.add(className);
                flipped[i].classList.remove('flipped');
            }
            this.isWin();
        }, 500);
    }

    isWin() {
        let items = document.getElementsByClassName('item');
        let notCorrect = [...items].filter(item => {
            return !item.classList.contains('correct');
        });
        if(notCorrect.length == 0) {
            alert('You Win!!!');
            this.init();
        }
    }
}

const game = new Game();
window.onload = game.init();
