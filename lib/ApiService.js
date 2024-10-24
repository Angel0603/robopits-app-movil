// lib/ApiService.js
class ApiService {
    static instance = null;

    static getInstance() {
        if (ApiService.instance === null) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    async fetchData(endpoint) {
        const url = `https://back-end-robopits.vercel.app/api/${endpoint}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
}

export default ApiService;
