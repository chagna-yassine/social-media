import React, { useEffect, useState } from 'react'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { handleBgImgs } from '../HandleBgImgs/handleBgImgs'

const Home = () => {

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  //To stop the component from loading twice
  let isCanceled = false;
  useEffect(()=>{
    if(!isCanceled){
      document.title = "Home";
      handleBgImgs(currentDisplayMode,"Main-img","Main");
    }
    return ()=>{
      isCanceled = true;
    }
  },[currentDisplayMode])

  return (
    <div id='Main' className='Main'>
        <img id='Main-img' loading='lazy' src='' alt="Signup" />
        <div className="Main-container">
            <div className={`Feed-container ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <ul className={`list-group List ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
              <li className={`list-group-item List ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`card Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                  <div className="card-body">
                    <div className={`card mb-3 Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                        </div>
                        <div className="col-md-8">
                          <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User Name</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                    <div className="card-body">
                    <p className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>Label</p>
                    </div>
                    <img src="../Images/Light-5.jpeg" className="card-img-top" alt="Post" />
                  </div>
                  <ul className="list-group">
                    <li className={`list-group-item More ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>A second item</li>
                  </ul>
                </div>
              </li>

              <li className={`list-group-item List ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`card Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                  <div className="card-body">
                    <div className={`card mb-3 Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                        </div>
                        <div className="col-md-8">
                          <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User Name</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                    <div className="card-body">
                    <p className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>Label</p>
                    </div>
                    <img src="../Images/Light-5.jpeg" className="card-img-top" alt="Post" />
                  </div>
                  <ul className="list-group">
                    <li className={`list-group-item More ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>A second item</li>
                  </ul>
                </div>
              </li>

              <li className={`list-group-item List ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                <div className={`card Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                  <div className="card-body">
                    <div className={`card mb-3 Post ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                      <div className="row g-0">
                        <div className="col-md-4">
                          <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
                        </div>
                        <div className="col-md-8">
                          <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>User Name</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={`card Post-content ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                    <div className="card-body">
                    <p className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>Label</p>
                    </div>
                    <img src="../Images/Light-5.jpeg" className="card-img-top" alt="Post" />
                  </div>
                  <ul className="list-group">
                    <li className={`list-group-item More ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>A second item</li>
                  </ul>
                </div>
              </li>
            </ul>

            </div>
            
            <div className={`Side-bar ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
              <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}></div>
              <ul className="list-group List">
                <li className={`list-group-item List-Item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>A second item</li>
                <li className={`list-group-item List-Item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>A third item</li>
                <li className={`list-group-item List-Item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>A fourth item</li>
                <li className={`list-group-item List-Item ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>And a fifth one</li>
              </ul>
            </div>
            <div className={`bottom-bar ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            </div>
        </div>
    </div>
  )
}

export default Home
