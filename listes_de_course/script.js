//var r = document.querySelector(':root');
const addelement = document.querySelector('.addelement');
const newelementtext = document.querySelector('.newelementtext');
const elementcontainer = document.querySelector('.elementscontainer');
class listClass {
    constructor(nom, elements, date, fav) {
        this.nom = nom;
        this.elements = elements;
        this.date = date;
        this.fav = fav;
    }
}
let list_test = new listClass('Test', [], 'XX/XX/XXXX', false);
// let actual_list_active = new listClass('Nom de la liste', [], 'XX/XX/XXXX', false)

class listsClass {
    constructor(user, content) {
        this.user = user;
        this.content = content;
    }
} 

let lists = new listsClass(null, []);
class elementClass {
    constructor(text, acces, check) {
        this.text = text;
        this.check = check;
        this.acces = acces;
    }
}


document.addEventListener('keydown', keyPress);

function keyPress(e) {
    if ((e.keyCode === 13) && (document.querySelector('.newelementtext') == document.activeElement)){
        addelementtext();
    }
}

function addelementtolist(elementtext, node, checked) {
    let element = new elementClass(elementtext, node, checked);
    actual_list_active.elements.push(element);
    refreshdate();
}


document.querySelector('#connection').addEventListener('click', () => {
    displaypopup();
    document.querySelector('.creditcontainer').style.display = 'none';
    document.querySelector('.inscriptioncontainer').style.display = 'none';
    document.querySelector('.connectioncontainer').style.display = 'block';
});

document.querySelector('#inscription').addEventListener('click', () => {
    displaypopup();
    document.querySelector('.creditcontainer').style.display = 'none';
    document.querySelector('.connectioncontainer').style.display = 'none';
    document.querySelector('.inscriptioncontainer').style.display = 'block';
});

document.querySelector('.credit').addEventListener('click', () => {
    displaypopup();
    document.querySelector('.inscriptioncontainer').style.display = 'none';
    document.querySelector('.connectioncontainer').style.display = 'none';
    document.querySelector('.creditcontainer').style.display = 'block';
});

function displaypopup() {
    document.querySelector('#popup').style.display = 'block';
    document.querySelector('#popup').addEventListener('click',  () => {
        if (document.querySelector('#popup') !== event.target) {return};
        closepopup();
      });
    document.querySelector('#closebtn').addEventListener('click', closepopup);
}


function closepopup() {
    document.querySelector('#popup').style.display = 'none';
}

function resetCheckbox () {
    document.querySelectorAll(".checkbox").forEach(checkbox => {
        checkbox.addEventListener('click', () => {
            if (checkbox.classList.value.includes('notdone')) {
                checkbox.classList.remove('notdone');
                checkbox.classList.add('done');
                checkbox.parentNode.style.color = 'var(--light-green)';
            } else if (checkbox.classList.value.includes('done')) {
                checkbox.classList.remove('done');
                checkbox.classList.add('notdone');
                checkbox.parentNode.style.color = 'var(--yellow)';
            }
            refreshactuallist();
        });
    });
    document.querySelectorAll('.element').forEach(element => {
        element.addEventListener('contextmenu', (ev) => {
            ev.preventDefault();
            element.parentNode.removeChild(element);
            refreshactuallist();
        });
    });
}

function refreshactuallist() {
    actual_list_active.elements = [];
    document.querySelectorAll('.element').forEach(element => {
        addelementtolist(element.childNodes[3].textContent, element, !(element.childNodes[1].classList.value.includes('notdone')));
    });
    refreshlists();
};


addelement.addEventListener('click', addelementtext);


function addelementtext() {
    if (newelementtext.value !== '') {
        elementcontainer.innerHTML = `<li class="element">
            <input class="checkbox notdone" type="checkbox"/>
            <span class="elementtext">`+ newelementtext.value + `</span>
            <button class="supprelement"><img src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"/></button>
        </li>` + elementcontainer.innerHTML;
        addelementtolist(newelementtext.value, document.querySelectorAll('.elementtext')[0].parentNode, false);
        newelementtext.value = '';
        refreshactuallist();
        resetCheckbox();
        resetsupprbtn();
    }
};

function resetsupprbtn() {
    const closebtns = document.querySelectorAll('.supprelement');
    closebtns.forEach(closebtn => {
        closebtn.addEventListener('click', () => {
            closebtn.parentNode.parentNode.removeChild(closebtn.parentNode);
            refreshactuallist();
            refreshdate();
        });
    });
};

/* function resetelementtext() {
    const textEls = document.querySelectorAll('.elementtext');
    textEls.forEach(textEl => {
        textEl.addEventListener('click', () => {

        });
    });
} */


function refreshdate() {
    var today = new Date();
    let month = today.getMonth()+1;
    let day = today.getDate();
    if (month < 10) { month = '0' + month }
    if (day < 10) { day = '0' + day; }
    actual_list_active.date = day+'/'+month+'/'+today.getFullYear();
    document.querySelector('.listdate').textContent = actual_list_active.date;
    refreshlists();
}

function refreshlists() {
    let exist = false;
    lists.content.forEach(newlist => {
        if(newlist.nom === actual_list_active.nom) {
            newlist = actual_list_active;
            exist = true;
            return;
        }
    });
    if (!exist) {
        lists.content.push(actual_list_active);
    }
    refreshLS();
}

const nomactuallist = document.querySelector(".listnom");


nomactuallist.addEventListener('input', changelistname);
// changelistname(actual_list_active, true);

function changelistname(first) {
    nomactuallist.style.width = nomactuallist.value.length + "ch";
    actual_list_active.nom = nomactuallist.value;
    if (first) {
        refreshdate();
    }
}

const mainfavbtn = document.querySelector('#mainfavbtn');

mainfavbtn.addEventListener('click', addtofavactual);

function addtofavactual() {
    if (!actual_list_active.fav) {
        actual_list_active.fav = true;
        mainfavbtn.innerHTML = '<img class="heartfav" src="https://img.icons8.com/material-sharp/24/000000/like--v1.png"/>';
    } else if (actual_list_active.fav) {
        actual_list_active.fav = false;
        mainfavbtn.innerHTML = '<img src="https://img.icons8.com/fluency-systems-regular/48/000000/like--v1.png"/>';
    }
    refreshlists();
}



function refreshLS() {
    localStorage.setItem('listsLS', JSON.stringify(lists));
    listleft(lists);
}

const listcontainer = document.querySelector('.listcontainer');

if (JSON.parse(localStorage.getItem('listsLS')) != null) {
    lists = JSON.parse(localStorage.getItem('listsLS'));
    listleft(lists);
} else {
    listcontainer.innerHTML = ``
}


function listleft(lists) {
    listcontainer.innerHTML = '';
    lists.content.forEach(list => {
        let fav = '';
        if (list.fav) {
            fav = `<img class="heartfav" src="https://img.icons8.com/material-sharp/24/000000/like--v1.png"/>`
            listcontainer.innerHTML += `
            <li class="list">
                <h1 class="nom">`+ list.nom +`</h1>
                <span class="date">`+ list.date +`</span>
                <button class="favbtn">`+ fav  +`</button>
            </li>`
        }
    });
    lists.content.forEach(list => {
        let fav = '';
        if (!list.fav) {
            fav = `<img class="heartfav" src="https://img.icons8.com/fluency-systems-regular/48/000000/like--v1.png"/>`
            listcontainer.innerHTML += `
            <li class="list">
                <h1 class="nom">`+ list.nom +`</h1>
                <span class="date">`+ list.date +`</span>
                <button class="favbtn">`+ fav  +`</button>
            </li>`
        }
    });
    refreshlistbtn();
};

const researchbar = document.querySelector('.research')
researchbar.addEventListener('input', searchbar);

function searchbar() {
    listcontainer.childNodes.forEach(list => {
        if ((list.classList != null) && (list.classList.value.includes('list'))) {
            list.childNodes.forEach(nom => {
                if (nom.classList != null && nom.classList.value.includes('nom'))  {
                    if (nom.innerHTML.toUpperCase().includes(researchbar.value.toUpperCase())) {
                        list.hidden = false;
                    } else {
                        list.hidden = true;
                    }
                }
            });
        };
    });
}


function refreshlistbtn() {
    // refresh actual_list_active
    listcontainer.childNodes.forEach(list => {
        if ((list.classList != null) && (list.classList.value.includes('list'))) {
            list.childNodes.forEach(nom => {
                nom.addEventListener('click', () => {
                    if (nom.classList != null && nom.classList.value.includes('nom'))  {
                        lists.content.forEach(list_LS => {
                            if (list_LS.nom == nom.textContent) {
                                actual_list_active = list_LS;
                                refrechcenter(actual_list_active);
                            };
                        });
                    };
                })
            });
        }});
        refreshfavbtnleft()
}


function refrechcenter(actual_list) {
    // set display of center if not
    const center = document.querySelector(".centercontainer");
    if (center.style.display == 'none') {
        center.style.display = 'block';
    }
    // place list to center
    nomactuallist.value = actual_list.nom;
    nomactuallist.style.width = nomactuallist.value.length + "ch";
    document.querySelector('.listdate').textContent = actual_list.date;
    if (actual_list.fav) {
        document.querySelector('#mainfavbtn').innerHTML = `<img class="heartfav" src="https://img.icons8.com/material-sharp/24/000000/like--v1.png"/>`;
    } else {
        document.querySelector('#mainfavbtn').innerHTML = `<img class="heartfav" src="https://img.icons8.com/fluency-systems-regular/48/000000/like--v1.png"/>`;
    }
    elementcontainer.innerHTML = `<span class="info">
        right click to suppr
        </span>`;
    actual_list.elements.forEach(element => {
        let check = 'notdone';
        if (element.check) {
            color = `style="color: var(--light-green);"`
            check = 'done';
        } else {
            color = `style="color: var(--yellow);"`;
            check = 'notdone';
        }
        elementcontainer.innerHTML = `<li class="element" `+ color + `>
            <input class="checkbox ` + check + `" type="checkbox"/>
            <span class="elementtext">`+ element.text + `</span>
            <button class="supprelement"><img src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"/></button>
        </li>` + elementcontainer.innerHTML;
    });
    resetCheckbox();
    resetsupprbtn();
}



function refreshfavbtnleft() {    
    const favbtns = document.querySelectorAll('.favbtn');
    favbtns.forEach(favbtn => {
        if (favbtn.id != 'mainfavbtn') {
            favbtn.addEventListener('click', () => {
                favbtn.parentElement.childNodes.forEach(nom => {
                    if (nom.classList != null && nom.classList.value.includes('nom')) {
                        lists.content.forEach(list => {
                            if (list.nom === nom.textContent) {
                                if (!list.fav) {
                                    list.fav = true;
                                    favbtn.innerHTML = '<img class="heartfav" src="https://img.icons8.com/material-sharp/24/000000/like--v1.png"/>';
                                } else if (list.fav) {
                                    list.fav = false;
                                    favbtn.innerHTML = '<img src="https://img.icons8.com/fluency-systems-regular/48/000000/like--v1.png"/>';
                                }
                            } 
                        })
                    }
                })
            refreshLS();
            });
        }
    })
};


document.querySelector('.centeraddlist').addEventListener('click', () => {
    actual_list_active = new listClass('', [], 'XX/XX/XXXX', false)
    refrechcenter(actual_list_active);
});

document.querySelector('.addlist').addEventListener('click', () => {
    actual_list_active = new listClass('', [], 'XX/XX/XXXX', false)
    refrechcenter(actual_list_active);
});

const deletebtn = document.querySelector('.deletelist')

deletebtn.addEventListener('click', () => {
    lists.content = lists.content.filter(function(value, index, arr){ 
        return value != actual_list_active;
    });
    listleft(lists);
    document.querySelector(".centercontainer").style.display = 'none';
});


const filter = document.querySelector('.filter');
filter.addEventListener('input', () => {
    if (filter.value == 'all') {
        document.querySelectorAll('.elementtext').forEach(element => {
            element.parentNode.style.display = 'flex';
        });
    } else {
        document.querySelectorAll('.elementtext').forEach(element => {
            element.parentNode.childNodes.forEach(checkbox => {
                if (checkbox.classList != null && checkbox.classList.value.includes('checkbox')) {
                    // console.log(checkbox.classList[1] == filter.value)
                    if (checkbox.classList[1] == filter.value) {
                        element.parentNode.style.display = 'flex';
                    } else {
                        element.parentNode.style.display = 'none';
                    }
                }
            })
        })
    }
})


console.log(lists.user);
updateServerStorage();
lists.user = 'Tom';
updateServerStorage();

async function updateServerStorage() {
    if (lists.user != null) {
        const location = "./lists/users" + lists.user;
        const storage = new FormData();
        storage.append('location', location);
        // storage.append('token', getCookie('token'));
        storage.append('user', lists.user);
        storage.append('content', lists.content);
        fetch("./upload.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(storage)
        }).then(response => {
            return JSON.stringify(response);
        }).then(data => {
            console.log(data);
        });
        console.log('here');
    } else {
        console.log('pas de user en memoire');
    }
}