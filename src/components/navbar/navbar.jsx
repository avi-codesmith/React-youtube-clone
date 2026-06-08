import Homepage from "../../pages/homepage/homepage";
import "./navbar.css";

import homeLogo from "../../assets/home.svg";
import shortsLogo from "../../assets/shorts.svg";
import c1 from "../../assets/channel1.jpg";
import c2 from "../../assets/channel2.jpg";
import c3 from "../../assets/channel3.jpg";
import c4 from "../../assets/channel4.jpg";

export default function Navbar() {
  return (
    <main>
      <header>
        <nav className="side-navigation">
          <div className="home-shorts">
            <div className="home">
              <div className="home-logo">
                <img src={homeLogo} alt="home" />
              </div>
              <p>Home</p>
            </div>
            <div className="shorts">
              <div className="shorts-logo">
                <img src={shortsLogo} alt="shorts" />
              </div>
              <p>Shorts</p>
            </div>
          </div>
          <div className="subcriptions">
            <h1>Subcription</h1>
            <div className="channel">
              <div className="channel-logo">
                <img src={c1} alt="WWE" />
              </div>
              <div className="channel-name">WWE</div>
            </div>
            <div className="channel">
              <div className="channel-logo">
                <img src={c2} alt="Physics Wallah" />
              </div>
              <div className="channel-name">Physics Wallah</div>
            </div>
            <div className="channel">
              <div className="channel-logo">
                <img src={c3} alt="Trustified" />
              </div>
              <div className="channel-name">Trustified</div>
            </div>
            <div className="channel">
              <div className="channel-logo">
                <img src={c4} alt="PensionBox" />
              </div>
              <div className="channel-name">PensionBox</div>
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
