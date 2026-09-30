const details = {
    name:"AMINUL ISLAM SAKIB",
    age:29,
    country:"BANGLADESH"
}
const keys = ["name", 'country']
const car = (name, year, weight) => {
return console.log(`${name.toUpperCase()} was released in ${year} and its weight was ${weight}`)
}
car('Porche', 1987, 700)
console.log(details[keys[0]], details[keys[1]])