export const TotalPrice=(numberOfGuests:any,price:number):string=>{ 
    const result=Number(numberOfGuests)*+price
    return String(result) };