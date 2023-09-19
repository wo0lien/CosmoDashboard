<div>
    <LayoutGrid>
        <Cell span="{12}">
            <h1>Inscription bénévole aux events ESN</h1>
        </Cell>

<!--        <Cell span="{12}">-->
<!--            <p class="text">Entre ici l'email utilisé pour ton inscription sur AssoConnect !</p>-->
<!--        </Cell>-->


        <Cell span="{12}">
                <Textfield class="centered" variant="outlined" bind:value={emailValue} label="Email">
                    <HelperText slot="helper">Entre ici l'email utilisé pour ton inscription sur AssoConnect !</HelperText>
                </Textfield>
        </Cell>



        <Cell span="{12}">
                <Button class="centered" variant="raised">
                    <Label>Valider</Label>
                </Button>
        </Cell>

    </LayoutGrid>
</div>


<script lang="ts">
    import Button, {Label} from '@smui/button';
    import Textfield from "@smui/textfield";
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import HelperText from "@smui/textfield/helper-text";

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

    /*.text{*/
    /*    text-align: center;*/
    /*    font: 0.9em "Roboto", sans-serif;*/
    /*}*/
</style>

