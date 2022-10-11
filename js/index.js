function buttons(){
    const addBtn=document.getElementById("addButton");
    const playBtn=document.getElementById("playBtn");
    const nextBtn=document.getElementById("nextBtn");
    const prevBtn=document.getElementById("prevBtn");
    const spaceList=document.getElementById("songs");
    const nextPage=document.getElementById("nextpage");
    const prevPage=document.getElementById("prevpage");

    addBtn.addEventListener("change",(e)=>{
        const files=e.target.files;
        const songs=[];

        for(i=0;i<files.length;i++){
            file=files[i];
            if(file.type.includes("audio")){
                nameSong=file.name;
                if(canciones.filter(cancion => cancion.nombre === nameSong).length===0){
                    songs.push({
                        nombre: nameSong,
                        url: URL.createObjectURL(file)
                    });
                }
            }
        }
        document.getElementById("inputTag").value="";
        canciones=canciones.concat(songs);
        console.log(canciones);
        load();
    });

    playBtn.addEventListener("click",(e)=>{
        const playImg=document.getElementById("playimg");
        url="";
        if(playing==false){
            if(playingSong==null){
                url=canciones[0].url;
                audio.src=url;
                playingSong=0;
            }
            audio.play();
            playImg.src="../img/pause.png";
            playing=true;
            }else{
            audio.pause();
            playImg.src="../img/boton-de-play.png";
            playing=false;
        }
    });

    prevBtn.addEventListener("click",(e)=>{
        if(playingSong===null || playingSong<=0){
            playingSong=canciones.length-1;
        }else{
            playingSong--;
        }
        console.log(playingSong);
    });

    nextBtn.addEventListener("click",(e)=>{
        if(playingSong>=canciones.length-1){
            playingSong=0;
        }else{
            playingSong++;
        }
        console.log(playingSong);
    });

    spaceList.addEventListener("click",(e)=>{
        if(e.target.classList.contains("song")){
            console.log(e.target.getAttribute("cancion"));
        }
    });

    prevPage.addEventListener("click",(e)=>{
        page--;  
        console.log(page);  
    });

    nextPage.addEventListener("click",(e)=>{
        page++; 
        console.log(page);    
    });
}

function btnNoList(){
    const reproductor=document.getElementById("reproductor");
    
    reproductor.classList.add("hidden");
}

function btnWithList(){
    const reproductor=document.getElementById("reproductor");
    
    reproductor.classList.remove("hidden");
}

function load(){
    const space=document.getElementById("songs");
    if(canciones.length>0){
        btnWithList();
        const body='<div class="mx-auto flex justify-center max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8" id="list">  </div></div>';
        space.innerHTML=body;
        const listHTML=document.getElementById("list");
        for(i=(page-1)*8;i<canciones.length && i<page*8;i++){
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
          }
    }else{
        btnNoList();
    }
}

var playing=false;
var playingSong=null;
var audio=new Audio();
var canciones=[];
var page=1;
var totalPages=1;
buttons();
load();