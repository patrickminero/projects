new Vue({
    el: '#app',
    data: {
        greeting: 'good ' ,
        date: new Date().toDateString(),
        greeting: new Date().getHours(),
        item: '',
        itemList: [],
        completed: false,
        checkButton: '<i class="far fa-square"></i>'
    },

    created () {
        this.itemList = JSON.parse(localStorage.getItem('ItemList') || '[]');
    },

    beforeUpdate () {
        this.itemList.every(this.isCompleted)
    },

    methods: {
        getQuote: function (){
            let listItems = [
            '“Amateurs sit and wait for inspiration, the rest of us just get up and go to work.” ~ Stephen King', 
            '“Life is too complicated not to be orderly.” ~ Martha Stewart', 
            '“Being rich is having money; being wealthy is having time.” ~ Margaret Bonnano',
            '“Until we can manage time, we can manage nothing else.” ~ Peter Drucker',
            '“If you spend too much time thinking about a thing, you’ll never get it done.” ~ Bruce Lee',
            '“Why do anything unless it is going to be great?” ~ Peter Block'];
            let index = Math.floor(Math.random() * listItems.length);
            let quote = listItems[index];
            return quote;
        },    

        addItem: function(){
            let element = {
                name: this.item,
                pending: true,
                disabled: true
            }
            if(this.item !== ''){
            this.itemList.push(element)
            window.localStorage.setItem('ItemList', JSON.stringify(this.itemList))
            this.item = '';}
        },

        changeStatus: function(item, index, event){
            if(this.itemList[index].pending === true){
                this.itemList[index].pending = false
                this.checkButton = '<i class="far fa-check-square"></i>'
            }else{
                this.itemList[index].pending = true
                this.checkButton = '<i class="far fa-square"></i>'
            }
            window.localStorage.setItem('ItemList', JSON.stringify(this.itemList))
        },

        deleteItem: function(item, index){
            this.itemList.splice(index, 1)
            window.localStorage.setItem('ItemList', JSON.stringify(this.itemList))
        },

        editItem: function(item, index){
                if(this.itemList[index].disabled === false){
                    this.itemList[index].disabled = true
                    window.localStorage.setItem('ItemList', JSON.stringify(this.itemList))
                }else{
                    this.itemList[index].disabled = false
                    window.localStorage.setItem('ItemList', JSON.stringify(this.itemList))
                }
        },

        isCompleted: function(element){
            return this.completed = !element.pending === true;
            
        },

        displayNone: function(){
            document.getElementById('modal').style.display = 'none'
        },

        resetList: function(){
            this.listItems = []
            localStorage.clear()
            location.reload()
        }
        
    },

})

