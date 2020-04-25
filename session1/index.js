const axios = require('axios')
const {log} = require('./module')

// const func = () => (
//   new Promise((res, rej) => {
//     setTimeout(() => {
//       res('au trecut 2 sec')
//     }, 3000)
//   })
// )

// func().then(res => console.log(res));

// log('ceva')

// const fun = async () => {
//   try {
//     const res = await axios.get('https://dog.ceo/api/breeds/image/random')
//     console.log(res.data)
//   } catch(err) {
//     console.log(err)
//   }
// }

// fun()

const funct = async () => {
  try {
    const x1 = axios.get('https://dog.ceo/api/breeds/image/random')
    const x2 = axios.get('https://dog.ceo/api/breeds/image/random')
    const x3 = axios.get('https://dog.ceo/api/breeds/image/random')

    const res = await Promise.all([x1, x2, x3])

    const data = res.map(item => item.data)

    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

funct()

const race = async () => {
  try {
    const x1 = axios.get('https://dog.ceo/api/breeds/image/random')
    const x2 = axios.get('https://dog.ceo/api/breeds/image/random')
    const x3 = axios.get('https://dog.ceo/api/breeds/image/random')

    const respons = Promise.race([x1, x2, x3])
  } catch (e) {
    console.log(e)
  }
}