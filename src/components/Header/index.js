import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {IoBagSharp} from 'react-icons/io5'
import {FiLogOut} from 'react-icons/fi'
import './index.css'

const Header = props => {
  const logout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <div className="header-container">
      <div className="logo-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </div>
      <ul className="options-container">
        <li className="options-container-li-options">
          <Link to="/">
            <AiFillHome className="option-icon" />
          </Link>
        </li>
        <li className="options-container-li-options">
          <Link to="/jobs">
            <IoBagSharp className="option-icon" />
          </Link>
        </li>
        <li className="options-container-li-options">
          <FiLogOut className="option-icon" onClick={logout} />
        </li>
      </ul>
      <div className="large-options-container">
        <div className="option-name">
          <Link to="/" className="option-link">
            Home
          </Link>
          <Link to="/jobs" className="option-link">
            Jobs
          </Link>
        </div>
        <div className="logout-btn-container">
          <button type="button" className="logout-btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
