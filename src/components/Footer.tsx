import Link from "next/link";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Youtube, 
  ArrowRight 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Top section with newsletter */}
        <div className="bg-white rounded-xl p-8 -mt-24 mb-16 shadow-xl relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl text-black font-bold mb-2">Join Our Newsletter</h3>
              <p className="text-black">
                Stay updated with the latest property deals and exclusive MILKAR opportunities
              </p>
            </div>
            <div>
              <form className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none"
                />
                <button 
                  type="submit" 
                  className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center"
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <span className="text-2xl font-bold text-orange-500">MILKAR</span>
            </Link>
            <p className="text-gray-400 mb-6">
              MILKAR brings together real estate buyers to leverage collective purchasing power for better deals in Indore.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-gray-400">
                  123 Vijay Nagar, Indore<br />
                  Madhya Pradesh, India - 452010
                </p>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                <a href="tel:+91-9893111536" className="text-gray-400 hover:text-white transition-colors">
                  +91 98931 11536
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0" />
                <a href="mailto:info@milkar.com" className="text-gray-400 hover:text-white transition-colors">
                  info@milkar.com
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-orange-500"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { text: "Home", href: "/" },
                { text: "About Us", href: "/about" },
                { text: "Our Process", href: "/about#process" },
                { text: "Testimonials", href: "/testimonials" },
                { text: "FAQs", href: "/faqs" },
                { text: "Contact Us", href: "/contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 text-orange-500 transform group-hover:translate-x-1 transition-transform" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Property Types */}
          <div>
            <h4 className="text-lg font-bold mb-4 relative inline-block">
              Property Types
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-orange-500"></span>
            </h4>
            <ul className="space-y-3">
              {[
                { text: "Residential Plots", href: "/properties/plots" },
                { text: "Apartments & Flats", href: "/properties/apartments" },
                { text: "Villas & Houses", href: "/properties/villas" },
                { text: "Commercial Spaces", href: "/properties/commercial" },
                { text: "Agricultural Land", href: "/properties/agricultural" },
                { text: "Current Projects", href: "/properties/current-projects" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <ArrowRight className="h-4 w-4 mr-2 text-orange-500 transform group-hover:translate-x-1 transition-transform" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Working Hours */}
          <div>
            <h4 className="text-lg font-bold mb-4 relative inline-block">
              Working Hours
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-orange-500"></span>
            </h4>
            <ul className="space-y-3 text-gray-400">
              <li className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 4:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sunday:</span>
                <span>Closed</span>
              </li>
            </ul>
            
            <h4 className="text-lg font-bold mt-8 mb-4 relative inline-block">
              Follow Us
              <span className="absolute bottom-0 left-0 w-1/2 h-0.5 bg-orange-500"></span>
            </h4>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-orange-500 text-white p-2 rounded-full transition-colors"
                title="Visit our Facebook page"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-orange-500 text-white p-2 rounded-full transition-colors"
                title="Visit our Instagram page"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-orange-500 text-white p-2 rounded-full transition-colors"
                title="Visit our Twitter page"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-orange-500 text-white p-2 rounded-full transition-colors"
                title="Visit our LinkedIn page"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-orange-500 text-white p-2 rounded-full transition-colors"
                title="Visit our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} MILKAR. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/sitemap" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}