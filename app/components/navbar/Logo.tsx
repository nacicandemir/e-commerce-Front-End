"use client";

import Link from "next/link";

const Logo = () => {
  return (
    <div className="px-2 py-1 rounded-md text-lg md:text-2xl cursor-pointer">
      <Link href={"/"}>
        Burada.<span>com</span>
      </Link>
    </div>
  );
};

export default Logo;
