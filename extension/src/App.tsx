import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Sidebar from './components/Sidebar'
import MessageScheduler from './components/MessageScheduler'
import './styles/globals.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-8">TappyWhats</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <MessageScheduler />
          </div>
        </div>
        
        <Sidebar />
      </div>
    </QueryClientProvider>
  )
}

export default App
