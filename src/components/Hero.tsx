import { Search, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-blue-700 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Find Your Dream <br /> Job with Ease
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-md">
            Search, Apply, and Track Job Applications All in One Place
          </p>
        </div>
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-600 rounded-full opacity-50 blur-3xl"></div>
          <img 
            src="https://imgproxy.attic.sh/insecure/f:webp/q:90/w:1920/plain/https://attic.sh/2okhid71woue0uf039e13v1fg4e9" 
            alt="Hero character" 
            className="relative z-10 w-full max-w-md mx-auto rounded-3xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
      
      {/* Search Bar Overlay */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-20">
        <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 border border-gray-100 rounded-xl bg-gray-50 w-full">
            <Search className="text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Job title, Keywords, or Company name" 
              className="bg-transparent border-none focus:ring-0 w-full text-sm"
            />
          </div>
          <div className="flex-1 flex items-center gap-3 px-4 py-2 border border-gray-100 rounded-xl bg-gray-50 w-full">
            <MapPin className="text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Location" 
              className="bg-transparent border-none focus:ring-0 w-full text-sm"
            />
          </div>
          <button className="bg-blue-700 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-800 transition-all w-full md:w-auto">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
