import "./imagebox.css"
import { useState } from "react";
import { useEffect } from "react";
export default function ImageBox() {
    const array = [
        "https://cdn.pixabay.com/photo/2016/07/28/16/50/car-engine-1548434_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/19/12/32/drill-1839030_1280.jpg",
        "https://cdn.pixabay.com/photo/2016/11/18/23/04/cleaning-1837331_1280.jpg",
        "https://cdn.pixabay.com/photo/2017/08/10/06/58/wrench-2619217_1280.jpg",
        "https://cdn.pixabay.com/photo/2014/06/04/16/36/man-362150_1280.jpg"
    ];
    const content = [
        <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-6xl font-extrabold text-white-800 mb-4">Revitalize Your Ride, Reimagine Performance.</h1>
                    <p className="text-white-600">"Where precision meets passion, your vehicle's best care begins."</p>
                </div>,
                <div className="max-w-2xl mx-auto text-center">
                <h1 className="text-6xl font-extrabold text-white-800 mb-4">Navigate Your Journey with Confidence</h1>
                <p className="text-white-600">"Unleash the full potential of your vehicle with our expert servicing."</p>
            </div>,
            <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-6xl font-extrabold text-white-800 mb-4">Driving Excellence, Servicing Perfection.</h1>
            <p className="text-white-600">"More than just a service, it's a commitment to excellence in every detail."</p>
        </div>,
        <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-6xl font-extrabold text-white-800 mb-4">Beyond Maintenance, Towards Superior Performance</h1>
        <p className="text-white-600">"Empowering Your Journey: Where Precision Meets Performance in Every Service Mile."</p>
    </div>,
    <div className="max-w-2xl mx-auto text-center">
    <h1 className="text-6xl font-extrabold text-white-800 mb-4">Gear Up for Reliability, Drive Into Confidence.</h1>
    <p className="text-white-600">"Where quality servicing meets your vehicle's need for reliability and durability."</p>
</div>
    ];
    
    const [index ,setIndex] = useState(0);
    // function changeIndex() {
    //     setInterval(() => {
    //       if(index < 3){
    //         setIndex((data)=>data + 1);
    //       }
    //       else{
    //         setIndex(0);
    //       }
          
    //     }, 5000); // Interval of 1000 milliseconds (1 second)
    //   }
      
    //   // Call the function to start the interval
    //   useEffect(changeIndex,[index]);
    useEffect(() => {
        const intervalId = setInterval(() => {
          setIndex((prev) => (prev === array.length - 1 ? 0 : prev + 1));
        }, 3000); // Change image every 2 seconds
    
        return () => clearInterval(intervalId); // Cleanup the interval on component unmount
      }, [array.length]);
 
    return (
        <>
        <div className="box">
            {/* <div className="left" onClick={()=>{
                if(index > 0 ){
                    setIndex((index)=>index -1)
                }
            }}>
                <span class="material-symbols-outlined">
                    arrow_back_ios
                </span>
            </div> */}
            <div className="center text-3xl font-bold" style={{backgroundImage:`url(${array[index]})`}}>
               {content[index]}
            </div>
            {/* <div className="right" onClick={()=>{
                if(index < 4){
                    setIndex((index)=>index +1)
                }
            }}>
                <span class="material-symbols-outlined" >
                    arrow_forward_ios
                </span>
            </div> */}
            
         </div>

        </>
    );
}
