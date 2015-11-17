module ksj.validation {
    export class ViewModel {

        public Customer: KnockoutObservable<string> =
        ko.observable(customerName).extend(required: {message: 'required'})
    }
} 