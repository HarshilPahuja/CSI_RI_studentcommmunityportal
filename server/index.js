// ================================
// 1. IMPORT REQUIRED PACKAGES
// ================================
const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')

// ================================
// 2. CREATE EXPRESS APP
// ================================
const app = express()
app.use(cors())
app.use(express.json())

// ================================
// 3. CONNECT TO SUPABASE
// ================================
const supabase = createClient(
  'https://upsiksvlrouphiceacxh.supabase.co',
  'sb_publishable_hngIxGttk8KPnnJ2u1OjWA_gH4MKhUg'
)

// ================================
// 4. BASIC TEST ROUTE
// ================================
app.get('/', (req, res) => {
  res.send('Backend is running')
})

// ================================
// 5. CLUBS API
// ================================
app.get('/clubs', async (req, res) => {
  const { category } = req.query

  let query = supabase.from('Clubs').select('*')

  if (category && category !== 'all') {
    query = query.eq('club_category', category)
  }

  const { data, error } = await query

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.json(data)
})

// ================================
// 6. SIGNUP API
// ================================
app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  const { data, error } = await supabase
    .from('Users')
    .insert([{ username, password }])
    .select('id')

  if (error) {
    console.log(error)
    return res.json({
      success: false,
      message: error.message
    })
  }

  res.json({
    success: true,
    userId: data[0].id
  })
})

// ================================
// 7. LOGIN API
// ================================
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabase
    .from('Users')   // FIXED
    .select('id')
    .eq('username', email)
    .eq('password', password)

  if (error || data.length === 0) {
    return res.json({ success: false })
  }

  res.json({
    success: true,
    userId: data[0].id
  })
})

// ================================
// 8. ADMIN LOGIN
// ================================
app.post('/admin', async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabase
    .from('Admins')
    .select('id, club_name')
    .eq('username', email)
    .eq('password', password)

  if (error || data.length === 0) {
    return res.json({ success: false })
  }

  res.json({
    success: true,
    userId: data[0].id,
    club_name: data[0].club_name
  })
})

// ================================
// 9. FOLLOW CLUB
// ================================
app.post('/follow', async (req, res) => {
  const { id, club_name } = req.body

  const { error } = await supabase
    .from('Follow')   // FIXED
    .insert([{ user_id: id, club_name }])

  if (error) {
    return res.json({ success: false })
  }

  res.json({ success: true })
})

// ================================
// 10. FOLLOWED CLUBS
// ================================
app.post('/followedclubs', async (req, res) => {
  const { id } = req.body

  const { data, error } = await supabase
    .from('Follow')
    .select('club_name')
    .eq('user_id', id)

  if (error) {
    return res.json({ clubs: [] })
  }

  const clubs = data.map(item => item.club_name)
  res.json({ clubs })
})

// ================================
// 11. CLUB DETAILS
// ================================
app.post('/clubdetails', async (req, res) => {
  const { club_name } = req.body

  const { data, error } = await supabase
    .from('Clubs')
    .select('*')
    .eq('club_name', club_name)

  if (error || data.length === 0) {
    return res.json({ success: false })
  }

  res.json({
    success: true,
    clubName: data[0].club_name,
    clubDescription: data[0].about,
    bannerImage: data[0].banner_image_url
  })
})


// ================================
// 12. START SERVER
// ================================
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
