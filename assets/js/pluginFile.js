let mainArray;
(function (pWindow) {
    if (typeof pWindow.CustomList == "function") {
        throw new Error("CustomList function already defined");
    }
    let CustomList = function (pId, options) {
        if (!(this instanceof CustomList)) {
            return new CustomList(pId, options);
        }
        this.domEl = document.getElementById(pId);
        if (!this.domEl) {
            throw new Error("dom not found");
        }
        mainArray = options.data.ProductCollection;
        this.displayList();
    };
    CustomList.prototype.displayList = function () {

        // console.log(mainArray);
    }
    pWindow.CustomList = CustomList;
})(window)

// ======================================== add ======================================== //
$("#errormessage").hide()
function add() {
    if (!$("#userInput").val() == "") {
        $("#errormessage").hide()
        let username = $("#userInput").val()
        let firstOne;
        firstOne = `<div class="col-md-4 mt-3" id="nn">`
        firstOne += `<input type="text" placeholder="search products..." onkeyup="filter($(this).val(),this)">`
        firstOne += `<div class="text-center mt-2"><h5>Welcome:${username}</h5></div>`
        firstOne += `<div class="main mt-3" id="super">`
        for (let i = 0; i < mainArray.length; i++) {
            firstOne +=
                `<div class="row p-2" id="displayitem">
            <span><input type="checkbox" onclick="checklist(${mainArray[i].Price},this)" id=""> <img src="${mainArray[i].ProductPicUrl}" alt=" "> ${mainArray[i].Name}</span>      
            </div>`
        }
        firstOne += `</div>`
        firstOne += `<div class="mt-3">
        <div class="col-md-4"><button type="button"  class="btn btn-success Ok">Ok</button>
        <button type="button" class="btn btn-success cancel">Cancel</button></</div>
        </div>`
        firstOne += `<div id="secondDiv" class="main1 rounded mt-3"></div> </div>`
        $("#firstDiv").append(firstOne);
    }
    else {
        $("#errormessage").show();
    }
}

// ===================================================  ================================== //

$("#showbtn").on("click", () => {
    add();
    display();
    displaynone();
})

function display() {
    $(".Ok").on("click", function () {
        //$(this).parent()
        $(this).parents("#nn").find("#secondDiv").show();
    })
}

function displaynone() {
    $(".cancel").on("click", function () {
        $(this).parents("#nn").find("#secondDiv").hide();
    })
}

// ======================================================= checklist ==================================== //

let secondOne;
function checklist(id, e) {
    for (var i = 0; i < mainArray.length; i++) {
        if (id == mainArray[i].Price) {
            secondOne = `<div class="row">
            <span><img src="${mainArray[i].ProductPicUrl}" alt=" ">${mainArray[i].Name}</span>
            </div>`
            $(e).parents("#nn").find("#secondDiv").append(secondOne);
        }
    }
}

// =========================================================== Filter =======================================//
let thirdOne
function filter(n,s){
    var name = n.trim().toLowerCase();
    $(s).next().next().html('');
    for(var i=0;i<mainArray.length;i++){
        if(mainArray[i].Name.trim().toLowerCase().includes(name)){
            thirdOne =  `<div class="row">
            <span><img src="${mainArray[i].ProductPicUrl}" alt=" ">${mainArray[i].Name}</span>
            </div>`
            $(s).next().next().append(thirdOne);
        }        
    }
}