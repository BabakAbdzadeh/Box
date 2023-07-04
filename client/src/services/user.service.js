import authHeader from "./auth-header";
import { getCurrentUser } from "./auth.service";


const API_URL = "http://localhost:3001/api/user/";

export async function getUserBoard() {
    try {
        const user = getCurrentUser();
        const userId = user ? user.id : null;
        const response = await fetch(API_URL + `results?id=${userId}`, {
            method: 'GET',
            headers: authHeader()
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("test" + data);
        return data;
    } catch (err) {
        console.error(err);
    }
};

export async function getAdminBoard() {
    try {
        const response = await fetch(API_URL + 'admin', {
            method: 'GET',
            headers: authHeader()
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // TEST
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
};
// export function getAllUsers() { };
// export function getAllData() { };
