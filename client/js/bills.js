
async function loadBills(){

const response = await fetch("/api/bills")
const bills = await response.json()

const list = document.getElementById("billsList")
list.innerHTML=""

bills.forEach(bill => {

const div = document.createElement("div")
div.className="bill"

div.innerHTML = `
<span>${bill.title} - £${bill.amount}</span>
<span>${bill.due_date.split("T")[0]}</span>
`

list.appendChild(div)

})

}

async function addBill(){

const title = document.getElementById("title").value
const amount = document.getElementById("amount").value
const dueDate = document.getElementById("dueDate").value

await fetch("/api/bills/create",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
householdId:1,
title,
amount,
dueDate,
createdBy:7
})

})

loadBills()

}

loadBills()

