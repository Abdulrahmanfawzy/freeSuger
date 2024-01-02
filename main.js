let saveName = document.querySelector("#saveName");
let count = document.querySelector("#count");
let sugerCount = document.querySelector("#sugerCount");
let btn = document.querySelector("#btn");
let table = document.querySelector(".table");
let tbody = document.querySelector(".table tbody");
let deleteAll = document.querySelector("#deleteAll");
let search = document.querySelector(".search");
let alerts = document.querySelector(".alert");
let image = document.querySelector(".image");

let arr;

if(window.localStorage.getItem("Names")){
    arr = JSON.parse(localStorage.getItem("Names"));
    printNames(localStorage.getItem("Names"))
}else{
    arr = []
}

function handleSearchADeleteAll(){
    if(localStorage.getItem("Names")){
        let x = JSON.parse(localStorage.getItem("Names"));
        if(x.length <= 0){
            search.style.display = "none";
            deleteAll.style.display = "none";
        }else{
            search.style.display = "block";
            deleteAll.style.display = "block";
        }
    }else{
        deleteAll.style.display = "none";
        search.style.display = "none";
    }
    
}
handleSearchADeleteAll();

btn.addEventListener("click" , ()=>{
    handleSearchADeleteAll();
    if(saveName.value == "" || count.value == "" || sugerCount.value == ""){
        window.alert("أدخل المطلوب رجاءاً");
    }else{
        
        let nameObj = {
            name: saveName.value,
            count: +count.value,
            sugerCount: +sugerCount.value 
        }
        arr.push(nameObj);
        saveName.value = "";
        count.value = "";
        sugerCount.value = "";
        saveArrayInLocal(arr)
    }

    

})

// local storage

function saveArrayInLocal(arr){
    let arrIsString = JSON.stringify(arr);
    window.localStorage.setItem("Names" , arrIsString);
    printNames(arrIsString);
}

// print names from local storage

function printNames(arrIsString){
    image.style.display = "none";
    tbody.innerHTML = "";
    let arrIsParse = JSON.parse(arrIsString);
    arrIsParse.forEach((el , index) =>{
        let row = `
        <th scope="row">${index + 1}</th>
        <td>${el.name}</td>
        <td>${el.count}</td>
        <td>${el.sugerCount} كيلو</td>
        <td><b> ${27 * el.sugerCount} ج.م</b></td>
        <td  onclick="deleteFun(${index})"><span id="icon"><i class="fa-solid fa-trash"></i></span></td>
        `
        tbody.innerHTML += row;
    })

}
function deleteFun(index){
    arr.splice(index , 1)
    localStorage.setItem("Names" , JSON.stringify(arr));
    let x = JSON.stringify(arr);
    if(arr.length <= 1){
        search.style.display = "none"
        deleteAll.style.display = "none"
    }
    printNames(x);

}

// delete All Names


deleteAll.addEventListener("click" , ()=>{
    if(localStorage.getItem("Names")){
        let x = JSON.parse(localStorage.getItem("Names"));
        localStorage.clear();
        deleteAll.style.display = "none";
        tbody.innerHTML = "";
        image.style.display = "block";
        search.style.display = "none";
    }
})

// search

let search_inpt = document.querySelector("#search_inpt");
let search_btn = document.querySelector("#search_btn");

search_inpt.addEventListener("keyup",searchFun);


function searchFun(){
    if(search_inpt.value){
        let x = localStorage.getItem("Names");
            let xParse = JSON.parse(x);
            let emptyArr = [];
            xParse.forEach((el)=>{
                if(el.name.startsWith(search_inpt.value) || el.name == search_inpt.value){
                    emptyArr.push(el);
                    let stringEmptyArr = JSON.stringify(emptyArr);
                    printNames(stringEmptyArr);
                    deleteAll.style.display = "none";
                    alerts.innerHTML = "";
                }
                else{
                    if(emptyArr.length == 0){
                        tbody.innerHTML = "";
                        alerts.style.display = "block";
                        alerts.innerHTML = "<h2 class='text-center py-3 w-100'>هذا الاسم غير مُسجل</h2>"
                    }
                    deleteAll.style.display = "none"
                }
                
            })
        }
        else{
        deleteAll.style.display = "block";
        alerts.style.display = "none";
        printNames(localStorage.getItem("Names"))
    }
}











