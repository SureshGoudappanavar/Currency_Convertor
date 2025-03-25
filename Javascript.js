const BASEURL="https://2024-03-06.currency-api.pages.dev/v1/currencies/eur.json";

const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");

const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");

const msg=document.querySelector(".msg");
for(let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        
        if(select.name==="from" && currCode==="USD"){
             newOption.selected="selected";
        }else if(select.name==="to" && currCode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);//to add one by one
    }
  select.addEventListener("change",(evt)=>{
    updateFlag(evt.target);
  });
}

const updateFlag=(element)=>{
   let currCode=element.value;
   let countryCode=countryList[currCode];
   let newSrc=`http://flagsapi.com/${countryCode}/flat/64.png`;
  let img= element.parentElement.querySelector("img");
  img.src=newSrc;
}


btn.addEventListener("click", async (evt)=>{
       evt.preventDefault();//do not do any default activities

     
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    console.log(amtVal);
    if(amtVal==="" || amtVal<1){
        amtVal=1;
        amtVal.value="1";
     }


    //  console.log(fromCurr.value,toCurr.value);
    const URL=`${BASEURL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
     let response=await fetch(URL);
     let data=await response.json();
     let rate=data[toCurr.value.toLowerCase()];
     let finalAmount=amtVal*rate;
   

     msg.innerText=`${amtVal}  $ {fromCurr.value}=${finalAmount} ${toCurr.value}`;
});

