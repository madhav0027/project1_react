import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Navbar from './Components/Navbar';
import Dashboard from './Views/Dashboard';
import Samples from './Views/Samples';
import './App.css'
import About from './Views/About'
import Pack from './Components/Packs'
import ProductDetail from './Components/ProductDeatil';
import Login from './Views/Login'
import Register from './Views/Register';
import { Routes,Route,Navigate,HashRouter } from 'react-router-dom';
import Privateroute from './Components/privateroute';
import Profile from './Views/Profile';
import AuthProvider, { useAuth } from './Components/Authcon';
import { GoogleOAuthProvider } from '@react-oauth/google';
import MusicTrackUploadForm from './Components/uploadtrack';
import MusicPackUploadForm from './Components/uploadpack';
import ErrorPage from './Views/ErrorPage';

const user = useAuth;

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <header className="App-header">
          <Navbar/>
        </header>
        <main className='App-main'>
          <GoogleOAuthProvider clientId='350363248657-rknoitft5u3ugm0mgvmkm96vkrdkg1o7.apps.googleusercontent.com'>
            <Routes>
              <Route path="/" element={<Navigate replace to="/dashboard"/> } />
              <Route path="/login" element={<Login/>}/>
                <Route element={<Privateroute/>}> 
                  <Route path='/profile' element={<Profile/>}/>
                  <Route path='/trackupload' element={<MusicTrackUploadForm/>}/>
                  <Route path='/packupload' element={<MusicPackUploadForm/>}/>
                </Route>
              <Route path="/register" element={<Register/>}/> 
              <Route path="/dashboard" element={<Dashboard/>} />
              <Route path="/errorpage" element={<ErrorPage/>}/>
              <Route path="/detail/:productid" element={<ProductDetail/>}/>
              <Route path="/samples" element={<Samples/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/packs" element={<Pack/>}/>
            </Routes> 
          </GoogleOAuthProvider>
        </main>
        {/* <footer className="about-footer">
                <p>&copy; 2024 Music Production & Samples. All rights reserved.</p>
              </footer> */}
      </AuthProvider>      
    </div>
  );
}

export default App;
