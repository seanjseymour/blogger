import { DateTime } from "luxon"

export interface Post {
  id: string
  title: string
  authorId: string
  created: string
  markdown: string
  html: string
}

// Extend the Post interface, but replace the created
// string object with a DateTime one.
export interface TimelinePost extends Omit<Post, 'created'> {
  created: DateTime;
}

export const today: Post = {
  id: "1",
  authorId: "-1",
  title: "Creating graphs with chart.js",
  created: DateTime.now().toISO()!,
  markdown: '',
  html: '',
}

export const thisWeek: Post = {
  id: "2",
  authorId: "-1",
  title: "A great Vue course in Udemy",
  created: DateTime.now().minus({days: 5}).toISO()!,
  markdown: '',
  html: '',
}

export const thisMonth: Post = {
  id: "3",
  authorId: "-1",
  title: "What to learn next",
  created: DateTime.now().minus({ weeks: 3 }).toISO()!,
  markdown: '',
  html: '',
}