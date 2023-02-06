import ShopMethod from "../../Components/shopMethod/shopMethod"
import Footer from "../../Layouts/Footer/footer"
import Navbar from "../../Layouts/Navbar/navbar"


export default()=>{
    return(
        <>
        <Navbar/>
        <div className="slider-area ">
        <div className="single-slider slider-height2 d-flex align-items-center">
            <div className="container">
            <div className="row">
                <div className="col-xl-12">
                <div className="hero-cap text-center">
                    <h2>About Us</h2>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>

        <div className="about-details section-padding30">
            <div className="container">
                <div className="row">
                <div className="offset-xl-1 col-lg-8">
                    <div className="about-details-cap mb-50">
                    <h4>Our Mission</h4>
                    <p>Consectetur adipiscing elit, sued do eiusmod tempor ididunt udfgt labore et dolore magna aliqua. Quis ipsum suspendisces gravida. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus.
                    </p>
                    <p> Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan.</p>
                    </div>
                    <div className="about-details-cap mb-50">
                    <h4>Our Vision</h4>
                    <p>Consectetur adipiscing elit, sued do eiusmod tempor ididunt udfgt labore et dolore magna aliqua. Quis ipsum suspendisces gravida. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus.
                    </p>
                    <p> Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan lacus. Risus commodo viverra sebfd dho eiusmod tempor maecenas accumsan.</p>
                    </div>
                </div>
                </div>
            </div>
            </div>

        <ShopMethod/>
        <Footer/>
        </>
    )
}