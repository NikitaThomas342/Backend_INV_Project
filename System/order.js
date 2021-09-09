const food = require('./food')
const menu = require('./menu')
const customer = require('./customer')

const order = new Map()
order.set(0,{customer_name:'Bruce Wayne',food_name:'Burger',type:'Single',food_price:250,qty:25,total_price:6250,status:'Waiting For Payment'})
order.set(1,{customer_name:'Bruce Lee',food_name:'PadThai',type:'Single',food_price:50,qty:2,total_price:100,status:'Waiting For Payment'})
order.set(2,{customer_name:'Bruce Lee',menu_id:'0',type:'Menu',itemlist:'[13 Burger(s) (13*250),12 Pizza(s) (12*200)]',total_price:15000,status:'Waiting For Payment'})

orderMenu = (customer_id,menu_id) =>{
    //POST
    let itemlist = ''
    let totalprice = 0

    let temp_menu = menu.menu.get(menu_id)
    for(let i = 0;i<temp_menu.length;i++){
        let dat = temp_menu[i].toString()
        dat = dat.split('.')
        itemlist += `Item: ${i+1} ${dat[1]} ${food.food.get(parseInt(dat[0])).item}(s) (${dat[1]}*${food.food.get(parseInt(dat[0])).price}=${dat[1]*parseInt(food.food.get(parseInt(dat[0])).price)}), `
        totalprice += (food.food.get(parseInt(dat[0])).price)*dat[1]
    }

    let name = `${customer.customer.get(customer_id).firstname} ${customer.customer.get(customer_id).lastname}`
    order.set(order.size+1,{customer_name:name,menu_id:menu_id,type:'Menu',itemlist:itemlist,total_price:totalprice,status:'Waiting For Payment'})
    return order.get(order.size)
}

orderFood = (customer_id,food_id,qty) => {
    //POST
    let price = food.food.get(food_id).price * qty
    let name = `${customer.customer.get(customer_id).firstname} ${customer.customer.get(customer_id).lastname}`
    order.set(order.size+1,{customer_name:name,food_name:food.food.get(food_id).item,type:'Single',food_price:food.food.get(food_id).price,qty:qty,total_price:price,status:'Waiting For Payment'})
    return order.get(order.size)
}

orderStatus = (order_id) => {
    //GET
    return order.get(order_id).status
}

orderinfo = (order_id) => {
    //GET
    let id = parseInt(order_id)
    if(order.has(id)){
        return order.get(id)
    }else{
        return 'Order Not Found'
    }
}

orderlist = () => {
    //GET
    let message = ''
    order.forEach((value,key)=>{
        if(value.type.includes('Single')){
            message += `Order ${key+1} :: customer_name: ${value.customer_name}, food_name: ${value.food_name}, type: ${value.type}, food_price: ${value.food_price}, qty: ${value.qty}, total_price: ${value.total_price}, status: ${value.status}   `
        }else{
            message += `Order ${key+1} :: customer_name: ${value.customer_name}, menu_id: ${value.menu_id}, type: ${value.type}, itemlist: ${value.itemlist}, total_price: ${value.total_price}, status: ${value.status}  `
        }
    })
    return message
}

module.exports = {
    orderMenu:orderMenu,
    orderFood:orderFood,
    orderStatus:orderStatus,
    orderinfo:orderinfo,
    orderlist:orderlist,
    order:order,
}