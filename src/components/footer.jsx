import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-400 py-4">
            <div className="container mx-auto px-6 text-center">
                {/* Social Media Links */}
                <div className="flex justify-center space-x-6 mb-4">
                    {[
                        { icon: faFacebookF, link: 'https://facebook.com', label: 'Facebook' },
                        { icon: faTwitter, link: 'https://twitter.com', label: 'Twitter' },
                        { icon: faInstagram, link: 'https://instagram.com', label: 'Instagram' },
                        { icon: faLinkedin, link: 'https://linkedin.com', label: 'LinkedIn' },
                    ].map((social, index) => (
                        <a
                            key={index}
                            href={social.link}
                            aria-label={social.label}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition">
                            <FontAwesomeIcon icon={social.icon} />
                        </a>
                    ))}
                </div>

                {/* Links */}
                <div className="text-sm space-x-4">
                    <a href="/" className="hover:underline hover:text-white">Home</a>
                    <a href="/about_us" className="hover:underline hover:text-white">About Us</a>
                    <a href="/contact" className="hover:underline hover:text-white">Contact</a>
                    <a href="/privacy" className="hover:underline hover:text-white">Privacy Policy</a>
                </div>

                {/* Copyright */}
                <p className="mt-4 text-xs">&copy; {new Date().getFullYear()} C.U CHRISBOM. All rights reserved.</p>
            </div>
        </footer>
    );
}
