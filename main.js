class CardWidget {
    template = "<div id='app'> <form class='form' id='form'> <div class='form-name'> <label for='name'>Name</label> <div class='input-flex'> <input type='text' class='form-input' id='name' placeholder='Enter your name'> <span class='error' id='name-error'></span> </div></div><div class='form-number'> <label for='number'>Card Number</label> <div class='input-flex'> <input type='text' class='form-input' id='number' placeholder='1234 5678 1234 5678'> <span class='error' id='number-error'></span> </div></div><div class='form-CVV'> <label for='cvv'>CVV</label> <div class='input-flex'> <input type='text' class='form-input' id='cvv' placeholder='Enter your secret code here'> <span class='error' id='cvv-error'></span> </div></div><div class='form-group' id='date'> <label>Expiration Date</label> <div class='form-selects'> <select> <option value='01'>January</option> <option value='02'>February </option> <option value='03'>March</option> <option value='04'>April</option> <option value='05'>May</option> <option value='06'>June</option> <option value='07'>July</option> <option value='08'>August</option> <option value='09'>September</option> <option value='10'>October</option> <option value='11'>November</option> <option value='12'>December</option> </select> <select> <option value='21'> 2021</option> <option value='22'> 2022</option> <option value='23'> 2023</option> <option value='24'> 2024</option> <option value='25'> 2025</option> <option value='26'> 2026</option> </select> </div></div><div class='form-button'> <button type='submit' class='button-submit' id='submit'>Confirm</button> </div></form> </div>";
    style = "#app{max-width: 500px; background-color: #fff; margin: 10px auto; overflow: hidden; padding: 25px; color: #4c4e56;}#app form{font-size: 18px; padding: 10px 25px; margin-top: 20px; position: relative;}#app form label{width: 100%; margin-bottom: 10px; margin-right: 10px;}#app form div{margin-bottom: 5px;}#app form .form-input{line-height: 30px; height: auto; padding: 0 16px; border-radius: 5px;}#app .name{width: 63%; margin-right: 10px;}#app .CVV{width: 35%;}#app .form-number{width: 100%;}#app .form-group{display: flex; flex-direction: column;}#app .form-group .form-selects{display: flex;}#app .form-button{width: 100%; margin-top: 25px;}#app .form-button button{width: 100%; margin-top: 3px; font-size: 24px; background-color: #2ec4a5; color: white; border-radius: 5px;}#app select{padding: 10px; margin-right: 15px; border-radius: 5px; font-size: 16px;}#app .input-flex{display: flex; flex-direction: column;}#app .error{color: red; height: 14px; font-size: 14px;}";
    formIDs = {};
    errorMessages = {};

    constructor(selector) {
        this.template = '';
        this.style = '';

        this.formIDs = {
            form: 'form',
            number: 'number',
            owner: 'name',
            cvv: 'cvv',
            errorNumber: 'number-error',
            errorOwner: 'name-error',
            errorCvv: 'cvv-error',
            submit: 'submit',   
        };

        this.errorMessages = {
            errorNumber: 'Incorrect card number',
            errorOwner: 'Incorrect holder\'s name',
            errorCvv: 'Incorrect CVV number'
            
        };

        let element = document.querySelector(selector);
        if (element) {
            document.head.insertAdjacentHTML("beforeend", this.style); // добавляем стиль
            element.innerHTML = this.template; // вставляем виджет
        } else {
            throw new Error('There is no such element in document');
        }

    }

    validateCardNumber(cn) {

        const cardnumber = cn.replace(/[ -]/g, '');

        const match = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/.exec(cardnumber);

        if (match) {

            const types = ['Visa', 'MasterCard', 'Discover', 'American Express',
                'Diners Club', 'JCB'];

            for (let i = 1; i < match.length; i++) {
                if (match[i]) {
                    return types[i - 1];
                }
            }
        } else {
            return false;
        }

    }

    validateCardHolderName(hn) {

        const holdername = hn.replace(/[ -]/g, '');

        const match = /^([A-Za-z]{3,})\s([A-Za-z]{3,})$/.exec(holdername);

        if (match) {
            return true
        } else {
            return false;
        }

    }

    validateCVV(number) {

        const cvv = number.replace(/[ -]/g, '');

        const match = /^[0-9]{3,4}$/.exec(cvv);

        if (match) {
            return true
        } else {
            return false;
        }

    }

    showError(selector, message) {
        let element = document.querySelector(selector);
        if (element) {
            element.textContent = message;
        } else {
            throw new Error('There is no such element in document');
        }
    }

    validateAll() {
        const cardNumber = document.querySelector(this.formIDs.cardNumber);
        if(cardNumber) {
            if(!this.validateCardNumber(cardNumber.value)) {
                this.showError(this.formIDs.errorNumber, this.errorMessages.errorNumber);
                return false;
            } 
        }

        const owner = document.querySelector(this.formIDs.owner);
        if(owner) {
            if(!this.validateCardNumber(owner.value)) {
                this.showError(this.formIDs.errorOwner, this.errorMessages.errorOwner);
                return false;
            } 
        }

        const cvv = document.querySelector(this.formIDs.cvv);
        if(cvv) {
            if(!this.validateCardNumber(cvv.value)) {
                this.showError(this.formIDs.errorCvv, this.errorMessages.errorCvv);
                return false;
            } 
        }

        return true;
    }

    addEvents() {
        const submit = document.querySelector(this.formIDs.submit);
        if(submit) {
            submit.addEventListener('submit', (ev) => {
                ev.preventDefault();
                if(this.validateAll()) {
                    ev.target.submit();
                }
            });
        }
    }

}
