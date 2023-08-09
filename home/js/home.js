"use strict"

const btnLogOut=document.querySelector("#btnLogOut");
const user=document.querySelector("#user");

user.innerHTML=localStorage.getItem("userName");