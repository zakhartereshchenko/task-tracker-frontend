import { useAuth } from "./hooks/useAuth/useAuth";
import { AppRoutes } from "./routes/AppRoutes"

function App() {

  useAuth();
  
  return (
    <AppRoutes />
  )
}

export default App
