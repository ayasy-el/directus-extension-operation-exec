var e={id:"exec_cmd",name:"Exec",icon:"electric_bolt",description:"Execute Command",overview:({cmd:e,wait:t,timeout:i})=>[{label:"Command",text:e},{label:"Response Timing",text:t?"Wait until execution done":`wait after ${i??0} ms`}],options:[{field:"wait",name:"Wait until execution done",type:"boolean",meta:{width:"half",interface:"toggle"},schema:{default_value:!1}},{field:"timeout",name:"Timeout",type:"integer",schema:{is_nullable:!1,default_value:0},meta:{width:"half",interface:"input",hidden:!0,conditions:[{name:"show only if wait",rule:{wait:{_neq:!0}},hidden:!1}]}},{field:"cmd",name:"Exec Command",type:"string",meta:{width:"full",interface:"input",required:!0}}]};export{e as default};
