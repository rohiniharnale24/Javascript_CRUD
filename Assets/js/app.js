"use strict";

const cl = console.log;

const getForm = document.getElementById("form");
const fNamecontrols = document.getElementById("fName");
const lNamecontrols = document.getElementById("lName");
const emailcontrols = document.getElementById("email");
const contactcontrols = document.getElementById("contact");
const getTable = document.getElementById("formid");
const getBtn = document.getElementById("subbtn");
const getupdate = document.getElementById("updatebtn");
const getDelete = document.getElementById("delete");

//as query selector returns node list so we have convert it into Array

//submit event has bydefault behaviour >> whenever we click submit page refreshed
//here eve is = sumbit event

//the element we are creating in js dynamically are called as >> on the fly ememnt>> here edit and delete
//
let stdArray = [];
// let result = ``;

const onEditHandler = (event) => {
  let getid = "";
  getid = event.getAttribute("data-id");
  cl(getid);
  //cl(stdArray)
  let getobj = stdArray.find((std) => {
    return std.id === getid;
  });
  localStorage.setItem("updateId", getid);

  cl(getobj);
  fNamecontrols.value = getobj.fName;
  lNamecontrols.value = getobj.lName;
  emailcontrols.value = getobj.email;
  contactcontrols.value = getobj.contact;

  getBtn.classList.add("d-none");
  getupdate.classList.remove("d-none");

  // let getIdIndex =
};
//here ele give us html element ( delete button)not a event bcz we use inline event
//ele is dom object here bcz we are setting html in js here
//if we are using custom Attribute and there the word data is mandatory then to get attribute we use

let onDeleteHandler = (ele) => {
  cl("ondelete");
  //let deleteId = ele.getAttribute("data-id");
  let deleteId = ele.dataset.id;
  //it will return a obj ,data - id >> here it consider id as a key and ${std.id}= is its value
  let getIndex = stdArray.findIndex((std) => std.id === deleteId);
  stdArray.splice(getIndex, 1);
  console.log(stdArray);
  cl(deleteId);
  //to store array at localstore
  localStorage.setItem("setStd", JSON.stringify(stdArray));
  //to delete selected row only we are not going to use templating bcz it regenerate all the row /obj of an array
  cl(ele.parentElement.parentElement);
  ele.parentElement.parentElement.remove();
};

let templating = (arr) => {
  let result = ``;
  arr.forEach((std, i) => {
    result += `<tr>
            <td>${i + 1}</td>
            <td>${std.fName}</td>
            <td>${std.lName}</td>
            <td>${std.email}</td>
            <td>${std.contact}</td>
            <td><button class="btn btn-primary" data-id="${
              std.id
            }" onclick="onEditHandler(this)">Edit</botton></td>
            <td><button class="btn btn-danger"data-id="${
              std.id
            }" onclick = "onDeleteHandler(this)">Delete</botton></td>

        </tr>`;
    //as we cant show id on ui here we put custom attribute in button tag
    //its name /value must be with proper name like -id,-class
  });
  getTable.innerHTML = result;
};

if (localStorage.getItem("setStd")) {
  stdArray = JSON.parse(localStorage.getItem("setStd"));
  templating(stdArray);
}

const onUpdate = (ele) => {
  cl(ele.target);
  //  let itemIndex = stdArray.findIndex(ele => {
  //     return ele.id == getid;
  //  })
  let getUpdateId = localStorage.getItem("updateId");
  cl(getUpdateId);

  stdArray.forEach((std) => {
    if (getUpdateId === std.id) {
      (std.fName = fNamecontrols.value),
        (std.lName = lNamecontrols.value),
        (std.email = emailcontrols.value),
        (std.contact = contactcontrols.value);
    }
  });

  localStorage.setItem("UpdateArray", JSON.stringify(stdArray));
  // templating(stdArray);
  ele.parentElement.parentElement.getForm.reset();
  getBtn.classList.remove("d-none");
  getupdate.classList.add("d-none");
  //to reset from

  //  stdArray[itemIndex] = {
  //     fName: fNamecontrols.value,
  //     lName:lNamecontrols.value,
  //     email:emailcontrols.value,
  //     contact:contactcontrols.value,
  //     id: getid,
  //  }
  //  localStorage.setItem("setStd", JSON.stringify(stdArray));
};

getupdate.addEventListener("click", onUpdate);
//if we have to click on edit then edited row must be selected or edited row data will be updated  thats why we need uuid id to select perticular row

//getDelete.addEventListener("click",onDeleteHandler);

//const templating
const onStudsubmit = (eve) => {
  eve.preventDefault();
  //cl("form is submitted!!");
  let obj = {
    fName: fNamecontrols.value,
    lName: lNamecontrols.value,
    email: emailcontrols.value,
    contact: contactcontrols.value,
    id: create_UUID(),
  };

  cl(obj);
  stdArray.push(obj);
  cl(stdArray);
  getForm.reset();
  //to clear the form after sumitting its data into the array.
  localStorage.setItem("setStd", JSON.stringify(stdArray));
  templating(stdArray);
};

// const getEdit = [...document.querySelectorAll(".btn-primary")];
// cl(getEdit);

// getEdit.forEach(btn =>{
//     btn.addEventListener("click",function(eve){
//         // cl(eve.target);
//     });
// })

getForm.addEventListener("submit", onStudsubmit);

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}

//console.log(create_UUID());
