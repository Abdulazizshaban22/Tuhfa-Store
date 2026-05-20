export default function Button({children,...props}:{children:React.ReactNode}&React.ButtonHTMLAttributes<HTMLButtonElement>){
  return <button {...props} className={"px-4 py-2 rounded-xl bg-royal text-white hover:opacity-90 " + (props.className||"")}>{children}</button>
}