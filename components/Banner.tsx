import React from 'react';
import Image from 'next/image';

const Banner: React.FC = () => {
  return (
    <div className="relative w-full h-screen text-center overflow-hidden">
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-52 h-64 perspective-1000 animate-autoRun z-10">
        <div className="absolute inset-0 transform rotateY-0 translateZ-550">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`absolute inset-0 transform rotateY-${i * (360 / 10)} translateZ-550`}
              style={{ transform: `rotateY(${i * (360 / 10)}deg) translateZ(550px)` }}
            >
              <Image src={`/images/dragon_${i + 1}.jpg`} alt={`Dragon ${i + 1}`} layout="fill" objectFit="cover" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-6xl flex flex-wrap justify-between items-center p-10 z-20">
        <h1 className="text-8xl font-bold text-blue-900 relative before:content-['CSS ONLY'] before:absolute before:inset-0 before:text-transparent before:stroke-2 before:stroke-gray-300">
          CSS ONLY
        </h1>

        <div className="text-right max-w-xs">
          <h2 className="text-4xl font-bold">LUN DEV</h2>
          <p className="text-xl font-semibold">Web Design</p>
          <p>Subscribe to the channel to watch many interesting videos</p>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-3/4 bg-cover bg-center bg-no-repeat z-10" style={{ backgroundImage: 'url(/images/model.png)' }}></div>
      </div>
    </div>
  );
};

export default Banner;
