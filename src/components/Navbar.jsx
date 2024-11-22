import { Link } from "react-router-dom";
import logo from '../../public/images/wedding/logowhite.png';

export default function Navbar({ open, setOpen, bgColor }) {

    return (
        <header className={`fixed top-0 left-0 right-0 z-10 bg-${bgColor}`}>
            <div className="wrapper py-3 flex items-center justify-between text-black" style={{ maxWidth: '92rem' }}>
                {/* Logo */}
                <Link to='/' className="font-serif text-base lg:text-xl">
                    <img className="w-24" style={{ "width": "10rem" }} src={logo} alt="NM Photography Logo" />
                </Link>

                {/* Navigation Links */}
                <nav className="hidden lg:flex space-x-6 gap-10">
                    <Link to="/" className="text-white hover:text-gray-300 transition duration-300" style={{"fontSize" : "20px", fontWeight : "bold"}}>
                        Home
                    </Link>
                    <Link to="/pre-wedding" className="text-white hover:text-gray-300 transition duration-300" style={{"fontSize" : "20px", fontWeight : "bold"}}>
                        Pre Wedding
                    </Link>
                    <Link to="/portrait" className="text-white hover:text-gray-300 transition duration-300" style={{"fontSize" : "20px", fontWeight : "bold"}}>
                        Portraits
                    </Link>
                    <Link to="/about" className="text-white hover:text-gray-300 transition duration-300" style={{"fontSize" : "20px", fontWeight : "bold"}}>
                        About Us
                    </Link>
                    <Link to="/contact" className="text-white hover:text-gray-300 transition duration-300" style={{"fontSize" : "20px", fontWeight : "bold"}}>
                        Contact
                    </Link>
                </nav>

                {/* Hamburger Menu */}
                <button 
                    onClick={() => setOpen(!open)} 
                    aria-label="Open menu" 
                    className="w-8 h-8 flex flex-col justify-center space-y-[7px] items-end group lg:hidden"
                >
                    <div className="h-[0.1rem] w-6 bg-white group-hover:w-8 duration-500"></div>
                    <div className="h-[0.1rem] w-8 bg-white group-hover:w-8 duration-500"></div>
                    <div className="h-[0.1rem] w-4 bg-white group-hover:w-8 duration-500"></div>
                </button>
            </div>
        </header>
    )
}
