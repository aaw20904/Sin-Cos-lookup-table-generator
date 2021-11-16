

class trigGen{
    constructor(amplitude,dlength,fmt="unsigned"){
       this.amplitude = amplitude;
       this.dlength = dlength;
       this.fmt = fmt;
       /*calculating step*/
       this.step = 6.28319 / dlength;
        
    }

    getSinData (order = 1) {
         let prefix = '';
        let result = Math.sin((this.step * order));
        if (this.fmt==="unsigned") {
            result = (result * (this.amplitude/2)) + (this.amplitude / 2);
        } else {
            result = result * this.amplitude;
        }
        
         result = result | 0;
        if (result < 0) {
           prefix = '-';
           result = Math.abs(result);
        }

        let str = result.toString(16);

        str = '0'.repeat((4-str.length)) + str;
        
         return   prefix + '0x' + str + ',';
               
    }

    getCosData (order = 1) {
        let prefix = '';
        let result = Math.cos((this.step * order));
        if (this.fmt==="unsigned") {
            result = (result * (this.amplitude/2)) + (this.amplitude / 2);
        } else {
            result = result * this.amplitude;
        }
        result = result | 0;
        if (result < 0) {
           prefix = '-';
           result = Math.abs(result);
        }

        let str = result.toString(16);

        str = '0'.repeat((4-str.length)) + str;
        
         return   prefix + '0x' + str + ',';
    }

    getSinCosData (order=1){
        
        let resultCos = Math.cos((this.step * order));
        let resultSin = Math.sin((this.step * order));
   
            resultSin = (resultSin * (this.amplitude/2)) + (this.amplitude / 2);
            resultCos = (resultCos * (this.amplitude/2)) + (this.amplitude / 2);
        
        resultSin = resultSin | 0;
        resultCos = resultCos | 0;
         
        let strS = resultSin.toString(16);
        let strC = resultCos.toString(16);
        strS = '0'.repeat((4-strS.length)) + strS;
        strC = '0'.repeat((4-strC.length)) + strC;
         return    '0x' + strS + strC + ',';
    }

}


let z = 0;
let fmt = process.argv[2];
let maxValue = parseInt(process.argv[3]);
let tableSize = parseInt(process.argv[4]);
let outResult = ''; 
let myGen; 
console.log("Sine Cosine lookup table generator.For the help please type -?");
if(!process.argv[2]){
    process.exit(0);
}
if(process.argv[2]==='-?'){
    console.log("OPTIONS \n");
    console.log("1-st argument: output lookup table format \n");
    console.log("can be: SIN, COS, SINCOS");
    console.log("2-nd argument: a maximum value of a number \n");
    console.log("can be an integer number to 65535");
    console.log("3-d argument: a size of the lookup table - an integer number");
    console.log('EXAMPLE: SIN 256 32');
    process.exit(1);
}

  myGen = new trigGen(maxValue,tableSize,'unsigned');

switch(fmt){
    case 'SIN':
      
        while (z <tableSize){
            outResult = '\n';
             for (let q1 = 0 ; ((q1<4)&&(z < tableSize)); q1++){
                 outResult = outResult + myGen.getSinData(z);
                 z++;
             }
            console.log(outResult);
        }
        break;
    case 'COS':
         
        while (z <tableSize){
            outResult = '\n';
             for (let q1 = 0 ; ((q1<4)&&(z < tableSize)); q1++){
                 outResult = outResult + myGen.getCosData(z);
                 z++;
             }
            console.log(outResult);
        }
        break;
    case 'SINCOS':
         
        while (z <tableSize){
            outResult = '\n';
             for (let q1 = 0 ; ((q1<4)&&(z < tableSize)); q1++){
                 outResult = outResult + myGen.getSinCosData(z);
                 z++;
             }
            console.log(outResult);
        }
        break;
    default:
        console.log('Incorrect 1-st argument!');
        process.exit(1);
}


 




