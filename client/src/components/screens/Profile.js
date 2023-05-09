import React,{useEffect,useState,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'

const Profile  = ()=>{
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")
    useEffect(()=>{
       fetch('/mypost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           const myPosts = result
           myPosts.mypost.forEach((post) => {
           console.log(`Likes for post ${post._id}:`);
           post.likes.forEach((user) => {
           console.log(user);
  });
});
           setPics(result.mypost)
       })
    },[])
    useEffect(()=>{
       if(image){
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","Utkarsh")
        data.append("cloud_name","team-mate")
        fetch("https://api.cloudinary.com/v1_1/team-mate/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
    
       
           fetch('/updatepic',{
               method:"put",
               headers:{
                   "Content-Type":"application/json",
                   "Authorization":"Bearer "+localStorage.getItem("jwt")
               },
               body:JSON.stringify({
                   pic:data.url
               })
           }).then(res=>res.json())
           .then(result=>{
               console.log(result)
               localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
               dispatch({type:"UPDATEPIC",payload:result.pic})
               //window.location.reload()
           })
       
        })
        .catch(err=>{
            console.log(err)
        })
       }
    },[image])
    const updatePhoto = (file)=>{
        setImage(file)
    }
   return (
       <div style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        maxWidth: "100%",
        margin: "0px auto",
      }}
>
           <div style={{
              margin:"18px 0px",
               borderBottom:"1px solid grey"
           }}>

         
<div style={{
  display: "flex",
//   justifyContent: "space-around",
  alignItems: "flex-start"
}}>
  <div>
    <img style={{ width: "60px", height: "60px", borderRadius: "30px" }} src={state ? state.pic : "loading"} />
  </div>
  <div>

    <div style={{ flexGrow: 1 }}>
    <h4>{state ? state.name : "loading"}</h4>
    
  </div>
    
  </div>
</div>
        
            
            </div>      
           <div className="gallery">
               {
                   mypics.map(item=>{
                    //    return(
                    //     <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                    //    )
                    return (
                        <div key={item._id} className="item-container"  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <div className="item-box" >
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
                      
                    );
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
       
 

       
   )
}


export default Profile