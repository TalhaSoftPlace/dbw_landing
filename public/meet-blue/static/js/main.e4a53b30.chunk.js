(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{111:function(e,t){},113:function(e,t){},128:function(e,t,a){},129:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a(9),c=a.n(r),i=a(12),l=a(169),o=a(164),s=a(159),d=a(162),j=a(130),u=a(18),m=a(76),p=a(55),b=a.n(p),x=a(4),O=Object(n.createContext)(),f=[{urls:"stun:openrelay.metered.ca:80"},{urls:"turn:openrelay.metered.ca:80",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:openrelay.metered.ca:443?transport=tcp",username:"openrelayproject",credential:"openrelayproject"},{urls:"turn:217.131.2.177:3478",credential:"CHANGE_ME",username:"coturn"},{urls:"stun:stun.l.google.com:19302"}],h=Object(m.a)("https://warm-wildwood-81069.herokuapp.com"),g=function(e){var t=e.children,a=Object(n.useState)(!1),r=Object(u.a)(a,2),c=r[0],i=r[1],l=Object(n.useState)(!1),o=Object(u.a)(l,2),s=o[0],d=o[1],j=Object(n.useState)(),m=Object(u.a)(j,2),p=m[0],g=m[1],v=Object(n.useState)(""),y=Object(u.a)(v,2),C=y[0],w=y[1],N=Object(n.useState)({}),k=Object(u.a)(N,2),S=k[0],I=k[1],D=Object(n.useState)(""),A=Object(u.a)(D,2),B=A[0],E=A[1],R=Object(n.useRef)(),U=Object(n.useRef)(),V=Object(n.useRef)();Object(n.useEffect)((function(){var e,t;null===(e=navigator)||void 0===e||null===(t=e.mediaDevices)||void 0===t||t.getUserMedia({video:!0,audio:!0}).then((function(e){g(e),R.current.srcObject=e})),h.on("me",(function(e){return E(e)})),h.on("callUser",(function(e){var t=e.from,a=e.name,n=e.signal;I({isReceivingCall:!0,from:t,name:a,signal:n})}))}),[]);return Object(x.jsx)(O.Provider,{value:{call:S,callAccepted:c,myVideo:R,userVideo:U,stream:p,name:C,setName:w,callEnded:s,me:B,callUser:function(e){var t=new b.a({initiator:!0,trickle:!1,stream:p,config:{iceServers:f}});t.on("signal",(function(t){h.emit("callUser",{userToCall:e,signalData:t,from:B,name:C})})),t.on("stream",(function(e){U.current.srcObject=e})),h.on("callAccepted",(function(e){i(!0),t.signal(e)})),V.current=t},leaveCall:function(){d(!0),V.current.destroy(),window.location.reload()},answerCall:function(){i(!0);var e=new b.a({initiator:!1,trickle:!1,config:{iceServers:f},stream:p});e.on("signal",(function(e){h.emit("answerCall",{signal:e,to:S.from})})),e.on("stream",(function(e){U.current.srcObject=e})),e.signal(S.signal),V.current=e}},children:t})},v=Object(s.a)((function(e){return{video:Object(i.a)({width:"550px"},e.breakpoints.down("xs"),{width:"300px"}),gridContainer:Object(i.a)({justifyContent:"center"},e.breakpoints.down("xs"),{flexDirection:"column"}),paper:{padding:"10px",border:"2px solid black",margin:"10px"}}})),y=function(){var e=Object(n.useContext)(O),t=e.name,a=e.callAccepted,r=e.myVideo,c=e.userVideo,i=e.callEnded,l=e.stream,s=e.call,u=v();return Object(x.jsxs)(d.a,{container:!0,className:u.gridContainer,children:[l&&Object(x.jsx)(j.a,{className:u.paper,children:Object(x.jsxs)(d.a,{item:!0,xs:12,md:6,children:[Object(x.jsx)(o.a,{variant:"h5",gutterBottom:!0,children:t||"Name"}),Object(x.jsx)("video",{playsInline:!0,muted:!0,ref:r,autoPlay:!0,className:u.video})]})}),a&&!i&&Object(x.jsx)(j.a,{className:u.paper,children:Object(x.jsxs)(d.a,{item:!0,xs:12,md:6,children:[Object(x.jsx)(o.a,{variant:"h5",gutterBottom:!0,children:s.name||"Name"}),Object(x.jsx)("video",{playsInline:!0,ref:c,autoPlay:!0,className:u.video})]})})]})},C=a(165),w=a(170),N=a(171),k=a(75),S=a(166),I=a(167),D=a(168),A=Object(s.a)((function(e){return{root:{display:"flex",flexDirection:"column"},gridContainer:Object(i.a)({width:"100%"},e.breakpoints.down("xs"),{flexDirection:"column"}),container:Object(i.a)({width:"600px",margin:"35px 0",padding:0},e.breakpoints.down("xs"),{width:"80%"}),margin:{marginTop:20},padding:{padding:20},paper:{padding:"10px 20px",border:"2px solid black"}}})),B=function(e){var t=e.children,a=Object(n.useContext)(O),r=a.me,c=a.callAccepted,i=a.name,l=a.setName,s=a.callEnded,m=a.leaveCall,p=a.callUser,b=Object(n.useState)(""),f=Object(u.a)(b,2),h=f[0],g=f[1],v=A();return Object(x.jsx)(C.a,{className:v.container,children:Object(x.jsxs)(j.a,{elevation:10,className:v.paper,children:[Object(x.jsx)("form",{className:v.root,noValidate:!0,autoComplete:"off",children:Object(x.jsxs)(d.a,{container:!0,className:v.gridContainer,children:[Object(x.jsxs)(d.a,{item:!0,xs:12,md:6,className:v.padding,children:[Object(x.jsx)(o.a,{gutterBottom:!0,variant:"h6",children:"Account Info"}),Object(x.jsx)(w.a,{label:"Name",value:i,onChange:function(e){return l(e.target.value)},fullWidth:!0}),Object(x.jsx)(k.CopyToClipboard,{text:r,className:v.margin,children:Object(x.jsx)(N.a,{variant:"contained",color:"primary",fullWidth:!0,startIcon:Object(x.jsx)(S.a,{fontSize:"large"}),children:"Copy Your ID"})})]}),Object(x.jsxs)(d.a,{item:!0,xs:12,md:6,className:v.padding,children:[Object(x.jsx)(o.a,{gutterBottom:!0,variant:"h6",children:"Make a call"}),Object(x.jsx)(w.a,{label:"ID to call",value:h,onChange:function(e){return g(e.target.value)},fullWidth:!0}),c&&!s?Object(x.jsx)(N.a,{variant:"contained",color:"secondary",startIcon:Object(x.jsx)(I.a,{fontSize:"large"}),fullWidth:!0,onClick:m,className:v.margin,children:"Hang Up"}):Object(x.jsx)(N.a,{variant:"contained",color:"primary",startIcon:Object(x.jsx)(D.a,{fontSize:"large"}),fullWidth:!0,onClick:function(){return p(h)},className:v.margin,children:"Call"})]})]})}),t]})})},E=function(){var e=Object(n.useContext)(O),t=e.answerCall,a=e.call,r=e.callAccepted;return Object(x.jsx)(x.Fragment,{children:a.isReceivingCall&&!r&&Object(x.jsxs)("div",{style:{display:"flex",justifyContent:"space-around"},children:[Object(x.jsxs)("h1",{children:[a.name," is calling:"]}),Object(x.jsx)(N.a,{variant:"contained",color:"primary",onClick:t,children:"Answer"})]})})},R=Object(s.a)((function(e){return{appBar:Object(i.a)({borderRadius:15,margin:"30px 100px",display:"flex",flexDirection:"row",justifyContent:"center",alignItems:"center",width:"600px",border:"2px solid black"},e.breakpoints.down("xs"),{width:"90%"}),image:{marginLeft:"15px"},wrapper:{display:"flex",flexDirection:"column",alignItems:"center",width:"100%"}}})),U=function(){var e=R();return Object(x.jsxs)("div",{className:e.wrapper,children:[Object(x.jsx)(l.a,{className:e.appBar,position:"static",color:"inherit",children:Object(x.jsx)(o.a,{variant:"h2",align:"center",children:"Blue Meet"})}),Object(x.jsx)(y,{}),Object(x.jsx)(B,{children:Object(x.jsx)(E,{})})]})};a(128);c.a.render(Object(x.jsx)(g,{children:Object(x.jsx)(U,{})}),document.getElementById("root"))}},[[129,1,2]]]);
//# sourceMappingURL=main.e4a53b30.chunk.js.map