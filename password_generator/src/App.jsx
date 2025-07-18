import { useEffect,useCallback,useState,useRef } from 'react'



function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)

  const[password,setPassword]=useState("")

  const passwordRef=useRef(null)

  const passwordGenerator=useCallback(()=>{

    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*(){}[]~"

    for(let i=1; i<=length; i++){
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }

    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,passwordGenerator])

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,20)
    window.navigator.clipboard.writeText(password)
  },[password])

  return (
    
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8  bg-gray-800 text-orange-500">
        <h1 className='text-center text-white my-3'>Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPasswordToClipboard()} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={8}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length : {length}</label>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={()=>
                  setNumberAllowed((prev)=>!prev)
                }
              />
              <label>Numbers</label>
                    <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={()=>
                  setCharAllowed((prev)=>!prev)
                }
              />
              <label>Charecter</label>
            </div>

          </div>
        </div>
      </div>
    
  )
}

export default App
