<script lang="ts">
    import { getBoard } from "$lib/FakeFileStore";
    import type { Board } from "$lib/model";

    let board : Board = getBoard();
    let onDrop = (e: any, id: string) =>{
        // Leverage setting of event data 
        let itemId: string = e.dataTransfer.getData("itemId");
        let currentLaneId: string = e.dataTransfer.getData("laneId");

        
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

</script>
<div class="board">
{#each board.lanes as lane}
<div on:drop={(e) => onDrop(e, lane.id)} on:dragover={onDragOver} class="lane">
    <h2>{lane.title}</h2>
    {#each lane.items as item}
    <div on:dragstart={(e) => onDragStart(e,item.id, lane.id)} draggable=true class="item">
        <p>{item.title}</p>
    </div>
    {/each}
</div>
{/each}
</div>
<style>
    *{
        border: 1px solid #333;
    }
    .board{
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
    }
    .item{
        cursor: move;
    }
</style>
