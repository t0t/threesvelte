<script>
    export let smallNav;
</script>

<style>
    .header {
        display: flex;
        margin: auto;
        max-width: 1100px;
    }
    .header * {
        color: white;
    }
    .header-content {
        pointer-events: all;
    }
    .title {
        margin-top: 4rem;
        font-size: 2rem;
    }
    .subtitle {
        margin-top: 0.66rem;
        font-size: 1rem;
        font-weight: 300;
        line-height: 1.5rem;
    }
    .button {
        display: flex;
        margin-top: 2.66rem;
        padding: 1rem 2rem;
        width: fit-content;
        border: 1px solid rgba(255, 255, 255, 0.25);
        border-radius: 2px;
        font-weight: 300;
        font-size: 1rem;
        cursor: pointer;
        transition: .5s;
    }
    .button:hover {
        color: black;
        background: white;
        border: 1px solid rgba(255, 255, 255);
    }
    .button:hover svg {
        stroke: black;
    }
    svg {
        transition: .5s;
        width: 1rem;
        height: 1rem;
    }
    .button-icon {
        margin-left: 0.66rem;
        transform: translateY(2px);
    }
    .tip {
        margin-top: 20px;
        font-size: 0.8rem;
        font-weight: 300;
        opacity: 0.5;
    }
</style>

<div class='header'>
    <div class='header-content'>
        <div class='title'>+0+1234</div>
        <div class='subtitle'>Three + Svelte</div>
        <!-- {#if !smallNav} xxx {/if} -->
    </div>
</div>