
import MainRoute from './MainRoute';
import { AuthContextProvider } from './store/Auth-context';


function App() {

  return (
    <AuthContextProvider>
      <MainRoute />
    </AuthContextProvider>
  )
}

export default App