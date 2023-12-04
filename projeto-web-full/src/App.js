import Login from "./components/Login";
import React, {createContext, useEffect, useState} from "react";
import Page from "./components/Page";

export const AppContext = createContext();

const App = () => {
    const [fruits, setFruits] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [pageCount, setPageCount] = useState(1);
    const [showInsertFruit, setShowInsertFruit] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [alertError, setAlertError] = useState(false)
    const [socket, setSocket] = useState(null)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        setPageCount(pageCount);
    }, [pageCount]);

    useEffect(() => {
    }, [authenticated]);

    useEffect(() => {
      if(!authenticated && localStorage.getItem("token")) {
          setAuthenticated(true)
      }
    },[])

    return (
        <div>
            <AppContext.Provider value={{
                fruits, setFruits,
                page, setPage,
                limit, setLimit,
                pageCount, setPageCount,
                showInsertFruit, setShowInsertFruit,
                authenticated, setAuthenticated,
                alertError, setAlertError,
                socket, setSocket,
                notifications, setNotifications
            }}>
                {authenticated ? (
                    <Page/>
                ) : (
                    <Login/>
                )}
            </AppContext.Provider>
        </div>
    )
}

export default App;
