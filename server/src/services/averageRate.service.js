module.exports.averagePrice =(services) =>{
    let acc=0;
    let count=0;
    getProp(services);
    return (acc/count).toFixed(2);
    function getProp(o) {
        for(let prop in o) {
            if(typeof(o[prop]) === 'object') {
                getProp(o[prop]);
            } else {
                if(parseFloat(o[prop])) {
                acc+=parseFloat(o[prop]);
                ++count;
                }
            }
        }
    }
}
module.exports.averageRate =(rate) =>{//create validation on NaN
    let acc=0;
    let count=0;
    getProp(rate);
    return (acc/count).toFixed(2);
    function getProp(o) {
        for(let prop in o) {
            if(typeof(o[prop]) === 'object') {
                getProp(o[prop]);
            } else {
                if(parseFloat(o[prop]) && prop==="rate") {
                acc+=parseFloat(o[prop]);
                ++count;
                }
            }
        }
    }
}