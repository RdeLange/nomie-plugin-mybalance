<script>
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import Wheel from "../components/wol.svelte"
    import {
      Button,
      Content,
        Grid,
        Row,
        Column,
        Tile,
        Slider,
    } from "carbon-components-svelte";
    import Edit from "carbon-icons-svelte/lib/Edit.svelte";
    import CalculatorCheck from "carbon-icons-svelte/lib/CalculatorCheck.svelte";
   
    export let pluginname;
    export let pluginemoji;
    export let mbis;

   let open=true;
   let refresh = false;
   
   const dispatch = createEventDispatcher();

   

   
   
   function exitMain(){
        dispatch("exitinfo");
        open = false;
    }

    function showMBISettings(index) {
      dispatch("mbisettings",index)
    }

    function saveMBIs() {
      dispatch("savembis");
    }

    function toggleAutoCalculation(index){
    if (mbis[index].calculated) {
      mbis[index].calculated = false;
      
    }
    else {
      if (mbis[index].calculations.length > 0) {
        mbis[index].calculated = true;
      }
    }
    saveMBIs();
    }

</script>

<Content>
    <Grid>
      <Row>
        <Column>
          <h1 style="text-align:center">{pluginemoji}</h1>
          <h2 style="text-align:center">{pluginname}</h2>
          <h5 style="text-align:center">Loaded Succesfully</h5>
          <hr>
        </Column>
      </Row>
    </Grid>
    {#if !refresh}
    <Wheel bind:data={mbis}></Wheel>
    <div>
    {#each mbis as mbi, index}
    <Tile 
    style="background-color:{mbi.color}; border-radius:5px">
      <Grid>
        <Row>
          <Column>
          <h4>{mbi.label}</h4>
        </Column>
          <Column style="text-align:right">
            <span on:click|preventDefault|stopPropagation={()=>{showMBISettings(index)}}><Edit size={24}/></span>
            {#if !mbi.calculated}
            <span on:click|preventDefault|stopPropagation={()=>{toggleAutoCalculation(index)}}><CalculatorCheck size={24}  color="grey" /></span>
            {:else}
            <span on:click|preventDefault|stopPropagation={()=>{toggleAutoCalculation(index)}}><CalculatorCheck size={24}  color="white" /></span>
            {/if}
          </Column>
        </Row>
        <Row>
          <Column>
            {#if !mbi.calculated}
      <Slider
      fullWidth
      hideTextInput
    min={0}
    max={1}
    bind:value={mbi.scale}
    step={0.1}
    on:change={()=>{saveMBIs()}}
/>
{:else}
<Slider
    disabled
      fullWidth
      hideTextInput
    min={0}
    max={1}
    bind:value={mbi.scale}
    step={0.1}
    on:change={()=>{saveMBIs()}}
/>
{/if}
</Column>
</Row>
</Grid>
    </Tile>
    <br>
    {/each}
  </div>
    {/if}
  </Content>



  <style>
    h2 {
       margin: 0;
       padding: 0;
       font-size: 2.5em;
       font-weight: 400;
   }

   



 </style>

