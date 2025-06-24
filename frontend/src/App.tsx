import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './views/NotFound/NotFound'
import ChatPage from './views/ChatPage/ChatPage'


const router = createBrowserRouter([
  {
    path: "/chat",
    element: (
      <ChatPage />
    ),
    errorElement: <NotFoundPage />,
  }
])

function App() {

  


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
