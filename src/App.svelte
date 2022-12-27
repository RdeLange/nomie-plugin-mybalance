<script>
  import { onMount } from 'svelte';
  import "carbon-components-svelte/css/all.css";
  import {
    Header,
    HeaderUtilities,
    HeaderGlobalAction,
    SkipToContent,
    Theme,
    Button,
  } from "carbon-components-svelte";
  import Main from "./pages/main.svelte";
  import Info from "./pages/info.svelte";
  import Settings from "./pages/settings.svelte";
  import MBISettings from "./pages/mbisettings.svelte";
  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";
  import Sun from "carbon-icons-svelte/lib/Sun.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import MBIWidget from "./components/widget.svelte"

  
  const pluginname = "My Balance";
  const pluginemoji = "⚖️";
  var parent = "";
  
  const plugin = new NomiePlugin({
        name: pluginname,
        emoji: pluginemoji,
        avatar: "data:image/jpeg;base64,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",
        description: "Plugin in support of the My Balance Indicator (MBI) framework",
        uses: ["createNote", "getLocation", "selectTrackables", "getTrackableUsage", "searchNotes"],
        version: "1.0",
        addToCaptureMenu: true,
        addToMoreMenu: true,
        addToWidgets: true,
      }); 
  let inNomie = false;
  let isSideNavOpen = false;
  let theme = "g10";
  let mode = "hidden";
  let loading = true;
  let view = "main";
  let mbisinit = [{label:"Breathe",color:"#ED2527",scale:0.1,calculated:false,calculations:[],calculatedscale:0.0},
   {label:"Hydrate",color:"#3DB549",scale:0.1,calculated:false,calculations:[],calculatedscale:0.0},
   {label:"Sleep",color:"#2289B4",scale:0.1,calculated:false,calculations:[],calculatedscale:0.0},
   {label:"Eat",color:"#F79321",scale:0.1,calculated:false,calculations:[],calculatedscale:0.0},
   {label:"Move",color:"#94AFDC",scale:0.1,calculated:false,calculations:[],calculatedscale:0.0},
   {label:"Connect",color:"#FF5F75",scale:0.1,calculated:false,calculations:[],calculatedscale:0.0},
   {label:"Learn",color:"#00ADEF",scale:0.1,calculated:false,calculations:[],calculatedscale:0.0},
   {label:"Reflect",color:"#935FA7",scale:0.1,calculated:false,calculations:[],calculatedscale:0.0}]
  let mbis = [];
  let mbisbaseline = [];
  let currentmbiindex = 0;

  // Load init params
  function loadInitParams() {
    parent = getParentUrl();
    plugin.onUIOpened(async () => {
      mode = 'modal';
    });

    plugin.onWidget(() => {
      if (plugin.prefs.theme == "light") {
        theme = "white"}
      else if (plugin.prefs.theme == "dark") {
        theme = "g100"}  
      else {theme = "g10"} 
      mode = "widget";
    });

    plugin.onRegistered(async () => {
      inNomie = true;
      loading = false;
      await plugin.storage.init()
      mbis = await plugin.storage.getItem('mbis') || mbisinit;
      if (mbis.length == 0){
        mbis = mbisinit
      }
      mbisbaseline = mbis;
      if (mode !="widget"){
      if (plugin.prefs.theme == "light") {
        theme = "g10"}
      else if (plugin.prefs.theme == "dark") {
        theme = "g90"}  
      else {theme = "g10"} 
    }})

    setTimeout(() => {
      if (loading) {
        inNomie = false;
      }
    }, 4000);
  }

  // change theme
  function toggleTheme(){
    if (theme == "white"){
      theme = "g10"}
    else if (theme == "g10"){
      theme = "g80"}
    else if (theme == "g80"){
      theme = "g90"}
    else if (theme == "g90"){
      theme = "g100"}
    else {
      theme = "white"}
 }

 // Get parent
 function getParentUrl() {
    var isInIframe = (parent !== window),
        parentUrl = null;

    var parentfound = null;
    
    if (isInIframe) {
        parentUrl = document.referrer;
    }

    if (parentUrl.includes("nomie") ) {
      parentfound = "Nomie"
    }
    else {parentfound = "Smarter4Ever"}

    return parentfound;
}

//view main page
function showMain(){
  view = "main"
  window.scrollTo(0,0);
 }
 
 //view info page
 function showInformation(){
  view = "info"
  window.scrollTo(0,0);
 }

 //view settings page
 function showSettings(){
  view = "settings"
  window.scrollTo(0,0);
 }

 //view mbisettings page
 function showMBISettings(payload){
  currentmbiindex = payload.detail;
  view = "mbisettings";
  window.scrollTo(0,0);
 }

 function saveSettings(){
  showMain();
 }

 // APP CODE
 
 

 function saveEdit(){
  startCalculation();
  plugin.storage.setItem('mbis', mbis);
  mbisbaseline = mbis;
  showMain();
 }

 async function exitEdit() {
  mbis= await plugin.storage.getItem('mbis')
  showMain();
  
 }

 function saveMBIs(){
  plugin.storage.setItem('mbis', mbis);
  mbisbaseline = mbis;
 }

 async function startCalculation(){
  //START loop through BMI's
  for (let mbi_index = 0; mbi_index < mbis.length; mbi_index++) {
    
    //START loop through Calculation
    let totalweight = 0;
    let totalvalue = 0;
    let finalscale = 0;
    for (let calc_index = 0; calc_index < mbis[mbi_index].calculations.length; calc_index++) {
      if (mbis[mbi_index].calculations[calc_index].trackable !="none") {
      //now get the value for the statistics
      let calculatedvalue = await getStatsValue(mbis[mbi_index].calculations[calc_index].statistics,mbis[mbi_index].calculations[calc_index].trackable,mbis[mbi_index].calculations[calc_index].timerange)
      // now we make sure that the value is within the min and max scale. Otherwise we change to either minscale or maxscale value
      if (calculatedvalue < mbis[mbi_index].calculations[calc_index].minscale) {calculatedvalue = mbis[mbi_index].calculations[calc_index].minscale;}
        if (calculatedvalue > mbis[mbi_index].calculations[calc_index].maxscale) {calculatedvalue = mbis[mbi_index].calculations[calc_index].maxscale;}
        // next step is to determin where on the scale the calculated value is
        let calculatedscale = (calculatedvalue-mbis[mbi_index].calculations[calc_index].minscale)/(mbis[mbi_index].calculations[calc_index].maxscale-mbis[mbi_index].calculations[calc_index].minscale);
        if (mbis[mbi_index].calculations[calc_index].reverseScale){
          calculatedscale = 1-calculatedscale;}
        totalweight = totalweight + parseInt(mbis[mbi_index].calculations[calc_index].weight);
        totalvalue = totalvalue + (calculatedscale*mbis[mbi_index].calculations[calc_index].weight);
       }
    }
    
    //END loop through Calculation
    //now calculate final result for this MBI
    if (totalweight >0){
    finalscale = (totalvalue/totalweight);}
    else {finalscale = 0}
    mbis[mbi_index].calculatedscale = finalscale;
      
 }
  //END loop through BMI's
  saveMBIs();
 }

 async function getStatsValue(statistic,trackable,timerange){
    let result = 0;
    if (trackable.charAt(0) == "#" || trackable.charAt(0) == "@" ) {
    const call = await plugin.getTrackableUsage({ tag:trackable, daysBack: parseInt(timerange)});
    const usage = call.usage;
    let total = 0;
    for (let value of usage.values) {
    total = total+value;
    }
    if (statistic == "sum"){
      result = total
    }
    else {result = total/usage.values.length}
  }
  else if (trackable.charAt(0) == "|"){
    let searchstring = trackable.slice(1)
    const notes = await plugin.searchNotes(searchstring, new Date(), parseInt(timerange) );
    if (notes) {
    let total = notes.length;
    if (statistic == "sum"){
      result = total
    }
    else {result = total/parseInt(timerange)}
  }
  else {result = 0}
  }

  else {result = 0}
return result;

 }

 onMount(async () => {
  loadInitParams();
  setTimeout(()=>{startCalculation()},1000)
 })

</script>


{#if mode == "modal"  || mode =="widget"}
<Theme bind:theme/>

{#if inNomie}
{#if mode == "modal"}
<Header company={parent} platformName={pluginname} on:click={showMain}>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    <HeaderGlobalAction aria-label="Settings" icon={SettingsAdjust} on:click={showSettings}/>
    <HeaderGlobalAction aria-label="Theme" icon={Sun} on:click={toggleTheme}/>
    <HeaderGlobalAction aria-label="Theme" icon={Information} on:click={showInformation}/>
  </HeaderUtilities>
</Header>
{#if view == "main"}
<Main bind:mbis={mbis} pluginname={pluginname} pluginemoji={pluginemoji} on:mbisettings={(e) => {showMBISettings(e)}} on:savembis={() => {saveMBIs()}}/>
{:else if view == "info"}
<Info parent={parent} pluginname={pluginname} pluginemoji={pluginemoji} on:exitinfo={showMain}/>
{:else if view == "settings"}
<Settings pluginname={pluginname} pluginemoji={pluginemoji} on:exitsettings={showMain} on:savesettings={saveSettings}/>
{:else if view == "mbisettings"}
<MBISettings bind:mbi2edit={mbis[currentmbiindex]} plugin={plugin} pluginname={pluginname} pluginemoji={pluginemoji} theme={theme} on:exitedit={() => {exitEdit()}} on:saveedit={() => {saveEdit()}}/>
{/if}
{:else if mode == "widget"}
<MBIWidget bind:mbis={mbis}></MBIWidget>
{/if}
{/if}

{:else if !inNomie}
        <h1 style="text-align:center">{pluginemoji}</h1>
        <h2 style="text-align:center">{pluginname}</h2>
        <h5 style="text-align:center">This is a plugin for {parent}</h5>
        <hr>
{/if}
{#if loading}
<div class="startup">
<p>Loading....</p>
</div>

{/if}
