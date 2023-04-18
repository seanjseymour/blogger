import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { today, thisWeek, thisMonth, Post } from "../posts"
import { NewUser, User } from '../users'

const app = express()
app.use(cors())
app.use(bodyParser.json())

const allPosts = [today, thisWeek, thisMonth]
const allUsers: User[] = []

app.get("/posts", (req, res) => {
  res.json(allPosts)
})

app.post<{}, {}, Post>("/posts", (req, res) => {
  // console.log('Server processing post...')
  const post = {...req.body, id:(Math.random() * 100000).toFixed()}
  // console.log('All posts before push: ', allPosts)
  allPosts.push(post)
  // console.log('All posts after push: ', allPosts)
  res.json(post)
})

app.post<{}, {}, NewUser>("/users", (req, res) => {
  // console.log('Server processing user...')
  const user = {...req.body, id:(Math.random() * 100000).toFixed()}
  // console.log('All users before push: ', allUsers)
  allUsers.push(user)
  const { password, ...rest } = user
  res.json(rest)
})

app.listen(8000, () => {
  console.log('Listening on port 8000...')
})
