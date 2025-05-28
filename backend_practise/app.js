function multiply(a,b){
  return a+b;
}

const log = {
    warning: (info) => {
        console.log("warning",info);
        return `warning, ${info}`; 
    },
    error: (error) => {
        console.log("error", error);
        return `error, ${error}`; 
    }
}

// module.exports = multiply;
module.exports = {multiply, log};