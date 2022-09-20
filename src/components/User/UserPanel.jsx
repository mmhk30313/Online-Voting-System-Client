import React from 'react';
import { useGetActiveElectionsQuery } from '../../features/api/apiSlice';
import ViewListLoader from '../Loaders/ViewListLoader';
import {useSelector} from "react-redux";
import VoteManager from './VoteManager/VoteManager';

const UserPanel = () => {
    const {user} = useSelector((state) => state.auth);
    const {data: activeElections} = useGetActiveElectionsQuery();
    console.log({activeElections, user});
    return (
        <React.Fragment>
            <div className="user-panel w-full bg-indigo-600 min-h-[70vh] rounded-lg p-10">
                {
                    !activeElections?.data?.length ? (
                        <>
                            <ViewListLoader/>
                            <ViewListLoader/>
                            <ViewListLoader/>
                            <ViewListLoader/>
                        </>
                    ) : (
                        <div>
                            {
                                activeElections?.data?.map((election) => (
                                    <VoteManager election={election} candidates={election?.candidates} user={user}/>
                                ))
                            }
                        </div>
                    )
                        
                }
            </div>
        </React.Fragment>
    );
};

export default UserPanel;