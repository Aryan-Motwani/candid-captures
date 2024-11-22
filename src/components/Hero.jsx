import { Link } from "react-router-dom";
import videoBg from '../assets/hero-video.mp4';

export default function Hero() {
  return (
    <section id="hero-section" className="relative" style={{height : "110vh"}}>
        <video
          autoPlay
          muted
          loop
          playsInline  // Important for mobile devices
          id="myVideo"
          className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover -z-[2]"
        >
            <source src={videoBg} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        {/* <div className="bg-black/50 absolute top-0 left-0 right-0 bottom-0 -z-[1]"></div> */}
        <div className="wrapper flex items-center justify-between min-h-screen lg:min-h-[800px] text-white">
            {/* Uncomment and update content as needed */}
            {/* <div className="max-w-[550px] pt-[128px] pb-[64px]">
                <h1>let's capture<br />your beautiful<br />moments</h1>
                <p className="my-6">With unique approach to photography, I take ordinary moments and transform them into extraordinary memories that will last a lifetime.</p>
                <div>
                    <Link to='/portfolio' className="btn">View Portfolio</Link>
                </div>
            </div> */}
        </div>
    </section>
  );
}
