import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {useParams,Link} from 'react-router-dom'
const Profile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(()=>{
       fetch(`/user/${userid}`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           //console.log(result)
         
            setProfile(result)
       })
    },[])


    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
             setProfile((prevState)=>{
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:[...prevState.user.followers,data._id]
                        }
                 }
             })
             setShowFollow(false)
        })
    }
    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
            
             setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id )
                 return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower
                        }
                 }
             })
             setShowFollow(true)
             
        })
    }
   return (
       <>
       {userProfile ?
       <div style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth: "100%",
        margin: "0px auto",
      }}>
           <div style={{
               display:"flex",
               justifyContent:"space-around",
               margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>
               {/* <div>
                   <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src={userProfile.user.pic}
                   />
               </div> */}
              
                   <div style={{
  display: "flex",
//   justifyContent: "space-around",
  alignItems: "flex-start"
}}>
  <div>
    <img style={{ width: "60px", height: "60px", borderRadius: "30px" }} src={userProfile.user.pic} />
  </div>
  <div>

    <div style={{ flexGrow: 1 }}>
    <h4>{userProfile.user.name}</h4>
    
  </div>
    
  </div>
</div>
                   {/* <h5>{userProfile.user.email}</h5>
                   <div style={{display:"flex",justifyContent:"space-between",width:"108%"}}>
                       <h6>{userProfile.posts.length} posts</h6>
                       <h6>{userProfile.user.followers.length} followers</h6>
                       <h6>{userProfile.user.following.length} following</h6>
                   </div> */}
                   {/* {showfollow?
                   <button style={{
                       margin:"10px"
                   }} className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>followUser()}
                    >
                        Follow
                    </button>
                    : 
                    <button
                    style={{
                        margin:"10px"
                    }}
                    className="btn waves-effect waves-light #64b5f6 blue darken-1"
                    onClick={()=>unfollowUser()}
                    >
                        UnFollow
                    </button>
                    } */}
                   
                  

             
           </div>
     
           <div className="gallery">
               {
                   userProfile.posts.map(item=>{
                       return(
                        <div key={item._id} className="item-container">
                        <div className="item-box">
                          <div className="item-header">
                            <h1 className="item-title">{item.title}</h1>
                            <div className="item-divider"></div>
                          </div>
                        
                          <p className="item-body">{item.body}</p>
                          <div className="item-buttons">
                           {
                        //     <h2>
                        //     Liked by:
                        //     {item.likes.length > 0 ? (
                        //       item.likes.map((like, index) => (
                        //         <span key={index}>
                        //           {Object.values(like).join(", ")}
                        //         </span>
                        //       ))
                        //     ) : (
                        //       "No likes yet"
                        //     )}
                        //   </h2>
                            //   <h2>Liked by: {item.likes.map(like => like.name).join(", ")}</h2>  
                            <h2>Accepted by:
                            {item.likes.map(like => <h7 key={like._id}> <Link
      to={
        like._id !== state._id
          ? "/profile/" + like._id
          : "/profile"
      }
    >
      {like.name},
    </Link></h7>)}
                            </h2>
                           }
                          </div>
                        </div>
                      </div>
                       )
                   })
               }

           
           </div>
           <div style={{ flex: "1" }}></div>
      <footer style={{ background: "#168ede", color: "white", padding: "10px" }}>
        <section id="contact-us">
          <h2>Contact Us</h2>
          <p>Utkarshonlinecsc@gmail.com</p>
        </section>
        <p>&copy; 2023 Utkarsh Online Common Service Center</p>
      </footer>
       </div>
       
       
       : <h2>loading...!</h2>}
       
       </>
   )
}


export default Profile