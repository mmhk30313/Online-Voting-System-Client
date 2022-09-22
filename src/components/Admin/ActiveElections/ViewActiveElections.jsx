import React, { useEffect } from 'react';
import {DebounceInput} from 'react-debounce-input';
// import { Link } from 'react-router-dom';
import { useGetActiveElectionGroupQuery, useGetElectionsQuery, useGetActiveElectionsQuery } from '../../../features/api/apiSlice';
import Select  from 'react-select';
import { useBulkUpdateElectionsMutation, useUpdateElectionMutation } from '../../../features/election/electionApi';
import ViewListLoader from '../../Loaders/ViewListLoader';
const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
];


const ViewActiveElections = () => {
    const [editableElectionId, setEditableElectionId] = React.useState(null);
    const [selectedElections, setSelectedElections] = React.useState([]);
    const [elections, setElections] = React.useState([]);
    const {data: activeElectionGroups} = useGetActiveElectionGroupQuery();
    const [groups, setGroups] = React.useState([]);
    const {data: electionData} = useGetActiveElectionsQuery();
    const [updateElection, {isError: isUpdateError}] = useUpdateElectionMutation();
    const [bulkUpdateElections, {isLoading: isBulkLoading, isSuccess, isError }] = useBulkUpdateElectionsMutation();
    useEffect(() => {
        const our_elections = electionData?.data;
        if(our_elections?.length) {
            setElections(our_elections);
            // setEditableElectionId(null);
            setSelectedElections([]);
        }

        if(activeElectionGroups?.data?.length){
            const our_groups = activeElectionGroups?.data?.map((group) => {
                return {value: group?.group_id, label: group?.title}
            });
            setGroups(our_groups);
        }
    }, [electionData, activeElectionGroups, isUpdateError, isSuccess, isError]);

    // console.log({electionData});
    return (
        <React.Fragment>
            <div className='min-h-[55vh] w-full bg-gray-300 rounded p-5'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-center text-2xl font-bold text-gray-700 uppercase mb-5'>Active Election List</h1>
                    {
                        selectedElections?.length > 0 && (
                            <div className='my-2 flex flex-row'>
                                <Select
                                    options={statusOptions}
                                    placeholder='Select status'
                                    onChange={(bulkStatus) => {
                                        const status = bulkStatus?.value;
                                        const election_ids = [...selectedElections];
                                        // console.log({status, election_ids});
                                        bulkUpdateElections({status, election_ids});
                                    }}
                                >
                                    {
                                        statusOptions?.map(option => {
                                            return (
                                                <option key={option.value} value={option.value} className="capitalize">{option.label}</option>
                                            );
                                        })
                                    }
                                </Select>
                            </div>
                        )
                    }
                </div>

                <div className='grid grid-cols-1 gap-3 h-[45vh] overflow-auto'>
                        {
                            (!elections?.length || isBulkLoading) ? (
                                <div className='w-full'>
                                    <ViewListLoader/>
                                    <ViewListLoader/>
                                    <ViewListLoader/>
                                </div>
                            ) : (
                                <table className='
                                    w-full 
                                    bg-white shadow-md
                                '>
                                    <thead>
                                        <tr className='bg-gray-200'>
                                            <th className='p-2 text-left'>Title</th>
                                            <th className='p-2 text-left'>Admin Email</th>
                                            <th className='p-2 text-left'>Description</th>
                                            <th className='p-2'>Status</th>
                                            <th className='p-2'>Candidates</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            !elections?.length ? (
                                                <tr>
                                                    <td className='p-2 text-center lg:text-3xl text-sm text-blue-600' colSpan={7}>
                                                        <span className='uppercase bg-sky-100 border border-blue-400 py-5 lg:px:36 md:px-20 px-20 rounded-lg'>
                                                            No Active election is found
                                                        </span>
                                                    </td>
                                                </tr>
                                            ) : (
                                                elections?.map((item, idx) => {
                                                    return (
                                                        <tr key={item?.election_id} className={`
                                                                bg-gray-70 hover:bg-gray-100 
                                                                ${selectedElections?.includes(item?.election_id) ? 'bg-gray-100' : ''}
                                                                ${idx % 2 === 0 ? 'bg-gray-28' : 'bg-gray-50'}
                                                                text-center border-b-[3px]
                                                                ${((idx+1) !== elections?.length && "border-blue-400")} 
                                                                transition-all ease-in-out duration-300`
                                                            }
                                                        >
                                                            <td className='p-2 text-left'>
                                                                {
                                                                    editableElectionId === item?.election_id ? (
                                                                        <DebounceInput
                                                                            minLength={2}
                                                                            debounceTimeout={1000}
                                                                            onBlur={() => {
                                                                                setEditableElectionId(null);
                                                                            }}
                                                                            onChange={(e) => {
                                                                                const { value } = e.target;
                                                                                updateElection({election_id: item?.election_id, title: value});
                                                                            }}
                                                                            className='
                                                                                bg-white shadow-md w-full
                                                                                border border-gray-300 p-2 rounded-md
                                                                                focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent
                                                                            '
                                                                            type='text'
                                                                            name='title'
                                                                            id='title'
                                                                            value={item?.title}
                                                                        />
                                                                    ) : (
                                                                        item?.title
                                                                    )
                                                                }
                                                            </td>
                                                            <td className='p-2 text-left'>{item?.user_email}</td>
                                                            <td className='p-2 text-left'>
                                                                <div>
                                                                    {
                                                                        editableElectionId === item?.election_id ? (
                                                                            <DebounceInput
                                                                                id="description"
                                                                                minLength={1}
                                                                                className="
                                                                                    bg-white shadow-md w-full
                                                                                    border border-gray-300 p-2 rounded-md
                                                                                    focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent
                                                                                "
                                                                                debounceTimeout={1000}
                                                                                placeholder="Search"
                                                                                type={"textarea"}
                                                                                
                                                                                value={item?.description}
                                                                                onBlur={() => {
                                                                                    setEditableElectionId(null);
                                                                                }}
                                                                                onChange={(e) => {
                                                                                    const { value } = e.target;
                                                                                    updateElection({election_id: item?.election_id, description: value});
                                                                                }}
                                                                            />
                                                                            
                                                                        ) : (
                                                                            item?.description
                                                                        )
                                                                    }
                                                                </div>
                                                            </td>
                                                            
                                                            <td className='p-2'>
                                                                {
                                                                    editableElectionId === item?.election_id 
                                                                    ? (
                                                                        <select
                                                                            className='bg-white shadow-md
                                                                                border border-gray-300
                                                                                p-2
                                                                                rounded-md
                                                                                focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent
                                                                            '
                                                                            value={item?.status}
                                                                            onBlur={() => setEditableElectionId(null)}
                                                                            onChange={(e) => {
                                                                                const newStatus = e?.target?.value;
                                                                                console.log({newStatus});
                                                                                if(newStatus !== item?.status) {
                                                                                    updateElection({election_id: item?.election_id, status: newStatus});
                                                                                }
                                                                                
                                                                            }}
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
                                                                        <span className="capitalize p-2">{item?.status}</span>
                                                                    )
                                                                }
                                                                
                                                            </td>
                                                            <td className='p-2'>
                                                                {
                                                                    editableElectionId === item?.election_id
                                                                    ? (
                                                                        <Select
                                                                            isMulti
                                                                            options={groups}
                                                                            onBlur={() => setEditableElectionId(null)}
                                                                            defaultValue={
                                                                                item?.candidates?.map(candidate => {
                                                                                    return {
                                                                                        value: candidate?.group_id,
                                                                                        label: candidate?.group_name
                                                                                    }
                                                                                })
                                                                            }
                                                                            onChange={(e) => {
                                                                                const newCandidates = e?.map(item => item?.value);
                                                                                console.log({newCandidates});
                                                                                if(JSON.stringify(newCandidates) !== JSON.stringify(item?.candidates)) {
                                                                                    updateElection({election_id: item?.election_id, candidates: newCandidates});
                                                                                }
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <span className="capitalize p-2 text-left">
                                                                            {
                                                                                item?.candidates?.length > 0 ? item?.candidates?.map((candidate, idx) => {
                                                                                    return (
                                                                                        <span className='block flex flex-row gap-x-2 p-2 justify-between my-2 border border-blue-700 rounded' key={idx}>
                                                                                            <span className='font-bold text-3xl text-blue-700'>{candidate?.group_name}</span>
                                                                                            <span className='font-bold text-3xl text-blue-700'>-</span>
                                                                                            <span className='font-bold text-3xl text-blue-700'>{candidate?.votes}</span>
                                                                                        </span>
                                                                                    );
                                                                                }) : "No candidates"


                                                                            }
                                                                        </span>
                                                                    )

                                                                }
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            )
                                        }
                                    </tbody>
                                </table>
                            )
                        }
                </div>
            </div>
        </React.Fragment>
    );
};

export default ViewActiveElections;