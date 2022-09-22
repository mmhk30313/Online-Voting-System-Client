import React, { useEffect } from 'react';
import {DebounceInput} from 'react-debounce-input';
// import { Link } from 'react-router-dom';
import { useGetActiveElectionGroupQuery, useGetElectionsQuery } from '../../../features/api/apiSlice';
import Select  from 'react-select';
import { useBulkUpdateElectionsMutation, useUpdateElectionGroupMutation, useUpdateElectionMutation } from '../../../features/election/electionApi';
import ViewListLoader from '../../Loaders/ViewListLoader';
const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
];


const ViewElections = () => {
    // const [isPageLoading, setIsPageLoading] = React.useState(true);
    const [editableElectionId, setEditableElectionId] = React.useState(null);
    const [selectedElections, setSelectedElections] = React.useState([]);
    const [elections, setElections] = React.useState([]);
    const {data: activeElectionGroups} = useGetActiveElectionGroupQuery();
    const [groups, setGroups] = React.useState([]);
    const {data: electionData,isLoading: isPageLoading} = useGetElectionsQuery();
    const [updateElection, {isError: isUpdateError}] = useUpdateElectionMutation();
    const [bulkUpdateElections, {isLoading: isBulkLoading, isSuccess, isError }] = useBulkUpdateElectionsMutation();
    useEffect(() => {
        const our_elections = electionData?.data;
        if(our_elections?.length) {
            setElections(our_elections);
            // setEditableElectionId(null);
            setSelectedElections([]);
        }
        // else{
        //     setTimeout(() => {
        //         setIsPageLoading(false);
        //     }, 4000);
        // }

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
                    <h1 className='text-center text-2xl font-bold text-gray-700 uppercase mb-5'>Election List</h1>
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
                            (!elections?.length && isPageLoading) || isBulkLoading ? (
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
                                            <th className='p-2'>
                                                <input
                                                    onChange={(e) => {
                                                        const { checked } = e.target;
                                                        const newSelectedElectrons = checked ? elections.map((election) => election.election_id) : [];
                                                        setSelectedElections(newSelectedElectrons);
                                                        // setElections(elections.map((election) => ({ ...election, checked })));
                                                    }}
                                                    className='w-4 h-4 rounded-lg'
                                                    type='checkbox'
                                                    name='select_all'
                                                    id='select_all'
                                                    checked={selectedElections?.length ? true : false}
                                                />
                                            </th>
                                            <th className='p-2 text-left'>Title</th>
                                            <th className='p-2 text-left'>Admin Email</th>
                                            <th className='p-2 text-left'>Description</th>
                                            <th className='p-2'>Status</th>
                                            <th className='p-2'>Candidates</th>
                                            <th className='p-2'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            !elections?.length ? (
                                                <tr>
                                                    <td className='p-2 text-center lg:text-3xl text-lg text-blue-600' colSpan={7}>
                                                        <span className='uppercase bg-sky-100 border border-blue-400 py-5 lg:px:36 md:px-20 px-20 rounded-lg'>
                                                            No election is found
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
                                                            <td className='p-2'>
                                                                <input
                                                                    onChange={(e) => {
                                                                        const { checked } = e.target;
                                                                        const newSelectedElection = checked ? [...selectedElections, item?.election_id] : selectedElections.filter((election) => election !== item?.election_id);
                                                                        setSelectedElections(newSelectedElection);
                                                                    }}
                                                                    checked={selectedElections?.includes(item?.election_id)}
                                                                    className='w-4 h-4 rounded-lg'
                                                                    type='checkbox'
                                                                    name='check'
                                                                    id='select_all'
                                                                />
                                                            </td>
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
                                                                        <span className="capitalize p-2">
                                                                            {
                                                                                item?.candidates?.length > 0 ? item?.candidates?.map((candidate, idx) => {
                                                                                    return (
                                                                                        <span key={idx}>
                                                                                            {
                                                                                                candidate?.group_name + (idx !== item?.candidates?.length - 1 ? ', ' : '')
                                                                                            }
                                                                                        </span>
                                                                                    );
                                                                                }) : "No candidates"


                                                                            }
                                                                        </span>
                                                                    )

                                                                }
                                                                {/* <Link className='underline hover:italic text-green-500' to={`/admin/view-election-elections?election=${item?.election_id}`}>
                                                                    See Here
                                                                </Link> */}
                                                            </td>
                                                            <td className='p-2'>
                                                                <button
                                                                    // disabled={completed ? true : false}
                                                                    className={`focus:outline-none bg-purple-400 hover:bg-purple-800 text-white font-bold p-1 rounded-full inline-flex items-center transition duration-300`}
                                                                    onClick={() => {
                                                                        setEditableElectionId(item?.election_id);
                                                                        // setTimeout(() => {
                                                                        //     setEditableElectionId(null)
                                                                        // }, 10000);
                                                                    }}
                                                                >
                                                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                                        width="16" height="16"
                                                                        viewBox="0 0 32 32"
                                                                        
                                                                        style={{fill: "#000000"}}
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
                            )
                        }
                </div>
            </div>
        </React.Fragment>
    );
};

export default ViewElections;