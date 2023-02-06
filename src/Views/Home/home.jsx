import Gallery from "../../Components/gallery/gallery"
import Newproduct from "../../Components/newproduct/newproduct"
import PopularItems from "../../Components/popularItems/popularItems"
import ShopMethod from "../../Components/shopMethod/shopMethod"
import WatchChoice from "../../Components/watchChoice/watchChoice"
import Footer from "../../Layouts/Footer/footer"
import Navbar from "../../Layouts/Navbar/navbar"

export default()=>{
    return(
        <>
        <Navbar/>
        <Newproduct/>
        <Gallery/>
        <PopularItems/>
        <WatchChoice/>
        <ShopMethod/>
        <Footer/>
        </>
    )
}