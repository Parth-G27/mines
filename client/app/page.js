// import React from 'react'

const Home = () => {
  return (
    <section className="">
      <h1 className="head_text text-center mb-3">
        {" "}
        Risk the Mines, Reap the Rewards! 🎮
        <br className="max-md:hidden" />
        <div className="bluegreen_gradient text-center mt-4">Mines Rush</div>
      </h1>
      <p className="text-center text-2xl font-normal py-5">
        Dive into Mine! Trust your instincts, take risks, outlast the
        competition, and claim victory. <br />{" "}
        <span className="font-medium">
          Play hard, Think Fast & Claim Victory! 🏆
        </span>
      </p>

      <h2 className="text-4xl md:text-5xl font-bold text-center text-green-700 mb-8">
        How It Works
      </h2>

      <div className="max-w-4xl mx-auto text-center space-y-8 px-4 md:px-6">
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Unleash your strategic mind with{" "}
          <span className="font-semibold text-green-700">Mines Rush</span>—the
          perfect blend of nostalgic puzzle-solving and cutting-edge innovation.
          Dive into a sleek, fast-paced game with dynamic interactions and
          immersive soundscapes that push your instincts to the limit. This
          isn’t just another minesweeper; it’s a reimagined experience,
          combining the best of the classic game with fresh, modern competition.
        </p>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Track your progress, sign in, and compete for glory on the live
          leaderboard. Whether you're on mobile or desktop,{" "}
          <span className="font-semibold text-green-700">Mines Rush</span>{" "}
          delivers a thrilling challenge that’s as fun as it is addictive.
        </p>

        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Are you ready to master the grid and claim victory? The rush is
          on—sign in now and start your adventure!
        </p>
      </div>

      {/* Decorative Background Image (optional) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full">
          {/* Add any subtle background design like a grid or abstract shapes */}
        </svg>
      </div>
    </section>
  );
};

export default Home;
