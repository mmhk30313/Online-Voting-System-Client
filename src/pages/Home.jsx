import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
    const {user} = useSelector(state => state?.auth);
    const navigate = useNavigate();
    useEffect(() => {
        console.log({user});
        if(user?.user_role?.toLowerCase() === 'admin'){
            navigate('/admin');
        }
        if(user?.user_role?.toLowerCase() === 'user'){
            navigate('/user');
        }
    },[user]);

    return (
        <React.Fragment>
            <div className='flex gap-2 flex-col justify-center items-center h-[70vh]'>
                <h1 className='special-text uppercase lg:text-5xl md:text-3xl sm:text-2xl font-bold italic'>
                    Welcome to the Voting System
                </h1>
                <div className='flex gap-5 my-10'>
                    <Link className='uppercase italic p-2 border border-blue-500 rounded bg-gray-100 hover:bg-gray-400 hover:text-white transition-all ease-in-out duration-300' 
                        to='/user-login'>
                            User Login
                    </Link>
                    <Link className='uppercase italic p-2 border border-blue-500 rounded bg-gray-100 hover:bg-gray-400 hover:text-white transition-all ease-in-out duration-300' 
                        to='/admin-login'>
                            Admin Login
                    </Link>

                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;