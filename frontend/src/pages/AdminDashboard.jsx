import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

function AdminDashboard() {
  const { user } = useAuth()
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await api.get('/hospitals/')
        setHospitals(response.data)
      } catch (err) {
        setError('Failed to fetch hospitals')
      } finally {
        setLoading(false)
      }
    }

    fetchHospitals()
  }, [])

  const handleApprove = async (hospitalId) => {
    try {
      await api.put(`/hospitals/${hospitalId}/approve`)
      setHospitals(hospitals.map(h => 
        h.id === hospitalId ? { ...h, status: 'APPROVED' } : h
      ))
    } catch (err) {
      setError('Failed to approve hospital')
    }
  }

  if (loading) {
    return <div className="text-center mt-10">Loading hospitals...</div>
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>
  }

  const totalHospitals = hospitals.length
  const approvedHospitals = hospitals.filter(h => h.status === 'APPROVED').length
  const pendingHospitals = hospitals.filter(h => h.status === 'PENDING').length

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Summary Section */}
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-purple-600">{totalHospitals}</h3>
            <p className="text-gray-600">Total Hospitals</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-600">{approvedHospitals}</h3>
            <p className="text-gray-600">Approved</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-yellow-600">{pendingHospitals}</h3>
            <p className="text-gray-600">Pending Approval</p>
          </div>
        </div>
      </div>

      {/* Hospitals List */}
      {hospitals.length === 0 ? (
        <p className="text-gray-600">No hospitals found.</p>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Hospital Management</h2>
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                <div>
                  <h3 className="font-semibold text-lg">{hospital.name}</h3>
                  <p className="text-gray-600">{hospital.city}</p>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    hospital.status === 'APPROVED' 
                      ? 'bg-green-100 text-green-800'
                      : hospital.status === 'PENDING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {hospital.status}
                  </span>
                </div>
                <div>
                  {hospital.status === 'PENDING' && (
                    <button
                      onClick={() => handleApprove(hospital.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
                    >
                      Approve
                    </button>
                  )}
                  {hospital.status === 'APPROVED' && (
                    <span className="text-green-600 font-medium">Approved</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
