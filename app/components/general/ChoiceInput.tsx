import Button from "./Button"


interface ChoiceInputProps{
    text: string
    onClick: (value: string) => void
    selected?: boolean
}


const ChoiceInput:React.FC<ChoiceInputProps> = ({text , onClick , selected}) => {
  return (
    <div onClick={()=> onClick(text)} className={`my-3 cursor-pointer p-2 rounded-md flex items-center gap-2 justify-center h-16 border select-none ${selected ? "border-black" : "border-gray-200"}`}>
        <span className="text-slate-700 text-lg ">{text}</span>
    </div>
  )
}

export default ChoiceInput