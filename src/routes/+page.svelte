<script lang="ts">
    import { getBoard } from "$lib/FakeFileStore";
    import type { Board } from "$lib/model";

    let board : Board = getBoard();
    let onDrop = (e: any) =>{
        let data = e.dataTransfer.getData("text");
        e.target.appendChild(document.getElementById(data));
    }
    let onDragOver = (e: any) =>{
        e.preventDefault();
    }
    let onDragStart = (e: any, id: number) => {
        e.dataTransfer.setData("text", id);
    }

</script>
<div class="board">
{#each board.lanes as lane}
<div on:drop={onDrop} on:dragover={onDragOver} class="lane">
    <h2>{lane.title}</h2>
    {#each lane.items as item,id}
    <div on:dragstart={(e) => onDragStart(e,id)} draggable=true class="item">
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
