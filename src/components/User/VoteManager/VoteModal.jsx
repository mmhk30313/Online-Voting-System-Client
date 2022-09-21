import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import UniqLoader from '../../Loaders/UniqLoader';
import { useVoteForElectionMutation } from '../../../features/election/electionApi';

export default function VoteModal({voteInfo, setVoteInfo, voteForElection, voter_data, isSuccess, isError}) {
    
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    // const [voteForElection, {data: voter_data, isLoading, isSuccess, isError}] = useVoteForElectionMutation();
    // const {user_name, user_id, 
    const {
        election_title,
        election_id,
        user_name,
        user_id,
        group_id,
        group_name,
        voting_status
    } = voteInfo;

    useEffect(() => {
        if(voting_status){
            setMessage({color: "red", value: "You have already voted for this election"})
        }
        if(isError || isSuccess) {
            console.log({voter_data, isError, isSuccess});
            const our_message = isSuccess 
                ? {color: 'green', value: "Your vote is casted successfully!!!"}
                : {color: "red", value: "You have already voted for this election!!!"};
            // setIsOpen(false);
            setTimeout(() => {
                setMessage(our_message);
                setIsProcessing(false);
            }, [2000]);
        }

        if(voteInfo){
            setIsOpen(true);
        }
    }, [voteInfo, voter_data, isSuccess, isError]);

    function closeModal() {
        setIsOpen(false);
        setVoteInfo(null);
    }

    function handleVote(){
        console.log({voteInfo});
        setIsProcessing(true);
        voteForElection({election_id, user_id, group_id});
    }


    return (
        <Fragment>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                        <Dialog.Title
                            as="h1"
                            className="text-lg font-medium leading-6 text-gray-900"
                        >
                            Hello, <span className='text-blue-700'>{user_name}</span>! You are voting for <br/> <span className='text-xl font-bold text-purple-700'>{election_title}</span>
                        </Dialog.Title>
                        <div className="mt-2">
                            <p className="text-md text-gray-500">
                                Are you sure you want to vote for this election? All your votes are final.
                                Your vote will be casted to <span className='text-lg font-bold text-green-700 uppercase'>{group_name}</span> group.
                            </p>
                        </div>
                        {
                            (isProcessing) && (
                                <div className="my-4">
                                    <div className="text-md text-gray-500">
                                        <UniqLoader color={"red"}/>
                                        <UniqLoader color={"green"}/>
                                        <p className='text-center'>Processing your vote...</p>
                                        <UniqLoader color={"green"}/>
                                        <UniqLoader color={"red"}/>
                                    </div>
                                </div>
                            )
                        }
                        {
                            message && !isProcessing && <p className={`bg-gray-200 rounded-lg p-4 my-4 text-center text-md text-${message.color}-500`}>{message.value}</p>
                        }

                        <div className="mt-4">
                            <button
                                disabled={voting_status || isProcessing || isSuccess || isError}
                                type="button"
                                className={`${voting_status && "cursor-not-allowed"} ${isProcessing && "cursor-not-allowed"} ${isSuccess && "cursor-not-allowed"} ${isError && "cursor-not-allowed"}  
                                    w-[100px] inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 
                                    hover:bg-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                                `}
                                onClick={handleVote}
                            >
                                OKAY
                            </button>

                            <button
                                type="button"
                                className="w-[100px] mx-4 inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                onClick={closeModal}
                            >
                                CANCEL
                            </button>
                        </div>
                        </Dialog.Panel>
                    </Transition.Child>
                    </div>
                </div>
                </Dialog>
            </Transition>
        </Fragment>
    )
}