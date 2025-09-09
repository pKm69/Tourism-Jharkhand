import Link from "next/link"
import { Mountain } from "lucide-react"

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-top">
        <div className="footer-brand">
          <h3>Jharkhand Tourism</h3>
          <p>Discover the authentic beauty of Jharkhand through our smart digital platform.</p>
        </div>
        <div className="footer-links-group">
          <h4>Destinations</h4>
          <ul>
            <li>
              <Link href="/destinations#netarhat">
                Netarhat
              </Link>
            </li>
            <li>
              <Link href="/destinations#betla">
                Betla National Park
              </Link>
            </li>
            <li>
              <Link href="/destinations#hundru">
                Hundru Falls
              </Link>
            </li>
            <li>
              <Link href="/destinations#deoghar">
                Deoghar
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-links-group">
          <h4>Features</h4>
          <ul>
            <li>
              <Link href="/ai-features#itinerary">
                AI Features
              </Link>
            </li>
            <li>
              <Link href="/marketplace">
                Marketplace
              </Link>
            </li>
            <li>
              <Link href="/marketplace">
                Local Marketplace
              </Link>
            </li>
            <li>
              <Link href="/community">
                Community Support
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-links-group">
          <h4>Support</h4>
          <ul>
            <li>
              <Link href="/about#help">
                Help Center
              </Link>
            </li>
            <li>
              <Link href="/contact">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/about#privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/about#terms">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Jharkhand Tourism Platform. All rights reserved.</p>
      </div>
    </footer>
  )
}
