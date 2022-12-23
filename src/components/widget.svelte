<script>
  import { onMount } from "svelte";
export let mbis;
let widgetparams = [];
let showwidget = false;

function initwidget() {
  for (let i in mbis) {
    let catindex = parseInt(i)+1;
    let scale =0;
    if (mbis[i].calculated) {
      scale = mbis[i].calculatedscale*95;
    }
    else {scale = mbis[i].scale*95}
    let label = mbis[i].label;
    widgetparams.push([label,scale.toFixed(0).toString()+"%"])
  }
  showwidget = true;
}

onMount(
  ()=>{
    initwidget();
  }
)

</script>

<style>

.parent {
    display: flex;
    justify-content: space-between;
    height:100%;
    margin-left: 2%;
    margin-right: 2%;
    margin-top:-2%;
    transform: rotateX(180deg);
    border-top: 1px solid black;
}

span.bar {
  height: 100%;
  width: 10%;
  transition: all 0.4s ease-in-out;
  border-radius: 0px 0px 5px 5px;
  
}

.label {
  transform:rotate(90deg) rotateX(180deg);
  margin-top:40%;

}

#first {
  background-color:#ED2527;
}

#second {
  background-color: #3DB549
}

#third {
  background-color: #2289B4;
}


#fourth {
  background-color:#F79321;
}


#five {
  background-color:#94AFDC;
}


#six {
  background-color:#FF5F75;
}

#seven {
  background-color:#00ADEF;
}


#eight {
  background-color:#935FA7;
}


</style>
{#if showwidget}

<div class="parent">
  <span id="first" class="bar" style="height:{widgetparams[0][1]};"><p class="label">{widgetparams[0][0]}</p></span>
  <span id="second" class="bar" style="height:{widgetparams[1][1]};"><p class="label">{widgetparams[1][0]}</p></span>
  <span id="third" class="bar" style="height:{widgetparams[2][1]};"><p class="label">{widgetparams[2][0]}</p></span>
  <span id="fourth" class="bar" style="height:{widgetparams[3][1]};"><p class="label">{widgetparams[3][0]}</p></span>
  <span id="five" class="bar" style="height:{widgetparams[4][1]};"><p class="label">{widgetparams[4][0]}</p></span>
  <span id="six" class="bar" style="height:{widgetparams[5][1]};"><p class="label">{widgetparams[4][0]}</p></span>
  <span id="seven" class="bar" style="height:{widgetparams[6][1]};"><p class="label">{widgetparams[6][0]}</p></span>
  <span id="eight" class="bar" style="height:{widgetparams[7][1]};"><p class="label">{widgetparams[7][0]}</p></span>
  
</div>


  {/if}