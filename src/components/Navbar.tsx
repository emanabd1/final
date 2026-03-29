import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../firebase';
import { Briefcase } from 'lucide-react';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-blue-700 font-bold text-xl">
              <div className="bg-blue-700 p-1.5 rounded-lg text-white">
                <Briefcase size={24} />
              </div>
              <span>JOBSPHEERE</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="text-blue-700 border-b-2 border-blue-700 px-1 pt-1 text-sm font-medium">
                Job Search
              </Link>
              <Link to="/applications" className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium">
                My Applications
              </Link>
              <Link to="/companies" className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium">
                Companies
              </Link>
              <Link to="/contact" className="text-gray-500 hover:text-gray-700 px-1 pt-1 text-sm font-medium">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-blue-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-blue-700 text-white px-8 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-gray-700 border border-gray-300 px-8 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
