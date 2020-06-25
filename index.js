const express = require("express");
const path = require("path");
const port = 8000;

const Contact = require("./models/contact");

const db = require("./config/mongoose")

const app = express();


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));
app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, './assets/css')));

//  Middlewares
// middleware 1 prints on console

app.use(function (request, response, next) {
    // console.log("Middleware 1 running ");
    next();
});

app.use(function (request, response, next) {
    // console.log("middleware 2 called");
    next();
});

// var contactList = [
//     {
//         name: "Arnav",
//         phone: "9999999999"
//     },
//     {
//         name: "Police",
//         phone: "100"
//     },
//     {
//         name: "Stark",
//         phone: "3000"
//     },
// ];

app.get('/', function (request, response) {
    // console.log(request.url);
    // return response.render('./index', { contact_list: contactList });
    Contact.find({}, function (err, contacts) {
        if (err) {
            console.log("Error in fetching contacts from DB");
            return;
        }
        else {
            // console.log(contacts);
            return response.render('./index', { contact_list: contacts });
        }
    })
});

app.get('/practice', function (request, response) {
    // console.log(request.url);
    return response.render('./practice', { title: "Welcome to my playground", fruits: ["Banana", "Mango"] });
});

// create a contact and add it into local list.
app.post('/create-contact', function (request, response) {
    console.log(request.body);
    // contactList.push(request.body);

    Contact.create(request.body, function (err, newContact) {
        if (err) {
            console.log("error in creating a contact");
            return;
        }
        else {
            console.log("******New Contact******", newContact)
            return response.redirect("back");
        }
    });
});

// For deleting the contact get query param from url find it in db using id and delete.
app.get('/delete-contact', function (request, response) {
    // fetch id from the query param
    let id = request.query.id;
    console.log(id);

    // find contact in db using id and delete it.

    Contact.findByIdAndDelete(id, function (err) {
        if (err) {
            console.log("error in deletion");
            return;
        }
        else {
            return response.redirect('back');
        }
    })


    // let contactIndex = contactList.findIndex(function (contact) {
    //     return contact.phone == phone;
    // })

    // console.log(contactIndex);
    // if (contactIndex != -1) {
    //     contactList.splice(contactIndex, 1);
    // }


});

app.listen(port, function (err) {
    if (err) {
        console.log("Error in running server", err)
        return;
    }
    else {
        console.log("Server is up and running on port: ", port)
    }

});