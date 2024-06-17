import { useState , useCallback, useEffect,useRef} from 'react'
 
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [char, setChar] = useState(false)
  const [ num, setNum] = useState(false)
  const [password, setPass] = useState("")


 const passwordGenerator =useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  if(num) str+="0123456789" ;
  if(char) str+="~!@#$%^&*_-+" ;
  for(let i=0;i<=length;i++){
    let b=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(b)

  }
  setPass(pass)
 },[length,char,num,setPass])
 

useEffect(()=>{

  passwordGenerator()

},[length,num,char,passwordGenerator]
)
// ref hook for hover what we copy
const passref =useRef(null);
function copyToClipborad(){
  passref.current?.select();
  passref.current?.setSelectionRange(0,12);

  window.navigator.clipboard.writeText(password);
}
const copy =useCallback(()=>{
copyToClipborad()
},[password])


  return (
<div className='w-full max-w-md max-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
             <div>password generator</div>
                 <input type="text" value={password} placeholder='password' ref={passref}/>
                         <button onClick={copyToClipborad}>copy</button>
  <div>
    <div>
                 <input type="range" min={8} max={20} value={length} className='cursor-pointer' onChange={(e)=>setLength(e.target.value)}/>
                          <label htmlFor="">length:{length}</label>
    </div>
    <div>
                 <input type="checkbox" defaultChecked={num} id='numberInput' onChange={(e)=>{
                                              setNum((pre)=>!pre)
                                        }} />
                          <label htmlFor="characterInput">Number</label>
    </div>
  
    <div>
                  <input type="checkbox" defaultChecked={char} id='numberInput' onChange={(e)=>{
                                         setChar((pre)=>!pre)
                                                      }} />
                           <label htmlFor="characterInput">Special Characters</label>
    </div>
  
  </div>
</div>
  )
}

export default App
