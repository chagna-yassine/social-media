import React from 'react'
import { IMG_BASE } from '../App'
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Header = ({user_id , currentDisplayMode}) => {

    const { profilePic , username , _id } = user_id
    const navigate = useNavigate();
    const [userIdCookies] = useCookies(['userId']);

  return (
    <div className="card-body Post-header">
        <div className={`card border-0 mb-3 Post-info ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
            <div className="row g-0">
                <div className="Logo-container">
                    <div className={`Logo ${currentDisplayMode === 'dark' ? 'dark' : 'light'}`}>
                        <img className='Logo-img' src={IMG_BASE+profilePic} alt={username} />
                    </div>
                </div>
                <div className="w-50 d-flex align-items-center">
                    <h2 className={`Label ${currentDisplayMode === 'dark' ? 'dark' : 'light'} cursor-pointer`} onClick={()=>{_id !== userIdCookies.userId ? navigate(`/${username}`) : navigate(`/Profile`)}}>{username}</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header