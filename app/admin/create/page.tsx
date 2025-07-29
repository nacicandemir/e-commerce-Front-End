import { getCurrentUser } from "@/app/actions/getCurrentUser"
import CreateForm from "@/app/components/admin/CreateForm"
import AdminContainer from "@/app/components/containers/AdminContainer"
import { redirect } from "next/navigation"



const CreateProduct = async() => {
  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role!=="ADMIN"){
    return(
      redirect('/login')
    )
  }
  return (
    <AdminContainer>
      <CreateForm/>
    </AdminContainer>
  )
}

export default CreateProduct