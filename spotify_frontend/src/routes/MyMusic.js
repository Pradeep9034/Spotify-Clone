
import TextInput from "../components/shared/Textinput";
import { Cloudinary } from "cloudinary-core";
import CloudinaryUpload from "../components/shared/CloudinaryUpload";
import { useEffect, useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import SingleSongCard from "../components/shared/SingleSongCard";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

import LoggedInContainer from "../containers/LoggedInContainer";
 
const MyMusic=()=>{
    const [songData,setSongData]=useState([]);
    useEffect(()=>{
        const getData=async()=>{
        const response=await makeAuthenticatedGETRequest("/song/get/mysongs");
        setSongData(response.data);
        }
        getData();
    }, []);
    
    return(
        <LoggedInContainer curActiveScreen="myMusic">
            <div className="text-white font-semibold tex-lg pb-4 pl-2 pt-8">My Songs</div>
            <div className="space-y-3 overflow-auto">
                {songData.map((item)=>{
                    return <SingleSongCard info={item} playSound={()=>{}}/>
                })}
            </div>

        </LoggedInContainer>
    )
}



 

export default MyMusic;