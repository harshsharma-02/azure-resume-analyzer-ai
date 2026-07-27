const activities=[

"Resume uploaded",

"ATS Score Generated",

"Job Match Completed",

"Report Downloaded"

];

function ActivityTimeline(){

return(

<div
className="
rounded-3xl
bg-white
p-8
shadow-lg
"
>

<h2
className="
mb-8
text-2xl
font-bold
"
>

Recent Activity

</h2>

<div className="space-y-8">

{

activities.map(activity=>(

<div

key={activity}

className="flex gap-4"

>

<div
className="
mt-2
h-3
w-3
rounded-full
bg-blue-600
"
/>

<div>

<h3 className="font-semibold">

{activity}

</h3>

<p className="text-slate-500">

Just now

</p>

</div>

</div>

))

}

</div>

</div>

)

}

export default ActivityTimeline;