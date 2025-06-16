import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { Route,RouterProvider,createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import store from './pages/redux/store.js'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import PrivateRoutes from './pages/Auth/PrivateRoutes.jsx'
import Profile from './pages/User/Profile.jsx'
import AdminRoute from './pages/Admin/AdminRoute.jsx'
import GenreList from './pages/Admin/GenreList.jsx'
import CreateMovie from './pages/Admin/CreateMovie.jsx'
import AdminMoviesList from './pages/Admin/AdminMoviesList.jsx'
import UpdateMovie from './pages/Admin/UpdateMovie.jsx'
import AllMovies from './pages/Movies/AllMovies.jsx'
import MovieDetails from './pages/Movies/MovieDetails.jsx'
import AllComments from './pages/Admin/AllComments.jsx'
import AdminDashboard from './pages/Admin/Dashboard/AdminDashboard.jsx'
import ChatApp from './pages/chat/ChatApp'


//Auth


//Restricted


const router=createBrowserRouter(
      createRoutesFromElements(
          <Route path='/' element={<App/>}>
            <Route index={true} path='/' element={<Home/>}/>
            <Route path='/movies' element={<AllMovies/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/movies/:id' element={<MovieDetails/>}/>
            <Route path='/chat' element={<ChatApp/>}/>
          

          <Route path='' element={<PrivateRoutes/>}>
               <Route path='/profile' element={<Profile/>}/>
          </Route>

          <Route path='' element={<AdminRoute/>}>
            <Route path='/admin/movies/genre' element={<GenreList/>}/>
            <Route path='/admin/movies/create' element={<CreateMovie/>}/>
            <Route path='/admin/movies-list' element={<AdminMoviesList/>}/>
            <Route path='/admin/movies/update/:id' element={<UpdateMovie/>}/>
            <Route path='/admin/movies/comments' element={<AllComments/>}/>
              <Route path='/admin/movies/dashboard' element={<AdminDashboard/>}/>
          </Route>
          </Route>
      )
)



createRoot(document.getElementById('root')).render(
    <Provider store={store}>
       <RouterProvider router={router}/>
    </Provider>
)
