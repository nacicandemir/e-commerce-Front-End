import { RxHamburgerMenu } from "react-icons/rx";

const HamburgerMenu = () => {
  return (
    <div className="relative cursor-pointer md:hidden">
      <RxHamburgerMenu size={25} />
    </div>
  );
};

export default HamburgerMenu;
