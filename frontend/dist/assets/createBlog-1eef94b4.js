import{k as w,l as C,r as o,f as U,j as e,d as I}from"./index-bb1fa0f4.js";import{_ as n}from"./index-b33c1328.js";import{a as F,g as S,h as _}from"./index.esm-d80a0af3.js";import"./iconBase-bb30e71b.js";const D="ttmvomfe";function R(){const[p]=w(),[x]=C(),[u,c]=o.useState(!1),f=U(),[r,g]=o.useState({localUrl:"",remoteUrl:"",file:null}),[i,h]=o.useState(!1),[s,m]=o.useState({title:"",content:"",category:""}),j=async a=>{a.preventDefault();const t=new FormData;if(t.append("file",r.file),t.append("upload_preset",D),s.category==="")n.error("Choose a category !");else if(r.file)try{c(!0);const l=await p(t),d=l.data.secure_url,y=l.data.public_id,N={title:s.title,content:s.content,category:s.category.toLocaleLowerCase(),public_id:y,remote_url:d};await x(N),c(!1),n.success("blog posted successfully."),f("/")}catch(l){n.error("Upload Falied."),c(!1),console.log(`Error:${l}`)}else n.error("Image not selected !")},b=a=>{const t=a.target.files[0];if(t){const l=URL.createObjectURL(t);g(d=>({...d,file:t,localUrl:l}))}else g(l=>({...l,file:"",localUrl:""}))},v=a=>{const t=a.target.innerText;m(l=>({...l,category:t}))};return e.jsxs("div",{className:"flex flex-col gap-4 mt-6 px-4",children:[e.jsx("div",{className:"w-full h-full",children:e.jsx("img",{src:r.localUrl?r.localUrl:"https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"})}),e.jsxs("div",{className:"flex mt-12 px-4 uppercase gap-6 py-2 w-full items-center",children:[e.jsx("h1",{className:"md:text-xl text-gray-700",children:r.file?e.jsx(e.Fragment,{children:"Change Image :"}):e.jsx(e.Fragment,{children:"Select an image:"})}),e.jsx("input",{type:"file",accept:"image/*",onChange:a=>{b(a)}})]}),e.jsx("div",{className:"mt-10",children:e.jsxs("form",{onSubmit:j,className:"flex flex-col relative",children:[e.jsx("div",{className:"flex flex-col",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("label",{className:"font-extrabold text-3xl",children:"Title:"}),e.jsx("input",{type:"text",required:!0,placeholder:"Add Title",id:"title",className:"w-96 p-4 border-2 outline-none",value:s.title,onChange:a=>{m(t=>({...t,title:a.target.value}))}}),e.jsxs("div",{className:"py-4 px-2 border-2 rounded gap-4 flex flex-col w-64 absolute top-0 right-1/3 z-10 bg-slate-50",onClick:()=>{h(!i)},children:[e.jsxs("div",{className:"flex gap-4 justify-between items-center mx-2 cursor-pointer",children:[s.category?s.category:e.jsx(e.Fragment,{children:"select a category"}),i?e.jsx(F,{}):e.jsx(S,{})]}),i?e.jsx("div",{className:"flex flex-col mt-4 border-2 ",children:I.map(a=>e.jsx("div",{children:e.jsx("div",{onClick:t=>v(t),className:"p-2 border-1 uppercase hover:bg-slate-100 cursor-pointer",children:a.category})},a.id))}):null]})]})}),e.jsxs("div",{className:"mt-16 flex flex-col gap-4",children:[e.jsx("label",{className:"font-extrabold text-3xl",children:"Content:"}),e.jsx("textarea",{rows:8,className:"border-2 p-4 outline-none",value:s.content,onChange:a=>{m(t=>({...t,content:a.target.value}))}})]}),e.jsx("button",{type:"submit",className:"bg-blue-700 p-4 flex justify-center items-center text-white text-xl mt-10 w-28 uppercase rounded-lg",children:u?e.jsx(_,{className:"animate-spin"}):"Post"})]})})]})}export{R as default};