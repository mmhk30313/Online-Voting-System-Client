import React, { useEffect } from 'react';
import { useGetActiveElectionsQuery } from '../../features/api/apiSlice';
import ViewListLoader from '../Loaders/ViewListLoader';
import {useSelector} from "react-redux";
import VoteManager from './VoteManager/VoteManager';

const UserPanel = () => {
    const {user} = useSelector((state) => state.auth);
    const {data: activeElections, isLoading, isSuccess} = useGetActiveElectionsQuery();
    const [elections, setElections] = React.useState([]);
    // const {data: activeElections} = useGetActiveElectionsQuery();
    useEffect(() => {
        if(activeElections?.data?.length){
            setElections(activeElections?.data);
        }
    }, [activeElections]);
    console.log({activeElections});
    return (
        <React.Fragment>
            <div className="user-panel w-full bg-indigo-600 min-h-[70vh] rounded-lg py-5 px-10 flex flex-col justify-center items-center">
                {
                    isLoading ? (
                        <>
                            <ViewListLoader/>
                            <ViewListLoader/>
                            <ViewListLoader/>
                            <ViewListLoader/>
                        </>
                    ) : (
                        <div>

                            {
                                elections?.length ? (
                                    activeElections?.data?.map((election) => (
                                        <VoteManager key={election?.election_id} election={election} candidates={election?.candidates}/>
                                    ))
                                ) : (
                                    <div className="text-center text-white bg-sky-200 p-10 rounded-lg text-blue-700">
                                        <h1 className="lg:text-2xl text-md font-bold">
                                            Hello, <span className='text-green-700'>{user?.name}</span>! You have no active elections to vote in.
                                        </h1>
                                        <p className="text-lg text-purple-700 my-5 text-xl">Please check back later</p>
                                    </div>
                                )
                            }
                        </div>
                    )
                        
                }
            </div>
        </React.Fragment>
    );
};

export default UserPanel;