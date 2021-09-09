var http = require('http')
var url = require('url')

const {customerinfo,customerslist,addcustomerDB} = require('./System/customer')
const {foodinfo,foodlist,addfoodDB} = require('./System/food')
const {orderMenu,orderFood,orderStatus,orderinfo,orderlist} = require('./System/order')
const {payfororder} = require('./System/payment')
const {addMenu,menuinfo,menulist} = require('./System/menu')

http.createServer(function (req, res) {
    
    var request_path = url.parse(req.url, true)
    var message = ''
    var data
    var status = 200
    var regid = /\d{1,2}/
    var regstring = /^[a-zA-z]+$/
    var regemail = /^([a-zA-z.-_]+)@(\w+)(\.[a-zA-z.]+)$/
    var regphone = /[0][689]\d{8}/
    var regprice = /\d{1,9}/

    switch(request_path.pathname) {
        //Show 1 customer
        case '/customer_info': 
            try {

                let customer_id = request_path.query.customer_id

                if(regid.test(customer_id)){
                    data = customerinfo(customer_id)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }

            } catch(err) {
                message += err
                status = 204
                console.log(err)
            }
            break
        //Show all customers
        case '/customer_list': 
            try {
                data = customerslist()
            } catch(err) {
                message += err
                status = 204
                console.log(err)
            }
            break
        //Show 1 food
        case '/food_info':
            try {

                let food_id = request_path.query.food_id

                if(regid.test(food_id)){
                    data = foodinfo(food_id)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }

            } catch(err) {
                message += err
                status = 204
                console.log(err)
            }
            break
        //Show all food
        case '/food_list':
            try {
                data = foodlist()
            } catch(err) {
                message += err
                status = 204
                console.log(err)
            }
            break
        //Add new food to foodlist
        case '/add_food_DB': 
            try {

                let food_name = request_path.query.food_name
                let food_price = request_path.query.food_price

                if(regstring.test(food_name)&&regprice.test(food_price)){
                    data = addfoodDB(food_name,food_price)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }
                
            } catch(err) {
                message += err
                status = 204
                console.log(err)
            }
            break
        //Add new customer
        case '/add_customer_DB':
            try{

                let firstname = request_path.query.firstname
                let lastname = request_path.query.lastname
                let email = request_path.query.email
                let phone = request_path.query.phone

                if(regstring.test(firstname)&&regstring.test(lastname)&&regemail.test(email)&&regphone.test(phone)){
                    data = addcustomerDB(firstname,lastname,email,phone)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }
                
            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        //Add food to menu
        case '/add_Menu':
            try{

                let menu_id = request_path.query.menu_id
                let food_id = request_path.query.food_id
                let qty = request_path.query.qty

                if(regid.test(menu_id)&&regid.test(food_id)&&regprice.test(qty)){
                    data = addMenu(menu_id,food_id,qty)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }
                
            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        //Order added menu
        case '/order_Menu':
            try{

                let customer_id = request_path.query.customer_id
                let menu_id = request_path.query.menu_id

                if(regid.test(customer_id)&&regid.test(menu_id)){
                    data = orderMenu(customer_id,menu_id)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }
                
            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        //Order 1 food
        case '/order_food':
            try{

                let customer_id = request_path.query.customer_id
                let food_id = request_path.query.food_id
                let qty = request_path.query.qty

                if(regid.test(customer_id)&&regid.test(food_id)&&regprice.test(qty)){
                    data = orderFood(customer_id,food_id,qty)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }
                
            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        //Check Order Status
        case '/order_status':
            try{

                let order_id = request_path.query.order_id

                if(regid.test(order_id)){
                    data = orderStatus(order_id)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }
                
            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        //Pay for order
        case '/pay_order':
            try{

                let order_id = request_path.query.order_id

                if(regid.test(order_id)){
                    data = payfororder(order_id)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }

            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        //Show 1 order
        case '/order_info':
            try{

                let order_id = request_path.query.order_id

                if(regid.test(order_id)){
                    data = orderinfo(order_id)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }

            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        //Show all orders
        case '/order_list':
            try{
                data = orderlist()
            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        //Show 1 Menu info
        case '/menu_info':
            try{
                
                let menu_id = request_path.query.menu_id

                if(regid.test(menu_id)){
                    data = menuinfo(menu_id)
                }else{
                    message = 'Incorrect Input'
                    status = 422
                }
                
            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
        //Show all Menu info
        case '/menu_list':
            try{
                data = menulist()
            } catch(err){
                message += err
                status = 204
                console.log(err)
            }
            break
    }   

    let response_object = {
        statusCode: status,
        message: message,
        data: data
    }

	res.writeHead(200, {'Content-Type': 'application/json'})
	res.end(JSON.stringify(response_object))
    
}).listen(8080)
console.log('Food Delivery application is running on port 8080.')

