import React from "react"



const PageContainer = ({children}: {children: React.ReactNode}) =>{
    return (
        <div className="py-20 md:py-25 px-3 md:px-10">{children}</div>
    )
}

export default PageContainer