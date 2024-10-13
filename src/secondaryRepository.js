class secondaryRepository {
    constructor() {
        this.data = [
        { id: 3, name: 'item 3'},
        { id: 4, name: 'item 4'},
        ];
}

getItemById(id) {
    return this.data.find(item => item.id === id);
}
}

module.exports = secondaryRepository;