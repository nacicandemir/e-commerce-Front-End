import { Typography } from "@material-tailwind/react";
import Link from "next/link";

export function SimpleFooter() {
  return (
    <footer className=" font-medium p-10 flex w-full flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-gray-300 py-6 text-center md:justify-between">
      <div className="px-2 py-1 text-md md:text-xl cursor-pointer">
        <Link href={"/"}>
          Burada.<span>com</span>
        </Link>
      </div>
      <ul className="flex flex-wrap items-center  font-medium gap-y-2 gap-x-8">
        <li
          color="blue-gray"
          className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
        >
          <Link href="#">About Us</Link>
        </li>
        <li
          color="blue-gray"
          className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
        >
          <Link href="#">Contribute</Link>
        </li>
        <li
          color="blue-gray"
          className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
        >
          <Link href="#">Contact Us</Link>
        </li>
      </ul>
    </footer>
  );
}
