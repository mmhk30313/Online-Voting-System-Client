import React from 'react';

const VoteManager = ({election, candidates, user}) => {
    return (
        <React.Fragment>
            <div className="w-full">
                <h1 className='text-center text-white italic text-2xl uppercase'>
                    {election.title}
                </h1>

                {
                    election?.description && (
                        <div className='w-full bg-indigo-300 p-5 my-4 rounded-lg overflow-hidden'>
                            <div className='flex relative'>
                                <p className='w-full text-orange-500 text-end text-lg marquee'>
                                    {election.description}
                                </p>
                            </div>
                        </div>
                    )
                }

                <p className='text-center p-5 text-gray-100'>Select your candidate to vote carefully. Once you voted, you can't vote again!!!</p>

                <div className={`
                        w-full grid grid-cols-${candidates?.length} 
                        items-center justify-center gap-3 my-5
                   `}
                >
                    {
                        candidates?.map((candidate, idx) => (
                            <div key={idx} className="w-full">
                                <h1 style={{width: 'fit-content'}} 
                                    className={`
                                        text-3xl border mx-auto text-center 
                                        bg-purple-400 hover:bg-green-600
                                        text-white p-10 rounded-lg cursor-pointer
                                    `}
                                    title={candidate?.description || candidate?.group_id}
                                >
                                    {candidate?.group_name}
                                </h1>
                            </div>
                        ))
                    
                    }
                </div>
                {
                    election?.description && (
                        <div className='w-full bg-red-300 p-5 my-10 rounded-lg overflow-hidden'>
                            <div className='flex relative'>
                                <p className='w-full text-green-700 text-end text-lg marquee'>
                                    You are not eligible to vote in this election
                                </p>
                            </div>
                        </div>
                    )
                }
            </div>
        </React.Fragment>
    );
};

export default VoteManager;