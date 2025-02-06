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

export const getCategories = async () => {
    try{
        const token = localStorage.getItem("token");
        const response = await httpClient.get("/api/category/byUser", { headers: {
            Authorization: `Bearer ${token}`
        }
        });
        return response.data;
    }catch(error){
        console.error("Error fetching accounts", error);
        return [];
    }
}

export const addCategory = async (data: CategoryModel) => {
    try{
        const token = localStorage.getItem("token");
        const response = await httpClient.post("/api/category/add", data, { headers: {
            Authorization: `Bearer ${token}`
        }
        });
        return response.data;
    }catch(error){
        console.error("Error fetching accounts", error);
        return [];
    }
}

export const addAccount = async (data: AccountModel) => {
    try{
        const token = localStorage.getItem("token");
        const response = await httpClient.post("/api/account/add", data, { headers: {
            Authorization: `Bearer ${token}`
        }
        });
        return response.data;
    }catch(error){
        console.error("Error fetching accounts", error);
        return [];
    }
}