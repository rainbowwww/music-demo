{
    let view = {
        el: '.page>main',
        template:`
            <h1>新建歌曲</h1>
            <form class="form">
                <div class="row">
                <label for="">
                歌名
                </label>
                <input type="text"/>
                </div>
                <div class="row">
                <label for="">
                歌手
                </label>
                <input type="text"/>
                </div>
                <div class="row">
                <label for="">
                外链
                </label>
                <input type="text"/>
                </div>
                <div class="row actions">
                <label for="">

                </label>
                <button type="submit">保存</button>
                </div>
                </form>
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }
    let model ={}
    let controller = {
        init(view,model){
            this.view = view,
            this.model = model,
            this.view.render(this.model.data)
        }
    }
    controller.init(view,model)
}