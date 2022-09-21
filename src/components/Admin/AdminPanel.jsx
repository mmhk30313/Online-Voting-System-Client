import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddElection from './Election/AddElection';
import ViewElections from './Election/ViewElections';
import ViewUsers from './UserManagement/ViewUsers';
import AddUser from './UserManagement/AddUser';
import { admin_panels } from '../../utils/admin.panels';
import ViewGroups from './ElectionGroup/ViewGroups';
import AddGroup from './ElectionGroup/AddGroup';
import ViewActiveElections from './ActiveElections/ViewActiveElections';

const AdminPanel = () => {
    const [panelState, setPanelState] = React.useState(null);
    const panels = admin_panels;
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
    }else if(panelState === "view-election-groups"){
        panelContent = <ViewGroups />;
    }else if(panelState === "add-election-group"){
        panelContent = <AddGroup />;
    }else if(panelState === "view-users"){
        panelContent = <ViewUsers />;
    }else if(panelState === "active-elections"){
        console.log("active elections");
        panelContent = <ViewActiveElections />;
    }else{
        panelContent = <div className='lg:h-[45vh] flex flex-col items-center justify-center text-center text-2xl font-bold text-gray-700'
        >
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
                className='
                    uppercase text-indigo-500 italic p-3
                    text-2xl font-semibold 
                    text-purple-500
                    animate-text duration-75 
                    border border-purple-500 rounded-lg
                    bg-gradient-to-r bg-clip-text  text-transparent
                    from-red-500 via-purple-500 to-green-500
                    my-5 hover:bg-purple-700 hover:text-white
                '
            >
                <Link to='/admin/active-elections' className='text-blue-500 hover:text-blue-700 transition-all ease-in-out duration-300'>
                    See Active Elections
                </Link>
            </h1>
        </div> ;
    }
    return (
        <React.Fragment>
            <div 
                className='min-h-[60vh]'
            >
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3'>
                    {
                        panels?.map(item => {
                            return (
                                <div key={item.route} className='w-full flex flex-col items-center justify-center'>
                                    <Link to={`/admin/${item.route}`}
                                        className={`w-full bg-violet-200 text-gray-700
                                            rounded-lg shadow-lg uppercase text-center
                                            flex items-center justify-center p-4 cursor-pointer
                                            ${panelState === item?.route ? "bg-blue-500 text-red-200" : ""}
                                            hover:bg-indigo-500 
                                            hover:text-white italic font-bold
                                            transition-all ease-in-out duration-500
                                            lg:text-md md:text-md sm:text-sm xs:text-xs
                                            text-[10px]
                                        `}
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
                <hr className="border-b my-5" />
                {
                    panelContent
                }
            </div>
        </React.Fragment>
    );
};

export default AdminPanel;