!function(t){function e(i){if(s[i])return s[i].exports;var n=s[i]={exports:{},id:i,loaded:!1};return t[i].call(n.exports,n,n.exports,e),n.loaded=!0,n.exports}var s={};return e.m=t,e.c=s,e.p="",e(0)}([function(t,e){"use strict";window.bans={el:"#bans",data:function(){return _.merge({bans:!1,config:{filter:this.$session.get("bans.filter",{order:"date desc",limit:25})},pages:0,count:"",selected:[]},window.$data)},ready:function(){this.resource=this.$resource("api/security/ban{/id}"),this.$watch("config.page",this.load,{immediate:!0})},watch:{"config.filter":{handler:function(t){this.config.page?this.config.page=0:this.load(),this.$session.set("bans.filter",t)},deep:!0}},computed:{statusOptions:function(){var t=_.map(this.$data.statuses,function(t,e){return{text:t,value:e}});return[{label:this.$trans("Filter by"),options:t}]}},methods:{active:function(t){return this.selected.indexOf(t.id)!=-1},save:function(t){this.resource.save({id:t.id},{ban:t}).then(function(){this.load(),this.$notify("Ban saved.")})},status:function(t){var e=this.getSelected();e.forEach(function(e){e.status=t}),this.resource.save({id:"bulk"},{bans:e}).then(function(){this.load(),this.$notify("Bans saved.")})},toggleStatus:function(t){t.status=1===t.status?2:1,this.save(t)},remove:function(){this.resource.delete({id:"bulk"},{ids:this.selected}).then(function(){this.load(),this.$notify("Bans deleted.")})},copy:function(){this.selected.length&&this.resource.save({id:"copy"},{ids:this.selected}).then(function(){this.load(),this.$notify("Bans copied.")})},load:function(){this.resource.query({filter:this.config.filter,page:this.config.page}).then(function(t){var e=t.data;this.$set("bans",e.bans),this.$set("pages",e.pages),this.$set("count",e.count),this.$set("selected",[])})},getSelected:function(){return this.bans.filter(function(t){return this.selected.indexOf(t.id)!==-1},this)},removeBans:function(){this.resource.delete({id:"bulk"},{ids:this.selected}).then(function(){this.load(),this.$notify("Bans(s) deleted.")})},getStatusText:function(t){return this.statuses[t.status]}},components:{}},Vue.ready(window.bans)}]);