import SearchArea from "./SearchArea";
import Buttonn from "./Buttonn";

import SendIcon from '@mui/icons-material/Send';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import Message from "./Message";

import { useEffect, useState } from "react";
import axios from 'axios';
import socket from '../socketio/connection.js'
import fileDownload from 'js-file-download';



const searchStyle = {
    width: '100%',
    height: '60%'
    
}


function Chats(){
    let [chatData, setChatData] = useState([]);
    let [newMessage, setNewMessage] = useState('');
    let [username, setUsername] = useState('');
    let [selectedFile, setSelectedFile] = useState(null);


    useEffect(()=>{
        async function fetchData(){
            const getData = await axios.get(`http://localhost:8000/chat/get`,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
            setChatData(getData.data.message);

            const data = await axios.get(`http://localhost:8000/user/get`,{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})
            const name = data.data.data.username;
            setUsername(name)
        }
        fetchData();
    },[]);

    // useEffect(()=>{
    //     socket.on('receive_message',(data)=>{
    //         setChatData([...chatData,data])
    //     });

    //     socket.on('downloadFile', (data)=>{
    //         fileDownload(data, 'filename.js');
    //     })
    // },[socket])

    function updateNewMessage(value){
        setNewMessage(value)
    }

    function handleFileUploading(event){
        // console.log(event.target.files[0]);
        setSelectedFile(event.target.files[0])

    }

    function socketEvents(){
        socket.on('receive_message',(data)=>{
            setChatData([...chatData,data])
        });

        socket.on('downloadFile', (data)=>{
            fileDownload(data, 'filename.js');
        })
    }
    socketEvents()

    



    async function updateChatData(){
        try {
            let newData;
            let message;

            if(selectedFile){
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("sender", username);
                formData.append("receiver", "ahmed");

                newData = await axios.post('http://localhost:8000/user/file',formData,{
                    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`, "Content-Type": "multipart/form-data" }
                });
                
                newData.data.data.message =  `http://localhost:8000/user/download/file`
                message = newData.data.data;
            }else{
                newData = await axios.post(`http://localhost:8000/chat/add`,{
                message: newMessage,
                sender: username,
                receiver: "ahmed"
                },{headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}});
                message = newData.data.message;
            }

            socket.emit('send_message',message);
            setChatData([...chatData,message]);
            setNewMessage("");
            setSelectedFile(null);
            
        } catch (error) {
            console.log(error)
        }
        
    }
    
    return(
        <>
            <div className="chat-body">
                {
                    chatData.map((data)=>{
                        return data.sender === username?
                        <Message color="#3CB371" time={data.time} message={data.message} side="70%"/> 
                        : <Message color="#FFDEAD" time={data.time} message={data.message} side='5px'/>
                    })
                }
                
                          
            </div>

            <div className="chat-send">
                <SearchArea styleSearch={searchStyle} updateNewMessage={updateNewMessage} message={newMessage}/>
                <Buttonn updateChatData={updateChatData}> <SendIcon/> </Buttonn>
                <input type="file"  onChange={handleFileUploading}/>
                <Buttonn> <MicIcon/> </Buttonn>
                <Buttonn> <VideocamIcon/> </Buttonn>
            </div>
        </>
    )
}

export default Chats;