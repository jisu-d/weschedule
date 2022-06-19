export let currentUser: (string | null) = null;

export const check = () => { // true false여부를 확인함
    const cookies = document.cookie.split(';')
    
    for (let data of cookies) {
        if (data.includes('id')) {
            currentUser = data.split('=')[1]
            break;
        }
    }
    if (currentUser) {
        return true
    } else {
        return false
    }
}

export const getCurrentUser = () => currentUser || ''