module.exports.averageRate =(services) =>{
    let acc=0;
    let count=0;
    getProp(services);
    console.log("services",services);
    console.log((acc/count).toFixed(2));
    console.log((acc/count).toFixed(2));
    return (acc/count).toFixed(2);
    function getProp(o) {
        for(let prop in o) {
            if(typeof(o[prop]) === 'object') {
                console.log("o[prop]",o[prop]);
                getProp(o[prop]);
            } else {
                    if(parseFloat(o[prop])) {
                        console.log("o[prop]",o[prop]);
                    acc+=parseFloat(o[prop]);
                    ++count;
                }
            }
        }
    }
}