import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BuildingOfficeIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Careers', href: '/careers' },
      { name: 'Press', href: '/press' },
      { name: 'Blog', href: '/blog' }
    ],
    support: [
      { name: 'Help Center', href: '/help' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Terms of Service', href: '/terms' }
    ],
    services: [
      { name: 'Hospital Registration', href: '/hospital-register' },
      { name: 'Doctor Appointment', href: '/book-appointment' },
      { name: 'Emergency Services', href: '/emergency' },
      { name: 'Health Checkup', href: '/health-checkup' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn', href: '#' }
  ];

  return (
    <footer className="text-white" style={{ background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)' }}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-lg" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
                <BuildingOfficeIcon className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold">MediBook</span>
            </div>
            <p className="mb-8 max-w-md leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Your trusted platform for booking hospital appointments online. 
              Connect with top healthcare providers and manage your medical appointments seamlessly.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <PhoneIcon className="w-5 h-5" style={{ color: '#00a86b' }} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <EnvelopeIcon className="w-5 h-5" style={{ color: '#00a86b' }} />
                <span>support@medibook.com</span>
              </div>
              <div className="flex items-center space-x-3" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                <MapPinIcon className="w-5 h-5" style={{ color: '#00a86b' }} />
                <span>123 Healthcare Ave, Medical City, MC 12345</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:shadow-lg transform hover:-translate-y-1"
                  style={{ background: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}
                  aria-label={social.name}
                >
                  <span className="text-white text-sm font-bold">{social.name.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="hover:text-white transition-colors"
                    style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="hover:text-white transition-colors"
                    style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="hover:text-white transition-colors"
                    style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for the latest health tips and platform updates.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
              />
              <button className="px-8 py-3 rounded-lg font-semibold text-white transition-all hover:shadow-lg transform hover:-translate-y-0.5" style={{ background: 'linear-gradient(135deg, #0066cc 0%, #00a86b 100%)' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} MediBook. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
