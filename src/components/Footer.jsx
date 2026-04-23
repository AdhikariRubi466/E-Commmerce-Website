import { Link } from 'react-router-dom';
import { Share2, MessageCircle, Camera, PlayCircle } from 'lucide-react';

const footerLinks = {
  'Get to Know Us': ['About Us', 'Careers', 'Press Releases', 'Blog'],
  'Connect with Us': ['Facebook', 'Twitter', 'Instagram', 'YouTube'],
  'Make Money with Us': ['Sell on Amazon', 'Become an Affiliate', 'Advertise Products', 'Fulfilment by Amazon'],
  'Let Us Help You': ['Your Account', 'Returns Centre', 'Track Your Order', 'Help'],
};

const socialLinks = [
  { icon: Share2, label: 'Facebook', color: '#1877F2' },
  { icon: MessageCircle, label: 'Twitter / X', color: '#1DA1F2' },
  { icon: Camera, label: 'Instagram', color: '#E4405F' },
  { icon: PlayCircle, label: 'YouTube', color: '#FF0000' },
];

export default function Footer() {
  return (
    <footer className="bg-amazon text-white mt-8">
      {/* Back to top */}
      <div
        className="bg-amazon-light text-center py-3 text-sm cursor-pointer hover:bg-amazon-blue transition-colors"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Back to top
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h3 className="font-bold text-base mb-4 text-white">{title}</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link}>
                  <Link to="/" className="text-gray-400 hover:text-white text-sm transition-colors hover:underline">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <hr className="border-amazon-blue mx-4" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-0.5">
          <span className="text-white font-extrabold text-2xl">amazon</span>
          <span className="text-amazon-orange font-extrabold text-2xl">.in</span>
        </Link>

        {/* Legal links */}
        <div className="flex flex-wrap gap-4 justify-center">
          {['Conditions of Use', 'Privacy Notice', 'Interest-Based Ads'].map((l) => (
            <Link key={l} to="/" className="text-gray-400 hover:text-white text-xs transition-colors">
              {l}
            </Link>
          ))}
        </div>

        {/* Social links */}
        <div className="flex items-center gap-3">
          {socialLinks.map(({ icon: Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="w-8 h-8 rounded-full bg-amazon-blue hover:bg-amazon-orange flex items-center justify-center transition-colors"
            >
              <Icon className="w-4 h-4 text-white" />
            </a>
          ))}
        </div>
      </div>

      <div className="text-center text-gray-500 text-xs pb-4">
        © 2024, Amazon Clone. All rights reserved.
      </div>
    </footer>
  );
}
