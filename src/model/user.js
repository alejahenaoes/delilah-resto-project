export const userModel= (sequelize,DataTypes) =>{

    const user = sequelize.define('user',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nickname:{
        type:DataTypes.STRING,
        unique:true,
        allowNull: false
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull: false
    },
    phonenumber:{
        type:DataTypes.STRING,
        allowNull: false
    },
    adress:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId:{
        type:DataTypes.INTEGER,
        defaultValue: 2,
        references:{
            model: 'roles' ,
            key: 'id'
        }
    }
},{
    timestamps: false,
})
    return user
}