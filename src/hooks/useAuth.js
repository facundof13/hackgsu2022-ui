import * as React from "react";


function useAuth() {
    const [authed, setAuthed] = React.useState(false);

    React.useEffect(() => {
        if (localStorage.getItem('token') && localStorage.getItem('token') !== 'null') {
            setAuthed(true);
        }
    }, [])

    return {
        authed,
        login(token) {
            localStorage.setItem('token', token);
            setAuthed(true);
        },
        logout() {
            localStorage.removeItem('token');
            setAuthed(false);
        },
        headers() {
            const token = localStorage.getItem('token');

            if (token && token !== 'null') {
                return { Authorization: `JWT ${token}` };
            }
        }
    };
}


const authContext = React.createContext();
export function AuthProvider({ children }) {
    const auth = useAuth();

    // return <authContext.Provider value={ auth }> { children } < /authContext.Provider>;
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export default function AuthConsumer() {
    return React.useContext(authContext);
}

