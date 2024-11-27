import React, { useEffect, useState } from "react";
import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const Calendar = () => {
  const [dates, setDates] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [payByJob, setPayByJob] = useState({});
  const [selectedJob, setSelectedJob] = useState("Delta Hotels");
  const [calculatedPay, setCalculatedPay] = useState(0);

  function getLastThursday(date = new Date()) {
    const currentDate = new Date(date);
    const dayOfWeek = currentDate.getDay();
    const offset = (dayOfWeek + 2) % 7;
    currentDate.setDate(currentDate.getDate() - offset);
    return currentDate.toISOString().split("T")[0];
  }

  function getTwoWeekEarlyDate(thurDate = getLastThursday()) {
    const twoWeekEarlyDate = new Date(thurDate);
    twoWeekEarlyDate.setDate(twoWeekEarlyDate.getDate() - 13);
    return twoWeekEarlyDate.toISOString().split("T")[0];
  }

  const getThisWeekPay = async (startDate = getTwoWeekEarlyDate(), endDate = getLastThursday()) => {
    try {
      if (!selectedJob) {
        alert("Please select a job before calculating pay.");
        return 0;
      }

      let totalHours = 0;
      const res = await axios.get(`${API_BASE_URL}/api/budget/getshift`, {
        params: { job: selectedJob, startDate, endDate },
      });

      const shiftsArr = res.data.shifts;
      if (!shiftsArr || shiftsArr.length === 0) {
        alert("No shifts found for the selected job and date range.");
        return 0;
      }

      for (const shift of shiftsArr) {
        totalHours += shift.hours;
      }
      return totalHours;
    } catch (error) {
      console.error("Error fetching pay:", error);
      alert("An error occurred while calculating pay. Please try again later.");
      return 0;
    }
  };

  const calcPayByJob = async () => {
    try {
      const hourlyRate = selectedJob === "Delta Hotels" ? 18 : 16;
      const hours = await getThisWeekPay();

      if (hours === 0) {
        alert("Unable to calculate pay due to missing or invalid shift data.");
        return;
      }

      setCalculatedPay(hours * hourlyRate);
    } catch (error) {
      console.error("Error calculating pay:", error);
      alert("An error occurred while calculating pay. Please try again later.");
    }
  };

  useEffect(() => {
    const generatePastDates = () => {
      const today = new Date();
      const pastThreeWeeks = [];
      for (let i = 0; i < 21; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        date.setHours(0, 0, 0, 0);
        pastThreeWeeks.unshift(date);
      }
      return pastThreeWeeks;
    };

    setDates(generatePastDates());
  }, []);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const startDate = dates[0]?.toISOString().split("T")[0];
        const endDate = dates[dates.length - 1]?.toISOString().split("T")[0];

        if (startDate && endDate) {
          const response = await axios.get(`${API_BASE_URL}/api/budget/getshift`, {
            params: { startDate, endDate },
          });
          const { shifts, payByJob } = response.data;

          if (!shifts || shifts.length === 0) {
            alert("No shifts found in the database for the past 3 weeks.");
          }

          setShifts(shifts);
          setPayByJob(payByJob);
        }
      } catch (error) {
        console.error("Error fetching shifts:", error);
        alert("An error occurred while fetching shift data. Please try again later.");
      }
    };

    fetchShifts();
  }, [dates]);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Past 3 Weeks Shift Calendar</h1>

      {/* Pay Calculator */}
      <div className="mb-6 text-lg font-semibold text-center">
        <p className="mb-4">Select a job to calculate this weeks pay:</p>
        <div className="flex justify-center mb-4">
          <label className="mr-4">
            <input
              type="radio"
              name="job"
              value="Delta Hotels"
              checked={selectedJob === "Delta Hotels"}
              onChange={(e) => setSelectedJob(e.target.value)}
            />
            Delta Hotels
          </label>
          <label>
            <input
              type="radio"
              name="job"
              value="Best Buy"
              checked={selectedJob === "Best Buy"}
              onChange={(e) => setSelectedJob(e.target.value)}
            />
            Best Buy
          </label>
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={calcPayByJob}
        >
          Calculate
        </button>
        {calculatedPay > 0 && (
          <p className="mt-4 text-green-700 font-bold">
            This weeks pay for {selectedJob}: ${calculatedPay.toFixed(2)}
          </p>
        )}
      </div>

      {/* Calendar Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {dates.map((date) => {
          const formattedDate = date.toISOString().split("T")[0];
          const shiftsForDate = shifts.filter(
            (shift) => new Date(shift.date).toISOString().split("T")[0] === formattedDate
          );

          return (
            <div
              key={formattedDate}
              className={`p-2 sm:p-4 border rounded-lg ${
                shiftsForDate.length ? "bg-blue-100 border-blue-500" : "bg-white"
              }`}
            >
              <p className="font-bold text-sm sm:text-base text-gray-700">
                {date.toLocaleDateString("en-US", { weekday: "short" })}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                {date.toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                })}
              </p>
              {shiftsForDate.map((shift) => (
                <div key={shift._id} className="mt-2">
                  <p className="text-blue-700 font-medium text-xs sm:text-sm">{shift.job}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{shift.hours} hrs</p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
