import React, { useEffect } from 'react'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCookies } from 'react-cookie'
import { handleBgImgs } from '../HandleBgImgs/handleBgImgs'
import { handleDropdownModal } from './SmallScreenNotifationModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faComment, faHeart, faMessage, faPaperPlane, faSquarePlus, faUser  } from '@fortawesome/free-regular-svg-icons';
import testImg from "../Images/Light-5.jpeg"
import { faHouse, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Home = () => {

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  useEffect(()=>{
      document.title = "Home";
      handleBgImgs(currentDisplayMode,"Main-img","Main");
  },[currentDisplayMode])

  return (
    <div id='Main' className='Main'>
        <img id='Main-img' loading='lazy' src='' alt="Signup" />
        <div className={`Main-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <div className={`Feed-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <ul className={`list-group List ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`card Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                  <div className="card-body Post-header">
                    <div className={`card border-0 mb-3 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <div className="row g-0">
                        <div className="Logo-container">
                          <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                        </div>
                        <div className="col-md-8 d-flex align-items-center">
                          <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User Name</h2>
                        </div>
                      </div>
                      <div className="col-md-8 d-flex align-items-center">
                          <p className={`Caption ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>Caption</p>
                      </div>
                    </div>
                  </div>
                  <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                    <img src={testImg} className="card-img-top Post-content-media" alt="Post" />
                  </div>
                    <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                       <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faHeart}/>
                       </div>
                       <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faComment}/>
                       </div>
                       <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faPaperPlane}/>
                       </div>
                    </div>
                </div>
              </li>

              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`card Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                  <div className="card-body Post-header">
                    <div className={`card border-0 mb-3 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <div className="row g-0">
                        <div className="Logo-container">
                          <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                        </div>
                        <div className="col-md-8 d-flex align-items-center">
                          <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User Name</h2>
                        </div>
                      </div>
                      <div className="col-md-8 d-flex align-items-center">
                          <p className={`Caption ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>Caption</p>
                      </div>
                    </div>
                  </div>
                  <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                    <img src={testImg} className="card-img-top Post-content-media" alt="Post" />
                  </div>
                    <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                       <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faHeart}/>
                       </div>
                       <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faComment}/>
                       </div>
                       <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faPaperPlane}/>
                       </div>
                    </div>
                </div>
              </li>

              <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`card Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                  <div className="card-body Post-header">
                    <div className={`card border-0 mb-3 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <div className="row g-0">
                        <div className="Logo-container">
                          <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                        </div>
                        <div className="col-md-8 d-flex align-items-center">
                          <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User Name</h2>
                        </div>
                      </div>
                      <div className="col-md-8 d-flex align-items-center">
                          <p className={`Caption ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>Caption</p>
                      </div>
                    </div>
                  </div>
                  <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                    <img src={testImg} className="card-img-top Post-content-media" alt="Post" />
                  </div>
                    <div className={`list-group-item Interactions ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                       <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faHeart}/>
                       </div>
                       <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faComment}/>
                       </div>
                       <div className="Interactions-item">
                          <FontAwesomeIcon className="Interactions-item-icon" icon={faPaperPlane}/>
                       </div>
                    </div>
                </div>
              </li>
            </ul>

            </div>
            
            <div className={`Side-bar ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
              <div className="Side-bar-header">
                  <div className="Side-bar-header-label"><h5>notifications</h5></div>
                  <div className="Side-bar-header-icon-container">
                      <FontAwesomeIcon className='Side-bar-header-icon' icon={faBell}/>
                  </div>
              </div>
              <ul className="list-group List">
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User like your post</li>
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User comment on your post</li>
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User share your post</li>
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>You have a message from User</li>
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User like your post</li>
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User comment on your post</li>
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User share your post</li>
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>You have a message from User</li>
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User like your post</li>
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User comment on your post</li>
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User share your post</li>
                <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>You have a message from User</li>
              </ul>
            </div>
            <div className={`bottom-bar ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
              <div className="bottom-bar-item">
                <FontAwesomeIcon className='bottom-bar-item-icon' icon={faHouse}/>
              </div>
              <div className="bottom-bar-item">
                <FontAwesomeIcon className='bottom-bar-item-icon' icon={faMagnifyingGlass}/>
              </div>
              <div className="bottom-bar-item">
                <FontAwesomeIcon className='bottom-bar-item-icon' icon={faSquarePlus}/>
                </div>
              <div className="bottom-bar-item">
                <FontAwesomeIcon className='bottom-bar-item-icon' icon={faMessage}/>
              </div>
              <div className="bottom-bar-item">
                <FontAwesomeIcon className='bottom-bar-item-icon' icon={faUser}/>
              </div>
            </div>

            <div className="DropdownModal">
              <FontAwesomeIcon className='DropdownModal-icon' icon={faBell} onClick={()=>{handleDropdownModal()}}/>
              <div className="DropdownModal-list">
                  <div id="Dropdown-Modal" className="DropdownModal-items">
                    <ul className="list-group List">
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User like your post</li>
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User comment on your post</li>
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User share your post</li>
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>You have a message from User</li>
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User like your post</li>
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User comment on your post</li>
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User share your post</li>
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>You have a message from User</li>
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User like your post</li>
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User comment on your post</li>
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User share your post</li>
                      <li className={`list-group-item List-item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>You have a message from User</li>
                    </ul>
                  </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Home
