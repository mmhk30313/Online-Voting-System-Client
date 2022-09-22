import React, { useEffect } from 'react';
import { useGetUserQuery } from '../../../features/api/apiSlice';
import { useVoteForElectionMutation } from '../../../features/election/electionApi';
import ViewListLoader from '../../Loaders/ViewListLoader';

import VoteModal from './VoteModal';

const VoteManager = ({election, candidates}) => {
    const [voter, setVoter] = React.useState(null);
    const [voteForElection, {data: voter_data, isSuccess, isError}] = useVoteForElectionMutation();
    const {data: user_data, isLoading: isLoadingUser} = useGetUserQuery();
    const user = user_data?.data;
    const [voteInfo, setVoteInfo] = React.useState(null);
    useEffect(() => {
        // console.log({updated_voter: voter_data});
        if(voter_data || user){
            const data = voter_data?.data || user;
            setVoter(data);
        }
    }, [isSuccess, isError, voter_data, user]);
    // console.log({election, candidates, voter});
    return (
        <React.Fragment>
            {
                voteInfo ? (
                    <VoteModal 
                        voteInfo={voteInfo} 
                        setVoteInfo={setVoteInfo}
                        voteForElection={voteForElection}
                        voter_data={voter}
                        isSuccess={isSuccess}
                        isError={isError}
                    />
                ) : (
                    null
                )
            }
            <div className="w-full">
                <h1 className='text-center text-white italic text-3xl uppercase'>
                    {election.title}
                </h1>

                {
                    election?.description && !isLoadingUser ? (
                        <div>
                            <div className='w-full bg-indigo-300 p-5 my-4 rounded-lg overflow-hidden'>
                                <div className='flex relative'>
                                    <p className={`
                                        w-full text-orange-500 text-lg z-10
                                        ${voter?.voting_status ? "text-center" : "text-end marquee"}
                                    `}>
                                        {election.description}
                                    </p>
                                </div>
                            </div>
                            <div 
                                className={`
                                    bg-sky-100 px-5 py-2 rounded-lg
                                    grid lg:grid-cols-2 md:grid-cols-2 xs:grid-cols-1
                                `}
                            >
                                <div className='w-full flex bg-gray-100 rounded-lg px-5 py-2 flex-col gap-y-4 border-t-[10px] sm:border-r-[10px]'>
                                    <h1 className='text-left text-2xl font-bold italic'>User Information</h1>
                                    <hr className='w-full border-gray-400' />
                                    <h1 className='text-xl border-b border-blue-400 pb-2'>Name: {voter?.user_name}</h1>
                                    {
                                        voter?.user_id && (
                                            <h3 className='text-lg border-b border-blue-400 pb-2'>Id: {voter?.user_id}</h3>
                                        )
                                    }
                                    <h3 className='text-lg border-b border-blue-400 pb-2'>Email: {voter?.email}</h3>
                                    {voter?.phone && (<h3 className='text-lg border-b border-blue-400 pb-2'>Phone: {voter?.phone}</h3>)}
                                    <h3 className='text-lg capitalize'>Role: {voter?.user_role}</h3>
                                </div>
            
                                <div className='w-full bg-gray-100 rounded flex flex-col gap-y-5 sm:border-l-[10px] border-t-[10px]'>
                                    <p className='text-center text-3xl p-3 text-purple-700'>
                                        {
                                            voter?.voting_status ? (
                                                "You have already voted for this election"
                                            ) : (
                                                "Select your candidate to vote carefully. Once you voted, you can't vote again!!!"
                                            )
                                        }
                                    </p>
            
                                    <div className={`
                                            w-full grid lg:grid-cols-${candidates?.length}
                                            md:grid-cols-${candidates?.length > 3 ? 3 : candidates?.length}
                                            sm:grid-cols-${candidates?.length > 2 ? 2 : candidates?.length}
                                            items-center justify-center gap-3 my-2
                                    `}
                                    >
                                        {
                                            candidates?.map((candidate, idx) => (
                                                <div key={idx} className="w-full">
                                                    <button 
                                                        // style={{width: 'fit-content'}}
                                                        onClick={() => {
                                                            setVoteInfo({
                                                                election_title: election.title,
                                                                election_id: election?.election_id,
                                                                user_name: voter?.user_name,
                                                                user_id: voter?.user_id,
                                                                user_email: voter?.email,
                                                                voting_status: voter?.voting_status,
                                                                group_id: candidate?.group_id,
                                                                group_name: candidate?.group_name,
            
                                                            })
                                                        }}
                                                        disabled={voter?.vote_status} 
                                                        className={`
                                                            block
                                                            text-3xl border mx-auto text-center 
                                                            text-white p-5 rounded-lg
                                                            bg-purple-400
                                                            ${
                                                                voter?.voting_status && (candidate?.group_id === voter?.group_id) ? "bg-green-600 hover:bg-green-600" 
                                                                : voter?.voting_status && (candidate?.group_id !== voter?.group_id) ? 'cursor-not-allowed hover:bg-purple-400'
                                                                : 'hover:bg-green-600'
                                                            }
                                                        `}
                                                        title={candidate?.group_description || candidate?.group_id}
                                                    >
                                                        {candidate?.group_name}
                                                    </button>
                                                </div>
                                            ))
                                        
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                voter?.voting_status && (
                                    <div className='w-full bg-red-300 p-5 my-10 rounded-lg overflow-hidden'>
                                        <div className='flex relative'>
                                            <div className='w-full flex flex-row justify-end text-green-700 text-end text-lg marquee'>
                                                <span className='block text-sm'>You are not eligible to vote in this election. </span>
                                                <span className='block text-sm ml-[75px]'>You are not eligible to vote in this election. </span>
                                            </div>
                                            <div className='w-full flex flex-row justify-end text-green-700 text-end text-lg marquee2'>
                                                <span className='block text-sm'>You are not eligible to vote in this election. </span>
                                                <span className='block text-sm ml-[75px]'>You are not eligible to vote in this election. </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                        </div>
                    ) : (
                        <div className='w-full flex flex-col gap-y-5 my-5'>
                            <ViewListLoader/>
                            <ViewListLoader/>
                            <ViewListLoader/>
                        </div>
                    )
                }

            </div>
        </React.Fragment>
    );
};

export default VoteManager;