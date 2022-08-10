const bill = document.getElementById('input-bill');
const tipBtns = document.querySelectorAll('.tip');
const tipCustom = document.getElementById('input-custom');
const people = document.getElementById('input-people');
const errorMsg = document.querySelector('.error-msg');
const results = document.querySelectorAll('.value');
const resetBtn = document.querySelector('.cta-m');


bill.addEventListener('input', setBillValue);
tipBtns.forEach(btn => {
    btn.addEventListener('click', handleClick);
});
tipCustom.addEventListener('input', setTipCustomValue);
people.addEventListener('input', setPeopleValue);
resetBtn.addEventListener('click', reset);


let billValue = 0.0; //default value
let tipValue = 0.10; //default value -> 15% button is active
let peopleValue = 1; 


function setBillValue(){
    if (bill.value.includes(',')){
        bill.value = bill.value.replace(',', '.');
    }

   
    billValue = parseFloat(bill.value);

    calculateTip();
    //console.log(billValue);
}

function handleClick(event){
    tipBtns.forEach(btn => {
        //clear active state
        btn.classList.remove('active');

        //set active state 
        if(event.target.innerHTML == btn.innerHTML){
            btn.classList.add('active');
            tipValue = parseFloat(btn.innerHTML)/100;
        }
    });

    //clear custom tip
    tipCustom.value = '';

    calculateTip();

    //console.log(tipValue);
}

function setTipCustomValue(){
    tipValue = parseFloat(tipCustom.value/100);

    //remove active state from buttons
    tipBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    if(tipCustom.value !== ''){
        calculateTip();
    }
    
    //console.log(tipValue);
}

function setPeopleValue(){

    peopleValue = parseFloat(people.value);

    if(peopleValue <= 0){
        errorMsg.classList.add('show-error-msg');
        setTimeout(function(){
            errorMsg.classList.remove('show-error-msg');
        }, 3000);
    }

    calculateTip();
    //console.log(peopleValue);
}

function calculateTip(){
    if (peopleValue >=1 ){
        let tipAmount = billValue * tipValue / peopleValue;
        let total = billValue * (tipValue + 1) / peopleValue;
        results[0].innerHTML = '$' + tipAmount.toFixed(2);
        results[1].innerHTML = '$' + total.toFixed(2);
    }
}

function reset(){
    bill.value = '0.0';
    setBillValue();

    tipBtns[2].click();

    people.value = '1';
    setPeopleValue();
}