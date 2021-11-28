(this.webpackJsonpnea=this.webpackJsonpnea||[]).push([[0],{15:function(t,e,s){},17:function(t,e,s){},19:function(t,e,s){"use strict";s.r(e);var a=s(2),i=s.n(a),n=s(10),r=s.n(n),c=(s(15),s(7)),o=s.n(c),h=s(8),l=s(3),d=s(4),u=s(1),p=s(6),j=s(5),b=(s(17),s(0)),v=function(t){Object(p.a)(s,t);var e=Object(j.a)(s);function s(t){var a;return Object(l.a)(this,s),(a=e.call(this,t)).state={style:{}},a.handelDragStart=a.handelDragStart.bind(Object(u.a)(a)),a.handelDragLeave=a.handelDragLeave.bind(Object(u.a)(a)),a.handelDragOver=a.handelDragOver.bind(Object(u.a)(a)),a.handelDrop=a.handelDrop.bind(Object(u.a)(a)),a}return Object(d.a)(s,[{key:"handelDragStart",value:function(){this.props.setDragObject(this.start?"start":this.end?"end":"")}},{key:"handelDrop",value:function(){this.setState({style:{}}),this.props.handelDrop(this.props.pos)}},{key:"handelDragOver",value:function(t){t.preventDefault(),this.setState({style:{backgroundColor:"pink"}})}},{key:"handelDragLeave",value:function(){this.setState({style:{}})}},{key:"render",value:function(){return this.classList=["node"],this.draggable=!1,this.start=!1,this.end=!1,this.props.wallLeft&&this.classList.push("wall_left"),this.props.wallBottom&&this.classList.push("wall_bottom"),"path"===this.props.type?this.classList.push("node_path"):this.classList.filter((function(t){return"node_path"!=t})),this.props.pos[0]===this.props.start[0]&&this.props.pos[1]===this.props.start[1]?(this.classList.push("node_start"),this.draggable=!0,this.start=!0):this.classList.filter((function(t){return"node_start"!=t})),this.props.pos[0]===this.props.end[0]&&this.props.pos[1]===this.props.end[1]?(this.classList.push("node_end"),this.draggable=!0,this.end=!0):this.classList.filter((function(t){return"node_end"!=t})),this.props.index?"path"!=this.props.type?this.state.style={animation:"visit_node 2s linear forwards",animationDelay:"".concat(.1*this.props.index,"s")}:this.state.style={animation:"visit_node_path 2s linear forwards",animationDelay:"".concat(.1*this.props.index,"s")}:this.state.style={},Object(b.jsx)("td",{style:this.state.style,className:this.classList.join(" "),draggable:this.draggable,onDragStart:this.handelDragStart,onDrop:this.handelDrop,onDragOver:this.handelDragOver,onDragLeave:this.handelDragLeave})}}]),s}(i.a.Component),g=function(t){Object(p.a)(s,t);var e=Object(j.a)(s);function s(t){var a;return Object(l.a)(this,s),(a=e.call(this,t)).state={dragObject:""},a.renderTable=a.renderTable.bind(Object(u.a)(a)),a.handelDrop=a.handelDrop.bind(Object(u.a)(a)),a.setDragObject=a.setDragObject.bind(Object(u.a)(a)),a}return Object(d.a)(s,[{key:"handelDrop",value:function(t){switch(this.state.dragObject){case"start":this.props.setStart(t);break;case"end":this.props.setEnd(t)}}},{key:"setDragObject",value:function(t){this.setState({dragObject:t})}},{key:"renderTable",value:function(){var t=this;return Object(b.jsx)("table",{children:Object(b.jsx)("tbody",{className:"column",children:Array.from(Array(this.props.grid.height).keys()).map((function(e,s){return Object(b.jsx)("tr",{className:"row wall_right ".concat(0===s?"wall_top":""),children:Array.from(Array(t.props.grid.width).keys()).map((function(e,a){return Object(b.jsx)(v,{wallLeft:t.props.grid.grid[s][a].wallLeft,wallBottom:t.props.grid.grid[s][a].wallBottom,pos:[s,a],start:t.props.nodes.start,handelDrop:t.handelDrop,end:t.props.nodes.end,setDragObject:t.setDragObject,type:t.props.grid.grid[s][a].type,index:t.props.grid.grid[s][a].index},a)}))},s)}))})})}},{key:"render",value:function(){return this.props.grid?Object(b.jsx)("div",{className:"grid",style:{padding:10},children:Object(b.jsx)(this.renderTable,{})}):Object(b.jsx)("div",{className:"grid"})}}]),s}(a.Component),f=function(t){Object(p.a)(s,t);var e=Object(j.a)(s);function s(t){var a;return Object(l.a)(this,s),(a=e.call(this,t)).state={show:!1},a}return Object(d.a)(s,[{key:"handelSizeChange",value:function(t){var e=t.target.value;this.props.setSize({height:e,width:e})}},{key:"renderSettings",value:function(){var t=this;return Object(b.jsx)("div",{className:"settings_container",children:Object(b.jsxs)("div",{className:"row",style:{gap:10},children:[Object(b.jsx)("p",{children:"Size"}),Object(b.jsx)("input",{className:"text_input",type:"number",value:this.props.size.height,min:1,onChange:function(e){return t.handelSizeChange(e)}})]})})}},{key:"render",value:function(){var t=this;return Object(b.jsxs)("div",{children:[Object(b.jsx)("button",{className:"button settings",onClick:function(){t.setState({show:!t.state.show})},children:"Settings"}),this.state.show?this.renderSettings():null]})}}]),s}(i.a.Component),O=function(t){Object(p.a)(s,t);var e=Object(j.a)(s);function s(t){return Object(l.a)(this,s),e.call(this,t)}return Object(d.a)(s,[{key:"render",value:function(){var t=this;return Object(b.jsxs)("div",{className:"menu",children:[Object(b.jsx)(f,{size:this.props.size,setSize:this.props.setSize}),Object(b.jsxs)("select",{className:"algorithms",name:"algorithms",id:"algorithms",onChange:function(e){t.props.setAlgorithm(e.target.value)},children:[Object(b.jsx)("option",{value:"select",children:"Select Generating Algorithm"}),Object(b.jsx)("option",{value:"prims",children:"Prims"}),Object(b.jsx)("option",{value:"recursive_backtracking",children:"recursive backtracking"})]}),Object(b.jsx)("button",{className:"button",onClick:this.props.generate,children:"Generate"}),Object(b.jsx)("button",{className:"button",onClick:this.props.solve,children:"Solve"}),Object(b.jsxs)("select",{className:"algorithms",name:"algorithms",id:"algorithms",onChange:function(e){t.props.setSolve(e.target.value)},children:[Object(b.jsx)("option",{value:"select",children:"Select Solving Algorithm"}),Object(b.jsx)("option",{value:"dijkstra",children:"Dijkstra"}),Object(b.jsx)("option",{value:"dfs",children:"Depth First Search"}),Object(b.jsx)("option",{value:"bfs",children:"Breadth First Search"})]}),Object(b.jsx)("button",{className:"button clear",onClick:this.props.clearGrid,children:"Reset"})]})}}]),s}(a.Component),m=function(t){Object(p.a)(s,t);var e=Object(j.a)(s);function s(){return Object(l.a)(this,s),e.apply(this,arguments)}return Object(d.a)(s,[{key:"render",value:function(){return Object(b.jsxs)("div",{className:"key",children:[Object(b.jsxs)("div",{className:"key_item",children:[Object(b.jsx)("div",{className:"key_node_start"}),Object(b.jsx)("p",{children:"Start Node"})]}),Object(b.jsxs)("div",{className:"key_item",children:[Object(b.jsx)("div",{className:"key_node_end"}),Object(b.jsx)("p",{children:"Finish Node"})]}),Object(b.jsxs)("div",{className:"key_item",children:[Object(b.jsx)("div",{className:"key_node_via-point"}),Object(b.jsx)("p",{children:"Via Point"})]})]})}}]),s}(a.Component),x=function(t){Object(p.a)(s,t);var e=Object(j.a)(s);function s(t){var a;return Object(l.a)(this,s),(a=e.call(this,t)).state={grid:null,algorithm:null,solve:null,nodes:{start:[0,0],end:[null,null]},size:{width:15,height:15}},a.solved=!1,a.maze=!1,a.fetchGrid=a.fetchGrid.bind(Object(u.a)(a)),a.setAlgorithm=a.setAlgorithm.bind(Object(u.a)(a)),a.clearGrid=a.clearGrid.bind(Object(u.a)(a)),a.setSolve=a.setSolve.bind(Object(u.a)(a)),a.solveGrid=a.solveGrid.bind(Object(u.a)(a)),a.setSize=a.setSize.bind(Object(u.a)(a)),a.setStart=a.setStart.bind(Object(u.a)(a)),a.setEnd=a.setEnd.bind(Object(u.a)(a)),a.should_solve=a.should_solve.bind(Object(u.a)(a)),a}return Object(d.a)(s,[{key:"componentDidMount",value:function(){this.clearGrid()}},{key:"setSize",value:function(t){var e=this;this.setState({size:t},(function(){t.width>0&&t.height>0&&e.clearGrid()}))}},{key:"setStart",value:function(t){var e=this;this.setState({nodes:{start:t,end:this.state.nodes.end}},(function(){e.should_solve()}))}},{key:"setEnd",value:function(t){var e=this;this.setState({nodes:{start:this.state.nodes.start,end:t}},(function(){e.should_solve()}))}},{key:"should_solve",value:function(){var t=Object(h.a)(o.a.mark((function t(){var e=this;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.solved&&this.clear_node_index().then((function(){e.solveGrid()}));case 1:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"clear_node_index",value:function(){var t=Object(h.a)(o.a.mark((function t(){var e=this;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",new Promise((function(t,s){for(var a=e.state.grid.grid,i=0;i<e.state.size.height;i++)for(var n=0;n<e.state.size.width;n++)a[i][n].index=null;e.setState({grid:{grid:a,height:e.state.grid.height,width:e.state.grid.width}},(function(){t()}))})));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"fetchGrid",value:function(){var t=Object(h.a)(o.a.mark((function t(){var e;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.state.algorithm){t.next=12;break}return t.next=3,fetch("https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?type=generate&width="+this.state.size.width+"&height="+this.state.size.height+"&generate="+this.state.algorithm);case 3:return e=t.sent,t.next=6,e.json();case 6:e=t.sent,this.setState({grid:e}),this.solved=!1,this.maze=!0,t.next=13;break;case 12:alert("Please select a maze generating algorithm");case 13:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"solveGrid",value:function(){var t=Object(h.a)(o.a.mark((function t(){var e;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.clear_node_index();case 2:if(!this.maze||!this.state.solve){t.next=13;break}return t.next=5,fetch("https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?type=solve&width="+this.state.size.width+"&height="+this.state.size.height+"&solve="+this.state.solve+"&start="+this.state.nodes.start+"&end="+this.state.nodes.end,{method:"POST",body:JSON.stringify(this.state.grid)});case 5:return e=t.sent,t.next=8,e.json();case 8:e=t.sent,this.setState({grid:e}),this.solved=!0,t.next=14;break;case 13:this.maze?alert("Please select a solving algorithm"):alert("Please generate a maze");case 14:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"clearGrid",value:function(){var t=Object(h.a)(o.a.mark((function t(){var e;return o.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://jkrlv64tsl.execute-api.eu-west-2.amazonaws.com/default/NEA?type=empty_maze&width="+this.state.size.width+"&height="+this.state.size.height);case 2:return e=t.sent,t.next=5,e.json();case 5:e=t.sent,this.setState({grid:e,nodes:{start:[0,0],end:[this.state.size.height-1,this.state.size.width-1]}}),this.maze=!1,this.solved=!1;case 9:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"setAlgorithm",value:function(t){this.setState({algorithm:t})}},{key:"setSolve",value:function(t){this.setState({solve:t})}},{key:"render",value:function(){return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)(O,{setAlgorithm:this.setAlgorithm,setSolve:this.setSolve,generate:this.fetchGrid,clearGrid:this.clearGrid,solve:this.solveGrid,size:this.state.size,setSize:this.setSize}),Object(b.jsx)(m,{}),Object(b.jsx)(g,{grid:this.state.grid,nodes:this.state.nodes,size:this.state.size,setStart:this.setStart,setEnd:this.setEnd})]})}}]),s}(a.Component),y=x,k=function(t){t&&t instanceof Function&&s.e(3).then(s.bind(null,20)).then((function(e){var s=e.getCLS,a=e.getFID,i=e.getFCP,n=e.getLCP,r=e.getTTFB;s(t),a(t),i(t),n(t),r(t)}))};r.a.render(Object(b.jsx)(i.a.StrictMode,{children:Object(b.jsx)(y,{})}),document.getElementById("root")),k()}},[[19,1,2]]]);
//# sourceMappingURL=main.1d494694.chunk.js.map