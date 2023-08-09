"use strict"
const inputs=document.getElementsByTagName("input");
/* sign up variablies*/ 
const userName=document.querySelector("#userName");
const userEmailSignUp=document.querySelector("#userEmailSignUp");
const userPasswordSignUp=document.querySelector("#userPasswordSignUp");
const btnSignUp=document.querySelector("#btnSignUp");
const message=document.querySelector("#message");
const signInLink=document.querySelector("#signInLink");
/* sign in variablies*/
const userEmailSignIn=document.querySelector("#userEmailSignIn");
const userPasswordSignIn=document.querySelector("#userPasswordSignIn");
const btnSignIn=document.querySelector("#btnSignIn");
const homeLink=document.querySelector("#btnSignIn").firstElementChild;
/* home page variablies*/

/* signUpArray variablies*/
let signUpArray;

/* sign up functions*/ 
if(localStorage.getItem("signUpArray")!=null){
    signUpArray=JSON.parse(localStorage.getItem("signUpArray"));
}

else{
    signUpArray=[];
}

function createObjectFromUserSignUpData(name,email,password){
const userSignUpData={
    userName:name,
    userEmail:email,
    userPassord:password
}
return userSignUpData;
}


function addObjectToSignUpArray(signUpObject){
signUpArray.push(signUpObject);
return signUpArray;
}

function addSignUpArrayToLocalStorage(array){
    localStorage.setItem("signUpArray",JSON.stringify(array));
    return JSON.parse(localStorage.getItem("signUpArray"));
}

function clearSignUpDataFromFormAfterAdditionToLocalStorage(){
userName.value="";
userEmailSignUp.value="";
userPasswordSignUp.value="";
}

function checkSignUpDataRepetition(){
    if(signUpArray.length !=0){
        let notRepeated=0;
        let nameRepeated=false;
        let emailRepeated=false;
        let nameAndEmailRepeated=false;
        for(let i=0;i<signUpArray.length;i++){
            if((userName.value!==signUpArray[i].userName)&&(userEmailSignUp.value!==signUpArray[i].userEmail)){
                console.log(1,userName.value,signUpArray[i].userName,userEmailSignUp.value,signUpArray[i].userEmail);
                notRepeated++;
          
                   
                    
                
    
   
            }
            else if((signUpArray[i].userName===userName.value)&&(signUpArray[i].userEmail!==userEmailSignUp.value)){
               
                nameRepeated=true;
                console.log(2,userName.value,signUpArray[i].userName,userEmailSignUp.value,signUpArray[i].userEmail);
                   
            }
    
            else if((signUpArray[i].userName!==userName.value)&&(signUpArray[i].userEmail===userEmailSignUp.value)){
                
                emailRepeated=true;
                console.log(3,userName.value,signUpArray[i].userName,userEmailSignUp.value,signUpArray[i].userEmail);
            }
    
            else{
               
                nameAndEmailRepeated=true;
                console.log(4,userName.value,signUpArray[i].userName,userEmailSignUp.value,signUpArray[i].userEmail);
            }
        }
        if(notRepeated==signUpArray.length&&nameRepeated==false&&emailRepeated==false&&nameAndEmailRepeated==false){
            return true;
        } 

       else if(notRepeated<signUpArray.length&&nameRepeated==true&&emailRepeated==false&&nameAndEmailRepeated==false){
            message.classList.replace("text-success","text-danger");  
            message.innerHTML="name already exist";
            userName.value="";
            return false;
        }

        else if(notRepeated<signUpArray.length&&nameRepeated==false&&emailRepeated==true&&nameAndEmailRepeated==false){
            message.classList.replace("text-success","text-danger");  
            message.innerHTML="email already exist";
            userEmailSignUp.value="";
            return false;
        }

        else if(notRepeated<signUpArray.length&&nameRepeated==false&&emailRepeated==false&&nameAndEmailRepeated==true){
            message.classList.replace("text-success","text-danger");  
            message.innerHTML="name and email already exists";
            userEmailSignUp.value="";
            userName.value="";
            return false;
        }

        
    }else{
        return true;
    }
    
}

function SignUpnameValidation(nameValue){
if(nameValue !=""){
    return true;
}
else{
    return false
}
}

function SignUpEmailValidation(emailValue){
const regex=/^([\w]*[\w\.]*(?!\.)@(gmail|yahoo|hotmail).com)$/;
return regex.test(emailValue);
}

function SignUpPasswordValidation(passwordValue){
const regex=/^[a-zA-Z0-9!@#$_.]{6,16}$/;
return regex.test(passwordValue);
}


function signUpDataValidation(nameValue,emailValue,passwordValue){
if(SignUpnameValidation(nameValue)&&SignUpEmailValidation(emailValue)&&SignUpPasswordValidation(passwordValue)){
message.classList.replace("d-none","text-success");  
message.innerHTML="Success";
return true;
}
else if(SignUpnameValidation(nameValue)==true&&SignUpEmailValidation(emailValue)==true&&SignUpPasswordValidation(passwordValue)==false){
    message.classList.replace("d-none","text-danger");  
message.innerHTML="make sure the password contains only characters from a to z and numbers from 0 to 9 and some special characters like !@#$_.";
userPasswordSignUp.value="";
    return false;
}

else if(SignUpnameValidation(nameValue)==false&&SignUpEmailValidation(emailValue)==true&&SignUpPasswordValidation(passwordValue)==false){
    message.classList.replace("d-none","text-danger");  
message.innerHTML="name is empty and make sure the password contains only characters from a to z and numbers from 0 to 9 and some special characters like !@#$_.";
userPasswordSignUp.value="";
    return false;
}

else if(SignUpnameValidation(nameValue)==true&&SignUpEmailValidation(emailValue)==false&&SignUpPasswordValidation(passwordValue)==true){
    message.classList.replace("d-none","text-danger");  
message.innerHTML="invalid email";
userEmailSignUp.value="";
    return false;
}

else if(SignUpnameValidation(nameValue)==false&&SignUpEmailValidation(emailValue)==false&&SignUpPasswordValidation(passwordValue)==true){
    message.classList.replace("d-none","text-danger");  
message.innerHTML="name is empty and invalid email";
userEmailSignUp.value="";
    return false;
}

else if(SignUpnameValidation(nameValue)==false&&SignUpEmailValidation(emailValue)==true&&SignUpPasswordValidation(passwordValue)==true){
    message.classList.replace("d-none","text-danger");  
message.innerHTML="name is empty ";
userEmailSignUp.value="";
    return false;
}

else{
    message.classList.replace("d-none","text-danger");  
    message.innerHTML="name is empty and invalid email and make sure the password contains only characters from a to z and numbers from 0 to 9 and some special characters like !@#$_. ";
    userEmailSignUp.value="";
    userPasswordSignUp.value="";
        return false;
}
}
for(let i=0;i<inputs.length;i++){
inputs[i].addEventListener("focus",function(){
    if(message.classList.contains("text-danger")){
        message.classList.replace("text-danger","d-none");
    }

    else if(message.classList.contains("text-success")){
        message.classList.replace("text-success","d-none");
    }

    else{

    }
})
}


btnSignUp.addEventListener("click",function(){
    if(signUpDataValidation(userName.value,userEmailSignUp.value,userPasswordSignUp.value)&&checkSignUpDataRepetition()){
   console.log(checkSignUpDataRepetition());
        console.log(addSignUpArrayToLocalStorage(addObjectToSignUpArray(createObjectFromUserSignUpData(userName.value,userEmailSignUp.value,userPasswordSignUp.value))));
        clearSignUpDataFromFormAfterAdditionToLocalStorage();
      }
        
    
    
})

signInLink.addEventListener("click",function(){

   userName.classList.contains("d-none")?userName.classList.remove("d-none"):userName.classList.add("d-none");
   userEmailSignIn.classList.contains("d-none")?userEmailSignIn.classList.remove("d-none"):userEmailSignIn.classList.add("d-none");
   userEmailSignUp.classList.contains("d-none")?userEmailSignUp.classList.remove("d-none"):userEmailSignUp.classList.add("d-none");
   userPasswordSignIn.classList.contains("d-none")?userPasswordSignIn.classList.remove("d-none"):userPasswordSignIn.classList.add("d-none");
   userPasswordSignUp.classList.contains("d-none")?userPasswordSignUp.classList.remove("d-none"):userPasswordSignUp.classList.add("d-none");
   btnSignUp.classList.contains("d-none")?btnSignUp.classList.remove("d-none"):btnSignUp.classList.add("d-none");
   btnSignIn.classList.contains("d-none")?btnSignIn.classList.remove("d-none"):btnSignIn.classList.add("d-none");
   this.innerHTML==" Sign Up"?this.innerHTML=" Sign In":this.innerHTML=" Sign Up";
   this.previousSibling.innerHTML=="Don’t have an account?"?this.previousSibling.innerHTML="You have an account?":this.previousSibling.innerHTML="Don’t have an account?";
})


function checkSignInDataExistInSignUpData(){
    let registerationProblem=false;
    let emailORPasswordIncorrect=false;
    for(let i=0;i<signUpArray.length;i++){
        if((userEmailSignIn.value===signUpArray[i].userEmail)&&(userPasswordSignIn.value===signUpArray[i].userPassord)){
            homeLink.setAttribute("href","home/home.html");
            localStorage.setItem("userName",signUpArray[i].userName);
            console.log(1,userEmailSignIn.value,signUpArray[i].userEmail);
            return true;
        }

        else if(((userEmailSignIn.value!==signUpArray[i].userEmail)&&(userPasswordSignIn.value===signUpArray[i].userPassord))||((userEmailSignIn.value===signUpArray[i].userEmail)&&(userPasswordSignIn.value!==signUpArray[i].userPassord))){
            
         
           
            registerationProblem=false;
            emailORPasswordIncorrect=true;

        
        }

     

        else {
           
           
          
            registerationProblem=true;
            
        }


        

       




    }


    if(registerationProblem&&emailORPasswordIncorrect){
        message.classList.replace("d-none","text-danger");  
        message.innerHTML="email or password incorrect";
        return false
    }
    else if(registerationProblem==true&&emailORPasswordIncorrect==false){
        message.classList.replace("d-none","text-danger");  
        message.innerHTML="this mail not registered please sign up first";
        return false;
    }

}

btnSignIn.addEventListener("click",function(){
    
    checkSignInDataExistInSignUpData()
    
    


})








