import {useState, useEffect} from "react";

function ThemeToggle () {
    const [isDark,setIsDark] = useState(false)

    useEffect(()=>{
        if(isDark){
            document.documentElement.classList.add("dark")
        }else {
            document.documentElement.classList.remove("dark")
        }
    }, [isDark])


function handleToggle(){
    setIsDark(!isDark)
}
return (
    <button
    onClick={handleToggle} 
    className="w-9 h-9 items-center justify-center rounded-lg border border border bg-surface-raised text-text-secondary hover:text-text-primary">
         {isDark ? "*" : "("}

    </button>
)

}

export default ThemeToggle