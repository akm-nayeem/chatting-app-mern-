import React, { useEffect, useState } from 'react'
import gimg from "../assets/img.png"
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue,remove,set,push  } from "firebase/database";
import { useDispatch,useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Friendrequest = () => {
  const db = getDatabase();
  let data = useSelector(state=> state.logedUser.value)
  let [reqList,setReqList] = useState([])
  let [load,setLoad] = useState(false)


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

  

  let handleDelete = (item)=>{
    console.log(item.frid)
    remove(ref(db, 'friendrequest/'+item.frid ))
  }

  let handleAccept = (item)=>{
    setLoad(true)
    set(push(ref(db, 'friends/')), {
     ...item
    }).then(()=>{
      setLoad(false)
      toast.success('🦄 Friend Request Accepted', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      remove(ref(db, 'friendrequest/'+item.frid ))
    });
    
  }
    



  return (
    <div className='box'>
    <h3>Friendrequest</h3>
    {reqList.map(item=>(
       <div className='list'>
       <img src={gimg}/>
       <h4>{item.whosendname}</h4>



      {load
      ?
      <Button variant="contained"disabled>
       <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
      />  
        </Button>
      :
      <Button variant="contained" onClick={()=> handleAccept(item)}>
        accept
        </Button>
      }

       <Button variant="contained"color="error" onClick={()=> handleDelete(item)}>delete</Button>
       </div>
    ))}
   
  
</div>
  )
}

export default Friendrequest