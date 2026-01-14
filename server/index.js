//to do-> set up express via node. and create the api
const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')


const app = express()
app.use(cors())
app.use(express.json())

// Connect to Supabase

const supabase = createClient(
  'https://upsiksvlrouphiceacxh.supabase.co','sb_publishable_hngIxGttk8KPnnJ2u1OjWA_gH4MKhUg'
)

// test route 
app.get('/',(req,res) => {
  res.send('Backedn is running')
})

// clubs API (this is the project requirement)

app.get('/clubs', async (req,res) => {
  const {category} = req.query

  let query = supabase.from('Clubs').select('*')

  if(category && category !== 'all') {
    query = query.eq('club_category',category)
  }

  const { data , error } = await query

  if(error) {
    return res.status(500).json({error: error.message})
  }

  res.json(data)
})

// start server 
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
