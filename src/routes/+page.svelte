<div>
    <form method="POST" action="?/login">
        <LayoutGrid>
            <Cell span="{12}">
                <h1>Inscription bénévole aux events ESN</h1>
            </Cell>

            <Cell span="{12}">
                <Textfield class="centered" variant="outlined" bind:value={emailValue} label="Email" type="email"
                           input$name="email"
                           required invalid>

                    <HelperText class="centered" slot="helper">Entre ici l'email utilisé pour ton inscription sur
                        AssoConnect !
                    </HelperText>
                </Textfield>
                {#if form?.missing}
                    <p class="error">Tu n'as pas saisi d'email
                    </p>
                {/if}
                {#if form?.incorrect}
                    <p class="error">L'email saisi n'est pas reconnu
                    </p>
                {/if}
            </Cell>


            <Cell span="{12}">
                <Actions>
                    <Button class="centered" variant="raised">
                        <Label>Valider</Label>
                    </Button>
                </Actions>
            </Cell>


        </LayoutGrid>
    </form>
</div>


<script lang="ts">
    import Button, {Label} from '@smui/button';
    import Textfield from "@smui/textfield";
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import HelperText from "@smui/textfield/helper-text";
    import type {ActionData} from './$types';
    import {Actions} from "@smui/card";

    export let form: ActionData;

    let emailValue = ''
</script>

<style>
    h1 {
        font: bold 2.2em "Roboto", sans-serif;
        text-align: center;
    }

    * :global(.centered) {
        height: 3em;
        display: flex;
        justify-content: center;
        margin-left: auto;
        margin-right: auto;
        align-items: center;
        text-align: center;
        width: 70%;
    }

    * :global(.error) {
        font: 1em "Roboto", sans-serif;
        color: #ff3e00;
        text-align: center;
    }

    /*.text{*/
    /*    text-align: center;*/
    /*    font: 0.9em "Roboto", sans-serif;*/
    /*}*/
</style>

