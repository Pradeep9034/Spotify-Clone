import spotify_logo from "../assets/images/spotify_logo_white.svg"
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import { useContext, useEffect,useLayoutEffect, useRef,useState } from "react";
import {Howl,Howler} from 'howler';
import songContext from '../contexts/songContext'
import CreatePlaylistModal from "../modals/CreatePlaylistModal";
import AddToPlaylistModal from "../modals/AddToPlaylistModal";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import { useCookies, withCookies } from 'react-cookie';


 {/* <Card title="Peaceful Piano" description="Relax and indulge with beautiful piano pieces" imgUrl="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80"/>
            <Card title="Deep Focus" description="Keep calm and focus with this music" imgUrl="https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <Card title="Instrumental Study" description="Focus with soft study music in the background." imgUrl="https://images.unsplash.com/photo-1460036521480-ff49c08c2781?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <Card title="Focus Flow" description="Up tempo instrumental hip hop beats" imgUrl="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <Card title="Beats to think to" description="Focus with deep techno and tech house" imgUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/> */}




const LoggedInContainer =({children,curActiveScreen})=>{
    const [createPlaylistModalOpen, setCreatePlaylistModalOpen]=useState(false);
    const [addToPlaylistModalOpen, setAddToPlaylistModalOpen]=useState(false);
    const {currentSong,setCurrentSong ,soundPlayed,setSoundPlayed,isPaused,setIsPaused,isMuted,setIsMuted}=useContext(songContext);
    const [cookies,setCookie,removeCookie]=useCookies(["token"]);
    

    const firstUpdate=useRef(true);
    const navigate=useNavigate();
    useLayoutEffect(()=>{
        //this if statement will prevent the useEffect from running on first render
        if(firstUpdate.current){
            firstUpdate.current=false;
            return;
        }
        if(!currentSong){
            return;
        }
        changeSong(currentSong.track);
    },[currentSong && currentSong.track])

    const addSongToPlaylist=async (playlistId) =>{
        const songId=currentSong._id;
        const payload={playlistId,songId};
        const response = await makeAuthenticatedPOSTRequest("/playlist/add/song", payload)
        if (response._id){
            setAddToPlaylistModalOpen(false);
        }
    }

    const playSound=()=>{
        if(!soundPlayed){
            return;
        }
        soundPlayed.play();
    }
    const changeSong=(songSrc)=>{
        if(soundPlayed){
            soundPlayed.stop();
        }
        let sound =new Howl({
            src: [songSrc],
            html5:true,
        })
        setSoundPlayed(sound);
        sound.play();
        setIsPaused(false);
    }
   
    const pauseSound=()=>{
        soundPlayed.pause();
    }
    const muteSound=()=>{
        soundPlayed.mute(true);
    }
    const unmuteSound=()=>{
        soundPlayed.mute(false);
    }
    
    const togglePlayPause=()=>{
        if(isPaused){
            playSound();
            setIsPaused(false);
        }
        
        else{
            pauseSound();
            setIsPaused(true);
        }
    }
    const toggleMuteUnmute=()=>{
        if(isMuted){
            unmuteSound();
            setIsMuted(false);
        }
        else{
            muteSound();
            setIsMuted(true);
        }
    }
    return (
        <div className="h-full w-full bg-app-black">
            {createPlaylistModalOpen && <CreatePlaylistModal closeModal={()=>{setCreatePlaylistModalOpen(false)}}/>}
            {addToPlaylistModalOpen && <AddToPlaylistModal closeModal={()=>{setAddToPlaylistModalOpen(false)} } addSongToPlaylist={addSongToPlaylist}/>}
            <div className={`${currentSong?"h-9/10":"h-full"} w-full flex`}>
                <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                    <div>
                        <div className="logoDiv p-6">
                            <img src={spotify_logo} alt="spotify logo" width={125} />
                        </div>
                        <div  className="py-5">
                            <IconText iconName={"material-symbols:home"} displayText={"Home"} targetLink={"/home"} active={curActiveScreen=="home"} />
                            <IconText iconName={"material-symbols:search-rounded"} displayText={"Search"} targetLink={"/search"} active={curActiveScreen=="search"} />
                            <IconText iconName={"icomoon-free:books"} displayText={"Library"} active={curActiveScreen=="library"} targetLink={"/library"}/>
                            <IconText iconName={"material-symbols:library-music-sharp"} displayText={"My Music"} targetLink={"/myMusic"} active={curActiveScreen=="myMusic"}/>
                        </div>
                        <div className="pt-4">
                        <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"} onClick={()=>{setCreatePlaylistModalOpen(true)}} />
                        <IconText iconName={"mdi:cards-heart"} displayText={"Liked Songs"} />
                        </div>
                    </div>
                    <div className="px-5">
                        <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border:white cursor-pointer">
                            <Icon icon="carbon:earth-europe-africa"/><div className="ml-2 text-sm font-semibold">English</div></div>
                    </div>
                </div>


                {/* the second div is the main content */}
                <div className="h-full w-4/5 bg-app-black overflow-auto">
                    <div className="navbar w-full h-1/10 bg-black bg-opacity-30 flex items-center justify-end">
                        <div className="w-1/2 flex h-full">
                            <div className="w-2/3 flex justify-around items-center">
                                <TextWithHover displayText={"Premium"}/>
                                <TextWithHover displayText={"Support"}/>
                                <TextWithHover displayText={"Download"}/>
                                <div className="h-1/2 border-r border white"></div>
                            </div>
                            <div className="w-2/5 flex justify-around h-full items-center" onClick={()=>{navigate("/uploadsong")}}>
                                <TextWithHover displayText={"Upload Song"} />
                                <div className=" bg-white h-10 w-20 ml-1 mr-1.5 flex items-center justify-center rounded-full font-semibold cursor-pointer" onClick={()=>{removeCookie('token', { path: '/' });}}>Log Out</div>
                            </div>
                        </div>
                    </div>
                    <div className="content p-8 pt-0 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>

            {/* current playing song div */}
            {
                currentSong &&

            <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4">
                <div className="w-1/4 flex items-center">
                    <img className="h-14 w-14 rounded" src={currentSong.thumbnail} alt="currentSongThumbnail" />
                    <div className="pl-4">
                        <div className="text-sm hover:underline cursor-pointer">{currentSong.name}</div>
                        <div className="text-xs text-gray-500 hover:underline cursor-pointer">Uploaded by: {currentSong.artist.firstName +" "+currentSong.artist.lastName}</div>
                    </div>
                </div>
                <div className="w-1/2 h-full flex justify-center items-center flex-col ">
                    <div className="flex w-1/3 flex items-center justify-between">
                        <Icon icon="ph:shuffle-fill" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white"/>
                        <Icon icon="mdi:skip-previous-outline" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white"/>
                        <Icon icon={isPaused?"ic:baseline-play-circle":"ic:baseline-pause-circle"} fontSize={50} className="hover:cursor-pointer text-gray-500 hover:text-white" onClick={togglePlayPause}/>
                        <Icon icon="mdi:skip-next-outline" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white"/>
                        <Icon icon="ic:twotone-repeat" fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white"/>
                        <Icon icon={isMuted?"octicon:mute-24":"octicon:unmute-24"} fontSize={30} className="hover:cursor-pointer text-gray-500 hover:text-white" onClick={toggleMuteUnmute}/>
                    </div>
                </div>
                <div className="w-1/4 flex justify-end pr-4 space-x-4 items-center">
                    <Icon icon="ic:round-playlist-add" className="hover:cursor-pointer text-gray-500 hover:text-white" fontSize={30} onClick={()=>{
                        setAddToPlaylistModalOpen(true);
                    }}/>
                    <Icon icon="ph:heart-bold" className="hover:cursor-pointer text-gray-500 hover:text-white" fontSize={20} />
                </div>
            </div>
            }
        </div>
    );
};


 

export default LoggedInContainer;
