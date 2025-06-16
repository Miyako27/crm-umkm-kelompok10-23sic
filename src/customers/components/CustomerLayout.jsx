import { Outlet } from "react-router-dom";
// import Header from "../../components/Header";
import Footer from "./Footer";
import Header from "./Header";

export default function CustomerLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header/>

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}
