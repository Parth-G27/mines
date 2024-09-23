// import React from 'react'

const Home = () => {
  return (
    <section className="">
      <h1 className="head_text text-center mb-3">
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

      <section className="relative my-24 py-4">
        <div className="max-w-5xl mx-auto text-center px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            What is Mines Rush?
          </h2>
          <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
           

            <span className="font-semibold text-green-700">Mines Rush</span>! is a thrilling and fast-paced competition where every move brings you closer to victory. Featuring sleek visuals, interactive gameplay, and immersive sound effects, it’s designed to keep you fully engaged. Sign up, dive into the action, and compete with players around the world as you race to climb the leaderboard and claim your win.
          </p>
          <div className="bg-green-50 rounded-2xl p-8 mt-20 shadow-lg">
            <p className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-lime-400 via-[#10a400] to-lime-400 bg-clip-text text-transparent animate-gradient">
              PLAY MINES RUSH NOW
            </p>
            <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
              <span className="font-semibold">
                Join now, sign in, and track your progress
              </span>{" "}
              as you rise through the ranks on the live leaderboard. Whether
              you're playing on mobile or desktop, Mines Rush offers a highly
              interactive and exciting experience where every second counts.
            </p>
          </div>
        </div>
      </section>

      {/* <section className="bg-gray-100 py-16 px-4 md:px-8 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-8 text-center">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Interactive Gameplay
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Enjoy a Minesweeper-like experience with engaging sounds and
                styling.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                User Authentication
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Secure sign-in process using OAuth.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Score Tracking
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Record and display scores for each game session.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Leaderboard
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Compete with other players and see who tops the charts.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Profile Page
              </h3>
              <p className="text-gray-700 leading-relaxed">
                View personal stats, including rank and high score.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-green-700 mb-4">
                Responsive Design
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Fully responsive web application built with TailwindCSS.
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </section>
  );
};

export default Home;