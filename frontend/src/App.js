import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotLoggedIn from "./components/routes/NotLoggedIn";
import {AuthProvider} from "./auth/AuthContext";
import {ToastContainer} from "react-toastify";
import LoginForm from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import RoomSearch from "./pages/RoomSearch";
import AvailableRooms from "./pages/AvailableRooms";
import LoggedIn from "./components/routes/LoggedIn";
import IsAdmin from "./components/routes/IsAdmin";
import AddRoom from "./pages/admin/AddRoom";
import MyProfile from "./pages/MyProfile";
import ReserveRoom from "./pages/ReserveRoom";
import ManageUsers from "./pages/admin/ManageUsers";
import Footer from "./components/Footer";
import ManageRooms from "./pages/admin/ManageRooms";
import ManageReservation from "./pages/admin/ManageReservation";
import Home from "./pages/Home";

function App() {

    let routes = (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route element={<NotLoggedIn/>}>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<Register/>}/>
            </Route>
            <Route path="/searchRoom" element={<RoomSearch/>}/>
            <Route path="/availableRooms" element={<AvailableRooms/>}/>

            <Route element={<LoggedIn/>}>
                <Route path="/reserveRoom" element={<ReserveRoom/>}/>
                <Route path="/myProfile" element={<MyProfile/>}/>
                <Route element={<IsAdmin/>}>
                    <Route path="/addRoom" element={<AddRoom/>}/>
                    <Route path="/manageRooms" element={<ManageRooms/>}/>
                    <Route path="/manageReservation" element={<ManageReservation/>}/>
                    <Route path="/manageUsers" element={<ManageUsers/>}/>
                </Route>
            </Route>
        </Routes>
    )

    return (
        <Router>
            <AuthProvider>
                <ToastContainer position={"top-right"}/>
                <Navbar/>
                <div id={"container"}>
                    {routes}
                </div>
                <Footer/>
            </AuthProvider>
        </Router>
    );
}

export default App;
