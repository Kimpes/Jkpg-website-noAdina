import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <div className="navbar-content">
        <a href="/" className="navbar-logo-container">
          <img
            src="/assets/jkpgcity.png"
            alt="logo of JKPG City"
            className="navbar-logo"
          />
        </a>
        <ul>
          <li className="navbar-link">
            <Link href="/stores">Stores</Link>
          </li>
          <li className="navbar-link">
            <Link href="/events">Events</Link>
          </li>
          <li className="navbar-link">
            <Link href="/">Upptäck</Link>
          </li>
          <li className="navbar-link">
            <a href="/">Stadsdelar</a>
          </li>
          <li className="navbar-link">
            <a href="/">Evenemang</a>
          </li>
          <li className="navbar-link">
            <a href="/">Information</a>
          </li>
          <li className="navbar-link">
            <a href="/">SV</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
