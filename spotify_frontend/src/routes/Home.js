import spotify_logo from "../assets/images/spotify_logo_white.svg"
import IconText from "../components/shared/IconText";
import { Icon } from "@iconify/react";
import TextWithHover from "../components/shared/TextWithHover";
import { Link, useNavigate } from "react-router-dom";

 {/* <Card title="Peaceful Piano" description="Relax and indulge with beautiful piano pieces" imgUrl="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80"/>
            <Card title="Deep Focus" description="Keep calm and focus with this music" imgUrl="https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <Card title="Instrumental Study" description="Focus with soft study music in the background." imgUrl="https://images.unsplash.com/photo-1460036521480-ff49c08c2781?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <Card title="Focus Flow" description="Up tempo instrumental hip hop beats" imgUrl="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            <Card title="Beats to think to" description="Focus with deep techno and tech house" imgUrl="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/> */}

const focusCardsData=[
    {
        title:"Peaceful Piano",
        description:"Relax and indulge with beautiful piano pieces",
        imgUrl:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80"
    },
    {
        title:"Deep Focus",
        description:"Keep calm and focus with this music",
        imgUrl:"https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title:"Instrumental Study",
        description:"Focus with soft study music in the background.",
        imgUrl:"https://images.unsplash.com/photo-1460036521480-ff49c08c2781?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title:"Focus Flow",
        description:"Up tempo instrumental hip hop beats",
        imgUrl:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title:"Beats to think to",
        description:"Focus with deep techno and tech house",
        imgUrl:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];

const spotifyPlaylistsCardsData=[
    {
        title:"This is One",
        description:"Relax and indulge with beautiful piano pieces",
        imgUrl:"https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80"
    },
    {
        title:"Deep Focus",
        description:"Keep calm and focus with this music",
        imgUrl:"https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=883&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title:"Instrumental Study",
        description:"Focus with soft study music in the background.",
        imgUrl:"https://images.unsplash.com/photo-1460036521480-ff49c08c2781?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title:"Focus Flow",
        description:"Up tempo instrumental hip hop beats",
        imgUrl:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        title:"Beats to think to",
        description:"Focus with deep techno and tech house",
        imgUrl:"https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
];


const Home =()=>{
    const navigate=useNavigate();
    return (
        <div className="h-full w-full flex">
            <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                <div>
                    <div className="logoDiv p-6">
                        <img src={spotify_logo} alt="spotify logo" width={125} />
                    </div>
                    <div  className="py-5">
                        <IconText iconName={"material-symbols:home"} displayText={"Home"} />
                        <IconText iconName={"material-symbols:search-rounded"} displayText={"Search"} />
                        <IconText iconName={"icomoon-free:books"} displayText={"Library"}/>
                    </div>
                    <div className="pt-4">
                    <IconText iconName={"material-symbols:add-box"} displayText={"Create Playlist"}/>
                    <IconText iconName={"mdi:cards-heart"} displayText={"Liked Songs"}/>
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
                        <div className="w-3/5 flex justify-around items-center">
                            <TextWithHover displayText={"Premium"}/>
                            <TextWithHover displayText={"Support"}/>
                            <TextWithHover displayText={"Download"}/>
                            <div className="h-1/2 border-r border white"></div>
                        </div>
                        <div className="w-2/5 flex justify-around h-full items-center" onClick={()=>navigate('/signup')}>
                            <TextWithHover displayText={"Sign up"} />
                            <div className=" bg-white h-2/3 px-8 flex items-center justify-center rounded-full font-semibold cursor-pointer"><Link to="/login">Log in</Link></div>
                        </div>
                    </div>
                </div>
                <div className="content p-8 pt-0 overflow-auto">

                    <PlaylistView titleText="Focus" cardsData={focusCardsData}/>
                    <PlaylistView titleText="Spotify Playlists" cardsData={spotifyPlaylistsCardsData}/>
                    <PlaylistView titleText="Sound if India" cardsData={focusCardsData}/>
                </div>
            </div>

        </div>
    );
};
 const PlaylistView=({titleText, cardsData})=>{
    return(
        <div className="text-white mt-8">
        <div className="text-2xl font-semibold mb-5">{titleText}</div>
        <div className="w-full flex justify-between space-x-4">
            {
                cardsData.map(item=>{
                    return <Card title={item.title} description={item.description} imgUrl={item.imgUrl} />
                })
            }
           
        </div>
    </div>);
 }

 const Card=({title, description,imgUrl})=>{
    return(
        <div className="bg-black bg-opacity-40 w-1/5 p-4 rounded-lg">
            <div className="pb-4 pt-2">
                <img className="w-full rounded-md" src={imgUrl} alt="label" />
            </div>
            <div className="text-white font-semibold py-3">{title}</div>
            <div className="text-gray-500 text-sm">{description}</div>
        </div>
    )
 }

export default Home;