// a fake implementation of a "fetch" http client;
// app is just using this mock, for now... (see fetcher.real.js)

const asyncDelay = (ms = 2000, data) => new Promise(r => setTimeout(r, ms, data))

let number = 99 // init value

// GET //
export const get = async url => {
  await asyncDelay()
  return number
}

// SET //
export const set = async (method, url, body) => {
  await asyncDelay() // fake delay
  number = (method === 'POST')
    ? body
    : method === 'PUT'
      ? number + body
      : number // do nothing new
  return number
}
