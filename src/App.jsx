import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import Navigation from "./navigation/NavBar";
import AppRouter from "./navigation/AppRouter";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="h-screen flex flex-col">
            <Navigation />
            <div className="flex-grow">
              <AppRouter />
            </div>
          </div>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
