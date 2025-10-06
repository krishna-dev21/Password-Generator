const displaypassword = document.querySelector("[displaypassword]")
const copybtn = document.querySelector("[copybtn]")
const copymsg = document.querySelector("[copymsg]")
const passwordlengthset = document.querySelector("[passwordlenghtset]")
const inputslider = document.querySelector("[inputslider]")
const uppercase = document.querySelector("#uppercase")
const lowercase = document.querySelector("#lowercase")
const numbersss = document.querySelector("#numbersss")
const symbolsss = document.querySelector("#symbolsss")
const allcheckboxes = document.querySelectorAll("input[type=checkbox]")
const indicatorbtn = document.querySelector("[indicatorbtn]")
const generatebtn = document.querySelector("[generatebtn]");

let password = "";
let passwordlength = 10;
let checkcount = 0;
handleslider();



function handleslider()
{
   inputslider.value = passwordlength;
   passwordlengthset.innerText = passwordlength;
  
}

function generaterndinteger(min, max)
{
     return Math.floor(Math.random() * (max-min)) + min;
}

function generateuppercase()
{
   return String.fromCharCode(generaterndinteger(65,90))
}

function generaterndlowercase()
{
    return String.fromCharCode(generaterndinteger(97,122))
}

function generaterndnumber()
{
    return generaterndinteger(0,9)
}

let rndsymbols = "~!@#$%^&*()_-+={[}]|\:;'<,>.?/"
function generaterndsymbol()
{
   let a = generaterndinteger(0,rndsymbols.length) ;
   return rndsymbols.charAt(a);
}


function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}


function handleallcheckboxes()
{   
    checkcount = 0;
    allcheckboxes.forEach((checkbox) => {
        if(checkbox.checked)
        {
            checkcount++;
        }
    });

    console.log("hi")
    console.log(checkcount)

    
    if(passwordlength < checkcount)
        {
            passwordlength = checkcount;
            handleslider();
        }
}


allcheckboxes.forEach((checkbox)=>{
    checkbox.addEventListener("change", handleallcheckboxes)
})


inputslider.addEventListener("input", (e)=>
{
    passwordlength = e.target.value;
    handleslider();
})

function checkstrength() {
    const hasupper = uppercase.checked;
    const haslower = lowercase.checked;
    const hasnumber = numbersss.checked;
    const hassymbols = symbolsss.checked;
    
    let strength = 0;
    const checks = [hasupper, haslower, hasnumber, hassymbols];
    const activeChecks = checks.filter(check => check).length;
    
    // Add points for each type of character
    strength += activeChecks * 25;
    
    // Add points for password length
    if (passwordlength >= 12) strength += 25;
    else if (passwordlength >= 8) strength += 15;
    else if (passwordlength >= 6) strength += 10;
    
    // Determine color based on strength
    if (strength >= 80 && passwordlength >= 8) {
        indicatorbtn.style.backgroundColor = "#00FF9C";
        indicatorbtn.style.boxShadow = "0 0 30px #00FF9C";
    } else if (strength >= 60 && passwordlength >= 6) {
        indicatorbtn.style.backgroundColor = "#4CC9FE";
        indicatorbtn.style.boxShadow = "0 0 30px #4CC9FE";
    } else {
        indicatorbtn.style.backgroundColor = "#FF0000";
        indicatorbtn.style.boxShadow = "0 0 30px #FF0000";
    }
}

   
generatebtn.addEventListener("click", ()=>{
    
    password = ""
    
    if(checkcount == 0)
        return;

    
    if(passwordlength < checkcount)
    {
        passwordlength = checkcount;
        handleslider();
    }

    console.log("Starting the Journey");

    password = ""

    let arrayforpassword = [];

    // essential pushes
    if(uppercase.checked)
        arrayforpassword.push(generateuppercase);

    if(lowercase.checked)
        arrayforpassword.push(generaterndlowercase);

    if(numbersss.checked)
        arrayforpassword.push(generaterndnumber);

    if(symbolsss.checked)
        arrayforpassword.push(generaterndsymbol);

    for(let i=0; i<arrayforpassword.length; i++)
    {
        password += arrayforpassword[i]();
    }
    console.log("COmpulsory adddition done");
    // remaining pushes 
    for(let i=0; i<passwordlength-arrayforpassword.length; i++)
    {   let rndindexforarray = generaterndinteger(0,arrayforpassword.length);
        password += arrayforpassword[rndindexforarray]();
    }

    console.log("Remaining adddition done");

    password = shufflePassword(Array.from(password));
    
    displaypassword.value = password;
    console.log("UI adddition done");
    
    checkstrength();

    
});

async function copyplacehodercontent() {
    if (!displaypassword.value) {
        copymsg.innerText = "No password to copy";
        copymsg.classList.add("active");
        setTimeout(() => copymsg.classList.remove("active"), 1500);
        return;
    }

    try {
        await navigator.clipboard.writeText(displaypassword.value);
        copymsg.innerText = "Password copied!";
        copymsg.style.color = "#00FF9C";
    } catch(e) {
        copymsg.innerText = "Failed to copy";
        copymsg.style.color = "#FF0000";
        console.error("Copy failed:", e);
    }
     
    copymsg.classList.add("active");
    setTimeout(() => {
        copymsg.classList.remove("active");
        copymsg.style.color = "";
    }, 2000);
}

copybtn.addEventListener("click" ,()=>{
    if(displaypassword.value)
        copyplacehodercontent();
})

