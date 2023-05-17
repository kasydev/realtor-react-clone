import React,{useState, useEffect} from 'react';
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import Spinner from "../components/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from "react-router-dom";
import SwiperCore, {
    EffectFade, Autoplay, Navigation, Pagination
} from 'swiper';

import "swiper/css/bundle";
import { FiSearch } from 'react-icons/fi';

const Slider = () => {


    const navigate = useNavigate();

     const [listings, setListings] = useState(null);
     const [loading, setLoading] = useState(true);
     const [ searchItem, setSearchItem ] = useState("");

     SwiperCore.use([Autoplay, Navigation, Pagination]);

     useEffect(() => {
       const fetchListings = async () => {
         const listingsRef = collection(db, "listings");
         const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
         const querySnap = await getDocs(q);
         let listings = [];
         querySnap.forEach((doc) => {
           return listings.push({
             id: doc.id,
             data: doc.data(),
           });
         });
         setListings(listings);
         setLoading(false);
       };

       fetchListings();
     }, []);

     if (loading) {
       return <Spinner />;
     }

     if (listings.length === 0) {
       return <></>;
     }

     const onChange = (e)=>{
      setSearchItem(e.target.value);
       

     };

     const onClick = async () => {
      setLoading(true);
      navigate(`/search/${searchItem}`);
         
     };






     
    return (
      listings && (
        <>
          <Swiper
            slidesPerView={1}
            navigation
            pagination={{ type: "progressbar" }}
            effect="fade"
            modules={[EffectFade]}
            autoplay={{ delay: 3000 }}
          >
            {listings.map(({ data, id }) => {
              return (
                <SwiperSlide
                  key={id}
                  onClick={() => navigate(`/category/${data.type}/${id}`)}
                >
                  <div
                    style={{
                      background: `url(${data.imgUrls[0]}) center, no-repeat`,
                      backgroundSize: "cover",
                    }}
                    className="relative w-full h-[300px] overflow-hidden"
                  ></div>

                  <p className="text-[#f1faee] absolute left-1 top-3 font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90 p-2 rounded-br-3xl transition duration-150 ease-in-out hover:bg-blue-800">
                    {data.name}
                  </p>

                  <p className="text-[#f1faee] absolute left-1 bottom-1 font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90 p-2 rounded-tr-3xl transition duration-150 ease-in-out hover:bg-red-800">
                    $
                    {data.discountedPrice ??
                      data.regularPrice
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    {data.type === "rent" && "/month"}
                  </p>
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="relative text-center ">
            <input
              className="w-[80%] text-sm  rounded shadow-lg transition duration-150 ease-in-out border border-gray-200 text-center mt-2.5 "
              value={searchItem}
              onChange={onChange}
              type="text"
              placeholder="Search by name"
            />
            <FiSearch
              onClick={onClick}
              className="cursor-pointer transition duration-150 ease-in-out text-red-700 absolute top-6 right-14 sm:right-40  md:right-40 lg:right-40 xl:right-40"
            />
            
          </div>
    
          
        </>
        
      )
      
    );
}
 
export default Slider;