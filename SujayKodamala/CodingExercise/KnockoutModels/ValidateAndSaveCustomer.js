CustomerInformationSystem.CustomerViewModel = function (customer) {
    var CustomerInfoModel = ko.validatedObservable({
        customerName: ko.observable(customer.CustomerName).extend({ required: true }),
        contactName: ko.observable(customer.ContactName).extend({ required: true }),
        address: ko.observable(customer.Address).extend({ required: true }),
        city: ko.observable(customer.City).extend({ required: true }),
        postalCode: ko.observable(customer.PostalCode).extend({ required: true }),
        country: ko.observable(customer.Country).extend({ required: true })
    });

    return CustomerInfoModel;
};
// Bind the EmployeeInfo
CustomerInformationSystem.bindModel = function (customer) {

    // Create the view model
    CustomerInformationSystem.CustViewModel =
      CustomerInformationSystem.CustomerViewModel(emp);

    //The Validation initialization
    ko.validation.init({ messagesOnModified: false, errorClass: 'errorStyle', insertMessages: true });
    ko.applyBindings(this.CustViewModel);
};

//Save the Information
CustomerInformationSystem.saveCustomer = function () {
    if (CustomerInformationSystem.CustViewModel.isValid()) {
        $.ajax({
            url: "/api/customer",
            type: "POST",
            data: ko.toJSON(this),
            datatype: "json",
            contentType: 'application/json'
        }).done(function (res) {
            alert("Record Added Successfully" + res.EmpNo);
        }).error(function (err) {
            alert("Error " + err.status);
        });
    } else {
        alert("Please enter the valid data");
    }
};



$(document).ready(function () {
    CustomerInformationSystem.bindModel({ ID: null, CustoemrName: "", CotactName: "", Address: "", PostalCode: "" ,Country:""});
});
