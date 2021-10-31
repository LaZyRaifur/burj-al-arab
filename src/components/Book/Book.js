import React, { Fragment, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../../App";

// import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import TimePicker from '@mui/lab/TimePicker';
// import DateTimePicker from '@mui/lab/DateTimePicker';
// import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
// import MobileDatePicker from '@mui/lab/MobileDatePicker';


// import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import Bookings from "../Bookings/Bookings";

const Book = () => {
  const { bedType } = useParams();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  
   
  const [selectedDate, setSelectedDate] = useState({
    checkIn: new Date(),
    checkOut: new Date()

  });

  const handleCheckInDate = (date) =>{
    const newDates = {...selectedDate}
    newDates.checkIn = date;
    setSelectedDate(newDates);
  }

  const handleCheckOutDate = (date) =>{
    const newDates = {...selectedDate}
    newDates.checkOut = date;
    setSelectedDate(newDates);
  }


  const handleBooking = () =>{
    const newBooking = {...loggedInUser, ...selectedDate};
    fetch('http://localhost:5000/addBooking',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newBooking)
    })
    .then(res => res.json())
    .then(data =>{
      console.log(data);
    })
  }
  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
      {/* <DateTimePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id="date-picker-inline"
        label="check In DateTimePicker"
        inputVariant="outlined"
        value={selectedDate.checkIn}
        onChange={handleCheckInDate}
        
      /> */}

      <DateTimePicker
         id="date-picker-inline"
         format="dd/MM/yyyy"

        autoOk
        ampm={false}
        inputVariant="outlined"
        disableFuture
        value={selectedDate.checkIn}
        onChange={handleCheckInDate}
        label="check In DateTimePicker"
      />

      <DateTimePicker
      id="date-picker-dialog"
      margin="normal"
      format="dd/MM/yyyy"
        value={selectedDate.checkOut}
        disablePast
        onChange={handleCheckOutDate}
        label="check Out Date"
        showTodayButton
      />

<Button onClick={handleBooking} variant="contained" color="success">
  Book Now
</Button>
    </MuiPickersUtilsProvider>
    <Bookings></Bookings>
    </div>
   
  );
};

export default Book;
