import httpClient from "./httpClient"


export const getAccounts = async () => {

    try{
        const token = localStorage.getItem("token");
        const response = await httpClient.get("/api/account/byUser", { headers: {
            Authorization: `Bearer ${token}`
        }
        });
        return response.data;
    }catch(error){
        console.error("Error fetching accounts", error);
        return [];
    }
}