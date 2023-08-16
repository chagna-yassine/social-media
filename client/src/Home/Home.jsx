import React, { useEffect, useState } from 'react'
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
// import { handleBgImgs } from '../HandleBgImgs/handleBgImgs'

const Home = () => {

  const [cookies] = useCookies(['displayMode']);
  const currentDisplayMode = cookies.displayMode || 'light';

  //To stop the component from loading twice
  let isCanceled = false;
  useEffect(()=>{
    if(!isCanceled){
      document.title = "Home";
      // handleBgImgs(currentDisplayMode);
    }
    return ()=>{
      isCanceled = true;
    }
  },[currentDisplayMode])

  return (
    <div id='Main' className='Main'>
        <div className="Main-container">
            <div className="Feed-container">

            <ul className="list-group List">
              <li className="list-group-item List">
                <div className="card Post">
                  <div className="card-body">
                    <div className="card mb-3 Post">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <div className="Logo"></div>
                        </div>
                        <div className="col-md-8">
                          <h2 className='Label'>User Name</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card Post-content">
                    <div className="card-body">
                    <p className='Label'>Label</p>
                    </div>
                    <img src="../Images/Light-5.jpeg" className="card-img-top" alt="Post" />
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item More">A second item</li>
                  </ul>
                </div>
              </li>

              <li className="list-group-item List">
                <div className="card Post">
                  <div className="card-body">
                    <div className="card mb-3 Post">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <div className="Logo"></div>
                        </div>
                        <div className="col-md-8">
                          <h2 className='Label'>User Name</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card Post-content">
                    <div className="card-body">
                    <p className='Label'>Label</p>
                    </div>
                    <img src="../Images/Light-5.jpeg" className="card-img-top" alt="Post" />
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item More">A second item</li>
                  </ul>
                </div>
              </li>

              <li className="list-group-item List">
                <div className="card Post">
                  <div className="card-body">
                    <div className="card mb-3 Post">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <div className="Logo"></div>
                        </div>
                        <div className="col-md-8">
                          <h2 className='Label'>User Name</h2>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card Post-content">
                    <div className="card-body">
                    <p className='Label'>Label</p>
                    </div>
                    <img src="../Images/Light-5.jpeg" className="card-img-top" alt="Post" />
                  </div>
                  <ul className="list-group">
                    <li className="list-group-item More">A second item</li>
                  </ul>
                </div>
              </li>
            </ul>

            </div>
            
            <div className="Side-bar">
              <div className="Logo"></div>
              <ul className="list-group List">
                <li className="list-group-item List-Item">A second item</li>
                <li className="list-group-item List-Item">A third item</li>
                <li className="list-group-item List-Item">A fourth item</li>
                <li className="list-group-item List-Item">And a fifth one</li>
              </ul>
            </div>
            <div className="bottom-bar">
            </div>
        </div>
    </div>
  )
}

export default Home