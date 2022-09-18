import React, { useEffect } from 'react';
import { useLoginMutation, useRegisterMutation } from '../../features/auth/authApi';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const navigate = useNavigate();
    const [message, setMessage] = React.useState("");
    const {error: err} = useSelector(state => state.auth);
    const [login, { isSuccess: isLoginSuccess, error: isLoginError }] = useLoginMutation();

    useEffect(() => {
        console.log({isLoginSuccess, err});
        if (isLoginSuccess) {
            navigate('/user');
        }
        if(err?.error){
            setMessage(err?.error);
            setTimeout(() => {
                setMessage("");
            }, 10000)
        }
    },[err, isLoginSuccess]);

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
                        w-[500px] mx-auto p-10 rounded-lg shadow-lg
                        bg-gray-100 shadow-red-500 md:shadow-xl 
                        flex flex-col gap-y-5 justify-center items-center
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
                                Login
                            </button>
                        </div>
                        {
                            message 
                            ? <p className='text-center text-red-500'>{message}</p>
                            : null
                        }
                    </form>
                    
                </div>
            </div>
        </React.Fragment>
    );
};

export default UserForm;