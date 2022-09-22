import React, { useEffect } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useEditUserMutation, useGetUsersQuery } from '../../../features/api/apiSlice';
import ViewListLoader from '../../Loaders/ViewListLoader';

const statusOptions = [
    { value: true, label: 'Done' },
    { value: false, label: 'Pending' },
];

const roles = [
    { value: '', label: 'Select an option' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'candidate', label: 'Candidate' },
];

const ViewUsers = () => {
    const [editableUserId, setEditableUserId] = React.useState(null);
    const {data: userData} = useGetUsersQuery();
    const [users, setUsers] = React.useState([]);
    const [editUser, { isLoading: isEditUserLoading }] = useEditUserMutation();
    useEffect(() => {
        console.log({userData});
        setUsers(userData?.data);
    }, [userData]);
    return (
        <React.Fragment>
            <div className='min-h-[55vh] w-full bg-gray-300 rounded p-5'>
                <h1 className='text-center text-2xl font-bold text-gray-700 uppercase mb-5'>View Users</h1>

                <div className='grid grid-cols-1 gap-3 h-[45vh] overflow-auto'>
                    {
                        !users?.length
                        ? <div className='w-full'>
                            <ViewListLoader/>
                            <ViewListLoader/>
                            <ViewListLoader/>
                        </div>
                        : <table className='
                            w-full 
                            bg-white shadow-md
                        '>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th className='p-2 text-left'>#Id</th>
                                    <th className='p-2 text-left'>Name</th>
                                    <th className='p-2 text-left'>Email</th>
                                    <th className='p-2'>Role</th>
                                    <th className='p-2'>Status</th>
                                    <th className='p-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    !users?.length ? (
                                        <tr>
                                            <td className='p-2 text-center lg:text-3xl text-lg text-blue-600' colSpan={7}>
                                                <span className='uppercase bg-sky-100 border border-blue-400 py-5 lg:px:36 md:px-20 px-20 rounded-lg'>
                                                    No user is found
                                                </span>
                                            </td>
                                        </tr>
                                    ) : (
                                        users?.map((item, idx) => {
                                            return (
                                                <tr key={idx} className='bg-gray-100 text-center border-b'>
                                                    <td className='p-2 text-left'>
                                                        {
                                                            editableUserId === item?.user_id
                                                            ? <DebounceInput
                                                                    minLength={2}
                                                                    debounceTimeout={1000}
                                                                    onBlur={() => {
                                                                        setEditableUserId(null);
                                                                    }}
                                                                    onChange={(e) => {
                                                                        const { value } = e.target;
                                                                        editUser({email: item?.email, data: {user_id: value}});
                                                                    }}
                                                                    className='
                                                                        bg-white shadow-md w-full
                                                                        border border-gray-300 p-2 rounded-md
                                                                        focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent
                                                                    '
                                                                    type='text'
                                                                    name='user_id'
                                                                    id='user_id'
                                                                    value={item?.user_id}
                                                                />


                                                            : item?.user_id
                                                        }
                                                    </td>
                                                    <td className='p-2 text-left'>
                                                        {
                                                            editableUserId === item?.user_id
                                                            ? <DebounceInput
                                                                    minLength={2}
                                                                    debounceTimeout={1000}
                                                                    onBlur={() => {
                                                                        setEditableUserId(null);
                                                                    }}
                                                                    onChange={(e) => {
                                                                        const { value } = e.target;
                                                                        editUser({email: item?.email, data: {user_name: value}});
                                                                    }}
                                                                    className='
                                                                        bg-white shadow-md w-full
                                                                        border border-gray-300 p-2 rounded-md
                                                                        focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent
                                                                    '
                                                                    type='text'
                                                                    name='email'
                                                                    id='user_id'
                                                                    value={item?.user_name}
                                                                />


                                                            : item?.user_name
                                                        }
                                                    </td>
                                                    <td className='p-2 text-left'>{item.email}</td>
                                                    <td className='p-2'>
                                                        {
                                                            editableUserId === item?.user_id ? (
                                                                <select
                                                                    value={item?.user_role}
                                                                    onBlur={() => setEditableUserId(null)}
                                                                    onChange={(e) => {
                                                                        const {value} = e?.target;
                                                                        if(value) {
                                                                            editUser({email: item?.email, data: {user_role: value}});
                                                                        }
                                                                    }}
                                                                    placeholder='Select an option'
                                                                    className='
                                                                        bg-white shadow-md
                                                                        border border-gray-300
                                                                        p-2
                                                                        rounded-md
                                                                        focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent
                                                                    '
                                                                >
                                                                    {
                                                                        roles?.map((role) => {
                                                                            return (
                                                                                <option key={role.value} value={role.value} className="capitalize">{role?.label}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </select>
                                                            ) : (
                                                                <span className="capitalize">{item?.user_role}</span>
                                                            )
                                                        }
                                                    </td>
                                                    <td className='p-2'>
                                                        {
                                                            editableUserId === item?.user_id 
                                                            ? (
                                                                <select
                                                                    className='bg-white shadow-md
                                                                        border border-gray-300
                                                                        p-2
                                                                        rounded-md
                                                                        focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent
                                                                    '
                                                                    value={item?.voting_status}
                                                                    onBlur={() => setEditableUserId(null)}
                                                                    onChange={(e) => {
                                                                        const {value} = e?.target;
                                                                        editUser({email: item?.email, data: {voting_status: value === 'true'}});
                                                                    }}
                                                                    placeholder='Select Status'
                                                                >
                                                                    {
                                                                        statusOptions?.map(option => {
                                                                            return (
                                                                                <option key={option.value} value={option.value} className="capitalize">{option.label}</option>
                                                                            );
                                                                        })
                                                                    }
                                                                </select>
                                                            )
                                                            : (
                                                                <span className="capitalize p-2">{item?.voting_status ? 'Done' : 'Pending'}</span>
                                                            )
                                                        }
                                                        
                                                    </td>
                                                    <td className='p-2'>
                                                        <button
                                                            // disabled={completed ? true : false}
                                                            // className={`${completed && "cursor-not-allowed"} focus:outline-none bg-purple-400 hover:bg-purple-800 text-white font-bold p-1 rounded-full inline-flex items-center`}
                                                            className={`focus:outline-none bg-purple-400 hover:bg-purple-800 text-white font-bold p-1 rounded-full inline-flex items-center transition duration-300`}
                                                            onClick={() => {
                                                                setEditableUserId(item?.user_id);
                                                                // setTimeout(() => {
                                                                //     setEditableUserId(null)
                                                                // }, 10000);
                                                            }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                                width="16" height="16"
                                                                viewBox="0 0 32 32"
                                                                
                                                                style={{fill:"#000000"}}
                                                            >    
                                                                <path 
                                                                    className="fill-current text-white"
                                                                    d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"
                                                                />
                                                            </svg>
                                                        </button>                                            
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    )
                                }
                            </tbody>
                        </table>
                    }
                    
                </div>
            </div>
        </React.Fragment>
    );
};

export default ViewUsers;