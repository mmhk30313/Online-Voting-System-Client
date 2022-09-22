import React, { useEffect } from 'react';
import Select from 'react-select';
import { useGetActiveElectionGroupQuery, useGetActiveElectionsQuery } from '../../../features/api/apiSlice';
import { useUserRegisterMutation } from '../../../features/auth/authApi';

const options = [
    { value: '', label: 'Select an option' },
    // { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    {value: 'candidate', label: 'Candidate'},
];

const AddUser = () => {
    const [message, setMessage] = React.useState(null);
    const [group_id, setGroupId] = React.useState(null);
    const [election_id, setElectionId] = React.useState(null);
    const [isCandidate, setIsCandidate] = React.useState(false);
    const {data: activeElectionGroups} = useGetActiveElectionGroupQuery();
    const {data: activeElections} = useGetActiveElectionsQuery();
    
    const [userRegister, {data: userData, isSuccess: isUserRegisterSuccess, error: userRegisterError }] = useUserRegisterMutation();

    useEffect(() => {
        // console.log({userRegisterError, isUserRegisterSuccess, userData});
        const our_message = userRegisterError?.data?.message
                ? {color: "red", value: userRegisterError?.data?.message} 
                : isUserRegisterSuccess 
                ? {color: 'green', value: userData?.message}
                :  null;
        // console.log({our_message});
        if(our_message) {
            console.log({our_message});
            setMessage(our_message);
            setTimeout(() => {
                setMessage("");
            }, [10000])
        }
    },[userRegisterError, isUserRegisterSuccess]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const {user_id, user_role, email, password, confirm_password, user_name } = e?.target?.elements;

        if(password.value !== confirm_password.value){
            setMessage({color: "red", value: "Password and confirm password does not match"});
            setTimeout(() => {
                setMessage(null);
            }, [10000])
            return;
        }

        if(isCandidate){
            if(!group_id || !election_id){
                setMessage({color: "red", value: "Please select election group and election"});
                setTimeout(() => {
                    setMessage(null);
                }, [10000])
                return;
            }
        }

        const dataObj = {
            user_id: user_id?.value, 
            user_role: user_role?.value,
            email: email?.value,
            password: password?.value,
            confirm_password: confirm_password?.value,
            user_name: user_name?.value,
            group_id: group_id,
        };

        group_id && (dataObj.group_id = group_id);
        election_id && (dataObj.election_id = election_id);

        console.log(dataObj);
        
        userRegister(dataObj);

    }

    // console.log({activeElectionGroups, activeElections});
    return (
        <React.Fragment>
            <div className='w-full flex flex-col items-center justify-center'>
                <div 
                    className="
                        px-10 py-6 rounded-lg shadow-lg
                        bg-gray-100 shadow-gray-500 md:shadow-xl 
                        flex flex-col gap-y-4 justify-center items-center
                        lg:w-[75%] md:w-[100%] sm:w-[100%] w-[100%]
                    "

                >
                    <h1 className="text-2xl font-bold text-gray-700 uppercase">Add User</h1>
                    <form 
                        className={`w-full 
                            grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 
                            gap-4 
                            items-center justify-center 
                        `}
                        id='user_form' 
                        onSubmit={handleSubmit}
                        autoComplete='off'
                        autoCorrect='on'
                    >
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

                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='user_id' className='text-indigo-500 uppercase italic font-bold tracking-wide'>User ID</label>
                            <input
                                type='text'
                                name='user_id'
                                id='user_id'
                                className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                                placeholder='Enter your user id'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='user_role' className='text-indigo-500 uppercase italic font-bold tracking-wide'>User Role</label>
                            <select
                                name='user_role'
                                id='user_role'
                                onChange={(e) => {
                                    setIsCandidate(e?.target?.value === 'candidate');
                                }}
                                
                                placeholder='Select user role'
                                className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                                defaultValue={null}
                                required
                            >
                                {options?.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        {isCandidate && (
                            <>
                                <div className='flex flex-col gap-y-2'>
                                    <label htmlFor='group_id' className='text-indigo-500 uppercase italic font-bold tracking-wide'>Election Group</label>
                                    <Select
                                        name='group_id'
                                        id='group_id'
                                        placeholder='Select election group'
                                        className='border border-gray-400 rounded p-[1px] text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                                        defaultValue={null}
                                        required
                                        options={
                                            activeElectionGroups?.data?.map((group) => ({
                                                value: group?.group_id,
                                                label: group?.title
                                            }))
                                        }
                                        onChange={(e) => {
                                            setGroupId(e?.value);
                                        }}
                                        isClearable
                                    />
                                </div>
                                
                                <div className='flex flex-col gap-y-2'>
                                    <label htmlFor='election_id' className='text-indigo-500 uppercase italic font-bold tracking-wide'>Election Group</label>
                                    <Select
                                        name='election_id'
                                        id='election_id'
                                        placeholder='Select election'
                                        className='border border-gray-400 rounded p-[1px] text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                                        defaultValue={null}
                                        required
                                        options={
                                            activeElections?.data?.map((election) => ({
                                                value: election?.election_id,
                                                label: election?.title
                                            }))
                                        }
                                        onChange={(e) => {
                                            setElectionId(e?.value);
                                        }}
                                        isClearable
                                    />
                                </div>

                            </>
                        )}

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
                        
                    </form>
                    <div className='w-full flex flex-col gap-2'>
                        <button 
                            type='submit'
                            form='user_form'
                            className='uppercase italic p-2 border border-blue-500 rounded bg-indigo-500 hover:bg-purple-400 text-white hover:text-gray-100 transition-all ease-in-out duration-300'
                        >
                            Register
                        </button>
                    </div>
                    {
                        !message
                        ? null 
                        : <p className={`bg-${message?.color}-200 p-5 rounded-full text-center text-${message?.color}-700`}>{message?.value}</p>
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default AddUser;