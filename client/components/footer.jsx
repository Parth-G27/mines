// components/Footer1.jsx

export default function Footer1() {
    return (
      <footer className="bg-green-50 text-black py-8 border-t border-green-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Brand / Title */}
            <div className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 21h22L12 2zm0 3.45l7.12 13.55H4.88L12 5.45z" />
              </svg>
              <span className="text-xl font-bold text-green-700 tracking-wide">Mines Rush</span>
            </div>
            
            {/* Navigation Links */}
            <nav className="space-x-6 text-lg font-medium">
              <a href="#home" className="text-green-800 hover:text-green-600 transition-colors">Home</a>
              <a href="#about" className="text-green-800 hover:text-green-600 transition-colors">About</a>
              <a href="#games" className="text-green-800 hover:text-green-600 transition-colors">Games</a>
              <a href="#contact" className="text-green-800 hover:text-green-600 transition-colors">Contact</a>
            </nav>
  
            {/* Copyright */}
            <div className="text-gray-500 text-sm">
              © 2024 Mines Rush. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    );
  }
  