import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '@/pages/Dashboard'
import Rds from '@/pages/Rds'
import S3 from '@/pages/S3'
import ElastiCache from '@/pages/ElastiCache'
import Sqs from '@/pages/Sqs'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rds" element={<Rds />} />
          <Route path="/s3" element={<S3 />} />
          <Route path="/elasticache" element={<ElastiCache />} />
          <Route path="/sqs" element={<Sqs />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
