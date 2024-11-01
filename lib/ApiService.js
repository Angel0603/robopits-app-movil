// lib/ApiService.js
class ApiService {
    static instance = null;

    static getInstance() {
        if (ApiService.instance === null) {
            ApiService.instance = new ApiService();
        }
        return ApiService.instance;
    }

    async fetchData(endpoint, options = {}) {
        const url = `https://back-end-robopits.vercel.app/api/${endpoint}`;
        try {
            // Asegúrate de que credentials: 'include' se propague correctamente
            const response = await fetch(url, {
                ...options,
                credentials: 'include', // Habilita el envío de cookies
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers, // Propaga cualquier header adicional pasado en options
                },
            });
            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                return data;
            } else {
                const text = await response.text();
                console.error("Respuesta no JSON recibida:", text);
                throw new Error("La respuesta del servidor no es JSON.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }
}

export default ApiService;
