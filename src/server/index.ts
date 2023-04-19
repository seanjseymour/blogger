import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser, { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import jsonwebtoken from 'jsonwebtoken'
import { today, thisWeek, thisMonth, Post } from "../posts"
import { NewUser, User } from '../users'

const app = express()
app.use(cors())
app.use(cookieParser())
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

const SECRET = 'my-super-dev-secret'
const COOKIE = 'vuejs-jwt'

function authenticate (id: string, req: Request, res: Response) {
  const token = jsonwebtoken.sign({id}, SECRET, {
    issuer: 'vuejs-course',
    expiresIn: '30 days'
  })
  res.cookie(COOKIE, token, { httpOnly: true })
}

app.get("/current-user", (req, res) => {
  try {
    const token = req.cookies[COOKIE]
    const result = jsonwebtoken.verify(token, SECRET) as { id: string }
    res.json({ id: result.id })
  } catch (error) {
    res.status(404).end()
  }
})

app.post<{}, {}, NewUser>("/users", (req, res) => {
  // console.log('Server processing user...')
  const user = {...req.body, id:(Math.random() * 100000).toFixed()}
  // console.log('All users before push: ', allUsers)
  allUsers.push(user)
  authenticate(user.id, req, res)
  const { password, ...rest } = user
  res.json(rest)
})

app.listen(8000, () => {
  console.log('Listening on port 8000...')
})
