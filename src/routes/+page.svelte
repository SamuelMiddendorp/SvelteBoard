<script lang="ts">
    import { getBoard } from "$lib/FakeFileStore";
    import type { Board, Item } from "$lib/model";

    let board : Board = getBoard();
    let onDrop = (e: any) =>{
        let itemId = e.dataTransfer.getData("itemId");
        let originalLaneId = e.dataTransfer.getData("laneId");
    }
    let onDragOver = (e: any) =>{
        e.preventDefault();
    }
    let onDragStart = (e: any, itemId: number, laneId: number) => {
        e.dataTransfer.setData("itemId", itemId);
        e.dataTransfer.setData("laneId", laneId);
    }

</script>
<div class="board">
{#each board.lanes as lane}
<div on:drop={onDrop} on:dragover={onDragOver} class="lane">
    <h2>{lane.title}</h2>
    {#each lane.items as item,id}
    <div on:dragstart={(e) => onDragStart(e,item.id, lanel.id)} draggable=true class="item">
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
