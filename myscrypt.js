class trigGen {

    constructor (amplitude,dlength,fmt="unsigned",offset=0) {
       this.amplitude = amplitude;
       this.dlength = dlength;
       this.fmt = fmt;
       this.offset = offset;
       /*calculating step*/
       this.step = 6.28319 / dlength;
    }

    getSinData (order = 1, datatype='word',format="hex") {
        
        let templateLength = 0;
         let prefix = '';
        let result = Math.sin((this.step * order));
        if (this.fmt==="unsigned") {
            result = (result * (this.amplitude/2)) + (this.amplitude / 2) + this.offset;
        } else {
            result = (result * this.amplitude) + this.offset;
        }
        
         result = result | 0;

         if (format == 'dec'){
            let tmp001 = result.toString(10);
            return tmp001 + ',';
         }


        if (result < 0) {
           prefix = '-';
           result = Math.abs(result);
        }

        let str = result.toString(16);

            if (datatype === 'byte') {
            str = '0'.repeat((2-str.length)) + str;
          } if (datatype === 'word') {
            str = '0'.repeat((4-str.length)) + str;
          }
        
        
         return   prefix + '0x' + str + ',';
               
    }

    

    getCosData (order = 1, datatype="word",format="hex") {
       
        let prefix = '';
        let result = Math.cos((this.step * order));
        if (this.fmt==="unsigned") {
            result = (result * (this.amplitude/2)) + (this.amplitude / 2) + this.offset;
        } else {
            result = (result * this.amplitude) + this.offset;
        }

        result = result | 0;

        if (format == 'dec'){
            let tmp001 = result.toString(10);
            return tmp001 + ',';
         }

        if (result < 0) {
           prefix = '-';
           result = Math.abs(result);
        }

       

        let str = result.toString(16);
         
        if (datatype === 'byte') {
            str = '0'.repeat((2-str.length)) + str;
          } if (datatype === 'word') {
            str = '0'.repeat((4-str.length)) + str;
          }
        
         return   prefix + '0x' + str + ',';
    }

     getSinCosData (order=1, datatype="word"){
        
        let resultCos = Math.cos((this.step * order));
        let resultSin = Math.sin((this.step * order));
   
            resultSin = (resultSin * (this.amplitude/2)) + (this.amplitude / 2) + this.offset;
            resultCos = (resultCos * (this.amplitude/2)) + (this.amplitude / 2) + this.offset;
        
        resultSin = resultSin | 0;
        resultCos = resultCos | 0;
         
        let strS = resultSin.toString(16);
        let strC = resultCos.toString(16);

        if (datatype === 'byte') {
            strS = '0'.repeat((2-strS.length)) + strS;
            strC = '0'.repeat((2-strC.length)) + strC;

          } if (datatype === 'word') {
            strS = '0'.repeat((4-strS.length)) + strS;
            strC = '0'.repeat((4-strC.length)) + strC;
          }

         return    '0x' + strS + strC + ',';
    }

}



/*get input data from a form*/
function getInputData (idStep,idAmpl,rSin,rCos,rSinCos,rSigned,rUnsigned,rByte,rWord,rHex,rDec,iOffset) {
    /* get elements*/
    let stepElemem = document.getElementById(idStep);
    let amplElem = document.getElementById(idAmpl);
    let sinRadio = document.getElementById(rSin);
    let CosRadio = document.getElementById(rCos);
    let sincosRadio = document.getElementById(rSinCos);
    let signedRadio = document.getElementById(rSigned);
    let unsignedRadio = document.getElementById(rUnsigned);
    let byteRadio = document.getElementById(rByte);
    let wordRadio = document.getElementById(rWord);
    let fmtDec = document.getElementById(rDec);
    let fmtHex = document.getElementById(rHex);
    let nOffset = document.getElementById(iOffset);
    let signedCheckbox;
  
  
    let result = {};
    result.steps=parseInt(stepElemem.value);
    result.amplitude = parseInt(amplElem.value);
    result.offset = parseInt(nOffset.value);
    if (sinRadio.checked == true) {
                result.mode="SIN";
    } if (CosRadio.checked == true) {
                result.mode="COS";
    } if (sincosRadio.checked ==true){
                result.mode="SINCOS";
    } if(signedRadio.checked == true){
        result.sign='signed';
    } if (unsignedRadio.checked == true) {
        result.sign = 'unsigned';
    } if (byteRadio.checked == true) {
        result.width = 'byte';
    } if (wordRadio.checked == true) {
        result.width = 'word';
    } if (fmtHex.checked == true){
        result.format = 'hex';
    } if (fmtDec.checked == true) {
        result.format = 'dec';
    }
    return result;
  }

/************************************************************* */

  function processData(options){
     let gen = new trigGen(options.amplitude,options.steps,options.sign,options.offset);
     let outBuffer=' ';
    let z = 0;

     switch(options.mode){
        case 'SIN':
          
            while (z < options.steps) {
                outResult = '\n';
                 for (let q1 = 0 ; ((q1<4)&&(z < options.steps)); q1++){
                     outResult = outResult + gen.getSinData(z, options.width,options.format);
                     z++;
                 }
                outBuffer = outBuffer + outResult; 
            }
            break;
        case 'COS':
             
            while (z <options.steps) {
                outResult = '\n';
                 for (let q1 = 0 ; ((q1<4)&&(z < options.steps)); q1++){
                     outResult = outResult + gen.getCosData(z, options.width, options.format);
                     z++;
                 }
                 outBuffer = outBuffer + outResult; 
            }
            break;
        case 'SINCOS':
             
            while (z < options.steps) {
                outResult = '\n';
                 for (let q1 = 0 ; ((q1<4) && (z < options.steps)); q1++){
                     outResult = outResult + gen.getSinCosData(z, options.width);
                     z++;
                 }
                 outBuffer = outBuffer + outResult;  
            }
            break;
        default:
            console.log('Incorrect 1-st argument!');
           
    }

    return outBuffer;

  }


function onClick(){
    let resultWindow = document.getElementById('#outData');
    let zadanie;
    let dataToOut;
    zadanie = getInputData('#nSteps','#maxValue','#chSin','#chCos','#chSinCos','#chSigned','#chUnsigned','#chByte','#chWord','#chHex','#chDec','#offset');

    /****checking - is there a correct data */
    if((zadanie.steps < 10) ||(zadanie.steps > 650000)){
        alert ('Number of steps must be in range from 10 to 65000!');
        return;
    }
    if (zadanie.width=='byte') {
        if((zadanie.amplitude > 255)&&(zadanie.sign == 'unsigned')){
            alert('Input ERROR - Too big amplitude!');
            return;
        }
        if((zadanie.amplitude > 127)&&(zadanie.sign == 'signed')){
            alert('Input ERROR Too big amplitude!');
            return;
        }

    } if (zadanie.width == 'word') {

        if((zadanie.amplitude > 65535)&&(zadanie.sign == 'unsigned')){
            alert('Input ERROR Too big amplitude!');
            return;
        }
        if((zadanie.amplitude > 32767)&&(zadanie.sign == 'signed')){
            alert('Input ERROR Too big amplitude!');
            return;
        }
        
    } 

    dataToOut = processData(zadanie);
    resultWindow.innerText = dataToOut;

}

window.onload = function(){

    let btn = document.getElementById("#startButton");
    btn.addEventListener('click',onClick,false);
  
}