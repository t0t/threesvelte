<script>
    import { fade } from 'svelte/transition';

    export let activeCardName;
    export let smallNav;

    let smallNavOpen = false;

    const links = {
        'Experience': ['Royal Bank of Canada', 'Mitel Networks'],
        'Education': ['Carleton University'],
        'Achievements': ['Innovation Challenge', 'cuHacking 2020'],
        'Projects': ['Smarticle']
    }
</script>

<style>
    .navigation {
        display: flex;
        margin: auto;
        max-width: 1100px;

        padding: 0rem 0rem 2rem 0rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        color: white;
        font-weight: 300;
        font-size:  1rem;
        pointer-events: all;
    }
    .navigation-group:not(:last-of-type) {
        margin-right: auto;
    }
    .navigation-item {
        margin-top: 0.66rem;
        opacity: 0.5;
        cursor: pointer;
        transition: .5s;
    }
    .navigation-item:hover {
        opacity: 1;
    }
    .icon {
        margin-left: 0.33rem;
        transform: translateY(2px);
    }

    .menu-icon {
        pointer-events: all;
        cursor: pointer;
        margin-top: 20px;
    }
    .small-navigation {
        pointer-events: all;
        position: fixed;
        
        height: calc(100%);
        width: calc(100%);
        top: 40px;
        margin: -40px -10%;
        z-index: 3;
        background: white;
    }
    .small-navigation-content {
        margin: 40px 10%;
    }
    .small-navigation-margin {
        margin-top: 40px;
    }
</style>

{#if smallNav}

    <img class='menu-icon' src='/assets/icons/menu.svg' alt='Menu' on:click={() => smallNavOpen = true}>

    {#if smallNavOpen}
        <div class='small-navigation' transition:fade>
            <div class='small-navigation-content'>

                <img class='menu-icon' src='/assets/icons/x-black.svg' alt='x' on:click={() => smallNavOpen = false}>

                {#each Object.keys(links) as header}
                    <div class='navigation-group small-navigation-margin'>
                        <div class='navigation-header'>{header} </div>
                        {#each links[header] as link}
                            <div class='navigation-item' on:click={() => {activeCardName = link; smallNavOpen = false;}}>{link}</div>
                        {/each} 
                    </div>
                {/each}

                <div class='navigation-group small-navigation-margin'>
                    <div class='navigation-header'>Links</div>
                    <div class='navigation-item link'><a href='/assets/MatthewHobbs.pdf' download='MatthewHobbs.pdf'>Download Resume</a></div>
                    <div class='navigation-item link'><a href='https://www.linkedin.com/in/matt-hobbs' target='_blank'>www.linkedin.com/in/matt-hobbs</a></div>
                    <div class='navigation-item link'><a href='https://www.github.com/matthewdhobbs' target='_blank'>www.github.com/matthewdhobbs</a></div>
                </div>

            </div>
        </div>  
    {/if}

{:else}

    <div class='navigation'>
        {#each Object.keys(links) as header}
            <div class='navigation-group'>
                <div class='navigation-header'>{header} </div>
                {#each links[header] as link}
                    <div class='navigation-item' on:click={() => activeCardName = link}>{link}</div>
                {/each} 
            </div>
        {/each}
        <div class='navigation-group'>
            <div class='navigation-header'>Links <img class='icon' src='/assets/icons/external-link.svg' alt='External Link'></div>
            <div class='navigation-item link'><a href='https://www.linkedin.com/in/matt-hobbs' target='_blank'>www.linkedin.com/in/matt-hobbs</a></div>
            <div class='navigation-item link'><a href='https://www.github.com/matthewdhobbs' target='_blank'>www.github.com/matthewdhobbs</a></div>
        </div>
    </div>

{/if}