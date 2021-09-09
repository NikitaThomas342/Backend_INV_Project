const order = require('./order')

payfororder = (order_id) => {
    //POST
    let old_order = order.order.get(order_id)
    if(old_order.status.includes('Waiting For Payment')){
        old_order.status = 'Complete'
        order.order.delete(order_id)
        order.order.set(order_id,old_order)
        return order.order.get(order_id)
    }else{
        return 'Already Paid'
    }
}

module.exports = {
    payfororder:payfororder,
}