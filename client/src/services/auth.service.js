const API_URL = "http://localhost:3001/api/user/";

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @returns {JSON} - TOKEN is here!
 */
export function login(username, password) {
    return fetch(API_URL + 'login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                alert('Invalid username or password');
                throw new Error('Invalid username or password');
            }
        })
        .then((data) => {
            if (data.accessToken) {
                localStorage.setItem("user", JSON.stringify(data));
                return data;
            }
        });
}


/**
 * Remove user's token from local storage
 */
export function logout() {
    localStorage.removeItem("user");
}


/**
 * 
 * @param {String} username 
 * @param {String} email
 * @param {String} password 
 * @returns {JSON}
 */
export function register(username, email, password) {
    fetch(API_URL + 'register', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            username: username,
            email: email,
            password: password
        }),
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then((data) => {
            if (data.accessToken) {
                localStorage.setItem("user", JSON.stringify(data));
            }
            return data;
        })
        .catch((err) => {
            console.error('There was a problem with the fetch operation:', err);
        });
};

// profile component uses this method to show content of logged user.
/**
 * 
 * @returns {JSON}
 */
export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
};


