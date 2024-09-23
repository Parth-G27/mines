import { FaGem, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-white to-green-50 py-12 mt-20 border-t border-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:justify-between items-center">
          
          <div className="flex flex-col items-center md:items-start space-y-2">
            <a href="/">
            <div className="flex items-center space-x-2">
              <FaGem className="text-4xl text-gray-800" />
              <span className="text-3xl font-bold text-gray-800 tracking-wide">Mines Rush</span>
            </div>
            </a>
            <p className="text-sm text-gray-800 text-center md:text-left">Experience the excitement of high-stakes mining action!</p>
          </div>
          
          <nav className="flex flex-wrap justify-center md:justify-end gap-6 text-2xl font-medium">
            <a href="/" className="text-gray-800 hover:text-gray-600 transition-colors duration-300 transform hover:scale-110">Home</a>
            <a href="/play" className="text-gray-800 hover:text-gray-600 transition-colors duration-300 transform hover:scale-110">Play</a>
            <a href="/leaderboard" className="text-gray-800 hover:text-gray-600 transition-colors duration-300 transform hover:scale-110">Leaderboard</a>
            <a href="/profile" className="text-gray-800 hover:text-gray-600 transition-colors duration-300 transform hover:scale-110">Profile</a>
          </nav>

          <div className="flex flex-col items-center md:items-end space-y-4">
            <div className="flex space-x-4">
              <a href="https://github.com/Parth-G27/mines" className="text-gray-800 hover:text-gray-900 transition-colors duration-300">
                <FaGithub className="text-2xl" />
              </a>
             
              <a href="https://www.linkedin.com/in/parthxbidari/" className="text-gray-800 hover:text-gray-900 transition-colors duration-300">
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
            <div className="text-gray-800 text-sm">
              © 2024 Mines Rush. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
