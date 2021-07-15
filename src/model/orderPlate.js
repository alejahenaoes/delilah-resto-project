export const orderplateModel=  (sequelize,DataTypes) =>{

    const orderplate = sequelize.define('orderplate',{

    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull: false
    },
    orderId:{
        type:DataTypes.INTEGER,
        references:{
            model: 'orders',
            key: 'id'
        }
    },
    plateId:{
        type:DataTypes.INTEGER,
        references:{
            model: 'foodplates',
            key: 'id'
        }
    },
    quantity:{
        type:DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps:false
}
)
    return orderplate
}