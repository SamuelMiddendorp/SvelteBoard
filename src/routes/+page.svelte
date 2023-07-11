<script lang="ts">
    import { getBoard } from "$lib/FakeFileStore";
    import { v4 as uuidv4 } from 'uuid';

    let board = getBoard();

    let onDrop = (e: any, id: string) =>{
        
        // Leverage setting of event data 
        let itemId: string = e.dataTransfer.getData("itemId");
        let currentLaneId: string = e.dataTransfer.getData("laneId");

        // When moving to itself, dont change
        if(id == currentLaneId){
            return;
        }
        
        // Get indexes to make direct adjustment
        let targetLaneIndex = board.lanes.indexOf(board.lanes.find(x => x.id == id)!); 
        let currentLaneIndex = board.lanes.indexOf(board.lanes.find(x => x.id == currentLaneId)!); 

        // Get lanes
        let targetLane = board.lanes[targetLaneIndex];
        let currentLane = board.lanes[currentLaneIndex];
       
        // Get item
        let item = board.lanes[currentLaneIndex].items.find(i => i.id == itemId)!;

        // Remove from existing and add to new;
        targetLane.items = [...targetLane.items, item]; 
        currentLane.items = currentLane.items.filter(i => i.id != itemId);

        // Update board

        board.lanes[targetLaneIndex] = targetLane;
        board.lanes[currentLaneIndex] = currentLane;
        
    }

    let onDragOver = (e: any) =>{
        e.preventDefault();
    }

    let onDragStart = (e: any, itemId: string, laneId: string) => {
        // Set datatransfer when starting dragging of an item;
        e.dataTransfer.setData("itemId", itemId);
        e.dataTransfer.setData("laneId", laneId);
    }
    let addLane = () => {
        let newLane = {id: uuidv4(), title: "sample lane", items:[] }
        board.lanes = [...board.lanes, newLane];
    }

</script>
<div class="board">
{#each board.lanes as lane}
<div role="group" on:drop={(e) => onDrop(e, lane.id)} on:dragover={onDragOver} class="lane">
    <h2>{lane.title}</h2>
    <div class="items">
    {#each lane.items as item}
    <div role="listitem" on:dragstart={(e) => onDragStart(e,item.id, lane.id)} draggable=true class="item">
        <p>{item.title}</p>
    </div>
    {/each}
    </div>
</div>
{/each}
    <div class="add-lane">
        <button on:click={() => addLane()}>+</button>
    </div>
</div>
<style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200&display=swap');
    :global(*){
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        color: #fff;
    }
    :global(body){
        background-color: #111;
    }
    
    .board{
        position: relative;
        padding: 2rem;
        display: grid;
        gap: 2rem;
        height: 100%;
        grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr));
    }
    .lane{
        border-radius: 1rem;
        padding: 1rem;
        background-color: #222;
    }
    .items{
        margin-top: 2rem;
        display: grid;
        gap: 1rem;
    }
    .item{
        min-height: 6rem;
        border-radius: 1rem;
        padding: 1rem;
        background-color: #333;
        cursor: move;
    }
    .add-lane{
        display: grid;
        place-content: center;
    }
    .add-lane button{
        all: unset;
        font-weight: 900;
        font-size: 4rem;
    }
</style>
