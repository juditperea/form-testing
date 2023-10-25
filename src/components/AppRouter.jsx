import { Route, Routes } from "react-router-dom"
import Contact from "./Contact"
import FormApp from "./FormApp"
const AppRouter = () =>{
    return(
        <Routes>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/" element={<FormApp/>}/>
        </Routes>
    )
}
export default AppRouter