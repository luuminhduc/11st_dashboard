export const convertMoney = (num) => {
    let result = num.toString().split('');
    for(let i = result.length-3; i >= 1; i-=3) {
        result.splice(i,0,".")
    }
    return result.reduce((a,b)=>a+=b);
}