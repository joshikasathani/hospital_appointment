import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function HospitalDashboard() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get(`/appointments/hospital/${user.id}`)
        setAppointments(response.data)
      } catch (err) {
        setError('Failed to fetch appointments')
      } finally {
        setLoading(false)
      }
    }

    if (user?.id) {
      fetchAppointments()
    }
  }, [user])

  if (loading) {
    return <div className="text-center mt-10">Loading appointments...</div>
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hospital Dashboard</h1>
      
      {/* Summary Section */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-600">{appointments.length}</h3>
            <p className="text-gray-600">Total Appointments</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">
              {appointments.filter(a => a.status === 'confirmed').length}
            </h3>
            <p className="text-gray-600">Confirmed</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-600">
              {appointments.filter(a => a.status === 'pending').length}
            </h3>
            <p className="text-gray-600">Pending</p>
          </div>
        </div>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
          {appointments.map((appointment) => (
            <div key={appointment.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-lg">Patient</h3>
                  <p className="text-gray-600">{appointment.patient_name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Service</h3>
                  <p className="text-gray-600">{appointment.service}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Date</h3>
                  <p className="text-gray-600">
                    {new Date(appointment.appointment_date).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Status</h3>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    appointment.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : appointment.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default HospitalDashboard
