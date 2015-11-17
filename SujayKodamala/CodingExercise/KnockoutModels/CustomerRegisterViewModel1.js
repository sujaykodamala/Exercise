/// <reference path="../Scripts/knockout-3.1.0.js" />
/// <reference path="../Scripts/jquery-1.10.2.js" />
/// <reference path="../Scripts/knockout.validation.js" />

var customerRegisterViewModel;

function Customer(id, customerName, contactName, address, city, postalCode, country) {
    var self = this;

    self.ID = ko.observable(id);
    self.CustomerName = ko.observable(customerName).extend({ required: { message: 'Customer Name is required' } });
    self.ContactName = ko.observable(contactName).extend({ required: { message: 'Consumer Name is required' } });
    self.Address = ko.observable(address).extend({ required: { message: ' Address is required' } });
    self.City = ko.observable(city).extend({ required: { message: 'City Name is required' } });
    self.PostalCode = ko.observable(postalCode).extend({ required: { message: 'postal code is required' } });
    self.Country = ko.observable(country).extend({ required: { message: 'Country Name is required' } });

    self.errors = ko.validation.group(self);

    self.isValid = ko.computed(function () {

        return self.errors().length == 0;
    });

    self.addCustomer = function () {
        if (!self.isValid()) {
            self.errors.showAllMessages(true);
            return;
        }

        var dataObject = ko.toJSON(this);

        $.ajax({
            url: '/api/customer',
            type: 'post',
            data: dataObject,
            contentType: 'application/json',
            success: function (data) {
                customerRegisterViewModel.customerListViewModel.customers.push(new Customer(data.ID, data.CustomerName, data.ContactName, data.Address, data.City, data.PostalCode, data.Country));
                self.ID(null);
                self.CustomerName('');
                self.ContactName('');
                self.Address('');
                self.City('');
                self.PostalCode('');
                self.Country('');
            }
        });
    }

};



function CustomerList() {
    var self = this;
    self.customers = ko.observableArray([]);

    self.getCustomers = function () {
        self.customers.removeAll();

        $.getJSON('/api/customer', function (data) {
            $.each(data, function (key, value) {
                self.customers.push(new Customer(value.ID, value.CustomerName, value.ContactName, value.Address, value.City, value.PostalCode, value.Country));
            });
        });
    };



    self.removeCustomer = function (customer) {
        $.ajax({
            url: '/api/customer/' + customer.ID(),
            type: 'delete',
            contentType: 'application/json',
            success: function () {
                self.customers.remove(customer);
            }
        });
    };
}
customerRegisterViewModel = { addCustomerViewModel: new Customer(), customerListViewModel: new CustomerList() };

$(document).ready(function () {
    ko.applyBindings(customerRegisterViewModel);
    ko.applyBindings(customerRegisterViewModel.customerListViewModel);
    console.log(ko.validation.group);

    ko.validation.init({
        registerExtenders: true,
        messagesOnModified: true,
        decorateElement: true,
        errorClass: 'error',
        insertMessages: true,
        parseInputAttributes: true,
        messageTemplate: 'customMessageTemplate'
    });


});
