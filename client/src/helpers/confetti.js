import confetti from 'canvas-confetti';
require('canvas-confetti');



//confetti
// require('canvas-confetti');
// const myCanvas = document.createElement('canvas');
// document.body.appendChild(myCanvas);

// const myConfetti = confetti.create(myCanvas, {
//   resize: true,
//   useWorker: true
// });
// myConfetti({
//   particleCount: 1500,
//   spread: 1600
//   // any other options from the global
//   // confetti function
// });

 export default function partyConfetti() {
     
  var end = Date.now() + (15 * 400);
  
  (function frame() {
    //bottom
    confetti({
      // startVelocity: 55,
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y:1 },
      // colors: ['#1c1c1d']
      colors: [	'#66FF66','#FF00CC']
    });
    confetti({
      // startVelocity: 55,
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y:1 },
      // colors: ['#1c1c1d']
      colors: ['#66FF66', '#FF00CC']
    });

    //top corners
    confetti({
      startVelocity: 30,
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0 },
      // colors: ['#1c1c1d']
      colors: ['#66FF66', '#FF00CC']
    });

    confetti({
      startVelocity: 30,
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0 },
      // colors: ['#1c1c1d']
      colors: ['#66FF66', '#FF00CC']
    });

    //top middle
    // confetti({
    //   startVelocity: 30,
    //   particleCount: 2,
    //   angle: 120,
    //   spread: 55,
    //   origin: { x: .3, y: 0 },
    // });

    // confetti({
    //   startVelocity: 30,
    //   particleCount: 2,
    //   angle: 120,
    //   spread: 55,
    //   origin: { x: .87, y: 0 },
    // });

    // confetti({
    //   particleCount: 2,
    //   angle: 120,
    //   spread: 55,
    //   origin: { y: 0 },
    // });

    // requestAnimationFrame(frame)
  
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());

}
