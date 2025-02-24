
import '../design/Home.css'
import { Link } from 'react-router-dom';

const Home=()=> {
    return (
        <div className="home-container">
          <header className="hero">
            <h1>Fast & Reliable Phone Repair</h1>
            <p>Get your phone fixed in no time with our expert repair services.</p>
          </header>
          
          <section className="services">
            <h2>Our Services</h2>
            <div className="service-list">
              <div className="service-item">Screen Replacement</div>
              <div className="service-item">Battery Replacement</div>
              <div className="service-item">Water Damage Repair</div>
              <div className="service-item">Software Issues</div>
            </div>
          </section>
          
          <section className="shop">
            <h2>Shop Phones</h2>
            <p>Looking for a new phone? Check out our collection!</p>
            <Link to="/shop" className="shop-button">Browse Phones</Link>
          </section>
        </div>
      );
}
export default Home;
