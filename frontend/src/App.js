import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import NotLoggedIn from "./components/routes/NotLoggedIn";
import {AuthProvider} from "./auth/AuthContext";
import {ToastContainer} from "react-toastify";
import LoginForm from "./pages/Login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import RoomSearch from "./pages/RoomSearch";
import AvaiableRooms from "./pages/AvaiableRooms";

function App() {

    let routes = (
        <Routes>
            <Route path="/"/>
            <Route element={<NotLoggedIn/>}>
                <Route path="/login" element={<LoginForm/>}/>
                <Route path="/register" element={<Register/>}/>
            </Route>
            <Route path="/searchRoom" element={<RoomSearch/>}/>
            <Route path="/availableRooms" element={<AvaiableRooms/>}/>
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
            </AuthProvider>
        </Router>
    );
}

export default App;
