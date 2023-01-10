<script>
    import { createEventDispatcher } from 'svelte';
    import {
      Button,
      Content,
        Grid,
        Row,
        Column,
        Tile,
        TextInput,
        Select, SelectItem,
        Toggle,
    } from "carbon-components-svelte";
    import List from "carbon-icons-svelte/lib/TextAlignJustify.svelte";
    import CheckboxIndeterminate from "carbon-icons-svelte/lib/CheckboxIndeterminate.svelte";
    import Person from "carbon-icons-svelte/lib/Person.svelte";
    import Tag from "carbon-icons-svelte/lib/Tag.svelte";
    import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";
   
    export let pluginname;
    export let pluginemoji;
    export let mbi2edit;
    export let plugin;
    export let theme;

   let calculationsrefresh = false;
   let open=true;
   let trackers = "none";
   let trackersDisplay ="∅ None";
   
   const dispatch = createEventDispatcher();

   const addTracker = async (index) => {
      const justOneTrackable = await plugin.selectTrackables('tracker',false);
      if(justOneTrackable) {
        trackers=justOneTrackable[0].id;
        mbi2edit.calculations[index].trackable = justOneTrackable[0].id;
        trackersDisplay=justOneTrackable[0].tracker.emoji+" "+justOneTrackable[0].tracker.label;
        mbi2edit.calculations[index].trackabledisplay = justOneTrackable[0].tracker.emoji+" "+justOneTrackable[0].tracker.label;
 }
      
    }

    const addPerson = async (index) => {
      const justOneTrackable = await plugin.selectTrackables('person',false);
      if(justOneTrackable) {
        mbi2edit.calculations[index].trackable = justOneTrackable[0].id;
        trackers=justOneTrackable[0].id;
        trackersDisplay="😎 "+justOneTrackable[0].person.displayName;
        mbi2edit.calculations[index].trackabledisplay = "😎 "+justOneTrackable[0].person.displayName;
      }
      
    }

    const addTag = async (index) => {
      const justOneTrackable = await plugin.prompt('Provide Tag', 'Please provide a tag which will be counted in your logs)');
      if(justOneTrackable.value) {
        mbi2edit.calculations[index].trackable = "|"+justOneTrackable.value;
        trackers="|"+justOneTrackable.value;
        trackersDisplay="🔎 "+justOneTrackable.value;
        mbi2edit.calculations[index].trackabledisplay = "🔎 "+justOneTrackable.value;
      }
      
    }

    const removeTracker = async (index) => {
        mbi2edit.calculations[index].trackable =  "none";
      trackers = "none";
      trackersDisplay = "∅ None";
}

    const addCalculation = async () => {
        mbi2edit.calculations.push({minscale:1,maxscale:10,weight:1,statistics:"average",reverseScale:false,timerange:30,trackable:"none",trackabledisplay:"∅ None"})
        calculationsrefresh = true;
        setTimeout(()=>{calculationsrefresh = false,200})
    }

    const deleteCalculation = async (index) => {
        mbi2edit.calculations.splice(index,1);
        calculationsrefresh = true;
        setTimeout(()=>{calculationsrefresh = false,200})
    }
   
   // Set background
	let themecolor = "#E9E9E9";
	let themefont = "#161616"
	if(theme=="g10"){
		themecolor = "grey";
		themefont = "#161616"
	}
	else {themecolor = "lightgrey";
	themefont = "#F4F4F4"}

   function exitEdit(){
        dispatch("exitedit");
        open = false;
    } //not used

    function saveEdit(){
        if (mbi2edit.calculations.length < 1) {
            mbi2edit.calculated = false;
        }
        dispatch("saveedit");
        open = false;
    } 
</script>

<Content>
    <Grid>
      <Row>
        <Column>
          <h1 style="text-align:center">{pluginemoji}</h1>
          <h2 style="text-align:center">{pluginname}</h2>
          <h5 style="text-align:center">My Balance Indicator</h5>
          <hr>
        </Column>
      </Row>
    </Grid>
    <Tile style="background-color:{mbi2edit.color}">
        <Row>
        <Column>
            <h3>Category:</h3>
        </Column>
        <Column>
        <TextInput hideLabel placeholder="Category Name" bind:value={mbi2edit.label}/>
        </Column>
        </Row>
        <hr>
        <Row>
            <Column>
                <h3>Calculations:</h3>
            </Column>
        </Row>
        {#if !calculationsrefresh}
        {#each mbi2edit.calculations as calculation, index }
        <br>
        <Row>
            <Column>
                <Tile>
                    <Row>
                        <Column>
                            <td style="vertical-align:middle ;text-align:left;width:100px"><p style="font-size:82%; display:inline;font-weight:300;text-align:left;vertical-align:middle;">Trackable:</p></td>
                            <td style="vertical-align:middle; text-align:center;width:20px"><span on:click={()=>{removeTracker(index)}}><CheckboxIndeterminate size={20} style="color:{themecolor};cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px"></CheckboxIndeterminate></span></td>
                            <td style="vertical-align:middle; text-align:center;width:20px"><span on:click={()=>{addTracker(index)}}><List size={20} style="color:{themecolor};cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px"></List></span></td>
                            <td style="vertical-align:middle; text-align:center;width:20px"><span on:click={()=>{addPerson(index)}}><Person size={20} style="color:{themecolor};cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px"></Person></span></td>
                            <td style="vertical-align:middle; text-align:center;width:20px"><span on:click={()=>{addTag(index)}}><Tag size={20} style="color:{themecolor};cursor: pointer;display:table-cell;vertical-align:middle;margin-top:0px"></Tag></span></td>
                            <td style="vertical-align:middle ;text-align:right;width:250px"><p style="font-size:82%; display:inline;font-weight:300;text-align:left;vertical-align:middle;">{calculation.trackabledisplay}</p></td>
                        
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Select inline labelText="Timerange" bind:selected = {calculation.timerange}>
                                <SelectItem value="7" text="7 Days" />
                                <SelectItem value="30" text="30 Days" />
                                <SelectItem value="60" text="60 Days" />
                                <SelectItem value="90" text="90 Days" />
                              </Select>
                        </Column>
                        </Row>
                        <Row>
                        <Column>
                            <Select inline labelText="Statistics" bind:selected = {calculation.statistics}>
                                <SelectItem value="average" text="Average" />
                                <SelectItem value="sum" text="Sum" />
                              </Select>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <br>
                            <p style="font-size:82%">Min. Scale:</p>
                        </Column>
                        <Column>
                        <TextInput style="font-size:82%" hideLabel placeholder="Minimal Scale" bind:value={calculation.minscale}/>
                        </Column>
                        </Row>
                        <Row>
                        <Column>
                            <br>
                            <p style="font-size:82%">Max. Scale:</p>
                        </Column>
                        <Column>
                        <TextInput style="font-size:82%" hideLabel placeholder="Maximum Scale" bind:value={calculation.maxscale}/>
                        </Column>
                    </Row>
                    <Row >
                        <Column style="vertical-align:middle">
                            <br>
                            <p style="font-size:82%">Reversed Scale:</p>
                        </Column>
                        <Column>
                        <Toggle style="font-size:82%" bind:toggled={calculation.reverseScale}>
                            <span slot="labelA" style="color: red"></span>
                            <span slot="labelB" style="color: green"></span>
                        </Toggle>
                        </Column>
                    </Row>
                    <Row>
                        <Column style="vertical-align:middle">
                            <br>
                            <p style="font-size:82%">Weight Factor:</p>
                        </Column>
                        <Column>
                        <TextInput style="font-size:80%" hideLabel placeholder="Weight Factor" bind:value={calculation.weight}/>
                        </Column>
                    </Row>
                    <br>
                    <Row>
                        <Column></Column>
                        <Column>
                            <span><Button kind="danger-tertiary" icon={TrashCan}  style="width:100%" size="small" on:click={()=>{deleteCalculation(index)}}>Delete</Button></span>
                        </Column>
                        
                    </Row>
                </Tile>
            </Column>
        </Row>
        {/each}
        {/if}
    </Tile>
    
    <br>
    <Tile on:click={()=>{addCalculation()}} style="background-color:{mbi2edit.color};cursor: pointer">
        <h3 style="align:center">+ Add Calculation</h3>
    </Tile>
    <Row>
      <Column>
         
      </Column>
    <Column>
        <br>
         <span><Button on:click={()=>{saveEdit()}} style="float: right;">Save & Exit</Button></span>
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

