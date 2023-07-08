<script lang="ts">
    import { getBoard } from "$lib/FakeFileStore";
    import type { Board } from "$lib/model";

    let board : Board = getBoard();
</script>
<div class="board">
{#each board.lanes as lane}
<div class="lane">
    <h2>{lane.title}</h2>
    {#each lane.items as item}
    <div class="item">
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
</style>
