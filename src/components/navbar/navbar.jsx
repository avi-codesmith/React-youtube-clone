import Homepage from "../../pages/homepage/homepage";
import "./navbar.css";

export default function Navbar() {
  return (
    <main>
      <header>
        <nav className="side-navigation">
          <div className="home-shorts">
            <div className="home">
              <div className="home-logo">logo</div>
              <p>Home</p>
            </div>
            <div className="shorts">
              <div className="shorts-logo">logo</div>
              <p>Shorts</p>
            </div>
          </div>
          <div className="subcriptions">
            <h1>Subcription</h1>
            <div className="channel">
              <div className="channel-logo">logo</div>
              <div className="channel-name">MrBeast</div>
            </div>
            <div className="channel">
              <div className="channel-logo">logo</div>
              <div className="channel-name">Poonam augustya</div>
            </div>
            <div className="channel">
              <div className="channel-logo">logo</div>
              <div className="channel-name">Pew de Pie</div>
            </div>
          </div>
          <footer>
            <ul>
              <li>About</li>
              <li>Press</li>
              <li>Copyright</li>
              <li>Contact us</li>
              <li>Creator</li>
              <li> Advertise</li>
              <li>Developers</li>
            </ul>
            <ul>
              <li> Terms</li>
              <li> Privacy</li>
              <li>Policy & Safety</li>
              <li> How YouTube works</li>
              <li>Test new features</li>
            </ul>
            <p>&copy; 2026 Google LLC</p>
          </footer>
        </nav>
      </header>
      <Homepage />
    </main>
  );
}
