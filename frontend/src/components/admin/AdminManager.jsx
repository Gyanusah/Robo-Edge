import React, { useState, useEffect } from 'react'
import { authApi } from '../../services/apiService'

export default function AdminManager() {
  const [admins, setAdmins] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form state
  const [newAdmin, setNewAdmin] = useState({
    email: '',
    password: '',
    name: '',
    role: 'admin'
  })

  useEffect(() => {
    fetchCurrentUser()
    fetchAdmins()
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const response = await authApi.getMe()
      setCurrentUser(response.data)
    } catch (error) {
      console.error('Error fetching current user:', error)
    }
  }

  const fetchAdmins = async () => {
    try {
      setLoading(true)
      const response = await authApi.getAllAdmins()
      setAdmins(response.data)
    } catch (error) {
      console.error('Error fetching admins:', error)
      setError('Failed to fetch admins')
    } finally {
      setLoading(false)
    }
  }

  const handleCreateAdmin = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!newAdmin.email || !newAdmin.password || !newAdmin.name) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      const response = await authApi.createAdmin(newAdmin)
      setSuccess(response.data.message)
      setNewAdmin({ email: '', password: '', name: '', role: 'admin' })
      setShowCreateForm(false)
      fetchAdmins() // Refresh admin list
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create admin')
    } finally {
      setLoading(false)
    }
  }

  const canCreateAdmin = currentUser?.role === 'super_admin'

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Management</h2>
          {canCreateAdmin && (
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showCreateForm ? 'Cancel' : 'Create Admin'}
            </button>
          )}
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
            {success}
          </div>
        )}

        {/* Create Admin Form */}
        {showCreateForm && canCreateAdmin && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Create New Admin</h3>
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                    minLength="6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={newAdmin.role}
                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="admin">Admin</option>
                    {currentUser?.role === 'super_admin' && (
                      <option value="super_admin">Super Admin</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Admin'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Admins List */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 border-b font-semibold text-gray-700">Name</th>
                <th className="text-left p-3 border-b font-semibold text-gray-700">Email</th>
                <th className="text-left p-3 border-b font-semibold text-gray-700">Role</th>
                <th className="text-left p-3 border-b font-semibold text-gray-700">Created</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center p-6">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center p-6 text-gray-500">
                    No admins found
                  </td>
                </tr>
              ) : (
                admins.map((admin) => (
                  <tr key={admin._id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{admin.name}</td>
                    <td className="p-3 border-b">{admin.email}</td>
                    <td className="p-3 border-b">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        admin.role === 'super_admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {admin.role === 'super_admin' ? 'Super Admin' : 'Admin'}
                      </span>
                    </td>
                    <td className="p-3 border-b">
                      {new Date(admin.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Permissions Notice */}
        {!canCreateAdmin && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-yellow-800 text-sm">
              <strong>Note:</strong> Only Super Admins can create new admins. Contact your Super Admin for admin management.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
