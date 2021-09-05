<template>
    <div id="main"></div>
</template>

<script>
    import E from 'wangeditor'
    export default {
        name: "ProductWangeditor",
        data() {
            return {
                editor:'',
            }
        },
        mounted() {
            this.editor = new E('#main');
            this.editor.config.focus=false;
            this.editor.config.onchange = (val)=> {
                // console.log("change 之后最新的 html", val);
                this.$emit('wangeditorData',val)
            };
            this.editor.config.height = 200;
            this.editor.config.menus = [
                'head',
                'bold',
                'fontSize',
                'fontName',
                'italic',
                'underline',
                'strikeThrough',
                'indent',
                'lineHeight',
                'link',
                'list',
                'justify',
                'quote',
                'emoticon',
                'table',
                'splitLine',
                'undo',
                'redo',
            ]
            this.editor.create()
        }
    }
</script>

<style scoped>

</style>
