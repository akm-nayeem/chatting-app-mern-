import React,{useEffect,useState} from 'react'
import gimg from "../assets/img.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push  } from "firebase/database";
import { useDispatch,useSelector } from 'react-redux';



const Friends = () => {

  const db = getDatabase();
  let data = useSelector(state=> state.logedUser.value)
  let [reqList,setReqList] = useState([])
  let [friendList,setFriendList] = useState([])

  useEffect(()=>{
    const friendrequestRef = ref(db, 'friendrequest' );
    onValue(friendrequestRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
        if(item.val().whoreceiveid == data.uid){
          arr.push({...item.val(),frid:item.key})
        }
        
      })
      setReqList(arr)
   
});

  },[])


  useEffect(()=>{
    const friendRef = ref(db, 'friends' );
    onValue(friendRef, (snapshot) => {
      let arr = []
      snapshot.forEach(item=>{
       
          arr.push({...item.val(),fid:item.key})
       
        
      })
      setFriendList(arr)
   
});

  },[])


  let handleBlcok = (item)=>{

    if(data.uid == item.whosendid){
     
      set(push(ref(db, 'block')), {
        blockid:item.whoreceiveid,
        blockname:item.whoreceivename,
        blockbyid:item.whosendid,
        blockbyname:item.whosendname
      }).then(()=>{
        remove(ref(db,'friends/'+item.fid))
      })
    
    
    }
     else{
      set(push(ref(db, 'block')), {
        blockid:item.whosendid,
        blockname:item.whosendname ,
        blockbyid: item.whoreceiveid ,
        blockbyname: item.whoreceivename
      }).then(()=>{
        remove(ref(db,'friends/'+item.fid))
      })
    }
    
  }

  let handleUnfriend = (item)=>{
   
    remove(ref(db,'friends/'+item.fid))
    

  }


  return (
    <div className='box'>
    <h3>Friends</h3>
    {friendList.map(item=>(
      <div className='list'>
      <img src={gimg}/>
      <h4>{item.whosendid == data.uid? item.whoreceivename:item.whosendname}</h4>
      <Button variant="contained" color='error' onClick={()=>handleBlcok(item)}>Block</Button>
      <Button variant="contained" color='error' onClick={()=>handleUnfriend(item)}>Unfriend</Button>
      </div>
    ))}
    
    
</div>
  )
}

export default Friends