import React from 'react';

const NotFound = () => {
    const path = window.location.pathname;
    console.log({path});
    return (
        <React.Fragment>
            <div className='min-h-[70vh] bg-sky-200 rounded-lg flex flex-col items-center justify-center p-3 overflow-auto'>
                <div
                    className="
                        lg:w-[50%] h-full mx-auto p-8 rounded-lg shadow-2xl
                        bg-gray-100 shadow-gray-300
                        flex flex-col gap-y-4 justify-center items-center
                    "
                >
                    <h1 className="text-xl font-bold text-gray-700 uppercase">Online Voting System</h1>
                    <p>The 
                        {
                            path?.split('/')?.length > 1 ? (
                                <span className='text-red-500 font-bold'> {path?.split('/')[1]} </span>
                            ) : (
                                <span className='text-red-500 font-bold'> {path} </span>
                            )
                        } 
                        page is unavailable</p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default NotFound;