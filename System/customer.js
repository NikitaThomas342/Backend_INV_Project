const customer = new Map()
customer.set(0,{firstname: "Niktia", lastname: "Thomas", email:"nikita_tho@cmu.ac.th", phone:"0638261522"})
customer.set(1,{firstname: "Bruce", lastname: "Wayne", email:"bruce_wayne@cmu.ac.th", phone:"0123123122"})
customer.set(2,{firstname: "Mike", lastname: "Tyson", email:"mike_tyson@cmu.ac.th", phone:"1231231231"})
customer.set(3,{firstname: "John", lastname: "Wick", email:"john_wick@cmu.ac.th", phone:"0000000000"})

customerinfo = (customer_id) => {
    //GET
    let id = parseInt(customer_id)
    if(customer.has(id)){
        return customer.get(id)
    }else{
        return 'Customer Not Found'
    }
}

customerslist = () => {
    //GET
    let message = ''
    customer.forEach((value,key)=>{
        message += ` Customer ${key}, Name: ${value.firstname} ${value.lastname} Email: ${value.email} Phonenumber: ${value.phone} `
    })
    return message
}

addcustomerDB = (firstname,lastname,email,phone) => {
    //POST
    customer.set(customer.size+1,{firstname: firstname,lastname: lastname,email: email,phone: phone})
    console.log(customer)
    return 'Customer Added'
}

module.exports = {
    customerinfo:customerinfo,
    customerslist:customerslist,
    addcustomerDB:addcustomerDB,
    customer:customer,
}