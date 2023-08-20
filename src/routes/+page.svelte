<script lang="ts">
    import { getBoard } from "$lib/FakeFileStore";
    import BoardComponent from "$lib/components/BoardComponent.svelte";
    import { onMount } from "svelte";
    
    let board: any;
    onMount(() => {
        board = getBoard();
    });
</script>

{#if board}
    <BoardComponent {board} />
{/if}
