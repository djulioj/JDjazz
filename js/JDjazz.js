function activateMusicSpace(){
  const reproductor=document.getElementById("reproductor");
  const Songs=document.getElementById("songs");
  const hr=document.getElementById("line");

  reproductor.classList.remove("hidden");
  hr.classList.remove("hidden"); 

  Songs.addEventListener("click",(e)=>{
    console.log(e.target.classList);
    if(e.target.classList.contains("song")){
      console.log(e.target.getAttribute("cancion"));
      playMusic(e.target.getAttribute("cancion"));
    }
  });
  playBtn();
}

function playMusic(titulo){
  url=canciones.filter(cancion => cancion.nombre === titulo)[0].url;
  audio.src=url;
  audio.play();
  playing=true;
  document.getElementById("playimg").src="../img/pause.png";
}

function prevBtn(){
  const prevButton=document.getElementById("prevBtn");
  if(playingSong==0||playingSong==null){
   prevButton.classList.add("hidden");   
  }else{
    prevButton.classList.remove("hidden");
  }
  prevButton.addEventListener("click",(e)=>{
    playingSong-=1;
    audio.src=canciones[playSong];
    audio.play();
  });
  
}

function nextBtn(){
  const nextButton=document.getElementById("nextBtn");
  if(playingSong==canciones.length-1||playingSong==null){
   nextButton.classList.add("hidden");
  }else{
    nextButton.classList.remove("hidden");
  }
  nextButton.addEventListener("click",(e)=>{
    playingSong+=1;
    audio.src=canciones[playSong];
    audio.play();
  });
}

function clear(element, child){
  console.log(child);
  for(i=0;i<child.length;i++){
    console.log(child[i]);
    element.removeChild(child[i]);
  }
}

function playBtn(){
  const playImg=document.getElementById("playimg");
  document.getElementById("playBtn").addEventListener("click",()=>{
    url="";
    if(playing==false){
      if(playingSong==null){
        url=canciones[0].url;
        audio.src=url;
        playingSong=0;
      }
      console.log(playingSong);
      audio.play();
      playImg.src="../img/pause.png";
      playing=true;
    }else{
      audio.pause();
      playImg.src="../img/boton-de-play.png";
      playing=false;
    }
  }); 
  //prevBtn();
  //nextBtn();
}

function load(){
    const space=document.getElementById("songs");

    if(canciones.length>0){
        const body='<div class="mx-auto flex justify-center max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8" id="list">  </div></div>';
        space.innerHTML+=body;
        const listHTML=document.getElementById("list");
        const child=document.getElementsByClassName("songCard");
        clear(listHTML,child);
        for(i=(pages-1)*8;i<canciones.length && i<pages*8;i++){
          cancion=canciones[i];
          nameSong=cancion.nombre;
          urlSong=cancion.url;
          const song=`
            <div class="group w-fit lg:ml-10 lg:mr-10 song songCard" cancion=${nameSong}>
              <div cancion=${nameSong} class="aspect-w-1 cursor-pointer aspect-h-1 w-48 overflow-hidden rounded-full xl:aspect-w-7 xl:aspect-h-8 song" id="${urlSong}">
                <img cancion=${nameSong} src="./img/1366_2000.jpg " class="flex justify-center  bg-white h-full w-full object-cover object-center group-hover:opacity-75 song">             
              </div>
              <h3 class="flex justify-center text-white mt-4 text-sm song" cancion=${nameSong}>${nameSong}</h3>
            </div>`;
          listHTML.innerHTML+=song;
          // const songCard=document.getElementById(urlSong);
          // songCard.addEventListener("click",(e)=>{
          //   playMusic(songCard.id);
          // });          
          }
          activateMusicSpace();
    }
};

function buttons(){
    const addButton=document.getElementById("addButton");

    addButton.addEventListener("change",(f)=>{
        const files=f.target.files;
        const songs=[];
        for(i=0;i<files.length;i++){
            const file=files[i];
            if(file.type.includes("audio")){
                const name=file.name;
                if (canciones.filter(cancion => cancion.nombre === name).length === 0) {
                    songs.push({
                      nombre: name,
                      url: URL.createObjectURL(file)
                    });
                  }
            }
        }
        document.getElementById("inputTag").value="";
        canciones=canciones.concat(songs);
        load(songs.length);
    });
}

function playSong(){
  
  
}

var playing=false;
var playingSong=null;
var audio=new Audio();
var canciones=[];
var pages =1;
buttons();