import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart,updateUserFailure,updateUserSuccess, signoutUserStart, signoutUserFailure, signoutUserSuccess } from '../redux/user/userSlice';
import { deleteUserFailure,deleteUserStart,deleteUserSuccess } from '../redux/user/userSlice';
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch=useDispatch()
  // console.log(filePerc)
  // console.log(formData)
  // console.log(fileUploadError)

  //  allow read;
  //  allow write:if
  //  request.resource.size<2*1024*1024 &&
  //  request.resource.contentType.matches('image/.*')

  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  },[file])
  const handleFileUpload = (file) => {
    //Passing this in the storage we will get which storage is to be accessed
    const storage = getStorage(app);
    //Defing the unique file name
    const fileName = new Date().getTime()+file.name ;
    //refering the storage where the file is to be stored
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  console.log(formData)
  

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      dispatch(updateUserStart())
      const res=await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data=await res.json()
      if(data.success==false){
        dispatch(updateUserFailure(data.message))
        return
      }  
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
      
      
        

    }catch(error){
      dispatch(updateUserFailure(error.message))

    }
  }
  const handleDeleteUser=async (e)=>{
    try{
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method:'DELETE'
      })
      const data=await res.json()
      if(data.success==false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))

    }catch(error){
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignout=async (e)=>{
    try{
      dispatch(signoutUserStart())
      const res = await fetch('/api/auth/logout', {
        method:'GET'
      })
      const data=await res.json()
      if(data.success==false){
        dispatch(signoutUserFailure(data.message))
        return
      }
      dispatch(signoutUserSuccess(data))

    }catch(error){
      dispatch(signoutUserFailure(error.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      
      <form  onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        {/* Here we have created a input and used its reference in img so that on clicking on the image we are able to 
        select image from the file using the useref hook */}
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*'  />
        <img  onClick={()=>fileRef.current.click()} src={formData.avatar||currentUser.avatar} alt="profile" className='rounded-full h-24 w-24 object-cover 
        cursor-pointer self-center mt-3'/>
         <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" id='username' placeholder='username'
        defaultValue={currentUser.username}  onChange={handleChange} className='border p-3 rounded-lg' />
        <input type="email" id='email' placeholder='email' 
         defaultValue={currentUser.email} onChange={handleChange} className='border p-3 rounded-lg' />
        <input type="password" id='password' placeholder='password'
        onChange={handleChange} className='border p-3 rounded-lg' />
        <button disabled={loading}className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading?'loading...':'Update'}</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700'>Delete account</span>
        <span onClick={handleSignout} className='text-red-700'>Sign out</span>
      </div>
      <p className='text-red-700 mt-5'>{error ? error : ''}</p>
      <p className='text-green-700 mt-5'>
        {updateSuccess ? 'User is updated successfully!' : ''}
      </p>
    </div>
  )
}
