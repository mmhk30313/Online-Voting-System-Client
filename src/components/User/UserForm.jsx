import React, { useEffect } from 'react';
import { useLoginMutation, useRegisterMutation } from '../../features/auth/authApi';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState(null);
    const {error: err} = useSelector(state => state.auth);
    const [login, {data: loginData, isLoading, isSuccess: isLoginSuccess }] = useLoginMutation();

    useEffect(() => {
        console.log({isLoginSuccess, loginData});
        if(isLoading){
            setMessage({color: 'yellow', value: 'Loading...'});
            setTimeout(() => {
                setMessage(null);
            }, [10000]);
        }
        if (isLoginSuccess) {
            navigate('/user');
        }
        if(err?.error){
            setMessage({value: err?.error, color: 'red'});
            setTimeout(() => {
                setMessage(null);
            }, 10000)
        }
    },[err, isLoginSuccess, isLoading, loginData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const {user_id, password } = e.target.elements;
        console.log({user_name: user_id?.value, password: password.value});
        login({user_id: user_id.value, password: password.value});
        // e.target.reset();
    }


    return (
        <React.Fragment>
            <div className='h-[70vh] flex flex-col items-center justify-center'>
                <div 
                    className="
                        w-full lg:w-[50%] mx-auto p-10 rounded-lg shadow-2xl
                        bg-gray-100 shadow-gray-300
                        flex flex-col gap-y-5 justify-center items-center my-3
                    "

                >
                    <h1 className="text-2xl font-bold text-gray-700 uppercase">User Login</h1>
                    <form className='w-full flex flex-col gap-y-5' id='admin_form' onSubmit={handleSubmit}
                        autoComplete='off'
                        autoCorrect='on'
                    >
                        
                        <div className='flex flex-col gap-2'>
                            <label className='text-indigo-500 uppercase italic font-bold tracking-wide' htmlFor='user_id'>User Id</label>
                            <input type='text' 
                                name='user_id' 
                                id='user_id'
                                placeholder='Enter user id' 
                                required
                                className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label className='text-indigo-500 uppercase italic font-bold tracking-wide' htmlFor='password'>Password</label>
                            <input type='password'
                                name='password' 
                                id='password' 
                                required
                                placeholder='Enter password'
                                className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                            />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <button className='uppercase italic p-2 border border-blue-500 rounded bg-indigo-500 hover:bg-purple-400 text-white hover:text-gray-100 transition-all ease-in-out duration-300'>
                                Login User
                            </button>
                        </div>
                        {
                            !message 
                            ? null
                            : <p className={`bg-${message?.color}-200 rounded-lg p-5 text-center text-${message?.color}-600`}>
                                {message?.value}
                            </p>
                        }
                    </form>
                    
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserForm;