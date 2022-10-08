function loadSongs(){
    const space=document.getElementById("songs");

    if(canciones.length>0){
        const body='<div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"> <div class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8" id="list">  </div></div>';
        space.innerHTML+=body;
        const listHTML=document.getElementById("list");
        for(i=(pages-1)*8;i<canciones.length && i<pages*8;i++){
            cancion=canciones[i];
            nameSong=cancion.nombre;
            const song=`<div class="group cursor-pointer w-fit">
            <div class="aspect-w-1 aspect-h-1 w-48 overflow-hidden rounded-full xl:aspect-w-7 xl:aspect-h-8">
              <img src="./img/1366_2000.jpg " class="bg-white h-full w-full object-cover object-center group-hover:opacity-75">
            </div>
            <h3 class="flex justify-center text-white mt-4 text-sm">nameSong</h3>
          </div>`;
          listHTML.innerHTML+=song;
        }
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

        canciones=canciones.concat(songs);
        loadSongs();
    });
}

var canciones=[];
var pages=1;
buttons();