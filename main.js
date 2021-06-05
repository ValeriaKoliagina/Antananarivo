class CardWidger {
    template = '';
    style = '';

    constructor (selector) {
        this.template = '';
        this.style = '';

        let element = document.querySelector(selector);
        if (element) {
            document.head.insertAdjacentHTML("beforeend", this.style); // добавляем стиль
            element.innerHTML = this.template; // вставляем виджет
        } else {
            throw new Error ('There is no such element in document');
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
          return '(invalid card number)';
        }
    
    }

}
