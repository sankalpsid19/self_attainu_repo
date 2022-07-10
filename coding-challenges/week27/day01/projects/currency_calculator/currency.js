const select = document.querySelectorAll("select")
const input = document.querySelectorAll("input")
const button = document.querySelectorAll("button")
const info = document.getElementById("info")
const API_URL = "https://v6.exchangerate-api.com/v6/b40f56927cfa75afd423b1ca/latest/USD"
let html = ""
 


async function currency(){
    const res =await fetch(API_URL)
    const data = await res.json()
    const arrkeys = Object.keys(data.conversion_rates)
    const rates = data.conversion_rates


    arrkeys.map(item =>{
        return html += `<option value=${item}>${item}</option>`
    })
    console.log(html)

    for (let i = 0; i<select.length; i++){ 
        select[i].innerHTML = html
    }

    input[0].addEventListener("input",()=>{
        input[1].value = input[0].value * rates[select[1].value] / rates[select[0].value]
        info.innerText = `1 ${select[0].value} = ${rates[select[0].value]} ${select[1].value}`
    })

    input[1].addEventListener("input",()=>{
        input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value]
        info.innerText = `1 ${select[0].value} = ${rates[select[0].value]} ${select[1].value}`
    })

    select[0].addEventListener("change",()=>{
        info.innerText = `1 ${select[0].value} = ${rates[select[0].value]} ${select[1].value}`
        input[1].value = input[0].value * rates[select[1].value] / rates[select[0].value]
    })

    select[1].addEventListener("change",()=>{
        info.innerText = `1 ${select[0].value} = ${rates[select[0].value]} ${select[1].value}`
        input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value]
    })

    button[0].addEventListener("click", ()=>{
        info.innerText = `1 ${select[0].value} = ${rates[select[0].value]} ${select[1].value}`
        let temp = select[0].value
        select[0].value = select[1].value
        select[1].value = temp
    })

}

currency()
