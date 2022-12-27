import SearchArea from "./SearchArea";
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Message from "./Message";
import { useEffect, useState } from "react";
import API from '../utils/api.js';
import socket from '../socketio/connection.js'
import fileDownload from 'js-file-download';
import Button1 from "./Button1";
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'



function Chats(){
    let [chatData, setChatData] = useState([]);
    let [newMessage, setNewMessage] = useState('');
    let [username, setUsername] = useState('');
    let [selectedFile, setSelectedFile] = useState(null);

    const onDrop = useCallback(acceptedFiles => {
        setSelectedFile(acceptedFiles[0])
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


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

    useEffect(()=>{
        socket.on('receive_message',(data)=>{
            setChatData(prevData => [...prevData,data]);
        });

        socket.on('downloadFile', (data)=>{
            fileDownload(data, 'filename.js');
        })
    },[])


    

    function updateNewMessage(value){
        setNewMessage(value)
    }

    // function handleFileUploading(event){
    //     setSelectedFile(event.target.files[0])

    // }


    async function downloadFile(){
        socket.emit('set_socket',"setSocket")
        let data = await API.getFileInfoForDownload();
        
        console.log(data.data);
    }

    function sendMessageByEnterKey(event) {
        if(event.key === 'Enter'){
            submitMessage();
        }
      }

    async function submitMessage(){
        try {
            let newData;
            let message;

            if(selectedFile){
                console.log(selectedFile);
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("sender", username);
                formData.append("receiver", "ahmed");

                newData = await API.UploadFile(formData);
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
                <SearchArea updateNewMessage={updateNewMessage} message={newMessage} onEnterKeyPress={sendMessageByEnterKey}/>
                <Button1 buttonType='icon' onClick={submitMessage} buttonStyle='buttonn-style'> <SendIcon/> </Button1>
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      isDragActive ?
                        <p>Drop the files here ...</p> :
                        <Button1 buttonType='icon' buttonStyle='buttonn-style'> <CloudUploadIcon/> </Button1>
                    }
                </div>
                <Button1 buttonType='icon' buttonStyle='buttonn-style'> <MicIcon/> </Button1>
                <Button1 buttonType='icon' buttonStyle='buttonn-style'> <VideocamIcon/> </Button1>
            </div>
        </>
    )
}

export default Chats;