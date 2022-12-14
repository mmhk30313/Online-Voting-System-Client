import { Link } from "react-router-dom";
import { Menu, Transition } from '@headlessui/react';
import gravatarUrl from "gravatar-url";
import { Fragment } from "react";
import {useSelector} from "react-redux";
import { useLogoutMutation } from "../../features/auth/authApi";
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const {user} = useSelector((state) => state.auth);
    // const dispatch = useDispatch();
    const [logout] = useLogoutMutation();
    // const navigate = useNavigate();
    // console.log({user});
    return (
        <div className="overflo-auto overflow-y-visible sticky z-40 top-0 left-0 text-center w-full header bg-violet-600 py-4 text-white font-bold text-lg shadow-lg">
            <div className="flex flex-cols justify-between items-center px-10">
                <Link to={'/'}
                    className="bg-purple-400 hover:bg-blue-500 border border-white rounded-full p-2 duration-300
                transition-all ease-in-out cursor-pointer text-sm mr-2">Online Voting App</Link>
                {/* Profile dropdown */}
                {
                    user ? (
                        <div className="flex flex-row items-center">
                            <Link to={'/about'}
                                className="bg-purple-400 hover:bg-blue-500 border border-white rounded-full px-2 py-1 duration-300
                                transition-all ease-in-out cursor-pointer text-sm"
                            >
                                About
                            </Link>
                            <Menu as="div" className="ml-3 relative">
                                <div>
                                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full border-2 border-white rounded-full"
                                            src={user?.avatar || (user?.email ? gravatarUrl(user.email) : "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y") }
                                            // src="https://i.ibb.co/XCqDWb0/cse-logo.png"
                                            // src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                            alt=""
                                        />
                                    </Menu.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(active ? 'bg-gray-100' : '', 'uppercase tracking-widest italic text-purple-600 border-b block px-4 py-2 text-sm text-blue-700')}
                                        >
                                            Your Profile
                                        </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                        <a
                                            href="#"
                                            className={classNames(active ? 'bg-gray-100' : '', 'uppercase tracking-widest italic text-purple-600 border-b block px-4 py-2 text-sm text-blue-700')}
                                        >
                                            Settings
                                        </a>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                        <span
                                            onClick={() => {
                                                // localStorage.clear();
                                                // navigate('/');
                                                logout();
                                            }}
                                            className={classNames(active ? 'bg-gray-100' : '', 'uppercase tracking-widest italic text-purple-600 block px-4 py-2 text-sm text-blue-700 cursor-pointer')}
                                        >
                                            Logout
                                        </span>
                                        )}
                                    </Menu.Item>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    ) : (
                        <div className="flex flex-row gap-2 items-center">
                            <Link to={'/'}
                                className="bg-purple-400 hover:bg-blue-500 border border-white rounded-full p-2 duration-300
                                transition-all ease-in-out cursor-pointer text-sm"
                            >
                                Home
                            </Link>
                            <Link to={'/about'}
                                className="bg-purple-400 hover:bg-blue-500 border border-white rounded-full p-2 duration-300
                                transition-all ease-in-out cursor-pointer text-sm"
                            >
                                About
                            </Link>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
