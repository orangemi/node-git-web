webpackJsonp([4],{116:function(e,t,n){"use strict";var r=n(42),a=n(305);e.exports=a({components:{"new-repo-dialog":n(306)},data:function(){return{showCreateRepoDialog:!1,repos:[]}},mounted:function(){this.fetchList()},methods:{fetchList:function(){var e;return regeneratorRuntime.async(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,regeneratorRuntime.awrap(r.get("/api/repos"));case 2:e=t.sent,this.repos=e.data;case 4:case"end":return t.stop()}},null,this)}}})},305:function(e,t,n){var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"navi"},[n("el-button",{attrs:{type:"success"},on:{click:function(t){e.showCreateRepoDialog=!0}}},[e._v("New Repo")])],1),n("el-dialog",{attrs:{visible:e.showCreateRepoDialog},on:{"update:visible":function(t){e.showCreateRepoDialog=t}}},[n("new-repo-dialog")],1),n("el-table",{attrs:{data:e.repos}},[n("el-table-column",{attrs:{label:"Name"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("router-link",{attrs:{to:{name:"repo-detail-summary",params:{repo:t.row}}}},[e._v(e._s(t.row))])]}}])})],1)],1)},a=[];e.exports=function(e){var t="function"==typeof e?e.options:e;return t.render=r,t.staticRenderFns=a,e}},306:function(e,t,n){"use strict";var r=n(42),a=n(307);e.exports=a({data:function(){return{name:""}},methods:{createRepo:function(){var e;return regeneratorRuntime.async(function(t){for(;;)switch(t.prev=t.next){case 0:return e={name:this.name},t.next=3,regeneratorRuntime.awrap(r.post("/api/repos",e));case 3:this.$router.push({name:"repo-detail",params:{repo:this.name}});case 4:case"end":return t.stop()}},null,this)}}})},307:function(e,t,n){var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-form",[n("el-form-item",{attrs:{label:"Name"}},[n("el-input",{model:{value:e.name,callback:function(t){e.name=t},expression:"name"}})],1),n("el-form-item",[n("el-button",{attrs:{type:"success"},on:{click:e.createRepo}},[e._v("Create Repo")])],1)],1)],1)},a=[];e.exports=function(e){var t="function"==typeof e?e.options:e;return t.render=r,t.staticRenderFns=a,e}}});