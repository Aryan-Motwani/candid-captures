import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import NavbarDark from "./NavbarDark";

export default function Layout({ children, open, setOpen }) {
  console.log(location.pathname)
  return (
    <>
    { location.pathname == "/" ? 
         <Navbar open={open} setOpen={setOpen} bgColor="transparent"/> : <Navbar open={open} setOpen={setOpen} bgColor="black"/>
    }
        <Menu open={open} setOpen={setOpen}/>
        {children}
  
    </>
  )
}