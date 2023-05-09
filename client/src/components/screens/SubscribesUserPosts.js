import React,{useState,useEffect,useContext} from 'react'
import {UserContext} from '../../App'
import {Link} from 'react-router-dom'
const Home  = ()=>{
    // const [data,setData] = useState([])
    // const {state,dispatch} = useContext(UserContext)
    // useEffect(()=>{
    //    fetch('/allpost',{
    //        headers:{
    //            "Authorization":"Bearer "+localStorage.getItem("jwt")
    //        }
    //    }).then(res=>res.json())
    //    .then(result=>{
    //        console.log(result)
    //        setData(result.posts)
    //    })
    // },[])
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Add this line to manage loading state
    const { state, dispatch } = useContext(UserContext);
  
    useEffect(() => {
      fetch("/allpost", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setData(result.posts);
          setIsLoading(false); // Set loading state to false after fetching data
        });
    }, []);

    const likePost = (id)=>{
          fetch('/like',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
                     console.log(result)
            // const newData = data.map(item=>{
            //     if(item._id==result._id){
            //         return result
            //     }else{
            //         return item
            //     }
            // })
            const newData = data.map(item=>{
                if(item._id == result._id){
                    
                    return { ...result, comments: item.comments, postedBy: item.postedBy}
                } else {
                    return item;
                }
              })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }
    const unlikePost = (id)=>{
          fetch('/unlike',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId:id
              })
          }).then(res=>res.json())
          .then(result=>{
            //   console.log(result)
            // const newData = data.map(item=>{
            //     if(item._id==result._id){
            //         return result
            //     }else{
            //         return item
            //     }
            // })
            const newData = data.map(item=>{
                if(item._id == result._id){
                    // Update the post object structure
                    return { ...result, comments: item.comments, postedBy: item.postedBy}
                } else {
                    return item;
                }
              })
            setData(newData)
          }).catch(err=>{
            console.log(err)
        })
    }

    const makeComment = (text,postId)=>{
          fetch('/comment',{
              method:"put",
              headers:{
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+localStorage.getItem("jwt")
              },
              body:JSON.stringify({
                  postId,
                  text
              })
          }).then(res=>res.json())
          .then(result=>{
              console.log(result)
              const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }else{
                    return item
                }
             })
            setData(newData)
          }).catch(err=>{
              console.log(err)
          })
    }

    const deletePost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData)
        })
    }
   return isLoading ? (
        <div>Loading...</div>
      ) : (
       <div className="home">
           {
               data.map(item=>{
                   return(
                       <div className="card home-card" key={item._id}>
                            {/* <h5 style={{padding:"5px"}}><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link> {item.postedBy._id == state._id 
                            && <i className="material-icons" style={{
                                float:"right"
                            }} 
                            onClick={()=>deletePost(item._id)}
                            >delete</i>

                            }</h5> */}
                             {/* <h5 className="mine" style={{ padding: "6px" }}>
              <div style={{ width: "8%" }}>
                <img
                  src={item.postedBy.pic}
                  style={{
                    width: "25px",
                    height: "25px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div style={{ width: "87%" }}>
                <Link
                  to={
                    item.postedBy._id !== state._id
                      ? "/profile/" + item.postedBy._id
                      : "/profile"
                  }
                >
                  {item.postedBy.name}
                </Link>
              </div>
              <div style={{ width: "5%" }}>
                {item.postedBy._id == state._id && (
                  <i
                    className="material-icons"
                    style={{ color: "red", float: "right" }}
                    onClick={() => deletePost(item._id)}
                  >
                    delete
                  </i>
                )}
              </div>
            </h5> */}
            <h5 className="mine" style={{ padding: "6px" }}>
  <div style={{ display: "inline-block", verticalAlign: "middle", width: "8%" }}>
    
    <img
      
      src={item.postedBy.pic} 
      style={{
        width: "25px",
        height: "25px",
        borderRadius: "10px",
      }}
    />
  </div>
  <div style={{ display: "inline-block", verticalAlign: "middle", width: "87%" }}>
    <Link
      to={
        item.postedBy._id !== state._id
          ? "/profile/" + item.postedBy._id
          : "/profile"
      }
    >
      {item.postedBy.name}
    </Link>
  </div>
  <div style={{ display: "inline-block", verticalAlign: "middle", float: "right" }}>
    {item.postedBy._id == state._id && (
      <i
        className="material-icons"
        style={{ color: "red" }}
        onClick={() => deletePost(item._id)}
      >
        delete
      </i>
    )}
  </div>
</h5>
                            {/* <div className="card-image">
                                <img src={item.photo}/>
                            </div> */}
                            <div className="card-content">
                            {/* <i className="material-icons" style={{color:"red"}}>favorite</i> */}
                           
                            
                           
                                {/* <h6>{item.likes.length} likes</h6> */}
                                <h5>{item.title}</h5>
                                <p>{item.body}</p>
                                {/* {item.likes.includes(state._id)
                            ? 
                             <i className="material-icons"
                                    onClick={()=>{unlikePost(item._id)}}
                              >close</i>
                            : 
                            <i className="material-icons"
                            onClick={()=>{likePost(item._id)}}
                            >check</i>
                            } */}
   
{/* {item.likes.includes(state._id)
  ?
  <button className="reject-button"
    onClick={() => { unlikePost(item._id) }} style={{backgroundColor:"red"}}
  >
    Reject
  </button>
  :
  <button className="red-button"
    onClick={() => { likePost(item._id) }}
  >
    Accept
  </button>
} */}
{item.likes.some(like => like._id==state._id) ?
     <button className="reject-button"
        onClick={() => { unlikePost(item._id) }} style={{backgroundColor:"red"}}
     >
        Reject
     </button>
     :
     <button className="red-button"
        onClick={() => { likePost(item._id) }}
     >
       Accept
     </button>
  }
                                {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                                <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makeComment(e.target[0].value,item._id)
                                }}>
                                  <input type="text" placeholder="add a comment" />  
                                </form>
                                
                            </div>
                        </div> 
                   )
               })
           }
          
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


export default Home
