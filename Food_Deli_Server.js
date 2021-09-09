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

    switch(request_path.pathname) {
        //Show 1 customer
        case '/customer_info': 
            try {
                data = customerinfo(request_path.query.customer_id)
            } catch(err) {
                message += err
                status = 200
                console.log(err)
            }
            break
        //Show all customers
        case '/customer_list': 
            try {
                data = customerslist()
            } catch(err) {
                message += err
                status = 200
                console.log(err)
            }
            break
        //Show 1 food
        case '/food_info':
            try {
                data = foodinfo(request_path.query.food_id)
            } catch(err) {
                message += err
                status = 200
                console.log(err)
            }
            break
        //Show all food
        case '/food_list':
            try {
                data = foodlist()
            } catch(err) {
                message += err
                status = 200
                console.log(err)
            }
            break
        //Add new food to foodlist
        case '/add_food_DB': 
            try {
                data = addfoodDB(request_path.query.food_name,request_path.query.food_price)
            } catch(err) {
                message += err
                status = 200
                console.log(err)
            }
            break
        //Add new customer
        case '/add_customer_DB':
            try{
                data = addcustomerDB(request_path.query.firstname,request_path.query.lastname,request_path.query.email,request_path.query.phone)
            } catch(err){
                message += err
                status = 200
                console.log(err)
            }
            break
        //Add food to menu
        case '/add_Menu':
            try{
                data = addMenu()
            } catch(err){
                message += err
                status = 200
                console.log(err)
            }
            break
        //Order added menu
        case '/order_Menu':
            try{
                data = orderMenu()
            } catch(err){
                message += err
                status = 200
                console.log(err)
            }
            break
        //Order 1 food
        case '/order_food':
            try{
                data = orderFood(request_path.query.customer_id,request_path.query.food_id,request_path.query.qty)
            } catch(err){
                message += err
                status = 200
                console.log(err)
            }
            break
        //Check Order Status
        case '/order_status':
            try{
                data = orderStatus(request_path.query.order_id)
            } catch(err){
                message += err
                status = 200
                console.log(err)
            }
            break
        //Pay for order
        case '/pay_order':
            try{
                data = payfororder(request_path.query.order_id)
            } catch(err){
                message += err
                status = 200
                console.log(err)
            }
            break
        //Show 1 order
        case '/order_info':
            try{
                data = orderinfo(request_path.query.order_id)
            } catch(err){
                message += err
                status = 200
                console.log(err)
            }
            break
        //Show all orders
        case '/order_list':
            try{
                data = orderlist()
            } catch(err){
                message += err
                status = 200
                console.log(err)
            }
            break
        //Show 1 Menu info
        case '/menu_info':
            try{
                data = menuinfo(request_path.query.menu_id)
            } catch(err){
                message += err
                status = 200
                console.log(err)
            }
            break
        //Show all Menu info
        case '/menu_list':
            try{
                data = menulist()
            } catch(err){
                message += err
                status = 200
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

