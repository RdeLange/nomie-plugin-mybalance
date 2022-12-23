<script>
    export let data = [{label:"Breathe",color:"#ED2527",scale:0.1},
   {label:"Hydrate",color:"#3DB549",scale:0.2},
   {label:"Sleep",color:"#2289B4",scale:0.3},
   {label:"Eat",color:"#F79321",scale:0.4},
   {label:"Move",color:"#94AFDC",scale:0.5},
   {label:"Connect",color:"#FF5F75",scale:0.6},
   {label:"Learn",color:"#00ADEF",scale:0.7},
   {label:"Reflect",color:"#935FA7",scale:0.8}]
    
    </script>
    
      
    <div id="wheelOfLife" class="container">
      <img id="wheelOfLife-background" src="./images/Wheel-Of-Life.png" alt="Wheel Of Life">
      {#if data[0].calculated}
      <div id="category-1" class="triangle" style = "transform: rotate(0deg) scale({data[0].calculatedscale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {:else}
      <div id="category-1" class="triangle" style = "transform: rotate(0deg) scale({data[0].scale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {/if}  
      <div id="category-label" class="triangle" style = "transform: rotate(0deg) scale(1.2);">
        <svg viewBox="-8 -8 110.5 155.5">
          <path fill="transparent" d="M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z" id="label1"/>
          <style>
            text { 
                font-size: 10px;
                font-family: Franklin Gothic, sans-serif;
                font-weight: 900; 
                text-transform: uppercase;
                letter-spacing: 10px;
                fill: white;}
        </style>
        <text dx ="6" dy="-1" textLength="106" lengthAdjust="spacing">
            <textPath xlink:href="#label1" textLength="106" lengthAdjust="spacing">
              {data[0].label}
            </textPath>
        </text>
        </svg>
      </div>
    
      {#if data[1].calculated}
      <div id="category-2" class="triangle" style = "transform: rotate(45deg) scale({data[1].calculatedscale};">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {:else}
      <div id="category-2" class="triangle" style = "transform: rotate(45deg) scale({data[1].scale};">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {/if}
      <div id="category-label" class="triangle" style = "transform: rotate(45deg) scale(1.2);">
        <svg viewBox="-8 -8 110.5 155.5">
          <path fill="transparent" d="M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z" id="label2"/>
          <text dx ="6" dy="-1" textLength="106" lengthAdjust="spacing">
              <textPath xlink:href="#label2" textLength="106" lengthAdjust="spacing">
                {data[1].label}
              </textPath>
          </text>
        </svg>
      </div>
    
      {#if data[2].calculated}
      <div id="category-3" class="triangle" style = "transform: rotate(90deg) scale({data[2].calculatedscale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {:else}
      <div id="category-3" class="triangle" style = "transform: rotate(90deg) scale({data[2].scale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {/if}
      <div id="category-label" class="triangle" style = "transform: rotate(90deg) scale(1.2);">
        <svg viewBox="-8 -8 110.5 155.5">
          <path fill="transparent" d="M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z" id="label3"/>
          <text dx ="6" dy="-1" textLength="106" lengthAdjust="spacing">
              <textPath xlink:href="#label3" textLength="106" lengthAdjust="spacing">
                {data[2].label}
              </textPath>
          </text>
        </svg>
      </div>
      {#if data[3].calculated}
      <div id="category-4" class="triangle" style = "transform: rotate(135deg) scale({data[3].calculatedscale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {:else}
      <div id="category-4" class="triangle" style = "transform: rotate(135deg) scale({data[3].scale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {/if}
      <div id="category-label" class="triangle" style = "transform: rotate(135deg) scale(1.2);">
        <svg viewBox="-8 -8 110.5 155.5">
          <path fill="transparent" d="M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z" id="label4"/>
          <text dx ="6" dy="-1" textLength="106" lengthAdjust="spacing">
              <textPath xlink:href="#label4" textLength="106" lengthAdjust="spacing">
                {data[3].label}
              </textPath>
          </text>
        </svg>
      </div>
      {#if data[4].calculated}
      <div id="category-5" class="triangle" style = "transform: rotate(180deg) scale({data[4].calculatedscale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {:else}
      <div id="category-5" class="triangle" style = "transform: rotate(180deg) scale({data[4].scale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {/if}
      <div id="category-label" class="triangle" style = "transform: rotate(180deg) scale(1.2);">
        <svg viewBox="-8 -8 110.5 155.5">
          <path fill="transparent" d="M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z" id="label5"/>
          <text dx ="6" dy="-1" textLength="106" lengthAdjust="spacing">
              <textPath xlink:href="#label5" textLength="106" lengthAdjust="spacing">
                {data[4].label}
              </textPath>
          </text>
        </svg>
      </div>
      {#if data[5].calculated}
      <div id="category-6" class="triangle" style = "transform: rotate(225deg) scale({data[5].calculatedscale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {:else}
      <div id="category-6" class="triangle" style = "transform: rotate(225deg) scale({data[5].scale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z"/>
        </svg>
      </div>
      {/if}
      <div id="category-label" class="triangle" style = "transform: rotate(225deg) scale(1.2);">
        <svg viewBox="-8 -8 110.5 155.5">
          <path fill="transparent" d="M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z" id="label6"/>
          <text dx ="6" dy="-1" textLength="106" lengthAdjust="spacing">
              <textPath xlink:href="#label6" textLength="106" lengthAdjust="spacing">
                {data[5].label}
              </textPath>
          </text>
        </svg>
      </div>
      {#if data[6].calculated}
      <div id="category-7" class="triangle" style = "transform: rotate(270deg) scale({data[6].calculatedscale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z" id="texttest1"/>
        </svg>
      </div>
      {:else}
      <div id="category-7" class="triangle" style = "transform: rotate(270deg) scale({data[6].scale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z" id="texttest1"/>
        </svg>
      </div>
      {/if}
      <div id="category-label" class="triangle" style = "transform: rotate(270deg) scale(1.2);">
        <svg viewBox="-8 -8 110.5 155.5">
          <path fill="transparent" d="M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z" id="label7"/>
          <text dx ="6" dy="-1" textLength="106" lengthAdjust="spacing">
              <textPath xlink:href="#label7" textLength="106" lengthAdjust="spacing">
                {data[6].label}
              </textPath>
          </text>
        </svg>
      </div>
      {#if data[7].calculated}
      <div id="category-8" class="triangle" style = "transform: rotate(315deg) scale({data[7].calculatedscale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z" id="texttest"/>
        </svg>
      </div>
      {:else}
      <div id="category-8" class="triangle" style = "transform: rotate(315deg) scale({data[7].scale});">
        <svg viewBox="0 0 110.5 155.5">
          <path d="M 0 45.5 A 155 155 0 0 1 110 0 v 155 Z" id="texttest"/>
        </svg>
      </div>
      {/if}
      <div id="category-label" class="triangle" style = "transform: rotate(315deg) scale(1.2);">
        <svg viewBox="-8 -8 110.5 155.5">
          <path fill="transparent" d="M 0 45.5 A 155 155 0 0 1 109 0 v 155 Z" id="label8"/>
          <text dx ="6" dy="-1" textLength="106" lengthAdjust="spacing">
              <textPath xlink:href="#label8" textLength="106" lengthAdjust="spacing">
                {data[7].label}
              </textPath>
          </text>
        </svg>
      </div>
    
    
    </div>
      
    
    
    <style>


    div.container {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
        overflow-y: hidden;
        text-align:center;
    }

    #wheelOfLife {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    max-width: 400px;
    margin: auto;
    }
    
    #wheelOfLife-background {
    width: 100%;
    }
    
    .triangle {
    position: absolute;
    top: 0;
    width: 50%;
    height: 50%;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    transform-origin: bottom right;
    }
    
    .triangle svg{
    /* Default height */
    height: 79%;
    fill-opacity: 0.8;
    }
    
    #category-1 {
    fill: #ED2527;
    }
    
    #category-2{
    fill: #3DB549;
    /* overwritten in js */
    transform: rotate(45deg);
    }
    
    #category-3 {
    fill: #2289B4;
    /* overwritten in js */
    transform: rotate(90deg);
    }
    
    #category-4 {
    fill: #F79321;
    /* overwritten in js */
    transform: rotate(135deg);
    }
    
    #category-5 {
    fill: #94AFDC;
    /* overwritten in js */
    transform: rotate(180deg);
    }
    
    #category-6 {
    fill: #FF5F75;
    /* overwritten in js */
    transform: rotate(225deg);
    }
    
    #category-7 {
    fill: #00ADEF;
    /* overwritten in js */
    transform: rotate(270deg);
    }
    
    #category-8 {
    fill: #935FA7;
    /* overwritten in js */
    transform: rotate(315deg);}
    
    #category-label {
    fill: transparent;
    /* overwritten in js */
    transform: rotate(315deg);  
    }
    
    
    </style>