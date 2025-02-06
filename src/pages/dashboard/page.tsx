import { ChangeEvent, useEffect, useState } from "react";

import { Data } from "../../types";
import BarChart from "./components/chart";
import DataTable from "./components/data-table";
import "./styles/style.scss";

const Dashboard = () => {
   // State to store the fetched data and the currently selected index
   const [data, setData] = useState<Data>([]);
   const [index, setIndex] = useState<number>(0);

   /**
    * Fetches data asynchronously from a local JSON file and updates the state.
    * Logs an error if fetching fails.
    */
   const fetchData = async () => {
      try {
         const response = await fetch("/data.json"); // Fetch the data from the server
         const fetchedData = await response.json(); // Parse the JSON response
         setData(fetchedData); // Update the state with the fetched data
      } catch (error) {
         console.error("[dashboard][page]:", "Error fetching data:", error); // Log error if data fetching fails
      }
   };

   /**
    * Updates the document title based on the currently selected data item.
    * Runs whenever the `index` or `data` changes.
    */
   useEffect(() => {
      if (!data.length) return; // Ensure data is available before setting the document title
      document.title = data[index].title; // Update the page title with the selected item's title
   }, [index, data]);

   /**
    * Fetches the data when the page is rendered.
    * This runs only once when the component mounts.
    */
   useEffect(() => {
      fetchData();
   }, []); // Empty dependency array ensures this runs only once on mount

   // Show loading state if the data is still being fetched
   if (!data.length) return <p>Loading...</p>;

   // Get the current item based on the selected index
   const item = data[index];

   return (
      <div className="dashboard">
         <h1>{item.title}</h1>
         <div className="content">
            {/* DataTable component displaying the current data item */}
            <div className="table">
               <DataTable data={item} />
            </div>
            {/* BarChart component displaying the attributes of the current data item */}
            <div className="chart">
               <BarChart data={item.attributes} />
            </div>
         </div>
         {/* Range input to allow the user to select a different item */}
         <input
            type="range"
            min="0"
            max={data.length - 1}
            value={index}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
               setIndex(Number(e.target.value)) // Update the selected index when the range value changes
            }
         />
      </div>
   );
};

export default Dashboard;
