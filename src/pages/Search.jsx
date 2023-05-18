import React, { Fragment, useEffect, useState } from "react";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";

const Search = () => {
  const params = useParams(); // Retrieve the search term from URL parameters
  const searchTerms = params.searchName.toLowerCase().split(" ");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListings = async () => {
  try {
    const listingsRef = collection(db, "listings");
    const querySnap = await getDocs(listingsRef);
    const listingsData = querySnap.docs.map((doc) => {
      const data = doc.data();
      return { id: doc.id, ...data }; // Include the document id in the listing data
    });
    const filteredListings = listingsData.filter((listing) =>
      searchTerms.some((term) => listing.name.toLowerCase().includes(term))
    );
    setListings(filteredListings);
    setLoading(false);
  } catch (error) {
    console.log(error);
    toast.error("Error fetching search results");
  }
};


    fetchListings();
  }, [searchTerms]);

    useEffect(() => {
      if (!loading && listing.length > 0) {
        toast.success("Results fetched successfully");
      }
     else {

       toast.error("Could not fetch any data");

}
    }, [loading]);

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">Search Items</h1>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <Fragment>
          <main className="">
            <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing}
                />
              ))}
            </ul>
          </main>
        </Fragment>
      ) : (
        <p className="text-center">Could not find Search Item.</p>
      )}
    </div>
  );
};

export default Search;
