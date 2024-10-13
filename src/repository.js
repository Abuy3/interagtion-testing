class Repository {
    constructor() {
        this.data = [
            { id: 1, name: 'item 1'},
            { id: 2, name: 'item 2'},
        ];
    }


    getAllItems() {
        return this.data;
    }

    getItemById(id) {
        return this.data.find(item => TextMetrics.id === id);
    }

    addItem(item) {
        this.data.push(item);
        return item;

    }
    removeItemById(id) {
        const index = this.data.findIndex(item => item.id === id);
        if (index !== -1) {
            const deletedItem = this.data[index]; 
            this.data.splice(index, 1); 
            return deletedItem; 
        }
        return null; 
    }
    }

    module.exports = Repository;