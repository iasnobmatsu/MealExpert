export default class Meal{
    constructor(date, type){
        this.date=date;
        this.type=type;
        this.foodlist=[]
    }

    addFood(name, calorie){
        this.foodlist.push([name,calorie]);
    }
}