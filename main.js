
function maskPassword(pass){
  let str = ""
  for (let index = 0; index < pass.length; index++) {
      str  += "*"
  }
  return str;
}



function copyText(txt) {
  navigator.clipboard.writeText(txt).then(
      () => {
        
        document.getElementById("alert").style.display = "inline"
        setTimeout(() => {
          document.getElementById("alert").style.display = "none"
        }, 2000);

      },
      () => {
      
        alert("Clipboard copying failed")
      },
    );
}


const deletepass = (website) => {
  let tb = document.querySelector("table");
  let data = localStorage.getItem("allpass");
  let arr = JSON.parse(data);

  arrup = arr.filter((e) => {
    return e.website.toString() !== website.toString();
  });

  localStorage.setItem("allpass", JSON.stringify(arrup));
  alert("detail deleted");
  showpassword();
}


const showpassword=()=>{
let tb = document.querySelector("table");
let data = localStorage.getItem("allpass");

if(data==null  || JSON.parse(data).length == 0){
  tb.innerHTML="no data";
}

else{

  tb.innerHTML =  `<tr>
  <th>Website</th>
  <th>Username</th>
  <th>Password</th>
  <th>Delete</th>
  </tr> `

  let arr=JSON.parse(data);
  let str = "";
  for(let i = 0 ; i < arr.length ; i++){

    
    let element = arr[i];

     str =`
                <tr> 
                  <td>${element.website}<img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
                  <td>${element.username}<img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
                  <td>${maskPassword(element.password)}<img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" width="10" height="10"></td>
                  <td><button class="del" onclick="deletepass('${element.website}')">Delete</button></td>
                </tr> 
            `
    tb.innerHTML += str;
 
  }

}
    website.value = "";
    username.value = "";
    password.value = "";
}

console.log("hello user! save your password");
showpassword();
const btn = document.querySelector(".but");
btn.addEventListener("click" , (e)=>{

  e.preventDefault();

  console.log( website.value,username.value , password.value);

  let allpass = localStorage.getItem("allpass");

  if(allpass==null){

    let arr =[];

    arr.push({website:website.value,username:username.value ,password:password.value});
    alert("password saved");
    localStorage.setItem("allpass", JSON.stringify(arr));

  }
  else{

      let arr = JSON.parse(localStorage.getItem("allpass"));
      arr.push({website:website.value,username:username.value , password:password.value});
      alert("password saved");
      localStorage.setItem("allpass" , JSON.stringify(arr));

  }

showpassword();
})