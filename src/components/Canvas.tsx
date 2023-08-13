import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Canvas() {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const canvas = document.querySelector('.canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d')!;
    const frameCount = 179;

    const currentFrame = (index: number) =>
      `/best-ball/${(index + 1).toString()}.jpg`;

    const images: HTMLImageElement[] = [];
    let ball = { frame: 0 };

    let imagesLoadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        imagesLoadedCount++;
        if (imagesLoadedCount === frameCount) {
          setImagesLoaded(true);
        }
      };
      images.push(img);
    }

    if (imagesLoaded) {
      gsap.to(ball, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none', // Increment normally
        scrollTrigger: {
          scrub: true, // Animate based on scroll
          pin: 'canvas', // Hold image until scroll is complete
          end: '500%',
          // markers: true //! Shows the start and end
        },
        onUpdate: render,
      });

      gsap.fromTo(
        '.ball-text',
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            scrub: true,
            start: '50%',
            end: '60%',
          },
          onComplete: () => {
            gsap.to('.ball-text', { opacity: 0 });
          },
        },
      );

      images[0].onload = render;
    }

    function render() {
      context.canvas.width = images[0].width;
      context.canvas.height = images[0].height; // Equates image width and height to canvas for responsive rendering

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(images[ball.frame], 0, 0);
    }
  }, [imagesLoaded]); // Depend on imagesLoaded state to re-run the effect

  return <canvas className="canvas"></canvas>;
}
