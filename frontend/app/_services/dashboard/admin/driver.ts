import { URL } from "@/app/_hooks/URL"


const allApplications = async(page:number, limit:number, search:string, status:string) => {
    console.log(status)
const response = await fetch(`${URL}/admin/all-applications?page=${page}&limit=${limit}&search=${search}&status=${status}`, {
    credentials:"include",
    method:'GET'
})
    const data = await response.json();
if (!response.ok) {
  throw new Error(data.message || "Unauthorized");
}

return data;
}

export const AdminServiceForDriver = {
    allApplications
}