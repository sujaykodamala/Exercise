/// <reference path="../Scripts/knockout-3.1.0.js" />
/// <reference path="../Scripts/jquery-1.10.2.js" />

var customerRegisterViewModel;




function Customer(id, customerName, contactName, address, city, postalCode, country) {
    var self = this;
    
    self.ID = ko.observable(id);
    self.CustomerName = ko.observable(customerName).extend({ required: true});
    self.ContactName = ko.observable(contactName).extend({ required: true });
    self.Address = ko.observable(address).extend({ required: true });
    self.City = ko.observable(city).extend({ required: true });
    self.PostalCode = ko.observable(postalCode).extend({ required: true });
    self.Country = ko.observable(country).extend({ required: true});

    self.addCustomer = function () {
        var dataObject = ko.toJSON(this);

        if (self.validateData()) {

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
        else
        {
            return false;
        }
    };

    self.validateData = function () {
        if (self.v)
        {
            $('.validate').show();
            $('#CustomerName').append('Customer Name is required');
            $('#ContactName').append('Customer Name is required');
            $('#Address').append('Address Name is required');
            $('#City').append('City Name is required');
            $('#PostalCode').append('PostalCode Name is required');
            $('#Country').append('Country is required');

        }
        else {
            $('.validate').hide();
        }

        return true;
    };

}

function CustomerList() {
    var self = this;
    // observable arrays are update binding elements upon array changes
    self.customers = ko.observableArray([]);

    self.getCustomers = function () {
        self.customers.removeAll();

        // retrieve students list from server side and push each object to model's students list
        $.getJSON('/api/customer', function (data) {
            $.each(data, function (key, value) {
                self.customers.push(new Customer(value.ID, value.CustomerName, value.ContactName, value.Address, value.City, value.PostalCode, value.Country));
            });
        });
    };



    // remove student. current data context object is passed to function automatically.
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
// create index view view model which contain two models for partial views
customerRegisterViewModel = { addCustomerViewModel: new Customer(), customerListViewModel: new CustomerList() };

// on document ready
$(document).ready(function () {
    // bind view model to referring view
    ko.applyBindings(customerRegisterViewModel);

    // load student data
    customerRegisterViewModel.customerListViewModel.getCustomers();
});
