var todoStorage={
    collection: []
};

todoStorage.init =function(){
    this.collection =JSON.parse(localStorage.getItem('todo') || '[]');
};
todoStorage.hasItem =function(label){
    return this.collection.some(function(item){
        return item.label === label;
    });
};
todoStorage.save = function(){
    localStorage.setItem('todo', JSON.stringify(this.collection));
};
todoStorage.add= function(label){
    if(this.hasItem(label)){
        return false;
    }
    this.collection.push({
        label: label,
        status: 'uncompleted'
    });
    this.save();
    return true;
};
todoStorage.remove =function(label){
    if(!this.hasItem(label)){
        return false;
    }
    this.collection.forEach(function(item, i){
       if(item.label === label){
           this.collection.splice(i,1);
       } 
    }.bind(this));
    this.save();
    return true;
};
todoStorage.toggleStatus =function(label){
    if(!this.hasItem(label)){
        return false;
    }
    this.collection.forEach(function(item, i){
       if(item.label === label){
           item.status = item.status === 'completed' ? 'uncompleted' : 'completed';
       } 
    });
    this.save();
    return true;
};
todoStorage.filter = function(status){
    if(status === 'all'){
        return this.collection;
    }
    return this.collection.filter(function(item){
        return item.status === status;
    });
};
