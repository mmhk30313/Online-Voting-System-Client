import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const {user} = useSelector(state => state?.auth);
    const navigate = useNavigate();
    console.log({user});
    useEffect(() => {
        if(user?.user_role === 'Admin'){
            navigate('/admin');
        }
        if(user?.user_role === 'User'){
            navigate('/user');
        }
    },[user]);

    return (
        <React.Fragment>
            <div className='flex gap-2 flex-cols justify-center items-center h-[70vh]'>
                <Link className='uppercase italic p-2 border border-blue-500 rounded bg-gray-100 hover:bg-gray-400 hover:text-white transition-all ease-in-out duration-300' 
                    to='/user-login'>
                        User Login
                </Link>
                <Link className='uppercase italic p-2 border border-blue-500 rounded bg-gray-100 hover:bg-gray-400 hover:text-white transition-all ease-in-out duration-300' 
                    to='/admin-login'>
                        Admin Login
                </Link>
            </div>
        </React.Fragment>
    );
};

export default Home;