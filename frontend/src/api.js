const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export const extractAttributes = async (rawText) => {
    try {
        // Check this line in your api.js
        const response = await fetch(`${API_BASE_URL}/extract`, {
            method: "POST", // If this is missing or says "GET", you get the 405 error
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ raw_text: text }) // Ensure data is in the body
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("API Extraction Failed:", error);
        throw error;
    }
};