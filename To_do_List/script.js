const inputBox = document.querySelector(".inputtext input");
const addBtn = document.querySelector(".inputtext button");
const toDo = document.querySelector(".list");
const clearAll = document.querySelector(".end button");

inputBox.onkeyup = ()=>{
    let data = inputBox.value;
    if(data.trim() != 0){// if the data is not only spaces
        addBtn.classList.add("active");
    }else{
        addBtn.classList.remove("active")
    }
}
show();

addBtn.onclick = ()=>{
    let data = inputBox.value;
    let getLocalStorage = localStorage.getItem("New to do");
    if(getLocalStorage == null){
        listArr = []; 
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    listArr.push(data);
    localStorage.setItem("New to do", JSON.stringify(listArr));
    show();
    addBtn.classList.remove("active"); //unactive the add button once the task added
    inputBox.value = ""//setting the input box blank after task is entered
}


function show(){
    let getLocalStorageData = localStorage.getItem("New to do");
    if(getLocalStorageData == null){
      listArr = [];
    }else{
      listArr = JSON.parse(getLocalStorageData); 
    }
    const pending = document.querySelector(".pending");
    pending.textContent = listArr.length;
    let newLiTag = "";
    listArr.forEach((element, index) => {
      newLiTag += `<li>${element}<span onClick="deleteT(${index})";><i class="fas fa-trash"></i></span></li>`;
    });
    toDo.innerHTML = newLiTag; //adding new li tag inside ul tag
}
function deleteT(index){
    let getLocalStorageData = localStorage.getItem("New to do");
    listArr = JSON.parse(getLocalStorageData);
    listArr.splice(index,1);
    localStorage.setItem("New to do", JSON.stringify(listArr));
    show();
}
clearAll.onclick = ()=>{
    listArr = [];
    localStorage.setItem("New to do", JSON.stringify(listArr));
    show();
}