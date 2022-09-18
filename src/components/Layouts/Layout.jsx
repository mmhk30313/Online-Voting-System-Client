import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({children}) => {
    return (
        <React.Fragment>
            <Navbar/>
            <div className='p-10'>
                {   
                    children
                }
            </div>
            <Footer/> 
        </React.Fragment>
    );
};

export default Layout;