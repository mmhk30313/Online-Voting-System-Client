import React from 'react';

const Footer = () => {
    return (
        <React.Fragment>
            <footer className="footer my-5">
                <div className="container">
                    <p className="text-center">© {new Date().getFullYear()} Online Voting System</p>
                </div>
            </footer>
        </React.Fragment>
    );
};

export default Footer;