import React, { useEffect } from 'react';
import { useLoginMutation, useRegisterMutation } from '../../features/auth/authApi';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const AdminForm = () => {
    const navigate = useNavigate();
    const { error: err } = useSelector(state => state.auth);
    const [loginFlag, setLoginFlag] = React.useState(true);
    const [message, setMessage] = React.useState(null);
    const [login, {dada: loginData, isLoading: isLoadingLogin, isSuccess: isLoginSuccess }] = useLoginMutation();
    const [register, {data: registerData, isLoading: isLoadingRegister, isSuccess: isResisterSuccess }] = useRegisterMutation();

    useEffect(() => {
        if(isLoadingLogin || isLoadingRegister){
            setMessage({color: 'yellow', value: `${loginFlag ? "Login" : "Register"} processing...`});
            // setTimeout(() => {
            //     setMessage(null);
            // }, [10000]);
        }
        
        if (isResisterSuccess || isLoginSuccess) {
            setMessage(null)
            navigate('/admin');
        }
        console.log({ err, loginData, registerData, message});
        if(err?.error && !isLoadingLogin && !isLoadingRegister){
            
            console.log({message: err?.error});
            setMessage({color: 'red', value: err?.error});
            setTimeout(() => {
                setMessage(null);
            }, [20000])
        }
    },[loginData, registerData, isLoadingLogin, isLoadingRegister, isResisterSuccess, isLoginSuccess, err]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password, confirm_password, user_name } = e.target.elements;
        console.log({user_name: user_name?.value, email: email.value, password: password.value});
        if(loginFlag){
            login({user_role: 'admin', email: email.value, password: password.value});
        }else{
            // register
            register({user_name: user_name?.value, user_role: 'admin', email: email.value, password: password.value, confirm_password: confirm_password?.value});
        }

    }


    return (
        <React.Fragment>
            <div className='min-h-[70vh] flex flex-col items-center justify-center'>
                <div 
                    className="
                        w-full lg:w-[50%] mx-auto px-10 py-5 rounded-lg shadow-2xl
                        bg-gray-100 shadow-gray-300 
                        flex flex-col gap-y-4 justify-center items-center
                    "

                >
                    <h1 className="text-xl font-bold text-gray-700 uppercase">Admin {loginFlag ? "Login" : "Register"}</h1>
                    <form className='w-full flex flex-col gap-y-3' id='admin_form' onSubmit={handleSubmit}
                        autoComplete='off'
                        autoCorrect='on'
                    >
                        {
                            loginFlag ? (
                                null
                            ) : (
                                <div className='flex flex-col gap-y-2'>
                                    <label htmlFor='user_name' className='text-indigo-500 uppercase italic font-bold tracking-wide'>User Name</label>
                                    <input
                                        type='text'
                                        name='user_name'
                                        id='user_name'
                                        className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                                        placeholder='Enter your username'
                                        required
                                    />
                                </div>
                            )
                        }
                        <div className='flex flex-col gap-2'>
                            <label className='text-indigo-500 uppercase italic font-bold tracking-wide' htmlFor='email'>Email</label>
                            <input type='email' 
                                name='email' 
                                id='email'
                                placeholder='Enter your email' 
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
                                placeholder='Enter your password'
                                className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                            />
                        </div>
                        {
                            loginFlag ? (
                                null
                            ) : (
                                <div className='flex flex-col gap-2'>
                                    <label className='text-indigo-500 uppercase italic font-bold tracking-wide' htmlFor='password'>Confirm Password</label>
                                    <input type='password'
                                        name='confirm_password' 
                                        id='confirm_password' 
                                        required
                                        placeholder='Enter your confirm password'
                                        className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                                    />
                                </div>
                            )
                        }
                        <div className='flex flex-col gap-2'>
                            <button className='uppercase italic p-2 border border-blue-500 rounded bg-indigo-500 hover:bg-purple-400 text-white hover:text-gray-100 transition-all ease-in-out duration-300'>
                                {
                                    loginFlag ? (
                                        'Login'
                                    ) : (
                                        'Register'
                                    )
                                }
                            </button>
                        </div>
                        {
                            !message 
                            ? null
                            : <p className={`bg-${message?.color}-200 rounded-lg p-3 text-center text-${message?.color}-700 font-bold text-lg`}>
                                {message?.value}
                            </p>
                        }
                    </form>
                    {
                        !loginFlag ? (
                            <div className='text-center'>
                                Already have an account? 
                                <span 
                                    onClick={() => setLoginFlag(true)}
                                    className='mx-2 italic text-indigo-500 hover:text-orange-500 transition-all ease-in-out duration-300 underline cursor-pointer'
                                >
                                    Login
                                </span>
                            </div>
                        ) : (
                            <div className='text-center'>
                                Don't have an account?
                                <span
                                    onClick={() => setLoginFlag(false)}
                                    className='mx-2 italic text-indigo-500 hover:text-orange-500 transition-all ease-in-out duration-300 underline cursor-pointer'
                                >
                                    Register
                                </span>
                                
                            </div>
                        )
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default AdminForm;