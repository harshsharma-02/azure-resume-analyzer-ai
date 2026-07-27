import {motion} from "framer-motion";

function Button({children}){

return(

<motion.button

whileHover={{scale:1.05}}

whileTap={{scale:0.97}}

className="rounded-xl bg-linear-to-br from-blue-600 to-cyan-500 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-blue-300"

>

{children}

</motion.button>

)

}

export default Button;