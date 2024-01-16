// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {getFirestore, doc,FieldPath ,setDoc, getDoc,getDocs,arrayUnion, collection, updateDoc} from 'firebase/firestore'
import { getAuth,signOut, onAuthStateChanged,updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import toast from "react-hot-toast" 
import { userHandle } from "../utils";
import {v4 as uuidv4} from 'uuid';
import { current } from "@reduxjs/toolkit";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

const db = getFirestore(app)

// To get the current user
onAuthStateChanged(auth, async user => { 
  if(user) {
    const userData = await getDoc(doc(db, 'users', user.uid))    
    const accessToken = userData._firestore._authCredentials.auth.auth.currentUser.stsTokenManager.accessToken
    const isExpired = userData._firestore._authCredentials.auth.auth.currentUser.stsTokenManager.isExpired
    const data = {
      uid: user.uid,
      fullName: user.displayName,
      emailVerified: user.emailVerified,
      accessToken,
      isTokenExpired: isExpired,
      ...userData.data()
    }
      userHandle(data)
  } else { 
    userHandle(false)
  }
}) 

async function sendMessage(chatId, userID, message) { 
  const currentUserData = (await getDoc(doc(db, 'users', userID))).data()
  const messageId = uuidv4()
  const date = new Date()
  await updateDoc(doc(db, 'messages', chatId), { 
    messages: arrayUnion({
      messageId,
      sentBy: userID, 
      message,
      recipient:currentUserData,
      seenBy: false,
      sentTime: date.toLocaleDateString() + "," + date.getHours() + ":" +  date.getMinutes()
    })
  })

}
export default async function setChat ( chatId, currentUserID, peerID) {
  const chat = await getDoc(doc(db, 'messages', chatId))
  const peerData = (await getDoc(doc(db, 'users', peerID))).data() 
  const currentUserDta = (await getDoc(doc(db, 'users', currentUserID))).data() 
  const currentUserChatList = await getDoc(doc(db, 'userChats', currentUserID))
  const peerChatList = await getDoc(doc(db, 'userChats', peerID))

  if(!currentUserChatList.exists()) {
    await setDoc(doc(db, 'userChats', currentUserID), {})
  }
  if(!peerChatList.exists()) {
    await setDoc(doc(db, 'userChats', peerID), {})
  }

  if(!chat.exists()) {
    await setDoc(doc(db, 'messages', chatId), {})
    await updateDoc(doc(db, 'userChats', currentUserID), {
      chats: arrayUnion({
        [chatId]: {
          ...peerData
        }
      })
    })
    await updateDoc(doc(db, 'userChats', peerID), {
      chats: arrayUnion({
        [chatId]: {
          ...currentUserDta
        }
      })
    })

  }
}

async function setMessageSeen(chatId, messageId) {
  const messages = (await getDoc(doc(db, 'messages', chatId)))  

  const fieldPath = new FieldPath('messages', messageId, 'seenBy');
  messages.data().messages.map( async (item,index) => {
    if(item.messageId === messageId) {
      // await updateDoc(doc(db, 'messages', chatId), { 
      //   "messages.seenBy": true
      // })
    }
  })   
  // return "worked"
}

async function getMessages(chatId) { 
 try { 
  const messages = (await getDoc(doc(db, 'messages', chatId))) 
  if(messages.exists()) {
    return messages.data().messages
  }
 } catch(err) {
  console.log(err)
 }
} 

async function getChatList(currentUserID) { 
  try {
    const messages = await getDocs(collection(db, "messages"))  
    const chatPromises = messages.docs.map( async message => {  
    
      if(Object.keys(message.data()).length > 0) {
        if(message.data().messages.length > 0 ) {  
        const chat = (await getDoc(doc(db, 'userChats', currentUserID))).data() 
        
        return chat.chats.filter(item => Object.keys(item)[0] === message.id)
      }
    }
    })

    const chatResults = await Promise.all(chatPromises) 
    const filteredChatResults = chatResults.filter(chat => chat !== undefined && chat.length > 0);
 
    return filteredChatResults
     
  } catch (err) {
    console.log(err)
  }
} 

async function getChatListByChatID(currentUserID,chatId) {  
  const chat = (await getDoc(doc(db, 'userChats', currentUserID))).data()     
  if(chat) {
    return chat.chats.filter(item => Object.keys(item).includes(chatId))
  } else {
    return []
  }
} 


async function getUsers () {
  const users = await getDocs(collection(db, "users"))
  const userArr = []
  users.docs.forEach(doc => {
    userArr.push(doc.data())
  })

  return userArr

}

async function logout () {
  await signOut(auth)
}

async function login (email,password) {
  try {
    userHandle(true)
    await signInWithEmailAndPassword(auth,email,password)  
    return true
  } catch (err) {
    toast.error(err.code) 
  } 
}

async function getUserProfile (username) {
  try {
    const usernameData = await getDoc(doc(db,'usernames', username))
    const userData = (await getDoc(doc(db, 'users', usernameData.data().userID))).data()
    return userData
  } catch (err) {
    throw new Error(err)
  }
   
}

async function register ({email,password, fullName, username}) {
  try {
    const user = await getDoc(doc(db, 'usernames', username)) 

    if(user.exists()) {
      toast.error(`${username} is already used!`) 
      return
    }
    const response = await createUserWithEmailAndPassword(auth,email,password)   
    const uid = response.user.uid

    await setDoc(doc(db, 'usernames', username), {
      userID: uid
    })
    await setDoc(doc(db, 'users', uid), { 
      username,
      userID: uid,
      fullName, 
      followers:[],
      following: [],
      notifications: [],
      gender: '',
      phoneNumber: '',
      bio: '',
      website: '',
      profilePhoto: 'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-11.jpg',
      posts: {}
    })

    await updateProfile(auth.currentUser, {
      displayName: fullName
    })

    return true
  } catch (err) {
    toast.error(err.code) 
  } 
}

export {login, logout, register, getUserProfile,setMessageSeen, sendMessage,getChatList, getChatListByChatID, getUsers,getMessages}