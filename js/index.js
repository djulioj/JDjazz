function buttons(){
    const addBtn=document.getElementById("addButton");
    const playBtn=document.getElementById("playBtn");
    const nextBtn=document.getElementById("nextBtn");
    const prevBtn=document.getElementById("prevBtn");
    const spaceList=document.getElementById("songs");

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
        
    });
}

var playing=false;
var playingSong=null;
var audio=new Audio();
var canciones=[];
var page=1;
var totalPages=1;
buttons();