const getAllUsers = async(page:number, limit:number) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/get-all-users?page=${page}&limit=${limit}`, {
        credentials:'include'
    })
    const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || "Unauthorized");
}

return data;
}

const blockUser = async(id:string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/block-user/${id}`,{
          
            method: "PATCH",
            credentials:"include",
            headers: {
                "Content-Type": "application/json"
            },
        
    })
 const data = await response.json()
    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to block user"
        )
    }
    return data
}
export const AdminServiceForRider = {getAllUsers, blockUser}