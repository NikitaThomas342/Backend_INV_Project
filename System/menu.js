const food = require('./food')

const menu = new Map()
menu.set(0,[1.12,2.15,3.1])
menu.set(1,[3.13,2.1,0.13])

addMenu = (menu_id,food_id,qty) => {
    //POST
    if(menu.has(menu_id)){
        let temp_menu = menu.get(menu_id)
        menu.delete(menu_id)
        temp_menu.push(`${food_id}.${qty}`)
        menu.set(menu_id,temp_menu)
        return `${qty}(s) ${food.food.get(food_id).item} added to Menu`
    }else{
        menu.set(menu_id,[`${food_id}.${qty}`])
        return `New menu added with ${qty}(s) ${food.food.get(food_id).item}`
    }
}

menuinfo = (menu_id) => {
    //GET
    let message = ''
    let temp_menu = menu.get(menu_id)
    for(let i = 0;i<temp_menu.length;i++){
        let dat = temp_menu[i].toString()
        dat = dat.split('.')
        message += `Item: ${i+1} ${dat[1]} ${food.food.get(parseInt(dat[0])).item}(s), `
    }
    return message
}

menulist = () => {
    //GET
    let message = ''
    menu.forEach((value,key)=>{
        let temp_menu = menu.get(key)
        message += `Menu ${key}: `
        for(let i = 0;i<temp_menu.length;i++){
            let dat = temp_menu[i].toString()
            dat = dat.split('.')
            message += `Item: ${i+1} ${dat[1]} ${food.food.get(parseInt(dat[0])).item}(s), `
        }
    })

    return message
}

module.exports = {
    addMenu:addMenu,
    menuinfo:menuinfo,
    menulist:menulist,
    menu:menu,
}