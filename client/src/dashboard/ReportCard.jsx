import { FileText, Eye } from "lucide-react";
import { motion } from "framer-motion";

function ReportCard({
    file,
    score,
    date
}){

return(

<motion.div

whileHover={{
y:-5,
scale:1.02
}}

className="
rounded-2xl
border
bg-white
p-6
shadow-lg
"

>

<div className="flex items-center justify-between">

<div className="flex items-center gap-4">

<div className="
flex
h-14
w-14
items-center
justify-center
rounded-xl
bg-blue-100
">

<FileText className="text-blue-600"/>

</div>

<div>

<h3 className="font-bold">

{file}

</h3>

<p className="text-slate-500">

{date}

</p>

</div>

</div>

<div className="text-right">

<p className="text-2xl font-black text-blue-600">

{score}

</p>

<button className="
mt-2
flex
items-center
gap-2
rounded-lg
bg-blue-600
px-4
py-2
text-white
">

<Eye size={18}/>

View

</button>

</div>

</div>

</motion.div>

)

}

export default ReportCard;