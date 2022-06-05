import { names, Length } from "@/data"

export default defineEventHandler(async (event) => {
  const selection = await useBody(event)
  return names.filter(({ gender, popularity, length, origin }) => {
    return gender === selection.gender &&
           popularity === selection.popularity &&
           (selection.length === Length.ALL || length === selection.length) &&
           origin === selection.origin
  }).map(({ name }) => name)
})