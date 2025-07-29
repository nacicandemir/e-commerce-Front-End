"use client";

import { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import Category from "../Home/Category";
import CardCount from "./CardCount";
import HamburgerMenu from "./HamburgerMenu";
import Logo from "./Logo";
import Search from "./Search";
import User from "./User";
import { useRouter } from "next/navigation";


interface NavbarClientProps {
  currentUser: any;
}

const CategoryDropdown = () => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0); 
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter()

  const categories = [
    { name: "Erkek", categorySlug: "erkek"},
    { name: "Kadın", categorySlug: "kadin"},
    { name: "Elektronik", categorySlug: "elektronik"},
    { name: "Ev & Yaşam", categorySlug: "ev-yasam"},
    { name: "Spor Malzemeleri", categorySlug: "spor"},
    { name: "Kitap&Müzik", categorySlug: "kitaplar-müzikler"},
  ];

  const openWithDelay = () => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setIsOpen(true);
    }, 300);
  };

  const handleMouseEnterCategory = (index: number) => {
    if (timeout.current) clearTimeout(timeout.current);
    setIsOpen(true);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setIsOpen(false);
      setActiveIndex(0); // Menü kapanınca yine "Erkek" varsayılan olsun
    }, 300);
  };

  return (
    <div
      className="relative rounded-lg"
      onMouseEnter={openWithDelay}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center gap-1 hover:bg-slate-200 rounded-lg p-2 cursor-pointer">
        <RxHamburgerMenu size={18} className="text-slate-700" />
        <span>Tüm Kategoriler</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-[300px] bg-white shadow-lg rounded transition-all duration-200 z-50">
          <div className="flex border rounded p-5">
            {/* Sol: Ana kategoriler */}
            <ul className="p-2 select-none">
              {categories.map((cat, idx) => (
                <li
                  key={cat.name}
                  onClick={()=>router.push(`/category/${cat.categorySlug}`)}
                  onMouseEnter={() => handleMouseEnterCategory(idx)}
                  className={`px-5 py-5 cursor-pointer transition-colors duration-200 ${
                    activeIndex === idx
                      ? "bg-slate-100 text-slate-900 font-medium rounded"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};


const NavbarClient: React.FC<NavbarClientProps> = ({ currentUser }) => {
  const [showCategories, setShowCategories] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setIsClient(true);

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isMobile) {
        if (currentScrollY < lastScrollY.current || currentScrollY < 50) {
          setShowCategories(true);
        } else if (
          currentScrollY > lastScrollY.current &&
          currentScrollY > 100
        ) {
          setShowCategories(false);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("resize", checkIsMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  if (!isClient || isMobile) {
    return (
      <div className="flex flex-col w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-300">
        <div className="flex items-center justify-between gap-2 px-3 md:px-8 py-2 md:py-2.5 text-slate-800 h-14 md:h-16">
          <Logo />
          <Search />
          <User currentUser={currentUser} />
          <CardCount />
          {isMobile && (
            <div className="flex items-center gap-3 cursor-pointer text-slate-700 font-medium whitespace-nowrap text-sm">
              <CategoryDropdown />
            </div>
          )}
        </div>
        <div className="hidden md:block py-1" />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full fixed top-0 left-0 z-50 bg-white border-b border-gray-300">
      <div className="flex items-center justify-between gap-2 px-3 md:px-8 py-2 md:py-2.5 text-slate-800 h-14 md:h-16">
        <Logo />
        <Search />
        <User currentUser={currentUser} />
        <CardCount />
        {isMobile ? <CategoryDropdown /> : <HamburgerMenu />}
      </div>

      <div
        className={`w-full px-3 md:px-8 py-1 transition-all duration-300 ease-in-out ${
          showCategories ? "flex items-center" : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        {!isMobile && (
          <div className="cursor-pointer text-slate-700 font-medium whitespace-nowrap flex items-center gap-0.5 mr-6">
            <CategoryDropdown />
          </div>
        )}

        <div className="flex-grow flex justify-center">
          <Category />
        </div>
      </div>
    </div>
  );
};

export default NavbarClient;
