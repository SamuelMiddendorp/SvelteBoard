<script lang="ts">
    import { getBoard } from "$lib/FakeFileStore";
    import type { Board } from "$lib/model";

    let board : Board = getBoard();
</script>
{#each board.lanes as lane}
<h1>{lane.title}</h1>
{/each}
