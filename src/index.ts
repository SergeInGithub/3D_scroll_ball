// // index.ts

// import { gsap } from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// gsap.registerPlugin(ScrollTrigger);

// const context = (
//   document.querySelector('.canvas') as HTMLCanvasElement
// ).getContext('2d')!;
// const frameCount = 179;

// interface Ball {
//   frame: number;
// }

// const currentFrame = (index: number) =>
//   `/best-ball/${(index + 1).toString()}.jpg`;

// const images: HTMLImageElement[] = [];
// let ball: Ball = { frame: 0 };

// for (let i = 0; i < frameCount; i++) {
//   const img = new Image();
//   img.src = currentFrame(i);
//   images.push(img);
// }

// function initializeAnimation() {
//   gsap.to(ball, {
//     frame: frameCount - 1,
//     snap: 'frame',
//     ease: 'none',
//     scrollTrigger: {
//       scrub: true,
//       pin: 'canvas',
//       end: '500%',
//     },
//     onUpdate: render,
//   });

//   gsap.fromTo(
//     '.ball-text',
//     { opacity: 0 },
//     {
//       opacity: 1,
//       scrollTrigger: {
//         scrub: true,
//         start: '50%',
//         end: '60%',
//       },
//       onComplete: () => {
//         gsap.to('.ball-text', { opacity: 0 });
//       },
//     },
//   );

//   images[0].onload = render;

//   function render() {
//     context.canvas.width = images[0].width;
//     context.canvas.height = images[0].height;

//     context.clearRect(0, 0, context.canvas.width, context.canvas.height);
//     context.drawImage(images[ball.frame], 0, 0);
//   }
// }

// export { initializeAnimation };
