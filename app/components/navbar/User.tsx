"use client"
import type { User } from "@prisma/client"
import { useState } from "react"
import {LuUser} from 'react-icons/lu'
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"

interface UserProps{
    currentUser: User | null | undefined
}
const User:React.FC<UserProps> = ({currentUser}) => {
    const router = useRouter()
    const [openMenu, setOpenMenu] = useState(false)

    console.log(currentUser, "currentUser")

    const menuFunc = (type:any) => {
        setOpenMenu(false)
        if(type == "logout"){       
            signOut();
            router.push("/login")
        }else if(type == "register"){
            router.push("/register")
        }else{
            router.push("/login")
        }
       
    }

  return (
    <div onClick={()=> setOpenMenu(!openMenu)} className="hidden md:flex border:none bg-slate-300 py-2 px-3 rounded-xl cursor-pointer select-none relative z-50">
      <div  className="flex items-center justify-center gap-1">
        <LuUser size={20} />
        <div>{currentUser ? "Hesabım": "Giriş Yap"}</div>
      </div>
      {
        openMenu &&(
          <div className="absolute w-[150px] top-10 bg-white shadow-lg right-0 p-2 rounded-md h-fit border border-gray-300">
            {
              currentUser ? (
                <div className="space-y-2">
                  <div className="text-orange-500">{currentUser.name}</div>
                  <div onClick={()=> router.push('/admin')} className="text-slate-600 hover:bg-gray-100 rounded-md p-2">Admin</div>
                  <div onClick={() => menuFunc("logout")} className="text-slate-600 hover:bg-gray-100 rounded-md p-2">Logout</div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div onClick={() => menuFunc("register")} className="text-slate-600 hover:bg-gray-100 rounded-md p-2">Register</div>
                  <div onClick={() => menuFunc("login")} className="text-slate-600 hover:bg-gray-100 rounded-md p-2">Login</div>
                </div>
              )
            }
          </div>
        )
      }
    </div>
  );
};

export default User;
