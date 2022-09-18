import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddElection from './Election/AddElection';
import ViewElections from './Election/ViewElections';
import ViewUsers from './UserManagement/ViewUsers';
import AddUser from './UserManagement/AddUser';

const AdminPanel = () => {
    const [panelState, setPanelState] = React.useState(null);
    const panels = [{route: "add-user", title: "Add User"}, {route: "add-election", title: "Add Election"}, {route: "view-elections", title: "View Elections"}, {route: "view-users", title: "View Users"}];
    const param = useParams();
    const { panel } = param;
    useEffect(() => {
        console.log({panel});
        setPanelState(panel || null);
    }, [panel]);
    
    // content of the panel
    let panelContent = null;
    if(panelState === "add-user"){
        panelContent = <AddUser />;
    }else if(panelState === "add-election"){
        panelContent = <AddElection />;
    }else if(panelState === "view-elections"){
        panelContent = <ViewElections />;
    }else if(panelState === "view-users"){
        panelContent = <ViewUsers />;
    }else{
        panelContent = <div className='h-[60vh] flex flex-col items-center justify-center text-center text-2xl font-bold text-gray-700'>
            <h1 
                className='uppercase text-indigo-500 italic
                    text-3xl font-semibold 
                    bg-gradient-to-r bg-clip-text  text-transparent 
                    from-red-500 via-purple-500 to-green-500
                    animate-text duration-75
                '
            >
                Welcome to Admin Panel
            </h1>
            <h1 
                className='uppercase text-indigo-500 italic p-3
                    text-2xl font-semibold 
                    text-purple-500
                    animate-text duration-75
                '
            >
            Select an option
            </h1>
        </div> ;
    }
    return (
        <React.Fragment>
            <div 
                className='min-h-[70vh]'
            >
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3'>
                    {
                        panels?.map(item => {
                            return (
                                <div key={item.route} className='flex flex-col items-center justify-center'>
                                    <Link to={`/admin/${item.route}`}
                                        className={`w-[200px] bg-violet-200 text-gray-700
                                            rounded-lg shadow-lg uppercase text-center
                                            flex items-center justify-center p-4 cursor-pointer
                                            ${panelState === item?.route ? "bg-indigo-500 text-red-200" : ""}
                                            hover:bg-indigo-500 
                                            hover:text-white text-lg italic font-bold
                                            transition-all ease-in-out duration-500
                                        `}
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    panelContent
                }
            </div>
        </React.Fragment>
    );
};

export default AdminPanel;