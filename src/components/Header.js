// src/components/Header.js
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid #eee',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: 24, color: '#1a73e8' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#1a73e8' }}>
          MyMutual
        </Link>
      </div>
      <nav style={{ display: 'flex', gap: 24 }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#444' }}>Home</Link>
        <Link to="/mutual-funds" style={{ textDecoration: 'none', color: '#444' }}>Mutual Funds</Link>
        <Link to="/amc" style={{ textDecoration: 'none', color: '#444' }}>AMC</Link>
      </nav>
    </header>
  );
};

export default Header;
