export const VerifyAccount = async (userId, password) => {
    try{
        const response = await fetch("https://ssms-microservice-1.onrender.com/api/Login/VerifyAccount", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId, password })
        });

        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    }catch(err){
        console.log("Error calling API:", err);
        throw err;
    }
};