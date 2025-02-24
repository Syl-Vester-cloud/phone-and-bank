

import mongoose from 'mongoose'

const appointmentSchema=new mongoose.Schema({
    name: {
        type: String,
        
        trim: true,
      },
      phone: {
        type: String,
       
        trim: true,
      },
      date: {
        type: String, // Use String if storing in "YYYY-MM-DD" format
        
      },
      time: {
        type: String, // Use String if storing in "HH:MM" format
        
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
})
const AppointmentsModel=mongoose.model('Appointments',appointmentSchema)
export default AppointmentsModel