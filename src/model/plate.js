export const plateModel=  (sequelize,DataTypes) =>{
    const plate = sequelize.define('foodplate',{

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    img:{
        type:DataTypes.STRING,
        allowNull: false
    }
},{
    timestamps: false
})
    return plate
}