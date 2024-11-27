import React, { useContext, useState } from 'react'
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
function Form() {
        const [done, setDone] = useState("") 
    const postShift = async (job , date, hours) => {
        try {
            const reqbody = {
                job,
                date,
                hours
            };
            const response = await axios.post("https://backend-hewl.onrender.com/api/budget/postshift", reqbody);
            console.log(response.data); 
            setDone("Submitted", response);  // Update the state to show that the data has been submitted
            // This will print the data received from the server
    
        }catch (error) {console.error("Error getting res from server", error.message);}
      }

    
    const [job, setJob] = useState("");
    const [date, setDate] = useState("");
    const [hours, setHours] = useState("");
    
    const handleSubmit = (e) => {
        e.preventDefault();
        postShift(job, date, hours);
        setJob("");
        setDate("");
        setHours("");
  
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Shift Entry Form
        </h2>
        {done && (
        <p className="mt-4 text-green-600 font-medium">
          Shift submitted successfully!
        </p>
      )}
        {/* Job Selection */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Select Job:
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="Delta Hotels"
                name="job"
                checked={job === "Delta Hotels"}
                onChange={(e) => setJob(e.target.value)}
                className="form-radio text-blue-500"
              />
              <span className="ml-2 text-gray-700">Delta Hotels</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="Best Buy"
                name="job"
                checked={job === "Best Buy"}
                onChange={(e) => setJob(e.target.value)}
                className="form-radio text-blue-500"
              />
              <span className="ml-2 text-gray-700">Best Buy</span>
            </label>
          </div>
        </div>

        {/* Hours Worked */}
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">
            Hours Worked:
          </label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            min="0"
            placeholder="Enter hours worked"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Date Selector */}
        <div className="mb-6">
          <label className="block text-gray-600 font-medium mb-2">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Submit Shift
        </button>
      </form>
    </div>
  )
}

export default Form