import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BookOpen, MessageSquare, PlusCircle, User } from 'lucide-react';
import { RootState } from '../store';
import { logout } from '../store/slices/authSlice';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link
                to="/"
                className="flex items-center px-2 py-2 text-gray-900 hover:text-indigo-600"
              >
                <BookOpen className="h-6 w-6 mr-2" />
                <span className="font-bold text-xl">Maktaba</span>
              </Link>
            </div>

            <div className="flex items-center">
              {user ? (
                <>
                  <Link
                    to="/create-listing"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                  >
                    <PlusCircle className="h-5 w-5 mr-1" />
                    <span>Sell</span>
                  </Link>
                  <Link
                    to="/messages"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                  >
                    <MessageSquare className="h-5 w-5 mr-1" />
                    <span>Messages</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
                  >
                    <User className="h-5 w-5 mr-1" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="ml-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Maktaba. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;