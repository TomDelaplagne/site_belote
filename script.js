const onglets = document.querySelectorAll('.onglet');
const contenus = document.querySelectorAll('.contenu');
const miniOnglets = document.querySelectorAll('.evenement');
const miniContenus = document.querySelectorAll('.Evenement');
const image = document.querySelector('.image');
const suivant = document.querySelector('.rightArrow');
const precedent = document.querySelector('.leftArrow');
const closeErreur = document.querySelector('.btnclosepopup');
const popup = document.querySelector('#popup');
const Contact = document.querySelector('.contact');
let index = "1";
let indexEvenement = [1, 1, 1];
let miniindex = [1, 1, 1];
let photos = [
  [["Logo_Belote.png"]],
  [
    ["Photo_tournoi_22avril.png","Tournoi 22 avril/IMG_20220422_175348.jpg",
    "Tournoi 22 avril/IMG_20220422_175350.jpg",
    "Tournoi 22 avril/IMG_20220422_175356.jpg",
    "Tournoi 22 avril/IMG_20220422_175415.jpg",
    "Tournoi 22 avril/IMG_20220422_175416.jpg",
    "Tournoi 22 avril/IMG_20220422_175417.jpg",
    "Tournoi 22 avril/IMG_20220422_175418.jpg",
    "Tournoi 22 avril/IMG_20220422_194543.jpg",
    "Tournoi 22 avril/IMG_20220422_194548.jpg",
    "Tournoi 22 avril/IMG_20220422_194549.jpg",
    "Tournoi 22 avril/IMG_20220422_194550.jpg",
    "Tournoi 22 avril/IMG_20220422_194551.jpg",
    "Tournoi 22 avril/IMG_20220422_194553.jpg",
    "Tournoi 22 avril/IMG_20220422_194554.jpg",
    "Tournoi 22 avril/IMG_20220422_194555_1.jpg",
    "Tournoi 22 avril/IMG_20220422_194555.jpg",
    "Tournoi 22 avril/IMG_20220422_194556.jpg",
    "Tournoi 22 avril/IMG_20220422_194557.jpg"],
    ["vptasetro.jpg", "Photo_tournoi_tarot.jpg"],
    ["Photo_decouverte.jpeg"]
  ],
  [["coupe elo.png",
  "MEME/1650226733073.jpg",
  "MEME/1650226733079.jpg",
  "MEME/1650226733084.jpg",
  "MEME/1650226733089.jpg",
  "MEME/1650226733096.jpg",
  "MEME/1650226733103.jpg",
  "MEME/1650226733111.jpg",
  "MEME/1650226733115.jpg",
  "MEME/1650226733121.jpg",
  "MEME/1650226733126.jpg",
  "MEME/1650226733130.jpeg",
  "MEME/1650226770816.jpg",
  "MEME/1650226819683.jpg",
  "MEME/1650227969389.jpeg",
  "MEME/1650228128622.jpeg",
  "MEME/1650228985814.jpeg",
  "MEME/received_411472270447225.jpeg",
  "MEME/received_2015053525308256.jpeg"]]
  ];
  
let miniphotos = ["Photo_tournoi_22avril.png", "vptasetro.jpg", "Photo_decouverte.jpeg"];


onglets.forEach( onglet => {
  onglet.addEventListener('click', () => {
    if (onglet.classList.contains('active')){
      return;
    } else{
      onglet.classList.add('active');
    }
    index = onglet.getAttribute('data-anim');
    for(let i = 0; i < onglets.length; i++) {
      if (onglets[i].getAttribute('data-anim') != index) {
        onglets[i].classList.remove('active');
      }
    }
    for(i = 0; i < contenus.length; i++) {
      if (contenus[i].getAttribute('data-anim') == index) {
        contenus[i].classList.add('activeContenu');
      } else  {
        contenus[i].classList.remove('activeContenu');
      }
    }
    if (index == 1) {
      suivant.classList.add('invisible');
      precedent.classList.add('invisible');
    } else {
      suivant.classList.remove('invisible');
      precedent.classList.remove('invisible');
    }
    if (index == 3) {
      document.getElementById('image').style.backgroundSize = 'contain';
      document.getElementById('image').style.backgroundRepeat = 'no-repeat';
    } else {
      document.getElementById('image').style.backgroundSize = 'cover';
      document.getElementById('image').style.backgroundRepeat = 'initial';
    }
    if(indexEvenement[index-1] > photos[index-1].length) {
      indexEvenement[index-1];
    }
    //loader
    const imageUrl = photos[index-1][indexEvenement[index-1]-1][0];
    const bgElement = document.querySelector("#image");
    let preloaderImg = document.createElement("img");
    const loader = document.querySelector('#loaderimg');
    bgElement.style.backgroundImage = `none`;
    loader.style.display = 'flex';
    preloaderImg.src = imageUrl;

    preloaderImg.addEventListener('load', () => {
      bgElement.style.backgroundImage = `url("`+imageUrl+`")`;
      loader.style.display = 'none';
      preloaderImg = null;
    });
  })
})

miniOnglets.forEach( minionglet => {
  minionglet.addEventListener('click', () => {
    if (minionglet.classList.contains('active')){
      return;
    } else{
      minionglet.classList.add('active');
    }
    indexEvenement[index-1] = minionglet.getAttribute('data-minianim');
    for(let i = 0; i < miniOnglets.length; i++) {
      if (miniOnglets[i].getAttribute('data-minianim') != indexEvenement[index-1]) {
        miniOnglets[i].classList.remove('active');
      }
    }
    for(i = 0; i < miniContenus.length; i++) {
      if (miniContenus[i].getAttribute('data-minianim') == indexEvenement[index-1]) {
        miniContenus[i].classList.add('activeEvenement');
      } else  {
        miniContenus[i].classList.remove('activeEvenement');
      }
    }
    if(indexEvenement[index-1] > photos[index-1].length) {
      indexEvenement[index-1] = "1";
    }
    //loader
    const imageUrl = photos[index-1][indexEvenement[index-1]-1][0];
    const bgElement = document.querySelector("#image");
    let preloaderImg = document.createElement("img");
    const loader = document.querySelector('#loaderimg');
    bgElement.style.backgroundImage = `none`;
    loader.style.display = 'flex';
    preloaderImg.src = imageUrl;

    preloaderImg.addEventListener('load', () => {
      bgElement.style.backgroundImage = `url("`+imageUrl+`")`;
      loader.style.display = 'none';
      preloaderImg = null;
    });
  })
})

function slidePrecedente(){
  if (miniindex[indexEvenement[index-1]-1] > 1) {
    miniindex[indexEvenement[index-1]-1] -= 1;
  } else {
    miniindex[indexEvenement[index-1]-1] = photos[index-1][indexEvenement[index-1]-1].length;
  }
  //loader
  const imageUrl = photos[index-1][indexEvenement[index-1]-1][miniindex[indexEvenement[index-1]-1]-1];
  const bgElement = document.querySelector("#image");
  let preloaderImg = document.createElement("img");
  const loader = document.querySelector('#loaderimg');
  bgElement.style.backgroundImage = `none`;
  loader.style.display = 'flex';
  preloaderImg.src = imageUrl;

  preloaderImg.addEventListener('load', () => {
    bgElement.style.backgroundImage = `url("`+imageUrl+`")`;
    loader.style.display = 'none';
    preloaderImg = null;
  });
}
precedent.addEventListener('click', slidePrecedente)

function slideSuivante(){

  if (miniindex[indexEvenement[index-1]-1] < photos[index-1][indexEvenement[index-1]-1].length) {
    miniindex[indexEvenement[index-1]-1] += 1;
  } else {
    miniindex[indexEvenement[index-1]-1] = 1;
  }
  const imageUrl = photos[index-1][indexEvenement[index-1]-1][miniindex[indexEvenement[index-1]-1]-1];
  const bgElement = document.querySelector("#image");
  let preloaderImg = document.createElement("img");
  const loader = document.querySelector('#loaderimg');
  bgElement.style.backgroundImage = `none`;
  loader.style.display = 'flex';
  preloaderImg.src = imageUrl;

  preloaderImg.addEventListener('load', () => {
    bgElement.style.backgroundImage = `url("`+imageUrl+`")`;
    loader.style.display = 'none';
    preloaderImg = null;
  });
}
suivant.addEventListener('click', slideSuivante);


function keyPress(e){
  
  if(e.keyCode === 37){
      slidePrecedente();
  } else if(e.keyCode === 39){
      slideSuivante();
  }
}
document.addEventListener('keydown', keyPress);

closeErreur.addEventListener('click',close_popup);
Contact.addEventListener('click',open_popup);

function open_popup() {
  popup.className = 'popupactive';
}

function close_popup()
{
  popup.className = 'popupinactive';
  let dates = document.querySelectorAll('.date');
  dates.forEach(date => {
    date.classList.remove('animated');
  })
  let noms = document.querySelectorAll('.nom');
  noms.forEach(nom => {
    nom.classList.remove('animated');
  })
  let comments = document.querySelectorAll('.comment');
  comments.forEach(comment => {
    comment.classList.remove('animated');
  })
}


async function GetTextContent() {
	try {
		let text_data = await downloadFile();
    let text_array = text_data.split("\n");
    let nb_participants = text_array[0].slice(0, 2);
    let para0 = document.createElement('p');
    para0.classList.add('nb_participants');
    para0.textContent = "Nb de participants : " + nb_participants;
    document.querySelector(".leaderboardContainer").appendChild(para0);
    let i=1;
    text_array.slice(1, -1).forEach(ligne => {
      ligne = ligne.split(" ");
      let div = document.createElement('div');
      let para = document.createElement('span');
      let numero = document.createElement('span');
      let boulle = document.createElement('span');
      let bar = document.createElement('span');
      let elo = document.createElement('span');
      div.classList.add('personne');
      div.setAttribute('id','personne'+i);
      para.classList.add('nom_participants');
      boulle.classList.add('boulle');
      boulle.setAttribute('id','boulle'+i);
      numero.classList.add('Classement');
      para.textContent = ligne[0];
      bar.classList.add('bar');
      elo.classList.add('elo');
      elo.textContent = ligne[1];
      if (i == 1) {numero.textContent = i + "er";}
       else if (i ==2) {numero.textContent = i + "nd";}
       else if (i >= 3) {numero.textContent = i + "ème";}
      document.querySelector(".leaderboardContainer").appendChild(div);
      document.querySelector("#personne" + i).appendChild(numero);
      document.querySelector("#personne" + i).appendChild(para);
      document.querySelector("#personne" + i).appendChild(boulle);
      document.querySelector("#personne" + i).appendChild(elo);
      document.querySelector("#personne" + i).appendChild(bar);
      if(window.screen.width > 599) {
        document.querySelector("#boulle"+i).style.margin = "0 0 0 " + (ligne[1]*0.05 - 35) + "vh";
      } else {
        document.querySelector("#boulle"+i).style.margin = "0 0 0 " + (ligne[1]*0.2- 180) + "vh";
      }

      i++;
    })
	}
	catch(e) {
		alert(e.message);
	}
}

const boulles = document.querySelectorAll('.boulle');
boulles.forEach(boulle => {
  boulle.addEventListener('click', () => {
    if(window.screen.width > 599) {
      console.log("salut");
      document.querySelectorAll('.elo').forEach(elo => {
        elo.style.display = "inline-block";
        console.log("salut2");
      });
    } else {
      return;
    }
  });
});

async function downloadFile() {
	let response = await fetch("Elo_belote_classe.txt");
		
	if(response.status != 200) {
		throw new Error("Server Error");
	}
		
	// read response stream as text
	let text_data = await response.text();

	return text_data;
}

GetTextContent();


document.getElementById('dragAndDrop').addEventListener('change', () => {
  let files = document.getElementById('dragAndDrop').files
  let nbdoc = document.getElementById('dragAndDrop').files.length;
  let Imgs = "";
  if (nbdoc == 0) {
    document.getElementById('dragAndDroptext').innerHTML = "Déposez vos photos ici !!";
    return;
  }
  for (i=0;i<nbdoc;i++){
    Imgs += "[" + files[i].type + " : " + files[i].name +" ]<br/>";
  }
  document.getElementById('dragAndDroptext').innerHTML = nbdoc + " photos selectionnées<br/>" + Imgs;
});


document.getElementById('commentaireBouton').addEventListener('click', SendComment);

function SendComment() {
  const Nom = document.getElementById('name');
  const Mail = document.getElementById('Adresse Mail');
  const Commentaire = document.getElementById('Commentaire');
  var today = new Date();
  var date = today.getDate()+':'+(today.getMonth()+1)+':'+today.getFullYear()+'_'+today.getHours()+'h:'+today.getMinutes()+'min:'+today.getSeconds()+'s';
  let Fichier = Mail.value + '\n' + Commentaire.value +'\n' + date;
  const file = new File([Fichier], Nom.value.replace(" ","")+"_"+date+".txt", {
    type: "text/plain",
  });
  console.log(Nom.value + '\n' + Mail.value + '\n' + Commentaire.value +'\n' + date);
  uploadCom(file);
  Nom.value = '';
  Mail.value = '';
  Commentaire.value ='';
}

function uploadFile() {

  var files = document.getElementById("dragAndDrop").files;
  console.log(files)
  if(files.length > 0 ){
    if(files.length == 1 ) {
      var formData = new FormData();
      formData.append("file", files[0]);

      var xhttp = new XMLHttpRequest();

      // Set POST method and ajax file path
      xhttp.open("POST", "ajaxfile.php", true);

      // call on request changes state
      xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {

            var response = this.responseText;
            if(response == 1){
              alert("Upload successfully.");
            }else{
              alert("File not uploaded.");
            }
          }
      };

      // Send request with data
      xhttp.send(formData);

    } else if (files.length > 1) {
      for (let i=0;i<files.length;i++) {
        var formData = new FormData();
        formData.append("file", files[i]);
  
        var xhttp = new XMLHttpRequest();
  
        // Set POST method and ajax file path
        xhttp.open("POST", "ajaxfile.php", true);
  
        // call on request changes state
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
  
              var response = this.responseText;
              if(response == 1){
                alert("Upload successfully.");
              }else{
                alert("File not uploaded.");
              }
            }
        };
  
        // Send request with data
        xhttp.send(formData);
        }}
    } else{
     alert("Please select a file");
  }

};

/*document.getElementById("dragAndDropButton").addEventListener('click', (e) => { e. preventDefault()});*/

async function uploadCom(file) {
  let formData = new FormData();           
  formData.append("file", file);
  await fetch('./upload.php', {
    method: "POST", 
    body: formData
  });
  alert('Ton commentaire à été uploadé avec succès.');

}


/*document.getElementById('dragAndDropButton').addEventListener('click', () => {
  let i=0;
  alert("salut !");
  fileupload.files.forEach(file => uploadPhoto(file));
  alert('Photos upload avec succès !');
})

async function uploadPhoto() {
  let formData = new FormData();
  formData.append("file", file);
  await fetch('./upload.php', {
    method: "POST", 
    body: formData
  });
  alert('Ta' + i + 'ème photo à été uploadé avec succès.');
  i++;
};*/
  

const boxs = document.querySelectorAll('.box');
const labels = document.querySelectorAll('.label');
const Noms = document.querySelectorAll('.Nom');
let init = "";
boxs.forEach(box => {
  box.addEventListener('mouseenter', () => {
    let nb = box.getAttribute('data-photo');
    labels.forEach(label => {
      if (label.getAttribute('data-photo') == nb) {
        label.classList.remove('inactive');
      }
    });
    Noms.forEach(Nom => {
      if (Nom.getAttribute('data-photo') == nb) {
        Nom.classList.add('hover');
      }
    });
  });
  box.addEventListener('mouseleave', () => {
    let nb = box.getAttribute('data-photo');
    labels.forEach(label => {
      if (label.getAttribute('data-photo') == nb) {
        label.classList.add('inactive');
      }
    });
    Noms.forEach(Nom => {
      if (Nom.getAttribute('data-photo') == nb) {
        Nom.classList.remove('hover');
      }
    });
  });
});

popup.addEventListener('click', () => {
  if (popup !== event.target) {return};
  close_popup();
});


const scrollers = document.querySelectorAll('.scroller');
scrollers.forEach(scroller => {
  scroller.addEventListener('mouseenter', () => {
    scroller.style.overflowY = 'scroll';
    scroller.style.overflowY = 'overlay';
  });
  scroller.addEventListener('mouseleave', () => {
    if(window.screen.width > 599) {
      scroller.style.overflowY = 'hidden';
    }
  });
});
var sUsrAg = navigator.userAgent;
console.log("Voici l'agent utilisateur du navigateur courant", sUsrAg);


//Loader
document.onreadystatechange = function() 
{
  if (document.readyState != "complete") 
  {
    document.querySelector(".parent").style.display = "none";
    document.querySelector("#loader").style.display = "initial";
  } 
  else 
  {
    document.querySelector("#loader").style.display = "none";
    document.querySelector(".parent").style.display = "grid";
  }
};

document.querySelector('#Elobtn').addEventListener('click', () => {
  document.querySelector('.ecranPetit').style.display = 'none';
  document.querySelector('.leaderboardContainer').style.display = 'block';
});


const infobtn = document.querySelector('#infoIcon');
const infopopup = document.querySelector('.infopopup');

infobtn.addEventListener('click', () => {
  if (infopopup.style.display == 'none') {
    infopopup.style.display = 'flex'
  } else {
    infopopup.style.display = 'none';
  }
});

infopopup.addEventListener('click', () => {
  infopopup.style.display = 'none';
});

infopopup.addEventListener('mouseleave', () => {
  infopopup.style.display = 'none';
});

let list_com;
let list_coms = [];

async function getCommentaires () {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      list_com = this.responseText;
      //list_com = list_com.replace(" ", "");
      list_com = list_com.split(",");
      list_com.forEach(com => {
        if ((com != 'Template.txt') && (com != ';')) {
          list_coms.push(com);
        }
      });

    }
  };
  xmlhttp.open("GET", "dir.php", true);
  xmlhttp.send();
}

getCommentaires();

const refreshbtn = document.querySelector('.refresh');

document.querySelector('.commentaireContainer').addEventListener('mouseenter', () => {
  refreshbtn.style.display = 'flex';
});
document.querySelector('.commentaireContainer').addEventListener('mouseleave', () => {
  refreshbtn.style.display = 'none';
});

document.querySelector('.refresh').addEventListener('click', refresh);

async function refresh () {
  try{
    let coms = [];
    let j=1;
    /*let dates = document.querySelectorAll('.date');
    dates.forEach(date => {
      date.style.animationDelay = '0.5s';
    })
    let comments = document.querySelectorAll('.comment');
    comments.forEach(comment => {
      comment.style.animationDelay = '1s';
    })*/
    while (j <= 3) {
      document.querySelector("#nom" + j).classList.remove('animated');
      document.querySelector("#date" + j).classList.remove('animated');
      document.querySelector("#comment" + j).classList.remove('animated');
      let newcom = list_coms[Math.floor(Math.random()*list_coms.length)];
      if (!coms.includes(newcom)) {
        coms.push(newcom);
        let com_text = await downloadCom('./Commentaires/'+newcom);
        let com = com_text.split("\n");
        let nom = newcom.split("_");
        document.querySelector("#nom" + j).textContent = nom[0];
        document.querySelector("#comment" + j).textContent = com[1];
        let date = com[2];
        date = date.split('_');
        let date2 = date[0].split(':');
        let dateformat = '';
        let k=0;
        date2.forEach(d => {
          if (k < 2) {
            if (d < 10) {
              d = '0' + d;
            }
            dateformat += d + '/';
          } else {
            dateformat += d;
          }
          k++;
        })
        document.querySelector("#date" + j).textContent = dateformat;
        document.querySelector("#nom" + j).classList.add('animated');
        document.querySelector("#date" + j).classList.add('animated');
        document.querySelector("#comment" + j).classList.add('animated');
        j++;
      }
    }
  }
  catch(e) {
		alert(e.message);
	}
};

async function downloadCom(com) {
	let response = await fetch(com);

	if(response.status != 200) {
		throw new Error("Server Error");
	}
		
	// read response stream as text
	let text_data = await response.text();

	return text_data;
}