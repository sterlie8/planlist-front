import React from 'react';
import './Header.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header({ logoSrc, navItems = [], isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 알아내기

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="logo">
          <Link to="/">
            <img src={logoSrc} alt="Logo" />
          </Link>
        </div>
        <div className='nav-right'>
          <ul className="nav-links">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={location.pathname === item.path ? 'active' : ''}
              >
                <Link to={item.path}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <div className="auth-buttons">
            {!isLoggedIn ? (
              <>
                <Link to="/login"><button className="login">로그인</button></Link>
                <Link to="/register"><button className="register">회원가입</button></Link>
              </>
            ) : (
              <>
                <Link to="/mypage"><button className="login">마이페이지</button></Link>
                <button className="register" onClick={handleLogout}>로그아웃</button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
