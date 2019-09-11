'use-strict'


exports.WhereNull_notNull = (builder,field,cond) =>{
    if(cond.toLowerCase() === 'is null'){
        builder.whereNull(field)
    }
    else if(cond.toLowerCase() === 'is not null'){
        builder.whereNotNull(field)
    }
    return builder;
};

exports.ConditionOr = (builder,condition) =>{
    let key_condition = Object.keys(condition);
    key_condition.map(item=>{
        if(Array.isArray(condition[item])){
            builder.where(function () {
                condition[item].map(item2=>{
                    this.orWhere(item2)
                })
            })
        }
        if(condition[item].toLowerCase() === 'is null' || condition[item].toLowerCase() === 'is not null' ){
            builder = this.WhereNull_notNull(builder,item,condition[item].toLowerCase())
        }else{
            builder.orWhere(item,condition_or[item])
        }
    });
};

exports.ConditionIn_NotIn = (builder,conditions) =>{

};