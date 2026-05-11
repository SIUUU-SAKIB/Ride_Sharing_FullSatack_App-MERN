export const registerUser = async (data:FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return response.json()
}
