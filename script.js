const resultContainerTag = document.querySelector(".resultContainer")
const inputtag = document.querySelector(".autoCompleteInput")
const audioTag = document.getElementsByClassName("audiotag")[0];
const fi = document.querySelector(".fi");
const selectedsongctn= document.querySelector(".ssc")
const bty = document.querySelector(".bty")
const currentAndTotalTimeTag = document.getElementsByClassName("currentAndTotaLTime")[0];
const progressbar = document.getElementById("progressBar");
const currentprogressbar= document.getElementById("currentProgress");
const musicplayertag= document.getElementsByClassName("musicPlayer")[0];
const playbuttontag= document.getElementsByClassName("playButton")[0];
const pausebuttontag= document.getElementsByClassName("pauseButton")[0];
const previoustag= document.getElementsByClassName("previousButton")[0];
const nextbuttontag= document.getElementsByClassName(" nextButton")[0];



const songs = [{id:"1",songid:"music/'Blue Bird' - ikimono - gakari (LYRIC) OP 3 Naruto Shippuden-0qP9jkdRsYU.mp3",songimage:"http://images2.fanpop.com/image/photos/9700000/Team-7-naruto-9735585-1024-768.jpg",songtitle:"BLUE BIRD(NARUTO OST)"},
               {id:"2", songid:"music/Attack on Titan Season 4 Ending  Song.mp3",songimage:"https://culturedvultures.com/wp-content/uploads/2018/07/Attack-On-Titan.jpg",songtitle:"AOT S4 END OST"},
               {id:"3", songid:"music/Demon Slayer - Kimetsu no Yaiba Season 2 Opening Full 『Aimer - Zankyou Sanka』-FCgACOkmwtg.mp3",songimage:"https://c4.wallpaperflare.com/wallpaper/114/538/572/anime-demon-slayer-kimetsu-no-yaiba-genya-shinazugawa-giyuu-tomioka-inosuke-hashibira-hd-wallpaper-preview.jpg",songtitle:"AIMER"},
               { id:"4",songid:"music/Jujutsu Kaisen - Opening 2 Full『VIVID VICE』by Who-ya Extended-BBxgzISkCLQ.mp3",songimage:"https://assets.promediateknologi.com/crop/0x0:0x0/x/photo/2022/05/31/2452387941.jpg",songtitle:"VIVID VICE"},
               {id:"5", songid: "music/Demon Slayer OP Full 'Gurenge' by LiSA-XjvaJH8aRc0.mp3",songimage:"https://c4.wallpaperflare.com/wallpaper/114/538/572/anime-demon-slayer-kimetsu-no-yaiba-genya-shinazugawa-giyuu-tomioka-inosuke-hashibira-hd-wallpaper-preview.jpg",songtitle:"GURENGE"},
               { id:"6",songid:"music/Jujutsu Kaisen - Opening Full『Kaikai Kitan』by Eve-i1P-9IspBus.mp3",songimage:"https://assets.promediateknologi.com/crop/0x0:0x0/x/photo/2022/05/31/2452387941.jpg",songtitle:"KAIKAI KITAN"},
               ]
        
      

               
inputtag.addEventListener("change",(event)=>{
  
  
    let filteredsong= [];
    resultContainerTag.innerHTML="";
    fi.innerHTML="";
    selectedsongctn.innerHTML="";
    
    audioTag.src="";
    
    
    
    
    
    
  const searchText = event.target.value.toLowerCase();
  if(searchText.length===0){
    return
  }
  
  filteredsong= songs.filter((product) => {
    return product.songtitle.toLowerCase().includes(searchText);
  });

  const hasProductsToShow = filteredsong.length > 0;
  if (hasProductsToShow) {
    for (let i = 0; i < filteredsong.length; i++) {
      const songctn = document.createElement("div");
      songctn.classList.add("songctn");
      
      const Songname= document.createElement("div");
      Songname.classList.add("songname");
      Songname.append(filteredsong[i].songtitle);

      const picture= document.createElement("img");
      picture.classList.add("picture");
      picture.src = filteredsong[i].songimage;
      
      songctn.append(Songname,picture);
      resultContainerTag.append(songctn);

       songctn.addEventListener("click",()=>{
        
        fi.style.display="block";

        const stt = document.createElement("h5");
        stt.append(Songname)
        const ssimag = document.createElement("img");
        ssimag.classList.add("ssimg");
        ssimag.src= picture.src
      
        selectedsongctn.append(stt,ssimag,bty);
      
        

        let duration = 0;
        let durationText = "00:00";
        audioTag.addEventListener("loadeddata", () => {
          duration = Math.floor(audioTag.duration); // 147.92938
          durationText = createMinuteAndSecondText(duration);
        });
        let currentTimeTextAndDurationText;
        audioTag.addEventListener("timeupdate", () => {
          const currentTime = Math.floor(audioTag.currentTime); // 147.3949
          const currentTimeText = createMinuteAndSecondText(currentTime);
          const currentTimeTextAndDurationText = currentTimeText + " / " + durationText;
          currentAndTotalTimeTag.textContent=currentTimeTextAndDurationText;
          Updateprogress(currentTime);
        });
        
        const Updateprogress = (currentTime) =>{
        
         const Cprogressbarwidth= 300/duration * currentTime ;
         currentprogressbar.style.width=Cprogressbarwidth.toString() + "px";
        
        };
        const createMinuteAndSecondText = (totalSecond) => {
          const minutes = Math.floor(totalSecond / 60);
          const seconds = totalSecond % 60;
        
          const minuteText = minutes < 10 ? "0" + minutes.toString() : minutes;
          const secondText = seconds < 10 ? "0" + seconds.toString() : seconds;
          return minuteText + ":" + secondText;
        };
        
        let currentplayingindex = 0;
        let isplaying = false;
        playbuttontag.addEventListener("click", () =>{ 
          const currentTime = Math.floor(audioTag.currentTime);
          if (currentTime===0){
          playsong();}
          else{
            audioTag.play();
          }
        
        });
        
        pausebuttontag.addEventListener("click", ()=>{
          isplaying = false;
          audioTag.pause();
          isplaying=false;
          updateplayandpausebutton();
        
        });
        
        previoustag.addEventListener("click" , ()=>{
        if(currentplayingindex===0){
        return;}
         currentplayingindex-=1;
         playsong();
        });
        
        nextbuttontag.addEventListener("click" , ()=> {
        if (currentplayingindex===6)
        {return};
        currentplayingindex +=1;
        playsong();
        });
        
        const playsong = () => {
          const songidtoplay =filteredsong[i].songid;
          
          audioTag.src= songidtoplay;
          
          audioTag.play();
          
          isplaying=true;
          updateplayandpausebutton();
        
        
        };
        
        const updateplayandpausebutton = () => {
        if (isplaying)
        {playbuttontag.style.display= "none";
        pausebuttontag.style.display= "inline"}
        else {playbuttontag.style.display= "inline";
        pausebuttontag.style.display= "none"}
        
        };

        fi.append(selectedsongctn,audioTag);
        inputtag.value="";
        
       resultContainerTag.innerHTML="";
       
       
       
       
        
        
  
  
    })

        }}})


       