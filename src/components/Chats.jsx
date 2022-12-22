import SearchArea from "./SearchArea";
import Buttonn from "./Buttonn";

import SendIcon from '@mui/icons-material/Send';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import Message from "./Message";

import { useEffect, useState } from "react";
import API from '../utils/api.js';
import environment from '../utils/constant.js';
import socket from '../socketio/connection.js'
import fileDownload from 'js-file-download';



function Chats(){
    let [chatData, setChatData] = useState([]);
    let [newMessage, setNewMessage] = useState('');
    let [username, setUsername] = useState('');
    let [selectedFile, setSelectedFile] = useState(null);


    useEffect(()=>{
        async function fetchData(){
            const getData = await API.getALLChat();
            setChatData(getData.data.message);

            const data = await API.getLoggedinUserInfo();
            const name = data.data.data.username;
            setUsername(name)
        }
        fetchData();
    },[]);

    

    function updateNewMessage(value){
        setNewMessage(value)
    }

    function handleFileUploading(event){
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

    async function downloadFile(){
        let data = await API.getFileInfoForDownload();
        console.log(data.data);
    }



    async function updateChatData(){
        try {
            let newData;
            let message;

            if(selectedFile){
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("sender", username);
                formData.append("receiver", "ahmed");

                newData = await API.UploadFile(formData);
                
                newData.data.data.message =  `${environment.BASE_URL}/user/download/file`
                message = newData.data.data;
            }else{
                newData = await API.addNewChat({newMessage,username})
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
                    chatData.map((data,index)=>{
                        return  data.sender === username?
                        <Message key={index}  messageBoxColor='message-right-color' messageBox='message-right-side' time={data.time} message={data.message} isFile={data.isFile} downloadFile={downloadFile} /> 
                        : <Message key={index} messageBoxColor='message-left-color' messageBox='message-left-side' time={data.time} message={data.message} isFile={data.isFile} downloadFile={downloadFile} />
                    })
                }       
            </div>

            <div className="chat-send">
                <SearchArea updateNewMessage={updateNewMessage} message={newMessage}/>
                <Buttonn updateChatData={updateChatData}> <SendIcon/> </Buttonn>
                <input type="file"  onChange={handleFileUploading}/>
                <Buttonn> <MicIcon/> </Buttonn>
                <Buttonn> <VideocamIcon/> </Buttonn>
            </div>
        </>
    )
}

export default Chats;