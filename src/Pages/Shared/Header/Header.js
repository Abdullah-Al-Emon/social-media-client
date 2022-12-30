import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png'
import { AuthContext } from '../../../Context/AuthProvider';
import Loading from '../Loading/Loading';

const Header = () =>
{
    const { user, logOut, loading } = useContext(AuthContext)
    if (loading) {
        return <Loading />
    }

    const handleLogOut = () =>
    {
        logOut()
            .then(() =>
            {
                // toast.success('Sign Out Complete.', {
                //     style: {
                //         border: '1px solid #713200',
                //         padding: '16px',
                //         color: '#713200',
                //     },
                //     iconTheme: {
                //         primary: '#713200',
                //         secondary: '#FFFAEE',
                //     },
                // });
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <Navbar
                fluid={true}
                rounded={true}
            >
                <Navbar.Brand>
                    <img
                        src={logo}
                        className="mr-3 h-10 sm:h-9"
                        alt="Fire Media Logo"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Fire Media
                    </span>
                </Navbar.Brand>
                <div className="flex md:order-2">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL} />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            
                            <li><button onClick={handleLogOut}>Log Out</button></li>
                        </ul>
                    </div>
                    {/* <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings" img={user?.photoURL} rounded={true} />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {user?.displayName}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {user?.email}
                            </span>
                        </Dropdown.Header>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleLogOut}>
                            Sign out
                        </Dropdown.Item>
                    </Dropdown> */}

                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse>
                    <Link to='/'>
                        <Navbar.Link
                            active={true}
                        >
                            Home
                        </Navbar.Link>
                    </Link>
                    <Link to='/media'>
                        <Navbar.Link href="/navbars">
                            Media
                        </Navbar.Link>
                    </Link>
                    <Link to='/message'>
                        <Navbar.Link href="/navbars">
                            Message
                        </Navbar.Link>
                    </Link>
                    <Link to='/about'>
                        <Navbar.Link >
                            About
                        </Navbar.Link>
                    </Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;