import authHeader from "./auth-header";

const API_URL = "";

export function getUserBoard() {
    fetch(API_URL + 'user', {
        method: 'GET',
        headers: authHeader()
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // TEST
            console.log(data);
            return data;
        })
        .catch(err => {
            console.error(err);
        });
};
export function getAdminBoard() {
    fetch(API_URL + 'admin', {
        method: 'GET',
        headers: authHeader()
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // TEST
            console.log(data);
            return data;
        })
        .catch(err => {
            console.error(err);
        });
};
// export function getAllUsers() { };
// export function getAllData() { };
