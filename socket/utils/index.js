const { UserContact } = require('./../../Routes/user/models/contacts.model');
const User = require('./../../Routes/user/models/user.model');

let userContact;
const filterContact = async (data, user) => {
    userContact = await UserContact.findById(user.contacts);
    if (!userContact) {
        userContact = await UserContact.create({ user: user._id });
        user.contacts = userContact._id;
        await user.save();

        await user.populate('contacts').execPopulate();
    }
    userContact.contacts = [];
    await Promise.all(data.map(getPerContact));
    await userContact.save();
    return userContact;
}

const getPerContact = async (contact, index) => {
    if (contact.phones.length > 0) {
        await Promise.all(contact.phones.map(async (phone) => {
            let number = phone.normalizedNumber.includes('+91') ? phone.normalizedNumber.replace('+91', '') : phone.normalizedNumber;
            await fetchUserByNUmber(number, contact.displayName, contact.id);
        }));
    }
}

const fetchUserByNUmber = async (number, displayName, contactId) => {
    try {
        let user = await User.findOne({ number: number });
        if (!user) {
            userContact.contacts.push({ contactId, number, displayName, connected: false, serverName: null, id: null, status: null, img: 'public/user_default.png' });
        } else {
            userContact.contacts.push({ contactId, number, displayName, connected: true, serverName: user.name, id: user._id, status: user.bio, img: user.img == null ? null : user.img });
        }
        //await userContact.save();
        return true;
    } catch (error) {
        return false;
    }
}
module.exports = {
    filterContact
}