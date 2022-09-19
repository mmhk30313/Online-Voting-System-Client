import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}) => {
    return (
        <React.Fragment>
            <Navbar/>
            <div className='px-10 pt-10 pb-5'>
                {   
                    children
                }
            </div>
            <Footer/> 
        </React.Fragment>
    );
};

export default Layout;