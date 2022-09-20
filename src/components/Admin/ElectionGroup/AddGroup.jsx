import React, { useEffect } from 'react';

import { useCreateElectionGroupMutation } from '../../../features/election/electionApi';


const AddGroup = () => {
     const [message, setMessage] = React.useState(null);
    
    const [createElectionGroup, {data: electionGroupData, isSuccess, isError }] = useCreateElectionGroupMutation();

    useEffect(() => {
        console.log({electionGroupData, isError, isSuccess});
        const our_message = electionGroupData?.data?.message
                ? {color: "red", value: electionGroupData?.data?.message} 
                : isSuccess 
                ? {color: 'green', value: electionGroupData?.message}
                :  null;
        // console.log({our_message});
        if(our_message) {
            console.log({our_message});
            setMessage(our_message);
            setTimeout(() => {
                setMessage("");
            }, [10000])
        }
    },[electionGroupData, isSuccess]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, status } = e?.target?.elements;

        const dataObj = {
            title: title?.value,
            description: description?.value,
            status: status?.value,
        };

        console.log(dataObj);
        
        createElectionGroup(dataObj);

    }

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
                    <h1 className="text-2xl font-bold text-gray-700 uppercase">Create Election Group</h1>
                    <form 
                        className={`lg:w-full md:w-full sm:w-full w-full
                            grid grid-cols-1 gap-y-4 
                            justify-center 
                        `}
                        id='election_group_form' 
                        onSubmit={handleSubmit}
                        autoComplete='off'
                        autoCorrect='on'
                    >
                        <div className="grid gap-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1">
                            <div className='flex flex-col gap-y-2'>
                                <label className='text-indigo-500 uppercase italic font-bold tracking-wide'>Group Name</label>
                                <input
                                    type='text'
                                    name='title'
                                    id='title'
                                    className='border border-gray-400 rounded px-2 py-[5.5px] text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0481fd] transition-all ease-in-out duration-500'
                                    placeholder='Enter group name'
                                    required
                                />
                            </div>

                            <div className='flex flex-col gap-3'>
                                <label className='text-indigo-500 uppercase italic font-bold tracking-wide'>Status</label>
                                <div className='flex flex-row gap-3'>
                                    <div>
                                        <input
                                            type='radio'
                                            name='status'
                                            id='status'
                                            value='active'
                                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:rounded-full focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                            required
                                        />
                                        <label htmlFor='status' className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Active</label>
                                    </div>
                                    <div>
                                        <input
                                            type='radio'
                                            name='status'
                                            id='status'
                                            value='inactive'
                                            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:rounded-full outline-none focus:ring-blue-500 focus:ring-2 '
                                            required
                                        />
                                        <label htmlFor='status' className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Inactive</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-indigo-500 uppercase italic font-bold tracking-wide'>Description</label>
                            <textarea type='text' 
                                name='description' 
                                id='description'
                                placeholder='Write description' 
                                // required
                                rows={5}
                                className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0481fd] focus:border-transparent transition-all ease-in-out duration-500'
                            />
                        </div>
                        
                    </form>
                    <div className='w-full flex flex-col gap-2'>
                        <button 
                            type='submit'
                            form='election_group_form'
                            className='uppercase italic p-2 border border-blue-500 rounded bg-indigo-500 hover:bg-purple-400 text-white hover:text-gray-100 transition-all ease-in-out duration-300'
                        >
                            Create
                        </button>
                    </div>
                    {
                        !message
                        ? null 
                        : <p className={`text-center text-${message?.color}-500`}>{message?.value}</p>
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default AddGroup;