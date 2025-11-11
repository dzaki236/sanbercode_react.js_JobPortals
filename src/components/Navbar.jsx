
import { Navbar as Navy, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import { Link } from "react-router-dom";
function Navbar() {
    return (
        <Navy rounded className="p-4 mx-auto">
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink href="/">
                    Home
                </NavbarLink>
                <NavbarLink href="/materi">
                    Materi
                </NavbarLink>
            </NavbarCollapse>
        </Navy>
    );
}
export default Navbar;
