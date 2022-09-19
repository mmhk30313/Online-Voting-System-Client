import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Select from 'react-select';
import { useCreateElectionMutation } from '../../../features/api/apiSlice';

const options = [
  {value: 'user-1', label: 'User-1' },
  {value: 'user-2', label: 'User-2'},
  {value: 'user-3', label: 'User-3'},
  {value: 'user-4', label: 'User-4'}
];

const AddElection = () => {
    const {auth} = useSelector(state => state?.auth)
     const [message, setMessage] = React.useState(null);
    const [currentCandidates, setCurrentCandidates] = React.useState([]);
    
    const [createElection, {data: electionData, isSuccess, isError }] = useCreateElectionMutation();

    useEffect(() => {
        console.log({electionData, isError, isSuccess});
        const our_message = electionData?.data?.message
                ? {color: "red", value: electionData?.data?.message} 
                : isSuccess 
                ? {color: 'green', value: electionData?.message}
                :  null;
        console.log({our_message});
        if(our_message) {
            console.log({our_message});
            setMessage(our_message);
            setTimeout(() => {
                setMessage("");
            }, [10000])
        }
    },[electionData, isSuccess]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, status } = e?.target?.elements;

        console.log({currentCandidates});
        const dataObj = {
            title: title?.value,
            description: description?.value,
            status: status?.value,
            candidates: currentCandidates,
            user_email: auth?.email
        };

        console.log(dataObj);
        
        // userRegister(dataObj);

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
                    <h1 className="text-2xl font-bold text-gray-700 uppercase">Create Election</h1>
                    <form 
                        className={`w-full 
                            grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 
                            gap-4 
                            justify-center 
                        `}
                        id='election_form' 
                        onSubmit={handleSubmit}
                        autoComplete='off'
                        autoCorrect='on'
                    >
                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='title' className='text-indigo-500 uppercase italic font-bold tracking-wide'>Election Title</label>
                            <input
                                type='text'
                                name='title'
                                id='title'
                                className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                                placeholder='Enter election title'
                                required
                            />
                        </div>

                        <div className='flex flex-col gap-y-2'>
                            <label htmlFor='candidate_id' className='text-indigo-500 uppercase italic font-bold tracking-wide'>Candidates</label>
                            <Select
                                options={options}
                                name='candidates'
                                id='candidates'
                                // value={currentCandidates}
                                // className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                                placeholder='Select candidates'
                                onChange={(items) =>{
                                    console.log({currentCandidates});
                                    console.log({items});
                                    setCurrentCandidates([
                                        ...items?.map(item => {
                                            return item.value
                                        })
                                    ])
                                }}
                                isMulti={true}
                                isSearchable={true}
                                isClearable={true}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-indigo-500 uppercase italic font-bold tracking-wide' htmlFor='description'>Description</label>
                            <textarea type='text' 
                                name='description' 
                                id='description'
                                placeholder='Enter description' 
                                // required
                                rows={4}
                                className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-indigo-500 uppercase italic font-bold tracking-wide' htmlFor='status'>Status</label>
                            <select type='text'
                                name='status' 
                                id='status' 
                                required
                                placeholder='Select status'
                                className='border border-gray-400 rounded p-2 text-gray-700 bg-gray-50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all ease-in-out duration-500'
                            > 
                                <option value=''>Select status</option>
                                <option value='active'>Active</option>
                                <option value='inactive'>Inactive</option>
                            </select>
                        </div>
                        
                    </form>
                    <div className='w-full flex flex-col gap-2'>
                        <button 
                            type='submit'
                            form='election_form'
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

export default AddElection;