const food = new Map()
food.set(0,{item: 'Pizza', price: 200})
food.set(1,{item: 'Burger', price: 250})
food.set(2,{item: 'SeaFood', price: 150})
food.set(3,{item: 'Krapao', price: 50})

foodinfo = (food_id) => {
    //GET
    let id = parseInt(food_id)
    if(food.has(id)){
        return food.get(id)
    }else{
        return 'Food Not Found'
    }
}

foodlist = () => {
    //GET
    let message = ''
    food.forEach((value,key) => {
        message += ` Item ${key}, ${value.item} Price: ${value.price}`
    })
    return message
}

addfoodDB = (food_name,food_price) => {
    //POST
    food.set(food.size+1,{item: food_name, price: food_price})
    console.log(food)
    return 'Food Added'
}

module.exports = {
    foodinfo:foodinfo,
    foodlist:foodlist,
    addfoodDB:addfoodDB,
    food:food,
}