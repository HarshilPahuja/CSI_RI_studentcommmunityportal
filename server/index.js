// ================================
// 1. IMPORT REQUIRED PACKAGES
// ================================

// Express → to create server and APIs
const express = require('express')

// CORS → allows frontend to talk to backend
const cors = require('cors')

// Supabase client → to connect to Supabase database
const { createClient } = require('@supabase/supabase-js')


// ================================
// 2. CREATE EXPRESS APP
// ================================

const app = express()

// Enable CORS
app.use(cors())

// This allows us to read JSON from request body (VERY IMPORTANT)
app.use(express.json())


// ================================
// 3. CONNECT TO SUPABASE
// ================================

// createClient(URL, PUBLIC_KEY)
const supabase = createClient(
  'https://upsiksvlrouphiceacxh.supabase.co',
  'sb_publishable_hngIxGttk8KPnnJ2u1OjWA_gH4MKhUg'
)


// ================================
// 4. BASIC TEST ROUTE (BROWSER)
// ================================

// This route is ONLY to check if backend is running
app.get('/', (req, res) => {
  res.send('Backend is running')
})


// ================================
// 5. CLUBS API (PROJECT REQUIREMENT)
// ================================

// Example:
// http://localhost:3000/clubs
// http://localhost:3000/clubs?category=technical

app.get('/clubs', async (req, res) => {
  const { category } = req.query

  // Start query
  let query = supabase.from('Clubs').select('*')

  // Apply filter only if category is given
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
// 6. TEMPORARY GET ROUTES (FOR BROWSER UNDERSTANDING)
// ================================
// These DO NOT do login/signup
// They only prevent "Cannot GET" confusion

app.get('/login', (req, res) => {
  res.send('LOGIN API EXISTS (use POST)')
})

app.get('/signup', (req, res) => {
  res.send('SIGNUP API EXISTS (use POST)')
})

app.get('/follow', (req, res) => {
  res.send('FOLLOW API EXISTS (use POST)')
})

app.get('/followedclubs', (req, res) => {
  res.send('FOLLOWED CLUBS API EXISTS (use POST)')
})

app.get('/clubdetails', (req, res) => {
  res.send('CLUB DETAILS API EXISTS (use POST)')
})


// ================================
// 7. SIGNUP API (POST)
// ================================
// Creates new user

app.post('/signup', async (req, res) => {
  const { username, password } = req.body

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password }])
    .select('id')

  if (error) {
    return res.json({ success: false })
  }

  res.json({
    success: true,
    id: data[0].id
  })
})


// ================================
// 8. LOGIN API (POST)
// ================================
// Checks username & password

app.post('/login', async (req, res) => {
  const { username, password } = req.body

  const { data, error } = await supabase
    .from('users')
    .select('id')
    .eq('username', username)
    .eq('password', password)

  if (error || data.length === 0) {
    return res.json({ success: false })
  }

  res.json({
    success: true,
    id: data[0].id
  })
})


// ================================
// 9. ADMIN LOGIN API (POST)
// ================================

app.post('/admin', async (req, res) => {
  const { username, password } = req.body

  const { data, error } = await supabase
    .from('admins')
    .select('id, club_name')
    .eq('username', username)
    .eq('password', password)

  if (error || data.length === 0) {
    return res.json({ success: false })
  }

  res.json({
    success: true,
    id: data[0].id,
    club_name: data[0].club_name
  })
})


// ================================
// 10. FOLLOW CLUB API (POST)
// ================================

app.post('/follow', async (req, res) => {
  const { id, club_name } = req.body

  const { error } = await supabase
    .from('follow')
    .insert([{ user_id: id, club_name }])

  if (error) {
    return res.json({ success: false })
  }

  res.json({ success: true })
})


// ================================
// 11. FOLLOWED CLUBS API (POST)
// ================================

app.post('/followedclubs', async (req, res) => {
  const { id } = req.body

  const { data, error } = await supabase
    .from('follow')
    .select('club_name')
    .eq('user_id', id)

  if (error) {
    return res.json({ clubs: [] })
  }

  const clubs = data.map(item => item.club_name)
  res.json({ clubs })
})


// ================================
// 12. CLUB DETAILS API (POST)
// ================================

app.post('/clubdetails', async (req, res) => {
  const { club_name } = req.body

  const { data, error } = await supabase
    .from('clubs')
    .select('*')
    .eq('clubname', club_name)

  if (error || data.length === 0) {
    return res.json({ success: false })
  }

  res.json(data[0])
})


// ================================
// 13. START SERVER
// ================================

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
