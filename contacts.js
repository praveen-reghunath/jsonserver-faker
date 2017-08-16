'use strict';

var faker = require('faker');

function generateContactInfo() {

    var result = {};
    
    result.addressTypes = getAddressTypes();
    result.phoneTypes = getPhoneTypes();
    result.contacts = generateContacts();
    result.addresses = generateAddresses(result.contacts);
    result.phones = generatePhoneNumbers(result.contacts);
    
    return result;
}

function generatePhoneNumbers(contacts) {

    let phones = [];
    let id = 1;
    
    contacts.forEach(function (contact) {

        var limit = faker.random.number(5);

        for (var i = 1; i <= limit; i++) {
            phones.push(getPhoneNumberItem(id++, contact.id));
        }

    }, this);

    return phones;

}

function getPhoneNumberItem(id, contactId) {
    var phoneTypes = getPhoneTypes();
    var phoneNumber = faker.phone.phoneNumber();
    var phoneType = faker.helpers.randomize(phoneTypes);
    var result = {
        "id": id,
        "phoneType": phoneType,
        "phoneNumber": phoneNumber,
        "contactId": contactId
    };

    return result;
}

function generateAddresses(contacts) {

    var addresses = [];
    let id = 1;

    contacts.forEach(function (contact) {

        var limit = faker.random.number(5);

        for (var i = 1; i <= limit; i++) {
            addresses.push(getAddressItem(id++, contact.id));
        }

    }, this);

    return addresses;
}

function getAddressItem(id, contactId) {

    const addressTypes = getAddressTypes();
    const street = faker.address.streetAddress();
    const city = faker.address.city();
    const state = faker.address.state();
    const postalCode = faker.address.zipCode();
    const addressType = faker.helpers.randomize(addressTypes);

    const result = {
        "id": id,
        "addressType": addressType,
        "street": street,
        "city": city,
        "state": state,
        "postalCode": postalCode,
        "contactId": contactId
    };

    return result;
}

function getPhoneTypes() {

    const phoneTypes = [
        "Home Phone",
        "Mobile Phone",
        "Work Phone",
        "Main Phone",
        "Other Phone"
    ];

    return phoneTypes;
}

function getAddressTypes() {

    let addressTypes = [
        "Home Address",
        "Mailing Address",
        "Work Address",
        "Other Address"
    ];

    return addressTypes;

}

function generateContacts() {

    var contacts = [];

    for (var i = 0; i < 50; i++) {

        var firstName = faker.name.findName();
        var lastName = faker.name.lastName();

        contacts.push({
            "id": (i + 1),
            "firstName": firstName,
            "lastName": lastName
        });
    }

    return contacts;
}

module.exports = generateContactInfo;
