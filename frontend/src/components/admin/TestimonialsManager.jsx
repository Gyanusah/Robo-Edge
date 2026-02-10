// import { useState, useEffect } from 'react'
// import { testimonialsApi } from '@/services/apiService'

// export default function TestimonialsManager() {
//   const [testimonials, setTestimonials] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [name, setName] = useState('')
//   const [company, setCompany] = useState('')
//   const [text, setText] = useState('')
//   const [rating, setRating] = useState(5)
//   const [editingId, setEditingId] = useState(null)

//   useEffect(() => {
//     fetchTestimonials()
//   }, [])

//   const fetchTestimonials = async () => {
//     try {
//       const response = await testimonialsApi.getTestimonials()
//       setTestimonials(response.data)
//     } catch (error) {
//       console.error('Error fetching testimonials:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!name || !text) {
//       alert('Please fill all fields')
//       return
//     }

//     try {
//       if (editingId) {
//         await testimonialsApi.updateTestimonial(editingId, {
//           name,
//           company,
//           text,
//           rating: parseInt(rating)
//         })
//         setEditingId(null)
//       } else {
//         await testimonialsApi.createTestimonial({
//           name,
//           company,
//           text,
//           rating: parseInt(rating)
//         })
//       }
//       setName('')
//       setCompany('')
//       setText('')
//       setRating(5)
//       fetchTestimonials()
//     } catch (error) {
//       console.error('Error saving testimonial:', error)
//       alert('Failed to save testimonial')
//     }
//   }

//   const handleDelete = async (id) => {
//     if (!confirm('Are you sure?')) return

//     try {
//       await testimonialsApi.deleteTestimonial(id)
//       fetchTestimonials()
//     } catch (error) {
//       console.error('Error deleting testimonial:', error)
//       alert('Failed to delete testimonial')
//     }
//   }

//   const handleEdit = (testimonial) => {
//     setEditingId(testimonial._id)
//     setName(testimonial.name)
//     setCompany(testimonial.company)
//     setText(testimonial.text)
//     setRating(testimonial.rating || 5)
//   }

//   if (loading) return <p>Loading...</p>

//   return (
//     <div className="space-y-8">
//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-semibold mb-2">Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//             placeholder="Client name"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold mb-2">Company</label>
//           <input
//             type="text"
//             value={company}
//             onChange={(e) => setCompany(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//             placeholder="Company name"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold mb-2">Testimonial</label>
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             rows="4"
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//             placeholder="What they said..."
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-semibold mb-2">Rating</label>
//           <select
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
//           >
//             {[1, 2, 3, 4, 5].map((r) => (
//               <option key={r} value={r}>
//                 {r} Star{'s' || ''}
//               </option>
//             ))}
//           </select>
//         </div>
//         <button type="submit" className="btn-primary">
//           {editingId ? 'Update Testimonial' : 'Create Testimonial'}
//         </button>
//         {editingId && (
//           <button
//             type="button"
//             onClick={() => {
//               setEditingId(null)
//               setName('')
//               setCompany('')
//               setText('')
//               setRating(5)
//             }}
//             className="ml-2 text-gray-600 hover:text-gray-900"
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       {/* Testimonials List */}
//       <div>
//         <h3 className="text-xl font-semibold mb-4">Existing Testimonials</h3>
//         {testimonials.length > 0 ? (
//           <div className="space-y-4">
//             {testimonials.map((testimonial) => (
//               <div key={testimonial._id} className="bg-gray-50 p-6 rounded-lg border">
//                 <h4 className="font-semibold mb-1">{testimonial.name}</h4>
//                 <p className="text-sm text-gray-600 mb-2">{testimonial.company}</p>
//                 <div className="flex gap-1 mb-3">
//                   {[...Array(testimonial.rating || 5)].map((_, i) => (
//                     <span key={i} className="text-yellow-400">★</span>
//                   ))}
//                 </div>
//                 <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => handleEdit(testimonial)}
//                     className="px-4 py-2 bg-secondary text-white rounded hover:bg-blue-700"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(testimonial._id)}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600">No testimonials yet</p>
//         )}
//       </div>
//     </div>
//   )
// }


import { useState, useEffect } from 'react'
import { testimonialsApi } from '@/services/apiService'

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([])
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [text, setText] = useState('')
  const [rating, setRating] = useState(5)
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const response = await testimonialsApi.getTestimonials()
      setTestimonials(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !text) return alert('Name and testimonial are required')

    try {
      editingId
        ? await testimonialsApi.updateTestimonial(editingId, {
            name,
            company,
            text,
            rating: Number(rating)
          })
        : await testimonialsApi.createTestimonial({
            name,
            company,
            text,
            rating: Number(rating)
          })

      setName('')
      setCompany('')
      setText('')
      setRating(5)
      setEditingId(null)
      fetchTestimonials()
    } catch {
      alert('Failed to save testimonial')
    }
  }

  const handleEdit = (t) => {
    setEditingId(t._id)
    setName(t.name)
    setCompany(t.company)
    setText(t.text)
    setRating(t.rating || 5)
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return
    await testimonialsApi.deleteTestimonial(id)
    fetchTestimonials()
  }

  if (loading) {
    return <div className="text-center py-16 text-gray-500">Loading testimonials...</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-12">

      {/* ===== FORM ===== */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border rounded-2xl shadow-md p-8 space-y-6"
      >
        <h2 className="text-2xl font-semibold text-gray-800">
          {editingId ? 'Edit Testimonial' : 'Create Testimonial'}
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Client Name *
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full
  rounded-xl
  border border-gray-200
  bg-gray-50
  px-4 py-3
  text-gray-900
  placeholder-gray-400
  shadow-sm
  focus:border-blue-500
  focus:bg-white
  focus:ring-4 focus:ring-blue-500/10
  focus:outline-none
  transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company
            </label>
            <input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company name"
              className="w-full
  rounded-xl
  border border-gray-200
  bg-gray-50
  px-4 py-3
  text-gray-900
  placeholder-gray-400
  shadow-sm
  focus:border-blue-500
  focus:bg-white
  focus:ring-4 focus:ring-blue-500/10
  focus:outline-none
  transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Testimonial *
          </label>
          <textarea
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What the client says..."
            className="w-full
  rounded-xl
  border border-gray-200
  bg-gray-50
  px-4 py-3
  text-gray-900
  placeholder-gray-400
  shadow-sm
  focus:border-blue-500
  focus:bg-white
  focus:ring-4 focus:ring-blue-500/10
  focus:outline-none
  transition"
            required
          />
        </div>

        <div className="max-w-xs">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rating
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full rounded-lg border-gray-300 px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && 's'}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition"
          >
            {editingId ? 'Update Testimonial' : 'Add Testimonial'}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null)
                setName('')
                setCompany('')
                setText('')
                setRating(5)
              }}
              className="rounded-lg bg-gray-300 px-6 py-3 hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* ===== LIST ===== */}
      <div>
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Existing Testimonials ({testimonials.length})
        </h3>

        {testimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <div
                key={t._id}
                className="bg-white border rounded-2xl shadow-sm p-6 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {t.name}
                  </h4>
                  {t.company && (
                    <p className="text-sm text-gray-500 mb-2">
                      {t.company}
                    </p>
                  )}

                  <div className="flex gap-1 text-yellow-400 mb-3">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>

                  <p className="text-gray-700 italic mb-6">
                    “{t.text}”
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(t)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 bg-gray-50 p-6 rounded-xl">
            No testimonials added yet.
          </p>
        )}
      </div>
    </div>
  )
}
