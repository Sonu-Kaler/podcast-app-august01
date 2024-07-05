import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './PodcastApp/Pages/Home';
import Podcasts from './PodcastApp/Pages/Podcasts';
import CreatePodcast from './PodcastApp/Pages/CreatePodcast';
import Profile from './PodcastApp/Pages/Profile';
import Navbar from './PodcastApp/Pages/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser } from './Redux/userSlice';
import Private from './PodcastApp/Pages/Private';
import PodcastDetails from './PodcastApp/Components/Podcast/PodcastDetails';
import CreateEpisode from './PodcastApp/Components/Episode/CreateEpisode';
import PodcastStyle from "./PodcastApp/PodcastStyle.css";
function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubAuth = onAuthStateChanged(auth,(user)=>{
      if(user){
        const unsubSnap = onSnapshot(
          doc(db,"Users",user.uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData = userDoc.data();
              dispatch(setUser({
                name:userData.name,
                email:userData.email,
                uid:userData.uid
              }))
            }
          },
          (error)=>{
            console.log("Error",error);
          }
        )
        return()=>{unsubSnap()};
      }
    })
    return()=>{unsubAuth()};
  },[])
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Private />}>
          <Route path="/podcasts" element={<Podcasts />} />
          <Route path="/createPodcast" element={<CreatePodcast />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/podcast/:id" element={<PodcastDetails/>}/>
          <Route path="/podcast/:id/createEpisode" element={<CreateEpisode />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}
export default App;
