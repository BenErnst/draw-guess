
export const storageService = {
    localStore,
    localLoad,
    sessionStore,
    sessionLoad
}

// Local Storage:
function localStore(key, value, storage) {
    localStorage[key] = JSON.stringify(value);
}
function localLoad(key, defaultValue = null) {
    const value = localStorage[key] || defaultValue;
    return JSON.parse(value);
}

// Session Storage:
function sessionStore(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
}
function sessionLoad(key) {
    return JSON.parse(sessionStorage.getItem(key));
}

