import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./navigation/NavBar";
import AppRouter from "./navigation/AppRouter";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="flex  flex-col">
            <Navigation user={user} />
            <AppRouter user={user} />
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
