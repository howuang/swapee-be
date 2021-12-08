import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

const ProfilePage = () => {
    const dispatch = useDispatch();

    const params = useParams();
    const { name } = params;
    
    const { loading, isAuthenticated, accessToken } = useSelector((state) => state.auth);
    const user = useSelector(state => state.auth.user);
    
    return (
        <>
            <div className='user-info'>
                <div className='profile-avatar'>
                    <img src={user.avatarUrl}/>
                </div>
                <div className='profile-details'>
                    <h3>{user.name}</h3>
                    <p>{user.email}</p>
                    <p>Looking for ...</p>
                    <button>Update Profile</button>
                </div>
            </div>
        </>
    )
}

export default ProfilePage
