import { useEffect } from "react";

const TestApiGet = () => {
    useEffect(() => {
        fetch("http://localhost:8000/api/items/")
            .then(response => response.json())
            .then(data => {
                console.log("API GET response:", data);
            })
            .catch(error => {
                console.error("API GET error:", error);
            });
    }, []);

    return null;
};

export default TestApiGet;