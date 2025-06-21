import { FaSearch, FaRegHeart, FaShoppingBag, FaUser, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaBars, FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useUI } from '../context/UIContext';
import { useState } from 'react';

const Header = () => {
  const { cartItems } = useCart();
  const { isAuthenticated, logout, user } = useAuth();
  const { openLoginModal } = useUI();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-green-700 text-white flex flex-col lg:flex-row justify-between items-center px-4 lg:px-15 py-2 text-xs">
        <div className="hidden lg:block">
          <span>Call Us: +123-456-789</span>
        </div>
        <div className="text-center lg:text-left mb-2 lg:mb-0">
          <span>Sign up and GET 20% OFF for your first order. <a href="/login" className="underline font-semibold">Sign up now</a></span>
        </div>
        <div className="flex space-x-3 lg:space-x-4">
          <a href="#" className="hover:text-green-200 transition-colors"><FaFacebook /></a>
          <a href="#" className="hover:text-green-200 transition-colors"><FaTwitter /></a>
          <a href="#" className="hover:text-green-200 transition-colors"><FaInstagram /></a>
          <a href="#" className="hover:text-green-200 transition-colors"><FaLinkedin /></a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col lg:flex-row justify-between items-center px-4 lg:px-15 py-5 border-b border-gray-200">
        {/* Logo */}
        <div className="w-full lg:w-auto flex justify-between items-center mb-4 lg:mb-0">
          <Link to="/" className="text-2xl font-bold text-gray-800 no-underline">
            Ecommerce In8 Shop
          </Link>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-800"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul className={`lg:flex lg:items-center lg:space-x-8 ${isMobileMenuOpen ? 'flex flex-col space-y-4 w-full' : 'hidden lg:flex'}`}>
          <li><Link to="/" className="text-green-700 font-medium hover:text-green-800 transition-colors">Home</Link></li>
          <li><Link to="/" className="text-gray-600 font-medium hover:text-green-700 transition-colors">Shop</Link></li>
          <li><a href="#" className="text-gray-600 font-medium hover:text-green-700 transition-colors">About Us</a></li>
          <li><a href="#" className="text-gray-600 font-medium hover:text-green-700 transition-colors">Blogs</a></li>
        </ul>

        {/* Navigation Icons */}
        <div className={`lg:flex lg:items-center lg:space-x-5 ${isMobileMenuOpen ? 'flex flex-col space-y-4 w-full mt-4' : 'hidden lg:flex'}`}>
          <button className="p-2 text-gray-600 hover:text-green-700 transition-colors">
            <FaSearch size={18} />
          </button>
          <button className="p-2 text-gray-600 hover:text-green-700 transition-colors">
            <FaRegHeart size={18} />
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="p-2 text-gray-600 hover:text-green-700 transition-colors relative"
          >
            <FaShoppingBag size={18} />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {cartItemCount}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-3 space-y-2 lg:space-y-0">
              <span className="text-gray-700">Hello, {user?.name}</span>
              <button
                onClick={() => navigate('/orders')}
                className="btn-outline text-sm"
              >
                My Orders
              </button>
              <button
                onClick={handleLogout}
                className="btn-secondary text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => openLoginModal()}
              className="p-2 text-gray-600 hover:text-green-700 transition-colors"
            >
              <FaUser size={18} />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header; 