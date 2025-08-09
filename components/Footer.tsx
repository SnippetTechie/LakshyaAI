import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-background-primary/80 backdrop-blur-sm text-text-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-primary-500 mb-4">
              LakshyaAI
            </h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Empowering India's youth with career clarity through real insights and hands-on experience.
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-text-primary">Platform</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#features" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Career Simulator
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Career Tools
                </Link>
              </li>
              <li>
                <Link href="/assessment" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Career Assessment
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-text-primary">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/mentors" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Mentors
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-text-primary">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-text-secondary hover:text-primary-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-text-secondary hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-dark-400/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-secondary text-sm">
              © 2025 LakshyaAI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-text-secondary hover:text-primary-400 text-sm transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-text-secondary hover:text-primary-400 text-sm transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="text-text-secondary hover:text-primary-400 text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
