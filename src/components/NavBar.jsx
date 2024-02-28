export default function NavBar() {
  return (
    <nav>
      <div className="navbar-content">
        <a href="/" className="navbar-logo-container">
          <img src="/assets/temp-logo.png" alt="logo of JKPG City" className="navbar-logo"/>
        </a>
        <ul>
          <li className="navbar-link"><a href="/stores">Upptäck</a></li>
          <li className="navbar-link"><a href="/">Stadsdelar</a></li>
          <li className="navbar-link"><a href="/">Evenemang</a></li>
          <li className="navbar-link"><a href="/">Information</a></li>
          <li className="navbar-link"><a href="/">SV</a></li>
        </ul>
      </div>
    </nav>
  )
}
