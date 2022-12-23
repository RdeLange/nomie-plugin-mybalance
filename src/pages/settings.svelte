<script>
    import { createEventDispatcher } from 'svelte';
    import {
      Button,
      Content,
        Grid,
        Row,
        Column,
    } from "carbon-components-svelte";
   
    export let pluginname;
    export let pluginemoji;

   let open=true;
   
   const dispatch = createEventDispatcher();

   function exitSettings(){
        dispatch("exitsettings");
        open = false;
    }

    function saveSettings(){
        dispatch("savesettings");
        dispatch("exitsettings");
        open = false;
    } 
</script>

<Content>
    <Grid>
      <Row>
        <Column>
          <h1 style="text-align:center">{pluginemoji}</h1>
          <h2 style="text-align:center">{pluginname}</h2>
          <h5 style="text-align:center">Plugin Settings</h5>
          <hr>
        </Column>
      </Row>
    </Grid>
    <Row>
      <Column>
        <br>
        <h2 style="text-align:center">This Plugin does not have settings</h2>
      </Column>
    </Row>
    <Row>
      <Column>
          <br>
           <span><Button kind="secondary" on:click={exitSettings} style="float: left;">Exit</Button></span>
           <br>
      </Column>
    <Column>
        <br>
         <span><Button on:click={saveSettings} style="float: right;">Save</Button></span>
         <br>
    </Column>
</Row>
  </Content>



  <style>
    h2 {
       margin: 0;
       padding: 0;
       font-size: 2.5em;
       font-weight: 400;
   }

 </style>

