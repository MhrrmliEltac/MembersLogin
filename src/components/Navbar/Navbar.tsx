import Logo from "./Logo";
import Menu from "./Menu";
import User from "./User";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  return (
    <div className="bg-[#DB2C59] text-white font-roboto flex px-3 md:px-10 justify-between py-3 md:py-5">
      <Logo />
      <Menu />
      <User />
      <HamburgerMenu />
    </div>
  );
};

export default Navbar;
